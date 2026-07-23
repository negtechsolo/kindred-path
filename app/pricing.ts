export const currency = (value: number) => `₦${value.toLocaleString("en-NG")}`;

export type TariffItem = {
  id: string;
  name: string;
  amount: number;
  from?: boolean;
  note?: string;
  detail: string;
};

export const tariff: TariffItem[] = [
  {
    id: "consultation",
    name: "Appointment consultation",
    amount: 30000,
    note: "Tuesdays and Thursdays",
    detail:
      "Your first private appointment with a fertility specialist. Your history is reviewed, your questions are answered and the assessments you actually need are agreed with you before anything is booked.",
  },
  {
    id: "laboratory",
    name: "Laboratory and diagnostic tests",
    amount: 300000,
    detail:
      "Fertility assessment for both partners. This is what turns a general plan into a plan for you, and it is the step that sometimes shows a simpler treatment is appropriate.",
  },
  {
    id: "ivf-own",
    name: "IVF using your own cycle",
    amount: 1248000,
    detail:
      "The treatment cycle itself using your own eggs, covering monitoring, egg retrieval, fertilisation, embryology and transfer.",
  },
  {
    id: "ivf-donor",
    name: "IVF using a donor cycle",
    amount: 2000000,
    detail:
      "The treatment cycle using donor eggs. The difference in cost reflects donor screening, matching and coordination.",
  },
  {
    id: "medication",
    name: "Medication",
    amount: 1500000,
    from: true,
    detail:
      "Stimulation and supporting medication. This one genuinely varies between people, because the dose depends on how your body responds. We would rather show you a starting figure than a flattering one.",
  },
];

export const worked = [
  {
    id: "own",
    label: "IVF using your own cycle",
    lines: ["consultation", "laboratory", "ivf-own", "medication"],
    from: true,
  },
  {
    id: "donor",
    label: "IVF using a donor cycle",
    lines: ["consultation", "laboratory", "ivf-donor", "medication"],
    from: true,
  },
];

export const totalFor = (ids: string[]) =>
  ids.reduce((sum, id) => sum + (tariff.find((t) => t.id === id)?.amount ?? 0), 0);

export const tariffNote =
  "This is a summary. A more detailed tariff for our other services, including IUI, surrogacy and social freezing, can be obtained at the clinic on request.";
