// MERIDIAN — fictional construction & architecture studio. All copy original.

export const company = {
  name: "MERIDIAN",
  legal: "Meridian Yapı İnşaat & Mimarlık A.Ş.",
  founded: 2006,
  city: "İzmir",
  tagline: "We raise what others only imagine.",
  taglineTr: "Başkalarının hayal ettiğini biz yükseltiriz.",
  phone: "+90 (232) 461 20 50",
  phoneHref: "+902324612050",
  email: "studio@meridianyapi.com",
  address: "Mimar Kemalettin Mah. Gazi Blv. No:84/4 Konak / İzmir",
};

export const heroWords = {
  pre: "FROM FLAT LINE TO",
  cta: "FORM",
};

export const stats = [
  { value: 2006, label: "Founded", suffix: "", prefix: "Est. " },
  { value: 20, label: "Years of craft", suffix: "+" },
  { value: 180, label: "Projects delivered", suffix: "+" },
  { value: 4, label: "Disciplines, one studio", suffix: "" },
];

export const services = [
  {
    id: "01",
    title: "Construction & Contracting",
    titleTr: "İnşaat – Taahhüt",
    blurb:
      "From groundbreaking to handover, we deliver turnkey structures — planning, procurement, and on-site execution managed under one accountable team.",
    points: ["Turnkey delivery", "Public & private sector", "Quality on schedule"],
  },
  {
    id: "02",
    title: "Architecture & Design",
    titleTr: "Mimarlık – Tasarım",
    blurb:
      "Form follows daylight. Our architects shape bright, generous spaces — precise, buildable, and modelled around how people actually live and work.",
    points: ["Concept to permit", "Daylight-first design", "Human-centred space"],
  },
  {
    id: "03",
    title: "Interiors & Application",
    titleTr: "İç Mekan – Uygulama",
    blurb:
      "The finish is the promise. We detail interiors, materials, and millwork down to the millimetre — so the space you move into matches the render you signed.",
    points: ["Material detailing", "Bespoke millwork", "Site application"],
  },
  {
    id: "04",
    title: "Survey & Soil Studies",
    titleTr: "Etüt – Zemin Raporları",
    blurb:
      "Everything begins with the ground. Our surveys and soil reports give every structure an honest foundation and a defensible engineering basis.",
    points: ["Site investigation", "Soil reports", "Engineering basis"],
  },
];

export const projects = [
  {
    id: "P-01",
    name: "Meridian Bayraklı Residences",
    type: "Residential",
    year: "2024",
    detail: "3+1 sea-view residences, three units per floor — the plan you are standing inside.",
  },
  {
    id: "P-02",
    name: "Aegean Tech Campus — Block C",
    type: "Workplace",
    year: "2021",
    detail: "A daylight-driven office block for a regional technology park.",
  },
  {
    id: "P-03",
    name: "Karşıyaka Waterfront Lofts",
    type: "Mixed-use",
    year: "2018",
    detail: "Ground-floor retail under bright residential lofts along the promenade.",
  },
  {
    id: "P-04",
    name: "120-Unit Garden Cooperative",
    type: "Residential",
    year: "2014",
    detail: "Large-scale cooperative housing — full contracting from ground to key.",
  },
];

export const process = [
  { n: "01", title: "Survey & Soil", text: "We read the land first — site survey, soil report, the honest constraints." },
  { n: "02", title: "Design & Permit", text: "Architecture and engineering develop in lockstep, from concept to approved drawings." },
  { n: "03", title: "Build & Contract", text: "Procurement and on-site execution under a single accountable contract." },
  { n: "04", title: "Finish & Handover", text: "We complete every interior detail, then hand you the key on schedule." },
];

// Floor plan — a 3+1 residence. Units are abstract grid units.
// Origin top-left. Each room: x, y, w, h (footprint) + label + area.
export const planUnits = { w: 86, h: 104 };
export const rooms = [
  { id: "balkon-t", label: "Balcony", area: "4.59", x: 28, y: 4, w: 14, h: 12, kind: "balcony" },
  { id: "yatak", label: "Master", area: "17.97", x: 42, y: 4, w: 26, h: 18, kind: "bed" },
  { id: "dus", label: "Shower", area: "2.42", x: 44, y: 22, w: 9, h: 8, kind: "wet" },
  { id: "giyinme", label: "Wardrobe", area: "3.38", x: 56, y: 22, w: 12, h: 9, kind: "dress" },
  { id: "oda-1", label: "Room", area: "10.03", x: 18, y: 22, w: 22, h: 16, kind: "bed" },
  { id: "banyo", label: "Bath", area: "3.97", x: 44, y: 30, w: 12, h: 9, kind: "wet" },
  { id: "hol", label: "Hall", area: "6.26", x: 36, y: 39, w: 10, h: 14, kind: "hall" },
  { id: "oda-2", label: "Room", area: "10.03", x: 18, y: 40, w: 22, h: 16, kind: "bed" },
  { id: "utu", label: "Utility", area: "2.80", x: 46, y: 39, w: 10, h: 9, kind: "wet" },
  { id: "antre", label: "Entry", area: "10.02", x: 50, y: 39, w: 18, h: 17, kind: "hall" },
  { id: "oturma", label: "Living", area: "16.64", x: 16, y: 60, w: 22, h: 22, kind: "living" },
  { id: "mutfak", label: "Kitchen", area: "14.50", x: 38, y: 60, w: 18, h: 22, kind: "kitchen" },
  { id: "salon", label: "Lounge", area: "30.00", x: 50, y: 56, w: 30, h: 30, kind: "living" },
  { id: "balkon-b", label: "Terrace", area: "18.48", x: 16, y: 84, w: 38, h: 14, kind: "balcony" },
];

export const nav = [
  { label: "Studio", href: "#studio" },
  { label: "Expertise", href: "#expertise" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];
