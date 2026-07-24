import { NextRequest, NextResponse } from 'next/server';
import { getMailRecipient, sendMail } from '@/lib/mailer';
import {
  adminSupportRequestEmail,
  userSupportRequestConfirmation,
  buildEmailAttachments,
  generateRequestRef,
} from '@/lib/email-templates';
import type { SupportRequestFormData } from '@/types';
import { sanitizeUploadedFiles } from '@/lib/uploadSecurity';

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as SupportRequestFormData;

    if (!data.fullName?.trim() || !data.email?.trim() || !data.phone?.trim()) {
      return NextResponse.json({ success: false, error: 'Name, email, and phone are required.' }, { status: 400 });
    }

    if (!data.supportTopic?.trim() || !data.supportType?.trim()) {
      return NextResponse.json({ success: false, error: 'Support topic and support type are required.' }, { status: 400 });
    }

    if (!data.academicIntegrityConfirmed) {
      return NextResponse.json(
        { success: false, error: 'Please confirm the academic-integrity statement.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address.' }, { status: 400 });
    }

    const uploadedFiles = sanitizeUploadedFiles(data.uploadedFiles);
    const safeData: SupportRequestFormData = { ...data, uploadedFiles };
    const requestRef = generateRequestRef();
    const attachments = await buildEmailAttachments(uploadedFiles);

    await sendMail({
      to: getMailRecipient(),
      subject: `[New Support Request ${requestRef}] ${data.supportTopic} — ${data.fullName}`,
      html: adminSupportRequestEmail({ data: safeData, requestRef, attachmentCount: attachments.length }),
      replyTo: data.email,
      attachments,
    });

    await sendMail({
      to: data.email,
      subject: `Support Request Received (${requestRef}) — FIZ Business Solutions`,
      html: userSupportRequestConfirmation({
        fullName: data.fullName,
        supportTopic: data.supportTopic,
        preferredDate: data.preferredDate,
        requestRef,
      }),
    });

    return NextResponse.json({ success: true, message: 'Support request submitted successfully!' });
  } catch (error) {
    console.error('Support request email error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit request. Please try again.' }, { status: 500 });
  }
}
