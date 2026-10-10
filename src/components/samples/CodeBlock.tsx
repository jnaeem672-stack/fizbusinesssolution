import type { ReactNode } from 'react';

const SQL_KEYWORDS = new Set(
  `SELECT FROM WHERE JOIN LEFT RIGHT INNER OUTER ON AS AND OR NOT EXISTS IN IS NULL GROUP BY ORDER HAVING
  DESC ASC LIMIT DISTINCT CREATE VIEW TABLE FUNCTION PROCEDURE TRIGGER RETURNS RETURN READS SQL DATA BEGIN END
  DECLARE DEFAULT CURSOR FOR CONTINUE HANDLER FOUND SET OPEN FETCH INTO CLOSE LOOP LEAVE IF THEN ELSE ELSEIF CASE
  WHEN UPDATE INSERT VALUES AFTER BEFORE EACH ROW CALL DELIMITER PRIMARY KEY AUTO_INCREMENT INT DECIMAL VARCHAR
  DATETIME DATE UNION ALL INTERSECT EXCEPT INDEX UNIQUE NEW IN DETERMINISTIC`.split(/\s+/),
);
const SQL_FUNCTIONS = new Set(['SUM', 'COUNT', 'AVG', 'MIN', 'MAX', 'ROUND', 'CONCAT', 'COALESCE', 'DATEDIFF', 'NOW', 'CURDATE', 'LEFT']);

// comment | string | number | word | whitespace | any other single character (nothing is ever dropped)
const TOKEN = /(--[^\n]*)|('(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|([\s\S])/g;

function highlightSql(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let m: RegExpExecArray | null;
  let i = 0;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(code)) !== null) {
    const [text, comment, str, num, word] = m;
    const key = i++;
    if (comment) out.push(<span key={key} className="text-[#A3B1C6] italic">{text}</span>);
    else if (str) out.push(<span key={key} className="text-[#9BE3A6]">{text}</span>);
    else if (num) out.push(<span key={key} className="text-[#9CC8FF]">{text}</span>);
    else if (word && SQL_KEYWORDS.has(word.toUpperCase()) && word === word.toUpperCase())
      out.push(<span key={key} className="text-[#E3C15A] font-semibold">{text}</span>);
    else if (word && SQL_FUNCTIONS.has(word.toUpperCase()) && code[TOKEN.lastIndex] === '(')
      out.push(<span key={key} className="text-[#F2A7C3]">{text}</span>);
    else out.push(text);
  }
  return out;
}

export default function CodeBlock({ code, lang, title }: { code: string; lang: 'sql' | 'text'; title?: string }) {
  return (
    <figure className="my-6 overflow-hidden rounded-2xl border border-navy/10 bg-[#0B1D3A] shadow-lg" dir="ltr">
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="text-[13px] font-bold text-white/90">{title ?? 'Code'}</span>
        <span className="shrink-0 rounded-md bg-[#C9A227] px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#0B1D3A]">{lang}</span>
      </figcaption>
      <pre
        tabIndex={0}
        aria-label={title ? `${title} (${lang.toUpperCase()} code)` : `${lang.toUpperCase()} code`}
        className="overflow-x-auto p-4 text-[13px] leading-relaxed text-white/90 sm:text-[14px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
      >
        <code className="font-mono">{lang === 'sql' ? highlightSql(code) : code}</code>
      </pre>
    </figure>
  );
}
