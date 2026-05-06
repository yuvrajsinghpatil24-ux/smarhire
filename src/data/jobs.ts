export interface Company {
  id: string;
  name: string;
  logo: string;
  location: string;
  industry: string;
  size: string;
  founded: string;
  website: string;
  about: string;
  benefits: string[];
  openPositions: JobPosition[];
}

export interface JobPosition {
  id: string;
  title: string;
  category: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  companyId: string;
}

export const JOB_CATEGORIES = [
  "Data Analytics",
  "Data Science",
  "Full Stack",
  "Backend",
  "Frontend",
  "DevOps",
  "Machine Learning",
  "Cloud Engineering",
  "Cybersecurity",
  "Product Management",
  "UI/UX Design",
  "Mobile Development",
] as const;

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Remote"] as const;

export const EXPERIENCE_LEVELS = ["Entry Level", "Mid Level", "Senior", "Lead", "Director"] as const;

export const companies: Company[] = [
  {
    id: "1",
    name: "Google",
    logo: "G",
    location: "Mountain View, CA",
    industry: "Technology",
    size: "100,000+",
    founded: "1998",
    website: "google.com",
    about: "Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, and artificial intelligence.",
    benefits: ["Health Insurance", "401k Match", "Free Meals", "Gym Access", "Remote Work", "Stock Options"],
    openPositions: [],
  },
  {
    id: "2",
    name: "Microsoft",
    logo: "M",
    location: "Redmond, WA",
    industry: "Technology",
    size: "100,000+",
    founded: "1975",
    website: "microsoft.com",
    about: "Microsoft Corporation is an American multinational technology corporation producing computer software, consumer electronics, and personal computers.",
    benefits: ["Health Insurance", "401k Match", "Education Reimbursement", "Parental Leave", "Stock Options"],
    openPositions: [],
  },
  {
    id: "3",
    name: "Amazon",
    logo: "A",
    location: "Seattle, WA",
    industry: "E-Commerce & Cloud",
    size: "100,000+",
    founded: "1994",
    website: "amazon.com",
    about: "Amazon is a multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    benefits: ["Health Insurance", "Career Growth", "Employee Discount", "Relocation Assistance", "Stock Options"],
    openPositions: [],
  },
  {
    id: "4",
    name: "Meta",
    logo: "F",
    location: "Menlo Park, CA",
    industry: "Social Media & Technology",
    size: "50,000+",
    founded: "2004",
    website: "meta.com",
    about: "Meta Platforms builds technologies that help people connect. Their products include Facebook, Instagram, WhatsApp, and Oculus.",
    benefits: ["Health Insurance", "Free Meals", "Wellness Programs", "Parental Leave", "Stock Options"],
    openPositions: [],
  },
  {
    id: "5",
    name: "Netflix",
    logo: "N",
    location: "Los Gatos, CA",
    industry: "Entertainment & Technology",
    size: "10,000+",
    founded: "1997",
    website: "netflix.com",
    about: "Netflix is an American subscription video on-demand streaming service and production company.",
    benefits: ["Unlimited PTO", "Top-of-Market Pay", "Stock Options", "Health Insurance", "Remote Work"],
    openPositions: [],
  },
  {
    id: "6",
    name: "Apple",
    logo: "🍎",
    location: "Cupertino, CA",
    industry: "Technology & Consumer Electronics",
    size: "100,000+",
    founded: "1976",
    website: "apple.com",
    about: "Apple Inc. designs, develops, and sells consumer electronics, computer software, and online services.",
    benefits: ["Health Insurance", "Employee Discounts", "Education Programs", "Stock Purchase Plan", "Wellness"],
    openPositions: [],
  },
];

