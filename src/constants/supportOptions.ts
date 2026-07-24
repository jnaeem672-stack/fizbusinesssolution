import type { Country } from '@/types';

export const countries: Country[] = [
  { name: "Afghanistan", code: "+93" }, { name: "Albania", code: "+355" }, { name: "Algeria", code: "+213" },
  { name: "Andorra", code: "+376" }, { name: "Angola", code: "+244" }, { name: "Argentina", code: "+54" },
  { name: "Australia", code: "+61" }, { name: "Austria", code: "+43" }, { name: "Bahamas", code: "+1" },
  { name: "Bahrain", code: "+973" }, { name: "Bangladesh", code: "+880" }, { name: "Barbados", code: "+1" },
  { name: "Belgium", code: "+32" }, { name: "Belize", code: "+501" }, { name: "Brazil", code: "+55" },
  { name: "Canada", code: "+1" }, { name: "Chile", code: "+56" }, { name: "China", code: "+86" },
  { name: "Colombia", code: "+57" }, { name: "Croatia", code: "+385" }, { name: "Cyprus", code: "+357" },
  { name: "Czech Rep", code: "+420" }, { name: "Denmark", code: "+45" }, { name: "Egypt", code: "+20" },
  { name: "Finland", code: "+358" }, { name: "France", code: "+33" }, { name: "Germany", code: "+49" },
  { name: "Greece", code: "+30" }, { name: "Hong Kong", code: "+852" }, { name: "Hungary", code: "+36" },
  { name: "Iceland", code: "+354" }, { name: "India", code: "+91" }, { name: "Indonesia", code: "+62" },
  { name: "Ireland", code: "+353" }, { name: "Israel", code: "+972" }, { name: "Italy", code: "+39" },
  { name: "Japan", code: "+81" }, { name: "Jordan", code: "+962" }, { name: "Kenya", code: "+254" },
  { name: "Kuwait", code: "+965" }, { name: "Malaysia", code: "+60" }, { name: "Mexico", code: "+52" },
  { name: "Netherlands", code: "+31" }, { name: "New Zealand", code: "+64" }, { name: "Nigeria", code: "+234" },
  { name: "Norway", code: "+47" }, { name: "Oman", code: "+968" }, { name: "Pakistan", code: "+92" },
  { name: "Philippines", code: "+63" }, { name: "Poland", code: "+48" }, { name: "Portugal", code: "+351" },
  { name: "Qatar", code: "+974" }, { name: "Romania", code: "+40" }, { name: "Russia", code: "+7" },
  { name: "Saudi Arabia", code: "+966" }, { name: "Singapore", code: "+65" }, { name: "South Africa", code: "+27" },
  { name: "South Korea", code: "+82" }, { name: "Spain", code: "+34" }, { name: "Sri Lanka", code: "+94" },
  { name: "Sweden", code: "+46" }, { name: "Switzerland", code: "+41" }, { name: "Taiwan", code: "+886" },
  { name: "Thailand", code: "+66" }, { name: "Turkey", code: "+90" }, { name: "UAE", code: "+971" },
  { name: "UK", code: "+44" }, { name: "USA", code: "+1" }, { name: "Vietnam", code: "+84" },
];

export const supportTypes = [
  "Academic Writing Coaching",
  "Assessment Brief Guidance",
  "Dissertation or Research Coaching",
  "Literature Review Guidance",
  "Research Methods Tutoring",
  "Draft Review and Developmental Feedback",
  "Proofreading and Language Editing",
  "Referencing Support",
  "Data Analysis Tutoring",
  "Presentation Coaching",
  "Study Skills Support",
  "Professional Business Writing",
  "Other Ethical Learning Support",
] as const;

export type SupportType = (typeof supportTypes)[number];

export const educationLevels = [
  "College",
  "Undergraduate",
  "Postgraduate",
  "Doctoral",
  "Professional",
  "Other",
] as const;

export type EducationLevel = (typeof educationLevels)[number];

export const documentLengthOptions = [
  "Not applicable",
  "Under 1,000 words",
  "1,000–2,500 words",
  "2,501–5,000 words",
  "5,001–10,000 words",
  "More than 10,000 words",
] as const;

export const referenceOptions = [
  "Harvard", "APA", "MLA", "Chicago", "Vancouver", "Oxford", "OSCOLA", "AGLC",
  "Footnotes", "Footnotes and Bibliography", "BMJ", "MHRA", "Turabian", "ACS",
  "AMA", "IEEE", "Institution-specific", "Not applicable",
] as const;

export type ReferenceStyle = (typeof referenceOptions)[number];

export { WHATSAPP_PHONE, WHATSAPP_NUMBER, WHATSAPP_MESSAGE, WHATSAPP_URL } from './whatsapp';
