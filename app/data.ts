export type Treatment = {
  title: string;
  category: string;
  description: string;
  tag?: string;
};

export const treatments: Treatment[] = [
  {
    title: "IVF",
    category: "Assisted conception",
    description:
      "In vitro fertilisation using your own eggs or, where clinically appropriate, a donor pathway.",
    tag: "Core treatment",
  },
  {
    title: "IUI",
    category: "Assisted conception",
    description:
      "Intrauterine insemination offered after a specialist assessment of your circumstances.",
  },
  {
    title: "Surrogacy support",
    category: "Assisted conception",
    description:
      "Clinical guidance and coordinated support for intended parents exploring a surrogacy pathway.",
  },
  {
    title: "Embryo cryopreservation",
    category: "Fertility preservation",
    description:
      "Freezing and storing embryos for possible use in a future treatment cycle.",
  },
  {
    title: "Oocyte cryopreservation",
    category: "Fertility preservation",
    description:
      "Egg freezing for people considering future family building or fertility preservation.",
  },
  {
    title: "Semen freezing",
    category: "Fertility preservation",
    description:
      "Semen cryopreservation following consultation, screening and laboratory assessment.",
  },
  {
    title: "Fertility consultation",
    category: "Testing & diagnostics",
    description:
      "A confidential first conversation about your history, priorities and appropriate next steps.",
    tag: "Start here",
  },
  {
    title: "Ultrasound scans",
    category: "Testing & diagnostics",
    description:
      "Clinical ultrasound assessment and treatment monitoring as directed by your care team.",
  },
  {
    title: "Semen analysis",
    category: "Testing & diagnostics",
    description:
      "Laboratory assessment that can help your specialist understand key male fertility factors.",
  },
  {
    title: "Pregnancy testing",
    category: "Testing & diagnostics",
    description:
      "Timely pregnancy testing with clear guidance about results and the appropriate follow-up.",
  },
  {
    title: "Surgical sperm collection",
    category: "Specialist procedures",
    description:
      "Specialist sperm retrieval pathways, including TESA or PESA where clinically indicated.",
  },
  {
    title: "Ovarian rejuvenation",
    category: "Specialist procedures",
    description:
      "A specialist-led option that requires individual assessment, evidence review and informed consent.",
  },
  {
    title: "Endometrial rejuvenation",
    category: "Specialist procedures",
    description:
      "A carefully assessed pathway for selected patients, discussed transparently with a specialist.",
  },
  {
    title: "Cyst drainage",
    category: "Specialist procedures",
    description:
      "A minimally invasive service offered only after appropriate clinical investigation.",
  },
  {
    title: "Ascites drainage",
    category: "Specialist procedures",
    description:
      "Clinically supervised fluid drainage and follow-up for patients who require it.",
  },
  {
    title: "Fertility counselling",
    category: "Support & access",
    description:
      "Confidential emotional support for individuals and couples at any stage of treatment.",
  },
  {
    title: "Online consultation",
    category: "Support & access",
    description:
      "A convenient first or follow-up conversation when an in-person visit is not necessary.",
  },
];

export const treatmentSlug = (title: string) =>
  title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const team = [
  {
    name: "Prof. Adewunmi Adeniyi",
    role: "Head, Institute of Fertility Medicine",
    detail: "Department of Obstetrics and Gynaecology, LASUTH",
    image: "/images/prof-adewunmi-adeniyi.webp",
  },
  {
    name: "Dr. (Mrs.) Ottun Abimbola T.",
    role: "Consultant Obstetrician & Gynaecologist",
    detail: "Department of Obstetrics and Gynaecology, LASUTH",
    image: "/images/dr-ottun-abimbola.webp",
  },
  {
    name: "Dr. Adegoke",
    role: "Fertility Specialist",
    detail: "Clinical fertility care",
    image: "/images/dr-adegoke.webp",
  },
  {
    name: "Dr. Alausa",
    role: "Fertility Specialist",
    detail: "Clinical fertility care",
    image: "/images/dr-alausa.webp",
  },
  {
    name: "Mrs. Awopetu Esther O.",
    role: "Head of Fertility Nursing",
    detail: "Patient care and treatment coordination",
    image: "/images/mrs-awopetu-esther.webp",
  },
  {
    name: "Mrs Olaniyi",
    role: "Fertility Nurse",
    detail: "Patient care and nursing support",
    image: "/images/mrs-olaniyi.webp",
  },
  {
    name: "Mrs. Sholesi",
    role: "Head of Embryology",
    detail: "Embryology and laboratory services",
    image: "/images/mrs-sholesi.webp",
  },
];

export const faqs = [
  {
    question: "How do I begin my fertility journey with Kindred Path?",
    answer:
      "Begin with a confidential consultation. Your specialist will listen to your history, discuss your goals and explain which assessments or next steps may be appropriate. You do not need to know which treatment you need before booking.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Bring a valid form of identification and any relevant test results, scan reports, medication lists or treatment records you already have. If you do not have previous records, you can still attend your consultation.",
  },
  {
    question: "Do you support male fertility concerns?",
    answer:
      "Yes. The centre lists semen analysis, semen freezing and specialist sperm collection among its services. A consultation helps determine the most appropriate assessment for each person or couple.",
  },
  {
    question: "Can I speak with a specialist online?",
    answer:
      "Online consultations are available for suitable first conversations and follow-ups. The team will advise if an in-person examination, scan or test is required.",
  },
  {
    question: "How long does an IVF cycle take?",
    answer:
      "A treatment cycle often takes several weeks, but timing varies according to your protocol, response and whether additional testing or preparation is needed. Your care team will give you a personalised timeline.",
  },
  {
    question: "Can a website success rate predict my result?",
    answer:
      "No single percentage can predict an individual outcome. Age, diagnosis, previous treatment and other factors matter. Kindred Path will discuss your circumstances during consultation rather than using unsupported headline figures.",
  },
];

export const contact = {
  phoneDisplay: "+234 913 234 7955",
  phoneHref: "+2349132347955",
  whatsapp: "2349132347955",
  email: "Kindredpathifm@gmail.com",
  address: "1-5 Oba Akinjobi Way, Ikeja, Lagos",
  hours: "Monday to Friday, 8:00 AM to 4:00 PM",
  instagram: "https://www.instagram.com/kindredpathfertilitycentre/",
  facebook: "https://www.facebook.com/61584595919415/",
  linkedin: "https://www.linkedin.com/company/kindred-path-fertility-centre/",
};
