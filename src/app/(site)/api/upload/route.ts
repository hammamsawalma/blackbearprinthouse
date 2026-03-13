import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
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
    const orderId = formData.get('orderId') as string | null;

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
    const filename = `${timestamp}_${safeName}`;

    // === LOCAL STORAGE (Dev) ===
    const uploadDir = path.join(process.cwd(), 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ 
      success: true, 
      filename,
      url: fileUrl,
      size: file.size,
    }, { status: 200 });

  } catch (error) {
    console.error('Upload API Error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
