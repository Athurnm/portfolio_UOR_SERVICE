/* Single source of truth for portfolio content.
   Structured rather than markdown because the diagrams, the carousel and the
   metric strip all need typed data. Every number traces to the CV in
   clients/+UOR-Service/profiles. Nothing here is invented. */

export const profile = {
  name: 'Athur Naufan Muharam',
  role: 'AI Product Manager / Technical PM',
  claim: 'I run the product and build the thing.',
  summary:
    'Five years of product leadership across enterprise B2B SaaS, a consumer travel marketplace, and a blue-collar recruitment platform. Information Systems foundation from ITB. I write the roadmap, then ship the prototype that de-risks it.',
  location: 'Jakarta, Indonesia (WIB / UTC+7)',
  availability: 'Currrently in Indonesia, Open to relocation to the Netherlands, Australia, or Singapore. Requires visa sponsorship (aside Indonesia).',
  email: 'athurnm@gmail.com',
  emailSubject: '[Inquiry] AI Product Manager opportunity',
  links: {
    linkedin: 'https://linkedin.com/in/athurnm',
    github: 'https://github.com/athurnm',
    medium: 'https://medium.com/@athurnm',
  },
};

/* Four readings, one fact set. Order: money, time, conversion, scale. */
export const impactMetrics = [
  {
    value: 'IDR 1.2B',
    unit: '/ year',
    label: 'Client cost savings',
    context: 'Per enterprise client, after automated reconciliation replaced manual ledger matching.',
    caseId: 'matchmade',
  },
  {
    from: '5',
    to: '1 Day',
    value: '5 → 1 Day',
    label: 'Reconciliation cycle',
    context: 'Manual matching down to a single automated run, / monthly close.',
    caseId: 'matchmade',
  },
  {
    value: '+60%',
    label: 'Payment click-through',
    context: 'Mobile checkout funnel after the submission and payment redesign.',
    caseId: 'adakerja',
  },
  {
    value: '11 to 34 GB',
    unit: '/ month',
    label: 'Transaction volume',
    context: 'Data the pipeline handled after the streaming rework. Three times the original load.',
    caseId: 'matchmade',
  },
];

export const companies = [
  {
    id: 'matchmade',
    name: 'Matchmade Indonesia',
    domain: 'Enterprise B2B SaaS, financial reconciliation',
    period: '2024 to present',
    role: 'Product Manager',
    productUrl: 'https://matchmade.io/',
    status: 'Active',
    logo: '/matchmade_transparent.png',
    problem:
      'Accounting teams spent five days / close matching hundreds of thousands of ledger rows, bank statements and invoices by hand.',
    diagram: 'reconciliation',
    metrics: [
      { value: 'IDR 1.2B', unit: '/ year', label: 'Saved / client' },
      { from: '5', to: '1 Day', value: '5 → 1 Day', label: 'Close cycle' },
      { value: '11 to 34 GB', unit: '/ month', label: 'Pipeline volume' },
    ],
    tags: ['Reconciliation engine', 'Document extraction', 'Enterprise RBAC', 'API integrations'],
    disclosure: {
      architecture:
        'Hybrid stream processing: virtualised tables on the client, chunked database streaming for multi-million row comparisons, and deterministic audit logs for every match decision.',
      decisions: [
        'Chose a multi-table matching engine over format-specific importers, so one rule set covers ledgers, statements and invoices.',
        'Used Docling for PDF to structured table extraction rather than a generic OCR pass, because tabular structure and multi-page financial metadata had to survive.',
        'Enforced tenant-isolated row level security so no cross-organisation ledger data is reachable.',
      ],
    },
  },
  {
    id: 'pegipagi',
    name: 'PegiPegi',
    domain: 'Consumer travel marketplace (OTA)',
    period: '2022 to 2023',
    role: 'Product Manager',
    productUrl: null,
    status: 'Not Operational',
    logo: '/pegipegi_transparent.png',
    problem:
      'Payment methods had not changed in two years, unsettled transactions were flooding support, and messaging costs kept climbing.',
    diagram: 'payment',
    metrics: [
      { value: '-85%', label: 'Refund handling time' },
      { value: '-50%', label: 'Duplicate accounts' },
      { value: '-40%', label: 'Checkout duration' },
    ],
    tags: ['Payment gateways', 'Deduplication', 'WhatsApp notifications', 'Support tooling'],
    disclosure: {
      architecture:
        'Asynchronous webhook retry pipeline with idempotent transaction tokens, so bank gateway timeouts retry without double charging.',
      decisions: [
        'Moved transactional notifications to the WhatsApp Business API, which cut messaging cost by 6 percent at a 75 percent open rate.',
        'Linked phone numbers, payment fingerprints and device identifiers to deduplicate accounts, saving half the monthly messaging quota.',
        'Built an internal refund arbitration view that took support turnaround from three days to under four hours.',
      ],
    },
  },
  {
    id: 'adakerja',
    name: 'AdaKerja',
    domain: 'Blue-collar job platform and SME marketplace',
    period: '2021 to 2022',
    role: 'Product Manager',
    productUrl: null,
    status: 'Not Operational',
    logo: '/adakerja_transparent.png',
    problem:
      'Mobile payment conversion was low, and three engineering squads were building against three different ideas of the roadmap.',
    diagram: 'funnel',
    metrics: [
      { value: '+60%', label: 'Payment CTR' },
      { value: '3', label: 'Squads aligned' },
    ],
    tags: ['Product strategy', 'Funnel optimisation', 'Cross-squad alignment', 'Mobile checkout'],
    disclosure: {
      architecture:
        'Single-page progressive checkout built for low-bandwidth mobile networks, with client-side form caching so a dropped connection does not lose the application.',
      decisions: [
        'Collapsed a multi-step checkout into one screen, which is where most of the drop-off was.',
        'Replaced three squad-level backlogs with one roadmap and one North Star metric: verified candidate activations.',
        'Automated applicant status notifications so candidates were not left waiting after submission.',
      ],
    },
  },
];

