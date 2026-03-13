import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { uploadLimiter, getClientIp } from '@/lib/rate-limit';

// Configuration for file upload
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const ALLOWED_EXTENSIONS = ['pdf', 'ai', 'psd', 'eps', 'svg', 'png', 'jpg', 'jpeg', 'tiff', 'zip'];
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/postscript',         // .ai, .eps
  'image/vnd.adobe.photoshop',      // .psd  
  'application/x-photoshop',        // .psd (alternate)
  'image/svg+xml',                  // .svg
  'image/png',
  'image/jpeg',
  'image/tiff',
  'application/zip',
  'application/x-zip-compressed',
  'application/octet-stream',       // fallback for design files
];

const S3_BUCKET = process.env.S3_UPLOAD_BUCKET || 'blackbear-printhouse-uploads';
const S3_REGION = process.env.AWS_REGION || 'me-south-1';

const s3 = new S3Client({ region: S3_REGION });

export async function POST(req: NextRequest) {
  // ── Rate Limiting ──
  const ip = getClientIp(req);
  const { success: allowed } = uploadLimiter.check(ip, 10);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many uploads. Please wait a minute.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 25MB.' }, { status: 400 });
    }

    // Validate file extension
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ 
        error: `File type not allowed. Accepted: ${ALLOWED_EXTENSIONS.join(', ')}` 
      }, { status: 400 });
    }

    // ── MIME type validation (prevents extension spoofing) ──
    if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ 
        error: `File MIME type not allowed: ${file.type}` 
      }, { status: 400 });
    }

    // Generate unique filename (sanitize to prevent path traversal)
    const timestamp = Date.now();
    const safeName = file.name
      .replace(/\.\./g, '')                    // prevent directory traversal
      .replace(/[^a-zA-Z0-9._-]/g, '_')       // sanitize special chars
      .slice(0, 100);                          // limit filename length
    const key = `uploads/${timestamp}_${safeName}`;

    // Upload to S3
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await s3.send(new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type || 'application/octet-stream',
    }));

    const fileUrl = `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${key}`;

    return NextResponse.json({ 
      success: true, 
      filename: safeName,
      url: fileUrl,
      key,
      size: file.size,
    }, { status: 200 });

  } catch (error) {
    console.error('Upload API Error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
