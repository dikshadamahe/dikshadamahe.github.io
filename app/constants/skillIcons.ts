/**
 * Simple Icons slugs for the toolkit chips. Anything absent here (SQL, DRF,
 * XGBoost, SHAP) has no brand mark, so those chips render as text alone.
 */
const SLUGS: Record<string, string> = {
  Python: 'python',
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  Dart: 'dart',
  React: 'react',
  'Next.js': 'nextdotjs',
  Flutter: 'flutter',
  'Tailwind CSS': 'tailwindcss',
  'Framer Motion': 'framer',
  Django: 'django',
  FastAPI: 'fastapi',
  Prisma: 'prisma',
  'scikit-learn': 'scikitlearn',
  Pandas: 'pandas',
  TensorFlow: 'tensorflow',
};

/**
 * Simple Icons has removed the Amazon and Oracle marks over trademark policy,
 * so these are vendored under /public/logos instead. Serving them ourselves
 * also means a future removal upstream cannot blank out a chip.
 */
const VENDORED: Record<string, string> = {
  AWS: '/logos/aws.svg',
  'Oracle OCI': '/logos/oracle.svg',
};

export function SKILL_ICONS(label: string): string | null {
  if (VENDORED[label]) return VENDORED[label];
  const slug = SLUGS[label];
  return slug ? `https://cdn.simpleicons.org/${slug}` : null;
}
