/**
 * Email Notification Service
 * 
 * For local development, this service logs emails to the console.
 * In production, activate AWS SES by uncommenting the SES code below
 * and setting the AWS_REGION and SES_FROM_EMAIL env variables.
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// === AWS SES PRODUCTION CODE (uncomment when deploying) ===
// import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
// const sesClient = new SESClient({ region: process.env.AWS_REGION || 'me-south-1' });

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  try {
    // === PRODUCTION (AWS SES) ===
    // const command = new SendEmailCommand({
    //   Source: process.env.SES_FROM_EMAIL || 'noreply@blackbear.qa',
    //   Destination: { ToAddresses: [to] },
    //   Message: {
    //     Subject: { Data: subject },
    //     Body: { Html: { Data: html } },
    //   },
    // });
    // await sesClient.send(command);

    // === LOCAL DEV (console log) ===
    console.log('📧 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📧 EMAIL NOTIFICATION`);
    console.log(`📧 To: ${to}`);
    console.log(`📧 Subject: ${subject}`);
    console.log(`📧 Body: ${html.substring(0, 200)}...`);
    console.log('📧 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return true;
  } catch (error) {
    console.error('Email send failed:', error);
    return false;
  }
}

export function orderConfirmationEmail(orderNumber: string, customerName: string, total: number): EmailOptions {
  return {
    to: '', // Filled by caller
    subject: `تأكيد الطلب ${orderNumber} | BlackBear Print House`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: rtl;">
        <div style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); padding: 32px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #C8956C; margin: 0; font-size: 24px;">مطبعة بلاك بير</h1>
          <p style="color: #888; margin: 8px 0 0;">BlackBear Print House</p>
        </div>
        <div style="background: #ffffff; padding: 32px; border: 1px solid #eee;">
          <h2 style="color: #1a1a1a; margin-top: 0;">مرحباً ${customerName}! ✨</h2>
          <p style="color: #555; line-height: 1.8;">تم استلام طلبك بنجاح. سنبدأ في تجهيزه على الفور.</p>
          <div style="background: #f8f6f3; padding: 20px; border-radius: 8px; margin: 24px 0;">
            <p style="margin: 0; color: #666;">رقم الطلب:</p>
            <p style="margin: 4px 0 0; font-size: 22px; font-weight: bold; color: #C8956C;">${orderNumber}</p>
          </div>
          <div style="background: #f8f6f3; padding: 20px; border-radius: 8px;">
            <p style="margin: 0; color: #666;">المبلغ الإجمالي:</p>
            <p style="margin: 4px 0 0; font-size: 20px; font-weight: bold; color: #1a1a1a;">${total} ر.ق</p>
          </div>
          <p style="color: #555; line-height: 1.8; margin-top: 24px;">سنوافيك بتحديثات حول حالة طلبك. إذا كان لديك أي استفسار، لا تتردد في التواصل معنا.</p>
        </div>
        <div style="background: #f8f6f3; padding: 20px; text-align: center; border-radius: 0 0 12px 12px;">
          <p style="margin: 0; color: #888; font-size: 13px;">© ${new Date().getFullYear()} BlackBear Print House — الدوحة، قطر</p>
        </div>
      </div>
    `,
  };
}

export function quoteReceivedEmail(customerName: string, serviceType: string): EmailOptions {
  return {
    to: '',
    subject: `تم استلام طلب عرض السعر | BlackBear Print House`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: rtl;">
        <div style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); padding: 32px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #C8956C; margin: 0; font-size: 24px;">مطبعة بلاك بير</h1>
        </div>
        <div style="background: #ffffff; padding: 32px; border: 1px solid #eee;">
          <h2 style="color: #1a1a1a; margin-top: 0;">مرحباً ${customerName}!</h2>
          <p style="color: #555; line-height: 1.8;">تم استلام طلب عرض السعر الخاص بك لخدمة <strong>${serviceType}</strong>.</p>
          <p style="color: #555; line-height: 1.8;">سيتواصل فريقنا معك خلال 24 ساعة بعرض سعر مفصل.</p>
        </div>
        <div style="background: #f8f6f3; padding: 20px; text-align: center; border-radius: 0 0 12px 12px;">
          <p style="margin: 0; color: #888; font-size: 13px;">© ${new Date().getFullYear()} BlackBear Print House</p>
        </div>
      </div>
    `,
  };
}
