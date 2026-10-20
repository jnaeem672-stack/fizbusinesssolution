# FIZBS pending tasks (saved 20 Oct 2026)

Two named tasks to pick up later. Data comes from the Semrush trial exports of 20 Oct 2026.

## Task A: "Calculator Redesign" (DONE 20 Oct 2026: Base design live in src/QuoteCalculator.tsx; chat version not built)

The owner liked the "Base" design and "Idea 1: Chat with FIZBS" from the design canvas
(https://claude.ai/artifact/W35cGULR2sqdqwdWivfeov).

- Base design: icon cards for type of work, pill switch for level, thick word slider with an emoji on the
  handle (📝 / 📚 / 🎓) and a moving label showing words and price, deadline cards, then the "Your estimate"
  block in place of the first order box (big price, struck old price, "You save", breakdown, first order
  switch, WhatsApp button) with a small happy student illustration.
- Idea 1: the same questions as chat bubbles, price shown as the last message, "Send my answers on WhatsApp".
- Still to decide: Base only, Chat only, or both combined. Colours: blue was the reference.
- Must work on English (GBP), Arabic (SAR) and UAE (AED) pages and on mobile. Keep the WhatsApp
  conversion tracking exactly as it is.

## Task B: "Semrush SEO Plan"

### Saudi (Arabic), biggest opportunity, competitors are weak
Done 20 Oct: items 1 to 4 and خطوات البحث العلمي. Next (owner agreed order 20 Oct): عمل استبيان guide (720, KD 29), تدقيق لغوي page (590, KD 19; Arabic and English, say the team checks before delivery, no claims of Arabic linguists), اتوكاد in the AutoCAD Arabic title (5,400 x 2), English Java (320, KD 14) and MATLAB (480, KD 22) assignment help pages, then عرض بوربوينت (1,600), الماجستير عن بعد (2,400), فهرس البحث.
1. Move /ar/student-services to the "مكتب ومكتبة خدمات الطالب أونلاين" cluster (about 18,000 buyer searches):
   مكتبة لخدمات الطالب 9,900 (KD 20), مكتبة خدمة الطالب 3,600, مركز خدمات الطالب 1,900, مكتب خدمات الطالب
   1,300 (KD 12), مكتبة خدمات الطالب 720 (KD 11), مكتب خدمات طلابية 480 (KD 11). Add a "رقم مكتب خدمات طلابية"
   section with the WhatsApp number. Note: "خدمات طلابية" itself is dominated by university portals.
2. Riyadh page: add "خدمات الطالب الرياض" (480 + 480, KD 10 to 21).
3. New guide "ما هو الاسايمنت" (اسايمنت 1,300 KD 11, معنى اسايمنت 480 KD 10, اسايمنت بالانجليزي 320), with an SEU section.
4. New guide "خاتمة البحث" (خاتمة بحث 720 KD 11, خاتمة للبحث 480 KD 11, خاتمة 1,300).
5. More guides: فهرس البحث (390 + 210), خطوات البحث العلمي (590, KD 13), الماجستير عن بعد في السعودية (2,400 x 3, KD 12 to 17, needs careful research).
6. Owner: Haraj listing and LinkedIn company page (both rank on page 1 for مكتب خدمات طلابية).

### UK
7. Strengthen /tools/harvard-referencing-generator: "harvard citation generator" 6,600 (KD 13), now position 77.
   Bulk check 20 Oct: "harvard referencing generator" 22,200 (KD 42) and "harvard citation generator" 8,100 (KD 42) in the UK.
8. New pages: MBA dissertation help (390, KD 16), leadership assignment help (320, KD 15), statistics
   assignment help (720, KD 34), assignment help Cambridge (170, KD 9). Law page: criminal, company and
   corporate law sections (KD 7 to 9).
9. Owner: complete the Google Business Profile and ask real clients for reviews. The UK #1 site
   (uk-assignments.com) wins "assignment help uk" with only 73 referring domains, helped by the Maps pack.

### Keyword data (Semrush bulk checks, 20 Oct 2026, raw files in marketing/seo/semrush/)
Format: monthly searches (KD). No KD means Semrush had no difficulty score yet (usually easy).

Saudi, services and technical (sa_bulk_services-technical.csv):
- Tools people learn (page title words, not new pages): اكسل 27,100 (33), بايثون 14,800 (52), اتوكاد 5,400 and أوتوكاد 5,400, ثري دي ماكس 170 (19).
- Pages and guides: الماجستير عن بعد 2,400, عرض بوربوينت 1,600 (36), عمل استبيان 720 (29), تدقيق لغوي 590 (19),
  خطوات البحث العلمي 590 (13, done), منهج البحث 320, رسالة دكتوراه 210 (12), فهرس البحث 210, الاطار النظري 110 (11),
  الدراسات السابقة 90, خدمات الطالب جدة 70.

Saudi, research topics (sa_bulk_research-topics.csv):
- كتابة تقرير 480 (23), بحث تخرج 320 (12), كتابة مقال 260 (27), عرض تقديمي 210 (46), شرائح بوربوينت 170 (40),
  أدوات البحث العلمي 170, توثيق apa 170 (13), معامل ارتباط بيرسون 170 (16), مشكلة البحث 140 (11),
  كيفية عمل استبيان 110 (27), استبيان الكتروني 90, الفا كرونباخ 90, نموذج خطة بحث 90.
- 40 or less: الإحصاء الوصفي, توثيق المراجع, ملخص البحث, عينة البحث, صدق وثبات الاستبيان, تحليل البيانات spss.
  Use these as sections inside bigger guides, not as their own pages.

UK (uk_bulk_new-pages.csv):
- harvard referencing generator 22,200 (42), reference generator 22,200 (59), harvard citation generator 8,100 (42).
- statistics assignment help 720 (34), matlab 480 (22), mba dissertation help 390 (16), java 320 (14),
  leadership 320 (15), criminal law 260 (9), company law 210 (9), assignment help cambridge 170 (9),
  last minute assignment help 170 (22).
- Hard, skip for now: dissertation help uk 480 (52), proofreading services uk 260 (47), essay help uk 210 (68).

US (us_bulk_new-pages.csv), for the English pages only, no US targeting:
- reference generator 14,800 (82, too hard), harvard citation generator 1,600 (39), harvard referencing generator 880 (45),
  statistics assignment help 720 (22), java 320 (28), matlab 260 (31), mba dissertation help 90 (3).
- So statistics, Java, MATLAB and MBA dissertation pages get searches from both the UK and the US.

### Backlinks
Competitor backlinks are almost all spam (score 2 to 5, auto-generated sites). Do not buy or copy them.
Real links only: LinkedIn, Haraj, Business Profile, education blogs, and the GPA calculator and Harvard
generator as tools people link to.