/* Career arc for the timeline diagram. Periods, not durations. */
export const timeline = [
  { period: '2021', org: 'AdaKerja', role: 'Product Manager', focus: 'Checkout funnel and squad alignment' },
  { period: '2022', org: 'PegiPegi', role: 'Product Manager', focus: 'Payment channels and transaction messaging' },
  { period: '2024 - Now', org: 'Matchmade', role: 'Product Manager', focus: 'Reconciliation engine and AI extraction' },
  { period: 'And (Now)', org: 'Personal Project', role: 'Product Builder', focus: 'Agent workflows and micro-tools' },
];

export const capabilityLayers = [
  {
    name: 'Product leadership',
    items: ['Product strategy', 'Roadmapping', 'Gherkin specs', 'A/B testing', 'User research', 'Enterprise stakeholders'],
  },
  {
    name: 'AI and agentic systems',
    items: ['Prompt engineering', 'RAG', 'Local LLMs', 'n8n', 'OpenClaw', 'Antigravity', 'Docling'],
  },
  {
    name: 'Full stack',
    items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vite', 'Tailwind', 'Node.js', 'REST'],
  },
  {
    name: 'Data and cloud',
    items: ['Supabase', 'PostgreSQL', 'SQL', 'Vercel', 'Netlify', 'Git'],
  },
];

export const projects = [
  {
    title: 'CalSnap',
    kind: 'AI calendar parser',
    link: 'https://calendar-snap.vercel.app/',
    what:
      'Reads an event out of a screenshot or a messy message and writes it to Google Calendar or an .ics file.',
    stack: 'Antigravity, Supabase, Vercel',
  },
  {
    title: 'Agent workflows',
    kind: 'Personal automation',
    link: null,
    what:
      'Local pipelines for transcript synthesis, meeting briefing and document triage, running on my own machine.',
    stack: 'n8n, OpenClaw, local LLMs',
  },
  {
    title: 'Wedding evite',
    kind: 'Event web app',
    link: 'https://athur-hidup-dengan-dara.info/',
    what: 'A mobile invitation and RSVP page, built end to end for a real event with real guests.',
    stack: 'React, Supabase, Vercel',
  },
];

export const education = {
  institution: 'Institut Teknologi Bandung',
  degree: 'S.Kom, Information Systems',
  standing: 'GPA 3.75 / 4.00',
  thesis: 'Machine learning for anomaly detection in fraudulent transactions',
};

export const getCompany = (id) => companies.find((company) => company.id === id);
