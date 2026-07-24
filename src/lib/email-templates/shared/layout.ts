import type { WrapEmailOptions } from '@/types';
import { WHATSAPP_URL } from '@/constants/whatsapp';
import { BRAND } from './components';

export function wrapEmail({ title, preheader, bodyContent, accentColor = BRAND.primary }: WrapEmailOptions): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${title}</title>
  <!--[if mso]><style>table{border-collapse:collapse;}td{font-family:Arial,sans-serif;}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;-webkit-font-smoothing:antialiased;">
  <span style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader || title}</span>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#eef2f7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="620" cellspacing="0" cellpadding="0" style="max-width:620px;width:100%;">
          <!-- Top accent -->
          <tr>
            <td style="height:5px;background:linear-gradient(90deg,${BRAND.primary} 0%,${accentColor} 50%,${BRAND.navy} 100%);border-radius:16px 16px 0 0;"></td>
          </tr>
          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:0 0 16px 16px;overflow:hidden;box-shadow:0 8px 32px rgba(15,31,61,0.10);">
              <!-- Header -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background:linear-gradient(135deg,${BRAND.navy} 0%,${BRAND.navyLight} 100%);padding:36px 40px 32px;text-align:center;">
                    <div style="display:inline-block;background:${BRAND.primary};width:52px;height:52px;border-radius:14px;line-height:52px;font-size:26px;margin-bottom:14px;box-shadow:0 4px 16px rgba(196,30,58,0.4);">🎓</div>
                    <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:0.3px;">FIZ Business Solutions</h1>
                    <p style="margin:10px 0 0;color:rgba(255,255,255,0.65);font-size:11px;text-transform:uppercase;letter-spacing:2.5px;font-weight:600;">Learning &amp; Research Support</p>
                  </td>
                </tr>
              </table>
              <!-- Body -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:36px 40px 32px;">
                    ${bodyContent}
                  </td>
                </tr>
              </table>
              <!-- Footer -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background:${BRAND.navy};padding:28px 40px;text-align:center;border-top:3px solid ${BRAND.primary};">
                    <p style="margin:0 0 12px;color:#ffffff;font-size:14px;font-weight:700;">Need learning support?</p>
                    <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:${BRAND.whatsapp};color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:10px;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1px;box-shadow:0 4px 12px rgba(37,211,102,0.35);">Chat on WhatsApp</a>
                    <p style="margin:20px 0 0;color:rgba(255,255,255,0.45);font-size:11px;line-height:1.6;">
                      © ${new Date().getFullYear()} FIZ Business Solutions · Ethical Academic Coaching &amp; Research Support<br/>
                      Student Authorship · Constructive Feedback · Academic Integrity
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
