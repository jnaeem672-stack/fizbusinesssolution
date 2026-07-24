import nodemailer, { type Transporter } from 'nodemailer';
import type { SendMailOptions } from '@/types';

let transporter: Transporter | null = null;

function getMailConfig() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || '587');
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.MAIL_TO || user;

  if (!user || !pass || !to) {
    throw new Error('Email service is not configured. Set SMTP_USER, SMTP_PASS, and MAIL_TO.');
  }

  return { host, port, secure, user, pass, to };
}

export function getMailRecipient(): string {
  return getMailConfig().to;
}

export function getTransporter(): Transporter {
  if (transporter) return transporter;
  const config = getMailConfig();

  transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  return transporter;
}

export async function sendMail({ to, subject, html, replyTo, attachments }: SendMailOptions) {
  const config = getMailConfig();
  const transport = getTransporter();
  const from = `"FIZ Business Solutions" <${config.user}>`;

  return transport.sendMail({
    from,
    to,
    replyTo: replyTo || config.user,
    subject,
    html,
    attachments,
  });
}
