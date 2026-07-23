export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  number: string;
  tag: string;
  title: string;
  excerpt: string;
  read: string;
  description: string;
  keywords: string[];
  sections: ContentSection[];
  sources: { label: string; url: string }[];
};

export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  read: string;
  description: string;
  keywords: string[];
  sections: ContentSection[];
  faq: { question: string; answer: string }[];
  sources: { label: string; url: string }[];
};

export type TreatmentDetail = {
  slug: string;
  overview: string;
  consideredFor: string[];
  steps: { title: string; copy: string }[];
  questions: string[];
};

export const treatmentDetails: TreatmentDetail[] = [
  {
    slug: "ivf",
    overview: "In vitro fertilisation, usually called IVF, is an assisted-conception treatment in which eggs are collected and fertilised with sperm in a laboratory. An embryo may then be transferred to the uterus. The medicines, timing and laboratory approach are personalised after assessment.",
    consideredFor: ["Blocked or damaged fallopian tubes", "Some male-factor fertility concerns", "Ovulation, endometriosis or unexplained fertility difficulties", "When another appropriate treatment has not worked", "Family-building pathways involving donor eggs or sperm"],
    steps: [{ title: "Plan", copy: "Review your history, tests and a treatment protocol with the clinical team." }, { title: "Stimulate and monitor", copy: "Medication supports egg development while scans and tests monitor response." }, { title: "Collect and fertilise", copy: "Egg collection and laboratory fertilisation are followed by embryo development." }, { title: "Transfer and follow up", copy: "A suitable embryo may be transferred, followed by planned testing and support." }],
    questions: ["Why is IVF being recommended for me?", "Which costs are included and which may be additional?", "What are the risks and alternatives in my case?", "How will embryos be stored or handled?"],
  },
  {
    slug: "iui",
    overview: "Intrauterine insemination, or IUI, places prepared sperm directly into the uterus around ovulation. It is less invasive than IVF, but it is only suitable when clinical assessment suggests that it offers a reasonable pathway.",
    consideredFor: ["Selected ovulation difficulties", "Use of donor sperm", "Some cervical or ejaculation-related concerns", "Unexplained infertility in selected circumstances", "Cases where the fallopian tubes are open and sperm factors are suitable"],
    steps: [{ title: "Assess suitability", copy: "Review ovulation, fallopian-tube and semen factors before deciding." }, { title: "Track ovulation", copy: "A natural or medication-supported cycle may be monitored." }, { title: "Prepare the sample", copy: "The laboratory prepares a concentrated sample for insemination." }, { title: "Inseminate and follow up", copy: "The sample is placed in the uterus, followed by clear testing guidance." }],
    questions: ["What makes IUI suitable in my situation?", "Would medication be part of my cycle?", "When would IVF be considered instead?", "What should I expect after the procedure?"],
  },
  {
    slug: "surrogacy-support",
    overview: "A surrogacy pathway can involve medical, emotional and legal decisions for intended parents and the surrogate. Kindred Path lists surrogacy support among its services and begins with a private consultation to understand the proposed pathway and coordinate appropriate professional guidance.",
    consideredFor: ["A medical reason pregnancy cannot safely be carried", "Absence or significant abnormality of the uterus", "Repeated treatment or pregnancy challenges where a specialist recommends discussion", "Other family-building circumstances requiring a gestational carrier"],
    steps: [{ title: "Initial consultation", copy: "Discuss medical history, family-building goals and the proposed arrangement." }, { title: "Independent guidance", copy: "Clinical, counselling and legal considerations should be addressed separately and clearly." }, { title: "Screening and planning", copy: "All parties require appropriate assessment and informed consent." }, { title: "Coordinated treatment", copy: "The clinical pathway is planned only after the required safeguards are in place." }],
    questions: ["Which legal advice should each party obtain?", "What screening and counselling are required?", "How are consent and confidentiality protected?", "What costs and responsibilities should be clarified?"],
  },
  {
    slug: "embryo-cryopreservation",
    overview: "Embryo cryopreservation involves freezing embryos for possible use in a future treatment cycle. It may be part of IVF when suitable embryos remain after transfer, or part of a planned fertility-preservation pathway.",
    consideredFor: ["Storing suitable embryos after an IVF cycle", "Delaying embryo transfer for a clinical reason", "Planning treatment before fertility-affecting medical care", "Building options for a future sibling cycle"],
    steps: [{ title: "Create embryos", copy: "Eggs are fertilised as part of an IVF or related treatment pathway." }, { title: "Assess development", copy: "The embryology team observes development and identifies embryos suitable for freezing." }, { title: "Freeze and store", copy: "Suitable embryos are cryopreserved under agreed consent and storage arrangements." }, { title: "Plan future use", copy: "A later frozen-embryo cycle is planned after clinical review." }],
    questions: ["Which embryos are suitable for freezing?", "What are the storage terms and ongoing fees?", "What consent decisions are required?", "What happens if our circumstances change?"],
  },
  {
    slug: "oocyte-cryopreservation",
    overview: "Oocyte cryopreservation, commonly called egg freezing, involves stimulating the ovaries, collecting eggs and freezing mature eggs for possible future use. It preserves an option; it does not guarantee a future pregnancy or baby.",
    consideredFor: ["A medical treatment may affect future fertility", "Family building is being postponed", "A person wants to preserve unfertilised eggs", "A specialist recommends preservation before another procedure"],
    steps: [{ title: "Consult and assess", copy: "Discuss goals, ovarian-reserve information, timing and realistic limitations." }, { title: "Stimulate and monitor", copy: "Medication supports egg development while response is monitored." }, { title: "Collect eggs", copy: "Egg collection is performed after final preparation." }, { title: "Freeze and store", copy: "Mature eggs are cryopreserved under agreed storage and consent terms." }],
    questions: ["How does my age affect the discussion?", "How many cycles might be considered?", "What are the medication and procedure risks?", "What are the storage rules and future-use costs?"],
  },
  {
    slug: "semen-freezing",
    overview: "Semen freezing stores sperm for possible future fertility treatment. It may be considered before medical treatment, before a procedure that could affect fertility, or when future sample availability may be uncertain.",
    consideredFor: ["Before chemotherapy, radiotherapy or selected surgery", "Before fertility-affecting occupational or medical exposure", "When a partner may be unavailable during treatment", "Before surgical sperm collection in selected pathways"],
    steps: [{ title: "Consultation", copy: "Review why storage is being considered and how samples may be used." }, { title: "Screen and collect", copy: "Complete required screening and provide a sample using laboratory instructions." }, { title: "Analyse and freeze", copy: "The sample is assessed, divided where appropriate and cryopreserved." }, { title: "Storage consent", copy: "Confirm storage duration, fees, contact responsibilities and future decisions." }],
    questions: ["How many samples should be stored?", "What screening is required?", "What happens when storage consent expires?", "How might the sample be used later?"],
  },
  {
    slug: "fertility-consultation",
    overview: "A fertility consultation is the best starting point when you are unsure which test or treatment you need. It is a structured, confidential conversation about your history, goals, previous results and possible next steps.",
    consideredFor: ["Trying to conceive without success", "Irregular cycles or known reproductive-health concerns", "Previous miscarriage or unsuccessful fertility treatment", "Male fertility questions", "Planning fertility preservation or seeking a second opinion"],
    steps: [{ title: "Prepare", copy: "Bring relevant results, medication lists and questions if you have them." }, { title: "Share your history", copy: "Discuss both partners where relevant, without blame or assumptions." }, { title: "Identify useful tests", copy: "The specialist recommends only assessments that answer a clear question." }, { title: "Agree next steps", copy: "Leave with a clearer plan, including alternatives and timing." }],
    questions: ["What information should I bring?", "Which tests are genuinely needed first?", "Can both partners be assessed together?", "What decisions do I need to make today, and what can wait?"],
  },
  {
    slug: "ultrasound-scans",
    overview: "Ultrasound scans can help assess reproductive anatomy, monitor follicle development and follow selected stages of fertility treatment. The type and timing of scan depend on the clinical question being asked.",
    consideredFor: ["Assessment of ovaries and uterus", "Monitoring ovulation or response to medication", "Treatment-cycle monitoring", "Checking the uterine lining", "Pregnancy follow-up when clinically appropriate"],
    steps: [{ title: "Clarify the reason", copy: "Your clinician explains what the scan is intended to assess." }, { title: "Prepare", copy: "Follow instructions about timing, bladder preparation or medication." }, { title: "Complete the scan", copy: "A trained professional performs the appropriate ultrasound examination." }, { title: "Review findings", copy: "Results are interpreted alongside history, tests and treatment stage." }],
    questions: ["What type of scan will I have?", "How should I prepare?", "Who will explain the findings?", "Will I need a repeat scan?"],
  },
  {
    slug: "semen-analysis",
    overview: "Semen analysis is a core part of male fertility assessment. A laboratory examines characteristics such as semen volume, sperm concentration, movement and shape. One result is not always the whole story, and repeat testing may be recommended.",
    consideredFor: ["A couple has been trying to conceive", "Previous fertility treatment has not worked", "A history may affect sperm production or delivery", "Fertility preservation is being considered", "A specialist needs baseline information before treatment"],
    steps: [{ title: "Receive instructions", copy: "Follow the laboratory’s collection and abstinence guidance carefully." }, { title: "Provide the sample", copy: "Collect the sample privately using the method and timing provided." }, { title: "Laboratory assessment", copy: "The sample is assessed against several parameters." }, { title: "Clinical interpretation", copy: "A specialist explains the result in context and whether another test is useful." }],
    questions: ["How should I prepare for the test?", "Could illness or medication affect the result?", "Will the test need to be repeated?", "When is specialist male-fertility review recommended?"],
  },
  {
    slug: "pregnancy-testing",
    overview: "Pregnancy testing after fertility treatment is carefully timed because testing too early can produce confusing results. The care team provides a specific test date and explains what happens after either a positive or negative result.",
    consideredFor: ["After embryo transfer", "After IUI", "When blood testing is clinically preferred", "When follow-up is needed after an uncertain home-test result"],
    steps: [{ title: "Wait for the advised date", copy: "Follow the testing schedule even when waiting feels difficult." }, { title: "Complete the test", copy: "Use the method recommended by the clinical team." }, { title: "Share the result", copy: "Contact the team as instructed rather than changing medicines yourself." }, { title: "Plan follow-up", copy: "The next step may involve repeat testing, a scan or a review conversation." }],
    questions: ["Exactly when should I test?", "Should I continue my medicines?", "What happens after a positive result?", "What support is available after a negative result?"],
  },
  {
    slug: "surgical-sperm-collection",
    overview: "Surgical sperm collection refers to specialist procedures used to retrieve sperm directly from the reproductive tract when sperm are not present in an ejaculated sample or cannot be obtained in the usual way. TESA and PESA are examples.",
    consideredFor: ["Obstructive azoospermia", "Selected non-obstructive sperm-production concerns", "Previous vasectomy in some circumstances", "Ejaculation difficulties", "A coordinated IVF/ICSI treatment plan"],
    steps: [{ title: "Specialist assessment", copy: "Clarify the likely cause and whether retrieval is appropriate." }, { title: "Coordinate treatment", copy: "Plan timing with the embryology and assisted-conception pathway." }, { title: "Perform retrieval", copy: "The selected technique is carried out with appropriate anaesthesia and consent." }, { title: "Laboratory use or storage", copy: "Retrieved sperm may be assessed for treatment or freezing." }],
    questions: ["Which retrieval method is being recommended?", "What are the risks and recovery expectations?", "Will sperm be frozen before the partner’s cycle?", "What happens if no suitable sperm are retrieved?"],
  },
  {
    slug: "ovarian-rejuvenation",
    overview: "“Ovarian rejuvenation” is a term used for emerging interventions promoted for ovarian function or response. Evidence and protocols can vary. It should never be presented as guaranteed, routine or suitable without a careful specialist discussion of uncertainty, alternatives and cost.",
    consideredFor: ["Only after an individual specialist assessment", "When established options and realistic expectations have been discussed", "When the exact intervention, evidence and risks are explained", "When informed consent addresses the experimental or evolving nature of the approach"],
    steps: [{ title: "Define the intervention", copy: "Ask exactly what procedure or product the term refers to." }, { title: "Review evidence", copy: "Discuss the quality of evidence for your specific circumstances." }, { title: "Compare alternatives", copy: "Understand established options, no-treatment choices and financial implications." }, { title: "Document consent", copy: "Proceed only after risks, uncertainty and follow-up are clearly agreed." }],
    questions: ["Is this established, experimental or an add-on?", "What outcome is it intended to change?", "What evidence applies to people like me?", "What are the risks, alternatives and complete costs?"],
  },
  {
    slug: "endometrial-rejuvenation",
    overview: "“Endometrial rejuvenation” can describe different proposed interventions involving the uterine lining. Because terminology and evidence vary, the exact method, intended benefit, alternatives and uncertainties must be explained before any decision.",
    consideredFor: ["Only after assessment of the uterine cavity and lining", "When the proposed intervention is named precisely", "When standard management options have been considered", "When evidence limitations and costs are transparent"],
    steps: [{ title: "Investigate first", copy: "Assess relevant uterine, hormonal and treatment factors." }, { title: "Name the proposed method", copy: "Avoid making a decision based on a marketing term alone." }, { title: "Review evidence and alternatives", copy: "Ask how the intervention compares with standard care or waiting." }, { title: "Make an informed decision", copy: "Consent should cover uncertainty, risks, costs and follow-up." }],
    questions: ["What exactly will be done?", "Which finding is the treatment addressing?", "Is there evidence of improved live-birth outcomes?", "What are the alternatives and total costs?"],
  },
  {
    slug: "cyst-drainage",
    overview: "Cyst drainage removes fluid from a selected cyst using an image-guided or clinically appropriate technique. Not every ovarian or pelvic cyst should be drained; the underlying diagnosis, symptoms, size and recurrence risk guide management.",
    consideredFor: ["A cyst has been assessed by an appropriate clinician", "Symptoms or treatment timing require active management", "Imaging supports the proposed approach", "The benefits and recurrence possibility have been discussed"],
    steps: [{ title: "Assess the cyst", copy: "Review imaging, symptoms and the likely type of cyst." }, { title: "Discuss options", copy: "Compare observation, drainage, surgery or other management." }, { title: "Perform the procedure", copy: "Use the planned image guidance, pain control and safety process." }, { title: "Follow up", copy: "Review symptoms, findings and whether further care is needed." }],
    questions: ["What type of cyst is suspected?", "Why drainage instead of observation or surgery?", "How likely is recurrence?", "Could this affect fertility treatment timing?"],
  },
  {
    slug: "ascites-drainage",
    overview: "Ascites drainage removes excess fluid from the abdomen when clinically indicated. It is a medical procedure, not a routine fertility treatment, and requires assessment of the cause, symptoms and safest setting for care.",
    consideredFor: ["A clinician has confirmed abdominal fluid accumulation", "Symptoms or clinical findings justify drainage", "The cause and required monitoring are being investigated", "Appropriate aftercare and escalation plans are available"],
    steps: [{ title: "Clinical assessment", copy: "Confirm symptoms, fluid and the likely underlying cause." }, { title: "Plan safely", copy: "Review tests, medication, bleeding risk and the care setting." }, { title: "Drain and monitor", copy: "The procedure is performed with appropriate observation." }, { title: "Treat the cause", copy: "Follow-up focuses on why fluid accumulated and whether it may recur." }],
    questions: ["What is causing the fluid?", "Where should the procedure be performed?", "What symptoms require urgent help afterwards?", "What follow-up treatment is needed?"],
  },
  {
    slug: "fertility-counselling",
    overview: "Fertility counselling offers confidential emotional support before, during or after fertility assessment and treatment. It can help individuals and couples process uncertainty, grief, difficult decisions and the effect of treatment on relationships and daily life.",
    consideredFor: ["Preparing for assisted conception", "Managing anxiety, loss or treatment fatigue", "Considering donor, surrogacy or preservation pathways", "Navigating decisions as a couple", "Seeking support after an unsuccessful cycle"],
    steps: [{ title: "Choose the focus", copy: "Identify what feels most difficult or important right now." }, { title: "Talk confidentially", copy: "Explore emotions and decisions without pressure or judgement." }, { title: "Build practical supports", copy: "Develop communication, coping and boundary-setting strategies." }, { title: "Review as needed", copy: "Use one session or ongoing support depending on your needs." }],
    questions: ["Is counselling confidential?", "Can partners attend together or separately?", "Is support available before and after treatment?", "How is counselling coordinated with clinical care?"],
  },
  {
    slug: "online-consultation",
    overview: "An online fertility consultation provides a convenient way to discuss concerns, review existing records or plan next steps when a physical examination or scan is not immediately required.",
    consideredFor: ["A first conversation before travelling", "Reviewing existing test results", "Selected follow-up appointments", "People living outside Lagos or abroad", "Questions that do not require an examination"],
    steps: [{ title: "Request a time", copy: "Share your contact details and a suitable appointment preference." }, { title: "Prepare records", copy: "Have relevant results, medication names and questions ready." }, { title: "Join privately", copy: "Use a stable connection and a confidential space." }, { title: "Plan in-person care", copy: "The clinician explains if examination, scans or tests are needed next." }],
    questions: ["Is an online consultation suitable for my concern?", "How should records be shared securely?", "What platform will be used?", "When will I need to attend in person?"],
  },
];

