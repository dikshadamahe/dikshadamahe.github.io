/**
 * Simple Icons slugs for the toolkit chips. Anything absent here (SQL, DRF,
 * XGBoost, SHAP) has no brand mark, so those chips render as text alone.
 */
const SLUGS: Record<string, string> = {
  Python: 'python',
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  React: 'react',
  'Next.js': 'nextdotjs',
  'Tailwind CSS': 'tailwindcss',
  'Framer Motion': 'framer',
  Django: 'django',
  FastAPI: 'fastapi',
  Prisma: 'prisma',
  'scikit-learn': 'scikitlearn',
  Pandas: 'pandas',
  TensorFlow: 'tensorflow',
};

export function SKILL_ICONS(label: string): string | null {
  const slug = SLUGS[label];
  return slug ? `https://cdn.simpleicons.org/${slug}` : null;
}
