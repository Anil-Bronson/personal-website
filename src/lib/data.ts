export const about = {
  name: 'Anil Bronson',
  title: 'Production Services Technician',
  company: 'Sony Pictures Imageworks',
  location: 'North Vancouver, BC',
  email: 'anilbronson12@gmail.com',
  linkedin: 'https://linkedin.com/in/anilbronson',
  github: 'https://github.com/anil-bronson',
  bio: "I'm Anil, currently a full-time Production Services Technician at Sony Pictures Imageworks. I'm passionate about everything in the coding space, especially the rapid advancements in AI and agentic development. I hold myself to a high standard and love collaborating on projects that I think will have a real impact on our future.",
  skills: {
    Languages: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C++'],
    'Frameworks': ['Node.js', 'Next.js', 'React', 'Tailwind CSS', 'Prisma'],
    'Tools & Infra': ['Linux', 'Git', 'Figma', 'Google Apps Script', 'YAML'],
    Databases: ['PostgreSQL', 'MongoDB', 'Firebase'],
  },
};

export const experience = [
  {
    role: 'Production Services Technician',
    company: 'Sony Pictures Imageworks',
    location: 'Vancouver, BC',
    period: 'Mar 2026 – Present',
    bullets: [
      'Manage digital assets across full production lifecycle in Linux environment, ensuring data integrity and security',
      'Coordinate render farm job prioritization across constrained resources, triaging queues to keep shot delivery on schedule',
      'Transfer multi-GB data packages to partner studios under strict accuracy and confidentiality standards',
      'Monitor ingest/export pipelines, troubleshooting failures and escalating issues to minimize artist downtime',
    ],
  },
  {
    role: 'Production Services Technician Intern',
    company: 'Sony Pictures Imageworks',
    location: 'Vancouver, BC',
    period: 'Jul 2025 – Aug 2025',
    bullets: [
      'Automated pipeline tasks with Python/Linux scripts, reducing manual intervention by 40% (saved 5 hours/week)',
      'Resolved 20+ weekly technical issues for artists, cutting average downtime from ~30 mins to under 10 mins',
      'Partnered with production and engineering teams to streamline asset delivery, reducing ticket resolution time by 25%',
    ],
  },
];

export const education = [
  {
    institution: 'BC Institute of Technology',
    credential: 'Computer Systems Technology Diploma',
    period: 'Jan 2024 - Jan 2026',
    notes: '',
  },
  {
    institution: 'Simon Fraser University',
    credential: 'Bachelor of Computer Science Coursework',
    period: 'Dec 2022 – Dec 2023',
    notes: 'Data Structures & Algorithms, Discrete Mathematics, Linear Algebra, Probability & Statistics',
  },
];

export const projects = [
  {
    title: 'Conscious Connections',
    category: 'Full-Stack AI Application',
    period: 'May 2025',
    description:
      'AI-driven dating app with compatibility algorithms and personalized coaching threads. Engineered WebSocket-based real-time chat achieving sub-50ms latency under load testing. Tested across 100+ simulated user sessions.',
    tech: ['Node.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'WebSocket', 'OpenAI API'],
    stat: '<50ms latency',
  },
  {
    title: 'Golden Gaming',
    category: 'Accessibility-First Platform',
    period: 'May 2024',
    description:
      'Web gaming platform designed specifically for seniors. Large-format UI and simplified navigation validated through hands-on accessibility and usability testing. JavaScript-based interactive games with progress tracking.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    stat: '+35% engagement',
    github: 'https://github.com/SweptShadow/2800_202410_BBY19',
  },
  {
    title: 'Financial Automation Engine',
    category: 'Pipeline Automation',
    period: '2024',
    description:
      'Automated transactional parsing that organizes disjointed bank datasets into dynamic, categorized cloud ledgers via optimized sync operations. Built with Python and Google Apps Script.',
    tech: ['Python', 'Google Apps Script', 'Google Sheets API'],
    stat: 'Full automation',
    github: 'https://github.com/Anil-Bronson/finance_script',
  },
  {
    title: 'Meme Caption Generator',
    category: 'Multi-Model AI Pipeline',
    period: '2024',
    description:
      'Built a multi-model inference pipeline using locally hosted LLMs. An image-recognition model analyses uploaded images and generates structured scene descriptions, which are passed as context to a second language model that produces caption output. A Node.js proxy server abstracts both models behind a unified REST API, decoupling the client from the underlying inference layer.',
    tech: ['JavaScript', 'Node.js', 'Python', 'REST API', 'HTML', 'CSS'],
    stat: '2-model pipeline',
    github: 'https://github.com/Jayden-Hutchinson/4537-assignment',
  },
];

export const bartenderThinking = {
  kon: [
    'Pulling focus...',
    'Let me find the right frame for this.',
    'Every cut needs intention. One moment.',
    'The scene is still developing...',
    'Adjusting the composition...',
    'There\'s an edit here somewhere.',
    'The reel is still turning...',
  ],
  tsutsui: [
    'Consulting the unconscious...',
    'The answer drifts between pages...',
    'Reality is arranging itself. Patience.',
    'Something is forming in the fog...',
    'The dream is coalescing...',
    'Let the subconscious do its work...',
    'Fiction takes a moment to become true.',
  ],
};

export const bartenderFallbacks = {
  kon: [
    "Every portfolio is a film — the question is whether the director has found their cut.",
    "In my films, I always asked: what do people hide from themselves? Your work answers that question without knowing it.",
    "A render farm is just a dream machine that runs on electricity instead of sleep.",
    "The camera doesn't lie. The editor just chooses which truths to tell.",
    "Another visitor crosses through the door. What are you really looking for?",
    "I find the pipeline work interesting. Moving images from one mind to another — it's not so different from filmmaking.",
  ],
  tsutsui: [
    "Paprika was about the invasion of dreams into reality. Here you are, on a website, wondering if this is real.",
    "The novel asks: if you can enter someone's dream, whose consciousness is it? I ask the same about portfolios.",
    "Automation is the purest form of the author's dream — to work without working.",
    "The boundary between a database and a story is thinner than most engineers admit.",
    "You arrive, you look around. A very human thing to do, even in digital spaces.",
    "In fiction, every character believes they are the protagonist. In code, every function believes the same.",
  ],
};
