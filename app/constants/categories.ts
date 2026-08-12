import { Category, CategoryId } from '@app-types';

export const CATEGORIES: Category[] = [
  {
    id: 'web',
    label: 'Web Apps',
    blurb: 'Products people can open in a browser and use today.',
  },
  {
    id: 'ai',
    label: 'AI & ML',
    blurb: 'Models that make a decision, and explain why they made it.',
  },
  {
    id: 'research',
    label: 'Research',
    blurb: 'Pipelines and papers where the method matters as much as the result.',
  },
];

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((entry) => entry.id === id) ?? CATEGORIES[0];
}