export const guides: Guide[] = [
  {
    slug: "first-fertility-consultation",
    number: "01",
    tag: "Getting started",
    title: "Your first fertility consultation",
    excerpt: "What to bring, what you may be asked and how to prepare without feeling overwhelmed.",
    read: "6 min",
    description: "Prepare for your first fertility consultation in Lagos with a practical checklist of records, questions and what to expect.",
    keywords: ["first fertility consultation Lagos", "fertility appointment checklist", "fertility specialist Ikeja"],
    sections: [
      { heading: "You do not need to arrive with a diagnosis", paragraphs: ["A first fertility consultation is meant to organise the story, not test whether you already understand medical language. The clinician will usually ask how long you have been trying, whether cycles are regular, whether either partner has conceived before, and whether there are previous tests, operations, infections, medicines or treatments that may matter.", "Where two partners are involved, both histories are useful. Fertility should not automatically be treated as only a woman’s concern. The goal is to identify which questions need answering first and avoid unnecessary testing."] },
      { heading: "What to bring", paragraphs: ["Bring whatever you already have; missing paperwork should not prevent you from attending."], bullets: ["Previous scan, blood-test or semen-analysis reports", "A list of current medicines and supplements", "Dates and brief details of previous pregnancies or fertility treatment", "Information about cycle timing, if known", "Identification and practical questions about cost or appointment timing"] },
      { heading: "Questions worth asking", paragraphs: ["Useful questions include: What are the main possibilities you are considering? Which tests would change the plan? Should both partners be assessed now? What can we do first, and what can wait? What are the full costs of the next stage? A good consultation should leave you with a clearer plan, even if the final diagnosis is not yet known."] },
      { heading: "When to seek help sooner", paragraphs: ["Many definitions use 12 months of regular unprotected intercourse, but age and medical history change when it is sensible to seek advice. Earlier assessment may be appropriate for people aged 35 or older, very irregular or absent periods, previous pelvic surgery, known endometriosis, recurrent pregnancy loss, cancer treatment, sexual or ejaculation difficulties, or known male reproductive concerns."] },
    ],
    sources: [{ label: "WHO infertility fact sheet", url: "https://www.who.int/news-room/fact-sheets/detail/infertility" }, { label: "CDC infertility FAQs", url: "https://www.cdc.gov/reproductive-health/infertility-faq/index.html" }],
  },
  {
    slug: "ivf-explained",
    number: "02",
    tag: "Treatment",
    title: "IVF, explained in plain language",
    excerpt: "A clear guide to stimulation, egg collection, fertilisation, embryo development and transfer.",
    read: "8 min",
    description: "Understand the IVF process step by step, including preparation, stimulation, egg collection, fertilisation and embryo transfer.",
    keywords: ["IVF process in Nigeria", "IVF treatment Lagos", "how IVF works"],
    sections: [
      { heading: "What IVF means", paragraphs: ["IVF stands for in vitro fertilisation. Eggs are collected from the ovaries and fertilised with sperm in a laboratory. An embryo may then be transferred to the uterus. IVF is not a single appointment; it is a sequence of clinical and laboratory stages planned around the person receiving treatment."] },
      { heading: "The main stages", paragraphs: ["Protocols vary, but most IVF journeys include preparation, ovarian stimulation, monitoring, egg collection, laboratory fertilisation, embryo development and either embryo transfer or freezing. Medication supports several eggs to develop. Scans and sometimes blood tests help the team understand response and choose safe timing."], bullets: ["Pre-treatment review and consent", "Medication and monitoring", "Egg collection and semen preparation", "Fertilisation and embryo observation", "Transfer, freezing or another agreed next step", "Pregnancy testing on the advised date"] },
      { heading: "Questions behind a personalised protocol", paragraphs: ["Age, ovarian reserve information, semen factors, previous response, diagnosis and safety risks can affect the plan. Ask why a particular medication dose, fertilisation method or transfer approach is recommended. Add-ons should be named precisely, supported with evidence relevant to your circumstances and discussed separately from core treatment."] },
      { heading: "What IVF cannot promise", paragraphs: ["IVF can create a pathway where natural conception is difficult, but it cannot guarantee eggs, fertilisation, suitable embryos, implantation or birth. Success figures need a denominator, an age group, a treatment type and a time period to mean anything. Your own prognosis needs an individual conversation."] },
    ],
    sources: [{ label: "HFEA guide to IVF", url: "https://www.hfea.gov.uk/treatments/explore-all-treatments/in-vitro-fertilisation-ivf/" }, { label: "NHS IVF overview", url: "https://www.nhs.uk/tests-and-treatments/ivf/" }],
  },
  {
    slug: "fertility-assessment-for-both-partners",
    number: "03",
    tag: "Male fertility",
    title: "Why fertility assessment involves both partners",
    excerpt: "Why a fair, efficient fertility evaluation should not focus on one person alone.",
    read: "6 min",
    description: "Learn why fertility assessment should involve both partners and what a semen analysis can and cannot explain.",
    keywords: ["male fertility test Lagos", "semen analysis Ikeja", "couple fertility assessment Nigeria"],
    sections: [
      { heading: "Fertility is a shared health question", paragraphs: ["Infertility may relate to male factors, female factors, a combination or remain unexplained after standard assessment. Beginning with both partners where relevant can reduce delays, repeated appointments and the emotional burden created when one person is assumed to be responsible."] },
      { heading: "What male assessment may include", paragraphs: ["A history can cover previous pregnancies, childhood or adult illness, surgery, infections, medicines, heat or occupational exposure, sexual function and lifestyle. Semen analysis commonly evaluates volume, sperm concentration, movement and shape. Results vary, so a repeat sample or specialist review may be useful."], bullets: ["Follow collection and abstinence instructions", "Tell the clinician about recent fever or illness", "Do not interpret one number in isolation", "Ask when urology or hormonal assessment is appropriate"] },
      { heading: "What the other partner may be asked", paragraphs: ["Assessment may consider cycle regularity, ovulation, ovarian reserve, the uterus, fallopian tubes, previous pregnancies, pain, surgery and medical conditions. Testing should answer a clear clinical question rather than become a long, expensive checklist."] },
      { heading: "A better consultation culture", paragraphs: ["Good fertility care avoids blame. It gives each person privacy when needed, explains what results do and do not show, and brings findings together before recommending treatment. Couples may receive results differently; counselling can help when communication becomes difficult."] },
    ],
    sources: [{ label: "AUA/ASRM male infertility guideline", url: "https://www.asrm.org/practice-guidance/practice-committee-documents/diagnosis-and-treatment-of-infertility-in-men-auaasrm-guideline-part-i-2020/" }, { label: "WHO infertility overview", url: "https://www.who.int/health-topics/infertility" }],
  },
  {
    slug: "thinking-about-future-fertility",
    number: "04",
    tag: "Preservation",
    title: "Thinking about future fertility",
    excerpt: "Questions to discuss when considering egg, embryo or semen freezing for the future.",
    read: "7 min",
    description: "A practical fertility preservation guide covering egg freezing, embryo freezing and semen freezing in Nigeria.",
    keywords: ["egg freezing Lagos", "fertility preservation Nigeria", "semen freezing Lagos"],
    sections: [
      { heading: "Preserving an option, not guaranteeing an outcome", paragraphs: ["Fertility preservation stores eggs, sperm or embryos for possible future treatment. The right option depends on the reason for preservation, age and health factors, relationship and consent circumstances, timing, cost and how the material may be used later."] },
      { heading: "Eggs, embryos and sperm are different decisions", paragraphs: ["Egg freezing keeps eggs unfertilised and may suit people who are not ready to create embryos. Embryo freezing follows fertilisation and therefore raises shared-consent decisions where sperm from a partner or donor is involved. Semen freezing is simpler physically but still requires screening, storage and future-use consent."], bullets: ["Ask what medical testing is required", "Understand storage duration and recurring fees", "Discuss what happens if contact details or relationships change", "Ask how many cycles or samples may be considered", "Review the process required to use stored material later"] },
      { heading: "Timing matters", paragraphs: ["Age at egg freezing can affect the chance that frozen eggs eventually result in a birth, but no age or number of eggs creates certainty. Medical treatment that may affect fertility can create urgent timelines, so early referral is valuable. Semen preservation may also need to happen before treatment begins."] },
      { heading: "Consent should cover the future", paragraphs: ["Consent is not only permission to freeze. It should address storage, future treatment, donation or disposal options, incapacity or death, payment responsibilities and how the clinic will contact you. Ask for copies and update the clinic when circumstances change."] },
    ],
    sources: [{ label: "HFEA egg freezing guide", url: "https://www.hfea.gov.uk/treatments/fertility-preservation/egg-freezing/" }, { label: "HFEA embryo freezing guide", url: "https://www.hfea.gov.uk/treatments/fertility-preservation/embryo-freezing/" }],
  },
  {
    slug: "emotional-wellbeing-during-fertility-treatment",
    number: "05",
    tag: "Emotional support",
    title: "Caring for yourself during fertility treatment",
    excerpt: "Practical support, communication and boundaries for emotionally demanding stages.",
    read: "7 min",
    description: "Practical emotional wellbeing guidance for individuals and couples going through fertility tests or IVF treatment.",
    keywords: ["fertility counselling Lagos", "IVF emotional support Nigeria", "coping with fertility treatment"],
    sections: [
      { heading: "Treatment can occupy more than the calendar", paragraphs: ["Appointments, medication, waiting, cost and uncertainty can affect sleep, concentration, work and relationships. Feeling hopeful one day and overwhelmed the next is not a sign that you are handling treatment badly. Emotional care can sit alongside clinical care from the beginning."] },
      { heading: "Build a small support plan", paragraphs: ["Choose who needs to know, what you want them to know and how you prefer them to respond. One trusted person may be more helpful than a large group. Decide in advance how you will handle pregnancy announcements, family questions, work absences and days when you do not want to discuss treatment."], bullets: ["Name one practical helper", "Agree a phrase for stopping unwanted questions", "Keep some non-treatment time protected", "Ask the clinic who to contact between appointments", "Consider counselling before a crisis point"] },
      { heading: "For couples", paragraphs: ["Partners often cope differently. One may want to research every detail while another needs breaks from the subject. Schedule short check-ins rather than letting treatment dominate every conversation. Try asking: Do you want me to listen, help solve this, or give you space?"] },
      { heading: "After difficult news", paragraphs: ["A negative test, cancelled cycle, pregnancy loss or unexpected result deserves time and support. Ask what happened, what is known and what remains uncertain. You do not have to decide on another cycle immediately. Seek urgent professional help if distress feels unsafe or unmanageable."] },
    ],
    sources: [{ label: "HFEA treatment support information", url: "https://www.hfea.gov.uk/treatments/explore-all-treatments/in-vitro-fertilisation-ivf/" }, { label: "WHO infertility fact sheet", url: "https://www.who.int/news-room/fact-sheets/detail/infertility" }],
  },
  {
    slug: "understanding-fertility-success-rates",
    number: "06",
    tag: "Making decisions",
    title: "How to read fertility success rates",
    excerpt: "Why age, diagnosis, treatment type and the chosen denominator change what a percentage means.",
    read: "8 min",
    description: "Learn how to compare IVF success rates responsibly and which questions to ask a fertility clinic before treatment.",
    keywords: ["IVF success rates Nigeria", "fertility clinic success rate", "how to compare IVF clinics"],
    sections: [
      { heading: "Start by asking: success per what?", paragraphs: ["A percentage may describe pregnancy or live birth; per embryo transfer, egg collection, started cycle or patient; using own eggs or donor eggs; and within a particular age group or time period. Two numbers that use different definitions should not be compared."] },
      { heading: "Age and case mix matter", paragraphs: ["Age at egg collection strongly affects population-level outcomes with a patient’s own eggs. Clinics also see different groups: some manage more complex diagnoses, repeated unsuccessful treatment or older patients. A headline rate can therefore reflect who was treated as well as how care was delivered."], bullets: ["Ask for live birth, not only positive tests", "Ask whether cancelled cycles are included", "Separate own-egg and donor-egg results", "Look for age-specific groups", "Ask how many cycles produced the figure"] },
      { heading: "Small numbers can look dramatic", paragraphs: ["When a clinic performs few cycles, one or two outcomes can move a percentage substantially. Multi-year information may be more stable but can hide recent changes. Regulators such as the HFEA standardise reporting because uncontrolled comparisons can mislead."] },
      { heading: "Use data to improve the consultation", paragraphs: ["A clinic should explain which published data are relevant to you, what the main uncertainties are and what outcome it is quoting. The most useful question is not “What is your best number?” but “Based on my assessment, which factors are likely to matter and how will you review the plan if treatment does not progress as expected?”"] },
    ],
    sources: [{ label: "HFEA choosing a fertility clinic", url: "https://www.hfea.gov.uk/choose-a-fertility-clinic/" }, { label: "HFEA 2024 trends and figures", url: "https://www.hfea.gov.uk/about-us/publications/research-and-data/fertility-treatment-2024-trends-and-figures" }],
  },
];
