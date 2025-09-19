export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experienceLevel: 'Entry' | 'Mid' | 'Senior';
  skills: string[];
  description: string;
};

export const JOBS: Job[] = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Innovate Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    experienceLevel: 'Mid',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    description:
      'Join our team to build beautiful and performant user interfaces for our next-generation platform.',
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'DataSolutions',
    location: 'New York, NY',
    type: 'Full-time',
    experienceLevel: 'Senior',
    skills: ['Node.js', 'Go', 'PostgreSQL', 'Docker', 'Kubernetes'],
    description:
      'We are looking for an experienced backend engineer to design, build, and maintain our scalable microservices architecture.',
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    company: 'Creative Minds',
    location: 'Remote',
    type: 'Contract',
    experienceLevel: 'Mid',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research'],
    description:
      'Help shape the user experience of our products by creating intuitive and visually appealing designs.',
  },
  {
    id: 4,
    title: 'Product Manager',
    company: 'Innovate Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    experienceLevel: 'Senior',
    skills: ['Agile', 'Roadmap Planning', 'Market Research'],
    description:
      'Define the future of our product line. You will be responsible for the product planning and execution throughout the product lifecycle.',
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'DataSolutions',
    location: 'New York, NY',
    type: 'Full-time',
    experienceLevel: 'Entry',
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'TensorFlow'],
    description:
      'Analyze large amounts of complex raw data to find patterns and build predictive models.',
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    company: 'CloudUp',
    location: 'Austin, TX',
    type: 'Full-time',
    experienceLevel: 'Mid',
    skills: ['AWS', 'Terraform', 'CI/CD', 'Jenkins'],
    description:
      'Automate and streamline our operations and processes. Build and maintain tools for deployment, monitoring and operations.',
  },
];

export const LOCATIONS = [
  ...new Set(JOBS.map((job) => job.location)),
].sort();
export const EXPERIENCE_LEVELS = [
  ...new Set(JOBS.map((job) => job.experienceLevel)),
];
