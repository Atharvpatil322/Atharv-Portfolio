import type { IconType } from "react-icons";
import {
  SiApachekafka,
  SiCelery,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiNodedotjs,
  SiOpenjdk,
  SiPython,
  SiReact,
  SiRedis,
  SiNginx,
  SiGrafana,
} from "react-icons/si";
import { TbBraces, TbBrain, TbDatabase, TbBrandReactNative, TbVectorBezier, TbVectorTriangle } from "react-icons/tb";

export const roles = ["AI Engineer", "Full-Stack Developer", "System Designer", "GPU Whisperer", "Professional Bug Collector"];

export const stats = [
  { value: 2, suffix: "+", label: "Years shipping" },
  { value: 14, suffix: "→3", label: "Min inference, cut" },
  { value: 500, suffix: "+", label: "Docs in RAG pipeline" },
  { value: 5, suffix: "", label: "Products built" },
];

export type Skill = { name: string; icon: IconType };
export type SkillGroup = { title: string; blurb: string; color: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "AI & ML",
    blurb: "Making models useful, cheap and fast.",
    color: "#cdfa4c",
    skills: [
      { name: "RAG", icon: TbBrain },
      { name: "Vector DBs", icon: TbVectorTriangle },
      { name: "LangChain", icon: SiLangchain },
      { name: "Fine-tuning", icon: TbBraces },
    ],
  },
  {
    title: "Backend",
    blurb: "APIs, queues and streams that don't page me.",
    color: "#22d3ee",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Node", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "Java", icon: SiOpenjdk },
      { name: "Kafka", icon: SiApachekafka },
      { name: "Celery", icon: SiCelery },
    ],
  },
  {
    title: "Frontend",
    blurb: "Interfaces that feel simple on purpose.",
    color: "#f472b6",
    skills: [
      { name: "React", icon: SiReact },
      { name: "React Native", icon: TbBrandReactNative },
      { name: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    title: "Data & Infra",
    blurb: "Where the state and the GPUs live.",
    color: "#8b5cf6",
    skills: [
      { name: "SQL", icon: TbDatabase },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
      { name: "Docker", icon: SiDocker },
      { name: "Nginx", icon: SiNginx },
      { name: "Grafana", icon: SiGrafana },
      { name: "System Design", icon: TbVectorBezier },
    ],
  },
];

export const journey = [
  { year: "11th", title: "Arduino & C++", text: "Sensor-based projects and learning hardware the hard way." },
  { year: "B.E.", title: "Java & DSA", text: "Arrays, stacks, queues and trees — the foundations." },
  { year: "ML", title: "Data science", text: "Machine learning, deep learning and NLP on small projects." },
  { year: "MERN", title: "Real applications", text: "Moved into full-stack development to build things people use." },
  { year: "Design", title: "System design", text: "Pipelines, distributed systems and architecture." },
  { year: "SDE", title: "Mobile & web engineer", text: "First professional role, shipping apps end to end." },
  { year: "AI", title: "AI Engineer", text: "AI systems, distributed pipelines and GPU-powered workflows." },
  { year: "Now", title: "Edtech, fintech, large-scale AI", text: "Exploring where the hard problems are." },
];

export const education = [
  { label: "B.E. Computer Engineering", value: "8.65 CGPA" },
  { label: "12th (HSC)", value: "78%" },
  { label: "10th (SSC)", value: "91%" },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  points: string[];
  tags: string[];
  url?: string;
  kind: "Project" | "Freelance";
  gradient: string;
};

export const projects: Project[] = [
  {
    name: "RAG QnA System",
    tagline: "An AI that reads before it answers.",
    description:
      "A full retrieval-augmented pipeline that turns a pile of documents into something you can talk to — grounded answers, no random hallucinations.",
    points: [
      "Ingests 500+ documents and answers in under 4 seconds",
      "LLMs + vector databases keep answers grounded in real data",
      "Fault tolerance across multiple backends",
    ],
    tags: ["Python", "RAG", "Vector DB", "LLM"],
    kind: "Project",
    gradient: "from-[#cdfa4c]/25 via-[#22d3ee]/10 to-transparent",
  },
  {
    name: "Doctor Appointment System",
    tagline: "Booking that hurts less than the appointment.",
    description:
      "Full-stack scheduling for doctors and patients — availability, bookings and user flow, without the double-booked slots.",
    points: [
      "Backend APIs for appointments, availability and user data",
      "Solved slot conflicts and booking consistency",
      "Simple, fast and actually usable",
    ],
    tags: ["MERN", "REST", "Auth"],
    kind: "Project",
    gradient: "from-[#22d3ee]/25 via-[#8b5cf6]/10 to-transparent",
  },
  {
    name: "Wanderlust",
    tagline: "Explore places instead of just dreaming.",
    description:
      "A MERN travel platform where users browse, list and explore properties — Airbnb-shaped, built from scratch.",
    points: [
      "Authentication, CRUD and dynamic UI",
      "Browse, list and explore locations",
      "Clean, intuitive experience",
    ],
    tags: ["MongoDB", "Express", "React", "Node"],
    kind: "Project",
    gradient: "from-[#f472b6]/25 via-[#f59e0b]/10 to-transparent",
  },
  {
    name: "Best Choice Tutors",
    tagline: "Students find tutors. Nobody ghosts.",
    description:
      "A live platform connecting students with tutors, with flows for session booking, discovery and onboarding.",
    points: [
      "Designed booking, discovery and onboarding flows",
      "Built with both learners and tutors in mind",
      "Real users, real problems",
    ],
    tags: ["Freelance", "Full-stack", "Live"],
    url: "https://www.bestchoicetutors.com/",
    kind: "Freelance",
    gradient: "from-[#8b5cf6]/25 via-[#f472b6]/10 to-transparent",
  },
  {
    name: "PG Patil",
    tagline: "From word of mouth to Google search.",
    description:
      "A portfolio site for my father's sugar-industry business — taking years of experience and awards from offline to online.",
    points: [
      "Builds trust instantly for new clients",
      "Simplicity, clarity and credibility over flash",
      "Digital visibility for a traditionally offline industry",
    ],
    tags: ["Freelance", "Web", "Live"],
    url: "https://atharventerprise.co.in/",
    kind: "Freelance",
    gradient: "from-[#cdfa4c]/20 via-[#8b5cf6]/10 to-transparent",
  },
];

export const socials = {
  email: "atharvpatil322@gmail.com",
  phone: "9325654085",
  github: "https://github.com/Atharvpatil322",
  linkedin: "https://www.linkedin.com/in/atharv-patil-b305231ab/",
};
