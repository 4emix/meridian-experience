"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "tr";

const navHrefs = ["#studio", "#expertise", "#projects", "#process", "#contact"];

export const ui = {
  en: {
    code: "en" as Lang,
    navLabels: ["Studio", "Expertise", "Projects", "Process", "Contact"],
    navHrefs,
    startProject: "START A PROJECT",
    insaat: "YAPI",

    intro: {
      pre: "FROM FLAT LINE TO",
      cta: "FORM",
      clickToBuild: "SCROLL TO BUILD",
      assembling: "RAISING STRUCTURE…",
      doneLine: "A drawing, lifted into space.",
      enter: "ENTER MERIDIAN",
      sheet: "SHEET A-01 · 1:50",
      spec: "3+1 · 122.00 m²",
    },

    hero: {
      kicker: "ARCHITECTURE · ENGINEERING · CONSTRUCTION",
      h1: { a: "We raise what", em: "others", b: "only draw." },
      paragraph:
        "Scroll, and the plan lifts off the page. MERIDIAN turns flat drawings into bright, livable structures — from the first survey line to the handed-over key.",
      explore: "EXPLORE THE STUDIO",
      strip: [
        ["EST.", "2006"],
        ["BASE", "İzmir, TR"],
        ["SCOPE", "Public & Private"],
        ["STUDIO", "4 Disciplines"],
      ],
    },

    marquee: [
      "PRECISION",
      "DAYLIGHT",
      "CRAFT",
      "ENGINEERING EXCELLENCE",
      "TRUST",
      "MODERN ARCHITECTURE",
    ],

    studio: {
      idx: "01",
      tag: "THE STUDIO",
      heading: "A single studio for the whole arc of building.",
      p1: "Since 2006, MERIDIAN has delivered bright, qualified projects across the public and private sectors on the Aegean coast. We combine aesthetics with function, and hold quality, on-time delivery, and the client relationship above everything.",
      p2: "Architecture, engineering, interiors, and ground science live under one roof — so the line you draw on day one is the line we pour, finish, and hand over.",
      cards: [
        ["Aesthetics + function", "Design philosophy"],
        ["On-time, on-quality", "Delivery promise"],
        ["Public & private", "Sectors served"],
        ["Ground to handover", "Full lifecycle"],
      ],
    },

    stats: [
      { value: 2006, prefix: "Est. ", suffix: "", label: "Founded" },
      { value: 20, prefix: "", suffix: "+", label: "Years of craft" },
      { value: 180, prefix: "", suffix: "+", label: "Projects delivered" },
      { value: 4, prefix: "", suffix: "", label: "Disciplines, one studio" },
    ],

    expertise: {
      idx: "02",
      tag: "EXPERTISE",
      headingA: "Four disciplines,",
      headingEm: "one continuous line.",
      sub: "Every project is read from the ground up — survey, design, build, finish — without handing your ambition between strangers.",
      services: [
        {
          id: "01",
          title: "Construction & Contracting",
          tag: "İNŞAAT – TAAHHÜT",
          blurb:
            "From groundbreaking to handover, we deliver turnkey structures — planning, procurement, and on-site execution managed under one accountable team.",
          points: ["Turnkey delivery", "Public & private sector", "Quality on schedule"],
        },
        {
          id: "02",
          title: "Architecture & Design",
          tag: "MİMARLIK – TASARIM",
          blurb:
            "Form follows daylight. Our architects shape bright, generous spaces — precise, buildable, and modelled around how people actually live and work.",
          points: ["Concept to permit", "Daylight-first design", "Human-centred space"],
        },
        {
          id: "03",
          title: "Interiors & Application",
          tag: "İÇ MEKAN – UYGULAMA",
          blurb:
            "The finish is the promise. We detail interiors, materials, and millwork down to the millimetre — so the space you move into matches the render you signed.",
          points: ["Material detailing", "Bespoke millwork", "Site application"],
        },
        {
          id: "04",
          title: "Survey & Soil Studies",
          tag: "ETÜT – ZEMİN RAPORLARI",
          blurb:
            "Everything begins with the ground. Our surveys and soil reports give every structure an honest foundation and a defensible engineering basis.",
          points: ["Site investigation", "Soil reports", "Engineering basis"],
        },
      ],
    },

    projects: {
      idx: "03",
      tag: "SELECTED WORK",
      headingA: "Built across",
      headingEm: "two decades.",
      lead: "Scroll → residences, campuses, and waterfront structures delivered ground-up.",
      scrollHint: "DRAG / SCROLL",
      next: "NEXT",
      buildYours: "Build yours →",
      items: [
        { id: "P-01", name: "Meridian Bayraklı Residences", type: "Residential", year: "2024", detail: "3+1 sea-view residences, three units per floor — the plan you are standing inside." },
        { id: "P-02", name: "Aegean Tech Campus — Block C", type: "Workplace", year: "2021", detail: "A daylight-driven office block for a regional technology park." },
        { id: "P-03", name: "Karşıyaka Waterfront Lofts", type: "Mixed-use", year: "2018", detail: "Ground-floor retail under bright residential lofts along the promenade." },
        { id: "P-04", name: "120-Unit Garden Cooperative", type: "Residential", year: "2014", detail: "Large-scale cooperative housing — full contracting from ground to key." },
      ],
    },

    process: {
      idx: "04",
      tag: "THE PROCESS",
      headingA: "From soil report to",
      headingEm: "handed-over key.",
      steps: [
        { n: "01", title: "Survey & Soil", text: "We read the land first — site survey, soil report, the honest constraints." },
        { n: "02", title: "Design & Permit", text: "Architecture and engineering develop in lockstep, from concept to approved drawings." },
        { n: "03", title: "Build & Contract", text: "Procurement and on-site execution under a single accountable contract." },
        { n: "04", title: "Finish & Handover", text: "We complete every interior detail, then hand you the key on schedule." },
      ],
    },

    contact: {
      idx: "05 · CONTACT",
      lineA: "Let's give it",
      lineEm: "form.",
      paragraph:
        "Tell us about the ground you want to build on. We answer fast, and we build with confidence — since 2006.",
      startProject: "Start a project",
      labels: { email: "Email", phone: "Phone", studio: "Studio", hours: "Hours" },
      hoursValue: "Mon–Fri · 09:00–18:00",
    },
  },

  tr: {
    code: "tr" as Lang,
    navLabels: ["Stüdyo", "Uzmanlık", "Projeler", "Süreç", "İletişim"],
    navHrefs,
    startProject: "PROJE BAŞLAT",
    insaat: "YAPI",

    intro: {
      pre: "DÜZ ÇİZGİDEN",
      cta: "FORMA",
      clickToBuild: "İNŞA İÇİN KAYDIR",
      assembling: "YAPI YÜKSELİYOR…",
      doneLine: "Bir çizim, mekâna yükseldi.",
      enter: "MERIDIAN'A GİR",
      sheet: "PAFTA A-01 · 1:50",
      spec: "3+1 · 122.00 m²",
    },

    hero: {
      kicker: "MİMARLIK · MÜHENDİSLİK · İNŞAAT",
      h1: { a: "Başkalarının", em: "çizdiğini", b: "biz yükseltiriz." },
      paragraph:
        "Kaydırın; plan sayfadan yükselsin. MERIDIAN, düz çizimleri aydınlık ve yaşanabilir yapılara dönüştürür — ilk etüt çizgisinden teslim anahtara.",
      explore: "STÜDYOYU KEŞFET",
      strip: [
        ["KURULUŞ", "2006"],
        ["MERKEZ", "İzmir, TR"],
        ["KAPSAM", "Kamu & Özel"],
        ["STÜDYO", "4 Disiplin"],
      ],
    },

    marquee: [
      "HASSASİYET",
      "GÜN IŞIĞI",
      "USTALIK",
      "MÜHENDİSLİK MÜKEMMELLİĞİ",
      "GÜVEN",
      "MODERN MİMARİ",
    ],

    studio: {
      idx: "01",
      tag: "STÜDYO",
      heading: "İnşanın tüm sürecini kapsayan tek bir stüdyo.",
      p1: "2006'dan bu yana MERIDIAN, Ege kıyısında kamu ve özel sektörde aydınlık ve nitelikli projeler teslim etti. Estetiği işlevle birleştirir; kaliteyi, zamanında teslimi ve müşteri ilişkisini her şeyin üstünde tutarız.",
      p2: "Mimarlık, mühendislik, iç mekan ve zemin bilimi tek çatı altında — ilk gün çizdiğiniz çizgi, döktüğümüz, bitirdiğimiz ve teslim ettiğimiz çizgidir.",
      cards: [
        ["Estetik + işlev", "Tasarım felsefesi"],
        ["Zamanında, kaliteli", "Teslim sözü"],
        ["Kamu & özel", "Hizmet sektörleri"],
        ["Temelden teslime", "Tüm yaşam döngüsü"],
      ],
    },

    stats: [
      { value: 2006, prefix: "", suffix: "", label: "Kuruluş" },
      { value: 20, prefix: "", suffix: "+", label: "Yıl ustalık" },
      { value: 180, prefix: "", suffix: "+", label: "Teslim edilen proje" },
      { value: 4, prefix: "", suffix: "", label: "Tek stüdyo, dört disiplin" },
    ],

    expertise: {
      idx: "02",
      tag: "UZMANLIK",
      headingA: "Dört disiplin,",
      headingEm: "tek bir sürekli çizgi.",
      sub: "Her proje temelden okunur — etüt, tasarım, inşa, bitiş — hayalinizi yabancılar arasında dolaştırmadan.",
      services: [
        {
          id: "01",
          title: "İnşaat & Taahhüt",
          tag: "CONSTRUCTION & CONTRACTING",
          blurb:
            "Temel atımından teslime kadar, anahtar teslim yapılar sunarız — planlama, tedarik ve saha uygulaması tek ve hesap verebilir bir ekiple yönetilir.",
          points: ["Anahtar teslim", "Kamu & özel sektör", "Zamanında kalite"],
        },
        {
          id: "02",
          title: "Mimarlık & Tasarım",
          tag: "ARCHITECTURE & DESIGN",
          blurb:
            "Form, gün ışığını izler. Mimarlarımız aydınlık ve ferah mekânlar kurgular — kesin, inşa edilebilir ve insanların gerçekten yaşayıp çalıştığı biçime göre modellenmiş.",
          points: ["Konseptten ruhsata", "Gün ışığı odaklı", "İnsan odaklı mekân"],
        },
        {
          id: "03",
          title: "İç Mekan & Uygulama",
          tag: "INTERIORS & APPLICATION",
          blurb:
            "Bitiş, verilen sözdür. İç mekanları, malzemeleri ve mobilyayı milimetrine kadar detaylandırırız — taşındığınız mekân, imzaladığınız görselle birebir olsun diye.",
          points: ["Malzeme detayı", "Özel mobilya", "Saha uygulaması"],
        },
        {
          id: "04",
          title: "Etüt & Zemin Çalışmaları",
          tag: "SURVEY & SOIL STUDIES",
          blurb:
            "Her şey zeminle başlar. Etütlerimiz ve zemin raporlarımız her yapıya dürüst bir temel ve savunulabilir bir mühendislik dayanağı verir.",
          points: ["Saha incelemesi", "Zemin raporları", "Mühendislik dayanağı"],
        },
      ],
    },

    projects: {
      idx: "03",
      tag: "SEÇİLİ İŞLER",
      headingA: "Yirmi yıla",
      headingEm: "yayılan işler.",
      lead: "Kaydır → temelden teslim edilen konutlar, kampüsler ve kıyı yapıları.",
      scrollHint: "SÜRÜKLE / KAYDIR",
      next: "SONRAKİ",
      buildYours: "Seninkini inşa et →",
      items: [
        { id: "P-01", name: "Meridian Bayraklı Konutları", type: "Konut", year: "2024", detail: "Kat başına üç daire, deniz manzaralı 3+1 konutlar — içinde durduğunuz plan." },
        { id: "P-02", name: "Ege Teknoloji Kampüsü — C Blok", type: "Ofis", year: "2021", detail: "Bölgesel bir teknoloji parkı için gün ışığı odaklı ofis bloğu." },
        { id: "P-03", name: "Karşıyaka Sahil Loftları", type: "Karma kullanım", year: "2018", detail: "Sahil yürüyüş yolunda aydınlık konut loftlarının altında zemin kat ticaret." },
        { id: "P-04", name: "120 Daireli Bahçe Kooperatifi", type: "Konut", year: "2014", detail: "Büyük ölçekli kooperatif konut — temelden anahtara tam taahhüt." },
      ],
    },

    process: {
      idx: "04",
      tag: "SÜREÇ",
      headingA: "Zemin raporundan",
      headingEm: "teslim anahtara.",
      steps: [
        { n: "01", title: "Etüt & Zemin", text: "Önce araziyi okuruz — saha etüdü, zemin raporu, dürüst kısıtlar." },
        { n: "02", title: "Tasarım & Ruhsat", text: "Mimarlık ve mühendislik, konseptten onaylı projeye birlikte ilerler." },
        { n: "03", title: "İnşa & Taahhüt", text: "Tedarik ve saha uygulaması tek ve hesap verebilir bir sözleşmeyle." },
        { n: "04", title: "Bitiş & Teslim", text: "Her iç mekan detayını tamamlar, anahtarı zamanında teslim ederiz." },
      ],
    },

    contact: {
      idx: "05 · İLETİŞİM",
      lineA: "Hadi ona",
      lineEm: "form verelim.",
      paragraph:
        "Üzerine inşa etmek istediğiniz zemini anlatın. Hızlı yanıt verir ve güvenle inşa ederiz — 2006'dan bu yana.",
      startProject: "Projeye başla",
      labels: { email: "E-posta", phone: "Telefon", studio: "Stüdyo", hours: "Saatler" },
      hoursValue: "Pzt–Cum · 09:00–18:00",
    },
  },
};

export type Dict = (typeof ui)["en"];

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      window.localStorage.getItem("meridian-lang")) as Lang | null;
    if (stored === "tr" || stored === "en") setLangState(stored);
  }, []);

  // keep <html lang> in sync so CSS text-transform uses correct Turkish casing
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("meridian-lang", l);
      document.documentElement.lang = l;
    } catch {
      /* ignore */
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  const { lang, setLang } = useContext(LanguageContext);
  return { lang, setLang, t: ui[lang] };
}
