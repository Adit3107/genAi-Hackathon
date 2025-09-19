export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experienceLevel: 'Entry' | 'Mid' | 'Senior';
  degree: "Bachelor's" | "Master's" | "PhD" | "Associate's";
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
    degree: "Bachelor's",
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    description:
      '3 years of experience building beautiful and performant user interfaces.',
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'DataSolutions',
    location: 'New York, NY',
    type: 'Full-time',
    experienceLevel: 'Senior',
    degree: "Bachelor's",
    skills: ['Node.js', 'Go', 'PostgreSQL', 'Docker', 'Kubernetes'],
    description:
      '5+ years of experience designing, building, and maintaining scalable microservices.',
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    company: 'Creative Minds',
    location: 'Remote',
    type: 'Contract',
    experienceLevel: 'Mid',
    degree: "Associate's",
    skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research'],
    description:
      'A strong portfolio showcasing your user-centered design process.',
  },
  {
    id: 4,
    title: 'Product Manager',
    company: 'Innovate Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    experienceLevel: 'Senior',
    degree: "Master's",
    skills: ['Agile', 'Roadmap Planning', 'Market Research'],
    description:
      'Experience defining product vision and strategy from inception to launch.',
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'DataSolutions',
    location: 'New York, NY',
    type: 'Full-time',
    experienceLevel: 'Entry',
    degree: "PhD",
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'TensorFlow'],
    description:
      'Experience analyzing large amounts of complex raw data to find patterns and build predictive models.',
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    company: 'CloudUp',
    location: 'Austin, TX',
    type: 'Full-time',
    experienceLevel: 'Mid',
    degree: "Bachelor's",
    skills: ['AWS', 'Terraform', 'CI/CD', 'Jenkins'],
    description:
      '3 years of experience in automating and streamlining operations and processes.',
  },
];

export const LOCATIONS = [
  ...new Set(JOBS.map((job) => job.location)),
].sort();
export const EXPERIENCE_LEVELS = [
  ...new Set(JOBS.map((job) => job.experienceLevel)),
];
export const DEGREES = [
  ...new Set(JOBS.map((job) => job.degree)),
];
