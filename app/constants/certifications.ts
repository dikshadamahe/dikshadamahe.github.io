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
  {
    // NPTEL Elite certifications; not mirrored on LinkedIn, so no credential URL.
    id: 'nptel-iot',
    title: 'Introduction to Internet of Things',
    issuer: 'NPTEL, IIT Kharagpur',
    date: 'May 2026',
    onLinkedIn: false,
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    issuer: 'Vityarthi',
    date: 'Feb 2026',
    url: 'https://www.vityarthi.com/certificate/9nBxN1v2ZJKm',
  },
  {
    id: 'google-it',
    title: 'Google IT Support Certificate',
    issuer: 'Google',
    date: 'Jan 2026',
    url: 'https://www.credly.com/badges/60c5f9ca-7202-47fe-9282-83ba82fe4027/linked_in_profile',
  },
  {
    id: 'applied-ml',
    title: 'Applied Machine Learning in Python',
    issuer: 'University of Michigan',
    date: 'Nov 2025',
    url: 'https://www.coursera.org/account/accomplishments/records/FIQP56DH3PBM',
  },
  {
    id: 'aws-essentials',
    title: 'AWS Technical Essentials',
    issuer: 'Amazon Web Services',
    date: 'Sep 2025',
    url: 'https://skillbuilder.aws/4784403c-701b-4565-85c2-d3f67cf5d96a',
  },
  {
    // LinkedIn only records the Intellipaat homepage here, so the card keeps
    // pointing at the certifications list, which holds the actual scan.
    id: 'aws-course',
    title: 'AWS Certification Course',
    issuer: 'Intellipaat',
    date: 'Sep 2025',
  },
  { id: 'javascript', title: 'Mastery in JavaScript', issuer: 'Lernx', date: 'Aug 2025' },
  {
    id: 'nptel-cloud',
    title: 'Cloud Computing',
    issuer: 'NPTEL, IIT Kharagpur',
    date: 'May 2025',
    onLinkedIn: false,
  },
  {
    // As above: LinkedIn has only the Bosscoder homepage on file.
    id: 'advanced-sql',
    title: 'Advanced SQL for Technical Interviews',
    issuer: 'Bosscoder Academy',
    date: 'Feb 2025',
  },
  {
    id: 'python-apps',
    title: 'Creating Apps in Python',
    issuer: 'Lernx',
    date: 'May 2024',
    url: 'https://cert.lernx.io/certificate/r661go854gc',
  },
  {
    id: 'python-bootcamp',
    title: 'Python 3 Bootcamp',
    issuer: 'Lernx',
    date: 'May 2024',
    url: 'https://cert.lernx.io/certificate/7hgfw',
  },
  {
    id: 'ai-ml-fundamentals',
    title: 'Fundamentals of AI and ML',
    issuer: 'Vityarthi',
    date: 'Jan 2024',
    onLinkedIn: false,
  },
  {
    id: 'python-essentials',
    title: 'Python Essentials',
    issuer: 'Vityarthi',
    date: 'Jan 2023',
    url: 'https://vityarthi.com/certificate/f2296c7492',
  },
];

export const ISSUER_COUNT = new Set(CERTIFICATIONS.map((entry) => entry.issuer)).size;
