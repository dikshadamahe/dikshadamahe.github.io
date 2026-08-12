import { Project } from '@app-types';

export const PROJECTS: Project[] = [
  {
    id: 'recovai',
    title: 'RecovAI',
    date: 'May 2026',
    category: 'ai',
    description:
      'AI decision-support for copper flotation at Hindustan Copper Ltd. Predicts recovery, optimizes reagent dosing, and explains every call with SHAP.',
    detail:
      'Built on-site during a 45-day internship at the Malanjkhand Copper Project. It reads 26 live process variables and predicts copper recovery, then suggests SIPX, frother, and lime dosing with SciPy optimisation. Isolation Forest flags anomalous shifts and the tool writes its own natural-language shift reports. The hardest part was not the model, it was digitising 1,778 handwritten shift logs into something trainable.',
    highlight: 'R\u00b2 = 0.972 on 26 process variables, trained on 1,778 shift logs',
    tech: ['Python', 'XGBoost', 'SHAP', 'FastAPI', 'SciPy', 'SQLite'],
    github: 'https://github.com/dikshadamahe/RecovAI',
    live: 'https://hcl-recovai.onrender.com/',
  },
  {
    id: 'quant-factor',
    title: 'QuantFactor',
    date: 'Aug 2026',
    category: 'research',
    description:
      'Factor research and backtesting engine that refuses to lie to you: point-in-time data, real transaction costs, and multiple-testing corrections by default.',
    detail:
      'Most open-source backtesters leak the future. This one enforces a t+1 execution lag so a signal computed on day t can only trade on day t+1, models commission, spread, slippage and volume-weighted market impact, and applies Bonferroni and Benjamini-Hochberg corrections so a factor that only looks good because you tried forty of them gets caught. Walk-forward out-of-sample windows and market-regime decomposition round it out.',
    highlight: 'Point-in-time correctness and cost modelling enforced by default',
    tech: ['Python', 'pandas', 'NumPy', 'SciPy', 'Matplotlib'],
    github: 'https://github.com/dikshadamahe/quant-factor-backtest',
    live: null,
  },
  {
    id: 'fossee',
    title: 'FOSSEE Equipment Visualizer',
    date: 'Feb 2026',
    category: 'web',
    description:
      'Hybrid web and desktop analytics for chemical equipment data. One Django REST API feeding both a React app and a PyQt5 client.',
    detail:
      'Upload a CSV and a Django REST + Pandas backend turns it into KPI cards, Chart.js dashboards, and PDF reports. The interesting constraint was making a React web app and a PyQt5 desktop app share one API without either feeling like a port of the other.',
    highlight: 'One API, three clients: web, desktop, and REST',
    tech: ['Django', 'DRF', 'React', 'PyQt5', 'Chart.js', 'Pandas'],
    github: 'https://github.com/dikshadamahe/fossee-project',
    live: 'https://fossee-project-eta.vercel.app',
  },
  {
    id: 'nafld',
    title: 'NAFLD Risk Pipeline',
    date: 'Feb 2026',
    category: 'research',
    description:
      'Research ML pipeline benchmarking 24 classifiers on NHANES clinical and lifestyle features for fatty liver risk screening.',
    detail:
      'A reproducible pipeline with stratified splits, leakage-safe SMOTE, and cross-validation, shipping ROC curves, feature importance, and SHAP explanations. Benchmarking 24 models sounds excessive until you see how differently they behave on imbalanced proxy labels.',
    highlight: 'Best model: AdaBoost at 0.9679 ROC-AUC',
    tech: ['Python', 'scikit-learn', 'XGBoost', 'SHAP', 'Matplotlib'],
    github: 'https://github.com/dikshadamahe/NAFLD-Model',
    live: null,
  },
  {
    id: 'aegis-vault',
    title: 'Aegis Vault',
    date: 'Oct 2025',
    category: 'web',
    description:
      'Password manager with client-side envelope encryption. The server never sees a plaintext secret.',
    detail:
      'Secrets are sealed with libsodium in the browser before anything touches the network. On top of that sits a searchable vault dashboard with categories, a generator, and confirmation flows on every destructive action. 68 commits over four days.',
    highlight: 'Client-side envelope encryption with libsodium',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'Prisma', 'NextAuth', 'libsodium'],
    github: 'https://github.com/dikshadamahe/Aegis-Vault',
    live: 'https://aegis-vault.vercel.app',
  },
  {
    id: 'vyomgarud',
    title: 'VyomGarud',
    date: 'Nov 2025',
    category: 'web',
    description:
      'Cinematic counter-UAV defence site with a video hero, animated metrics, and product sections.',
    detail:
      'Built as a web development assessment and then kept going because the motion design was fun. Hero video, counters that animate on scroll, and responsive capability and technology sections.',
    highlight: 'Motion-heavy marketing site, 69 commits',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/dikshadamahe/Vyom-Garud',
    live: 'https://vyom-garud-seven.vercel.app',
  },
  {
    id: 'ielts',
    title: 'IELTS Precision & Progress',
    date: 'Sep 2025',
    category: 'web',
    description:
      'Conversion-focused landing page for an IELTS institute, with metric cards, testimonials, and an enrolment form.',
    detail:
      'A mobile-first layout built around one job: get a visitor to the enrolment form. Metric cards and testimonials do the persuading, Framer Motion keeps it from feeling like a template.',
    highlight: 'Mobile-first, built in two days',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/dikshadamahe/IELTS',
    live: 'https://ielts-nu.vercel.app',
  },
  {
    id: 'note-assistant',
    title: 'Note Assistant',
    date: 'Mar 2026',
    category: 'ai',
    description:
      'BERT-based semantic search over personal notes, so you can ask a question instead of remembering a keyword.',
    detail:
      'Sentence Transformers embed every note, and a query gets matched by meaning rather than exact wording. Small project, but it changed how I keep notes.',
    highlight: 'Semantic retrieval with sentence embeddings',
    tech: ['Python', 'BERT', 'Sentence Transformers', 'NLP'],
    github: 'https://github.com/dikshadamahe/Note-Assistant-chatbot-',
    live: null,
  },
  {
    id: 'hostel-bites',
    title: 'Hostel-Bites',
    date: '2025',
    category: 'web',
    description:
      'Firebase meal ordering for hostel students. Built because the queue at the mess was genuinely unbearable.',
    detail:
      'Menu, cart, order tracking, and an admin view, all on Firebase with vanilla JavaScript. My first shipped product, and still the one people actually used.',
    highlight: 'First shipped product, live on Firebase',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    github: 'https://github.com/dikshadamahe/Hostel-Bites',
    live: 'https://hostel-bites-1.web.app',
  },
  {
    id: 'veil',
    title: 'Veil Android',
    date: '2026',
    category: 'web',
    description: 'Flutter streaming client built as a collaboration.',
    detail:
      'A Flutter front-end for a streaming backend, covering playback, library, and search. My first real look at how different mobile layout constraints are from the web.',
    highlight: 'Flutter and Dart, collaborative build',
    tech: ['Flutter', 'Dart', 'TypeScript'],
    github: 'https://github.com/dikshadamahe/veil-android',
    live: null,
  },
];
