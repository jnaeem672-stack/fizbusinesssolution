import { NextRequest, NextResponse } from 'next/server';
import { getMailRecipient, sendMail } from '@/lib/mailer';
import { adminContactEmail, userContactConfirmation } from '@/lib/email-templates';
import type { ContactFormData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = (await request.json()) as ContactFormData;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address.' }, { status: 400 });
    }

    await sendMail({
      to: getMailRecipient(),
      subject: `[Contact] ${subject}`,
      html: adminContactEmail({ name, email, subject, message }),
      replyTo: email,
    });

    await sendMail({
      to: email,
      subject: 'We Received Your Message — FIZ Business Solutions',
      html: userContactConfirmation({ name }),
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact email error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