export const jobs: JobPosition[] = [
  { id: "j1", title: "Senior Data Analyst", category: "Data Analytics", type: "Full-time", experience: "Senior", salary: "$120K - $160K", description: "Analyze large datasets to drive business decisions and create actionable insights for product teams.", requirements: ["5+ years in data analytics", "SQL, Python, Tableau", "Strong communication skills", "Experience with A/B testing"], responsibilities: ["Build dashboards and reports", "Perform deep-dive analyses", "Partner with product teams", "Mentor junior analysts"], postedDate: "2 days ago", companyId: "1" },
  { id: "j2", title: "Machine Learning Engineer", category: "Machine Learning", type: "Full-time", experience: "Senior", salary: "$150K - $200K", description: "Design and deploy ML models at scale to improve search relevance and ad targeting.", requirements: ["5+ years ML experience", "TensorFlow/PyTorch", "Strong math background", "Production ML systems"], responsibilities: ["Develop ML models", "Optimize model performance", "Collaborate with research teams", "Deploy models to production"], postedDate: "1 day ago", companyId: "1" },
  { id: "j3", title: "Full Stack Developer", category: "Full Stack", type: "Full-time", experience: "Mid Level", salary: "$100K - $140K", description: "Build and maintain internal tools and customer-facing applications using React and .NET.", requirements: ["3+ years full-stack experience", "React, TypeScript, C#", ".NET experience", "REST API design"], responsibilities: ["Develop new features", "Code reviews", "Write unit tests", "Collaborate with designers"], postedDate: "3 days ago", companyId: "2" },
  { id: "j4", title: "Data Scientist", category: "Data Science", type: "Full-time", experience: "Mid Level", salary: "$130K - $170K", description: "Apply statistical methods and machine learning techniques to solve complex business problems.", requirements: ["3+ years data science", "Python, R, SQL", "Statistical modeling", "PhD preferred"], responsibilities: ["Build predictive models", "Design experiments", "Present findings to stakeholders", "Develop data pipelines"], postedDate: "5 days ago", companyId: "3" },
  { id: "j5", title: "Backend Engineer", category: "Backend", type: "Full-time", experience: "Senior", salary: "$140K - $180K", description: "Design and build scalable microservices for high-traffic distributed systems.", requirements: ["5+ years backend development", "Java/Go/Python", "Distributed systems", "AWS experience"], responsibilities: ["Design system architecture", "Build APIs", "Optimize performance", "On-call rotation"], postedDate: "1 day ago", companyId: "3" },
  { id: "j6", title: "Frontend Engineer", category: "Frontend", type: "Full-time", experience: "Mid Level", salary: "$110K - $150K", description: "Create beautiful, performant user interfaces for billions of users across Meta's family of apps.", requirements: ["3+ years React experience", "TypeScript", "Performance optimization", "Accessibility"], responsibilities: ["Build UI components", "Improve performance", "A/B testing", "Cross-browser compatibility"], postedDate: "4 days ago", companyId: "4" },
  { id: "j7", title: "DevOps Engineer", category: "DevOps", type: "Full-time", experience: "Senior", salary: "$130K - $170K", description: "Build and maintain CI/CD pipelines and cloud infrastructure for streaming services.", requirements: ["5+ years DevOps", "Kubernetes, Docker", "AWS/GCP", "Terraform"], responsibilities: ["Manage cloud infrastructure", "Automate deployments", "Monitor systems", "Incident response"], postedDate: "2 days ago", companyId: "5" },
  { id: "j8", title: "iOS Developer", category: "Mobile Development", type: "Full-time", experience: "Senior", salary: "$140K - $190K", description: "Develop features for iOS apps used by millions of users worldwide.", requirements: ["5+ years iOS development", "Swift, Objective-C", "UIKit, SwiftUI", "App Store experience"], responsibilities: ["Develop iOS features", "Performance tuning", "Code reviews", "Release management"], postedDate: "3 days ago", companyId: "6" },
  { id: "j9", title: "Cloud Engineer", category: "Cloud Engineering", type: "Full-time", experience: "Mid Level", salary: "$115K - $155K", description: "Design and manage cloud infrastructure on Azure for enterprise clients.", requirements: ["3+ years cloud experience", "Azure certified", "Networking knowledge", "Scripting skills"], responsibilities: ["Manage Azure resources", "Cost optimization", "Security compliance", "Support engineering teams"], postedDate: "1 day ago", companyId: "2" },
  { id: "j10", title: "Cybersecurity Analyst", category: "Cybersecurity", type: "Full-time", experience: "Mid Level", salary: "$105K - $145K", description: "Monitor and protect company infrastructure from security threats and vulnerabilities.", requirements: ["3+ years security experience", "SIEM tools", "Network security", "Certifications preferred"], responsibilities: ["Threat monitoring", "Incident response", "Security audits", "Policy development"], postedDate: "6 days ago", companyId: "1" },
  { id: "j11", title: "Product Manager", category: "Product Management", type: "Full-time", experience: "Senior", salary: "$135K - $175K", description: "Lead product strategy and roadmap for consumer-facing products.", requirements: ["5+ years PM experience", "Data-driven mindset", "Technical background", "MBA preferred"], responsibilities: ["Define product vision", "Prioritize roadmap", "Stakeholder management", "User research"], postedDate: "2 days ago", companyId: "4" },
  { id: "j12", title: "UI/UX Designer", category: "UI/UX Design", type: "Full-time", experience: "Mid Level", salary: "$95K - $135K", description: "Design intuitive and beautiful user experiences for streaming platform interfaces.", requirements: ["3+ years UX design", "Figma, Sketch", "User research", "Prototyping"], responsibilities: ["Create wireframes", "Conduct user testing", "Design systems", "Collaborate with engineers"], postedDate: "4 days ago", companyId: "5" },
  { id: "j13", title: "Data Analytics Intern", category: "Data Analytics", type: "Internship", experience: "Entry Level", salary: "$30/hr", description: "Support the analytics team with data collection, reporting, and visualization projects.", requirements: ["Pursuing CS/Stats degree", "Basic SQL", "Excel proficiency", "Eager to learn"], responsibilities: ["Data entry and cleaning", "Create reports", "Support senior analysts", "Present findings"], postedDate: "1 day ago", companyId: "6" },
  { id: "j14", title: "Remote Backend Developer", category: "Backend", type: "Remote", experience: "Mid Level", salary: "$100K - $130K", description: "Build scalable APIs and microservices for cloud-native applications from anywhere.", requirements: ["3+ years backend experience", "Node.js/Python", "PostgreSQL", "REST/GraphQL"], responsibilities: ["Develop APIs", "Database design", "Code reviews", "Documentation"], postedDate: "Today", companyId: "2" },
];

// Link jobs to companies
companies.forEach(company => {
  company.openPositions = jobs.filter(job => job.companyId === company.id);
});

export function getCompanyById(id: string): Company | undefined {
  return companies.find(c => c.id === id);
}

export function getJobById(id: string): JobPosition | undefined {
  return jobs.find(j => j.id === id);
}
