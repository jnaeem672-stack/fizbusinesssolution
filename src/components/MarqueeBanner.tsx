'use client';

const MarqueeBanner = () => {
  const text = '🎁 First Order? Get Up To 10% OFF | Assignment Help | Dissertation Help | Research Proposal Help | Proofreading & Editing | Harvard, APA & OSCOLA Referencing | 24/7 WhatsApp Support | ';

  return (
    <div className="bg-primary h-[40px] flex items-center overflow-hidden border-b border-white/10 shrink-0">
      <div className="animate-marquee">
        <span className="text-white text-[13px] font-medium px-4 flex items-center">{text + text + text + text}</span>
      </div>
    </div>
  );
};

export default MarqueeBanner;
