import { ImWhatsapp } from 'react-icons/im';

type WhatsAppIconProps = {
  size?: number;
  className?: string;
};

export default function WhatsAppIcon({ size = 24, className = '' }: WhatsAppIconProps) {
  return (
    <ImWhatsapp
      size={size}
      aria-hidden
      className={`shrink-0 text-[#25D366] ${className}`}
    />
  );
}
