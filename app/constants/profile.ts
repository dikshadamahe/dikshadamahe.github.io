export const PROFILE = {
  name: 'Diksha Damahe',
  brand: 'DIKSHA',
  subtitle: '<ai \u0026 full-stack />',
  volume: 'Portfolio Vol. 1',
  role: 'AI/ML + Full-Stack Developer',
  education: 'BTech CSE (AI & ML), VIT Bhopal 2027',
  cgpa: '8.03',
  location: 'Bhopal, Madhya Pradesh, India',
  email: 'dikshadamahe25@gmail.com',
  phone: '+91 97709 25370',
  avatar: '/textures/avatar.jpg',
  skills: {
    Languages: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
    Frontend: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    Backend: ['Django', 'DRF', 'FastAPI', 'Prisma'],
    'ML / Data': ['scikit-learn', 'XGBoost', 'SHAP', 'Pandas', 'TensorFlow'],
  } as Record<string, string[]>,
} as const;

export const SOCIALS = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@dikshadamahe',
    url: 'https://github.com/dikshadamahe',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: '/in/dikshadamahe',
    url: 'https://www.linkedin.com/in/dikshadamahe',
  },
  {
    id: 'orcid',
    label: 'ORCID',
    handle: '0009-0002-0499-2572',
    url: 'https://orcid.org/0009-0002-0499-2572',
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'dikshadamahe25@gmail.com',
    url: 'mailto:dikshadamahe25@gmail.com',
  },
] as const;
