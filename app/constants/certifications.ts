import { Certification } from '@app-types';

/**
 * Where a certificate has no individual credential URL recorded yet, the card
 * opens the LinkedIn certifications list, which holds every one of them.
 */
export const LINKEDIN_CERTIFICATES =
  'https://www.linkedin.com/in/dikshadamahe/details/certifications/';

/**
 * Union of the LinkedIn and resume lists. Computer Vision appears only on
 * LinkedIn, Fundamentals of AI and ML only on the resume; both are genuine.
 */
export const CERTIFICATIONS: Certification[] = [
  { id: 'computer-vision', title: 'Computer Vision', issuer: 'Vityarthi', date: 'Feb 2026' },
  {
    id: 'google-it',
    title: 'Google IT Support Certificate',
    issuer: 'Google',
    date: 'Jan 2026',
  },
  {
    id: 'applied-ml',
    title: 'Applied Machine Learning in Python',
    issuer: 'University of Michigan',
    date: 'Nov 2025',
  },
  {
    id: 'aws-essentials',
    title: 'AWS Technical Essentials',
    issuer: 'Amazon Web Services',
    date: 'Sep 2025',
  },
  {
    id: 'aws-course',
    title: 'AWS Certification Course',
    issuer: 'Intellipaat',
    date: 'Sep 2025',
  },
  { id: 'javascript', title: 'Mastery in JavaScript', issuer: 'Lernx', date: 'Aug 2025' },
  {
    id: 'advanced-sql',
    title: 'Advanced SQL for Technical Interviews',
    issuer: 'Bosscoder Academy',
    date: 'Feb 2025',
  },
  { id: 'python-apps', title: 'Creating Apps in Python', issuer: 'Lernx', date: 'May 2024' },
  { id: 'python-bootcamp', title: 'Python 3 Bootcamp', issuer: 'Lernx', date: 'May 2024' },
  {
    id: 'ai-ml-fundamentals',
    title: 'Fundamentals of AI and ML',
    issuer: 'Vityarthi',
    date: 'Jan 2024',
  },
  { id: 'python-essentials', title: 'Python Essentials', issuer: 'Vityarthi', date: 'Jan 2023' },
];

export const ISSUER_COUNT = new Set(CERTIFICATIONS.map((entry) => entry.issuer)).size;
