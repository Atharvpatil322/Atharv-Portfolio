import { experiences } from "@/data/experience";

const skillNames = [
  "Java",
  "JavaScript",
  "Python",
  "SQL",
  "MongoDB",
  "React",
  "React Native",
  "Node",
  "Express",
  "FastAPI",
  "Redis",
  "Docker",
  "Kafka",
  "Celery",
  "RAG",
  "Vector DBs",
  "LangChain",
  "Fine-tuning",
  "System Design",
];

const journey = `My journey into tech started in 11th grade with Arduino Uno, where I built small sensor-based projects and learned C++ while figuring out hardware the hard way. In engineering, I began with Java and explored DSA through arrays, stacks, queues, and trees. Curiosity then led me into data science, working with machine learning, deep learning, and NLP on small projects. Wanting to build real-world applications, I moved into development using the MERN stack. This gradually evolved into an interest in system design, architecting pipelines and distributed systems. I began my professional journey as a Software Development Engineer working on mobile and web applications, then transitioned into an AI Engineer role, building AI systems, distributed pipelines, and GPU-powered workflows. Currently, I'm exploring domains like edtech, fintech, and large-scale AI systems.`;

const education = `10th (SSC): 91%. 12th (HSC): 78%. B.E. in Computer Engineering with a CGPA of 8.65.`;

const projects = `
1. RAG QnA Application (AI QnA System) - Built a full RAG pipeline ingesting 500+ documents, answering queries in under 4 seconds using LLMs + vector databases, with fault tolerance across multiple backends.
2. Doctor Appointment System - Full-stack system to manage doctor schedules, bookings, availability, and user flow, solving problems like slot conflicts and booking consistency.
3. Wanderlust - Full-stack travel platform (MERN) where users browse, list, and explore properties/locations, with authentication and CRUD operations.
4. Best Choice Tutors (freelance, live at bestchoicetutors.com) - Platform connecting students with tutors, with flows for session booking, discovery, and onboarding.
5. PG Patil (freelance, live at atharventerprise.co.in) - Portfolio site for his father's sugar-industry business, built to establish trust and digital visibility for a traditionally offline business.
`.trim();

const contact = `Email: atharvpatil322@gmail.com. GitHub: github.com/Atharvpatil322. LinkedIn: linkedin.com/in/atharv-patil-b305231ab.`;

function formatExperience() {
  return experiences
    .map(
      (exp) =>
        `- ${exp.role} at ${exp.company} (${exp.period}): ${exp.description}\n  Highlights: ${exp.points.join(" ")}`,
    )
    .join("\n");
}

export function buildProfileContext(): string {
  return `
ABOUT ATHARV PATIL

Bio: Atharv Patil is an AI Engineer and full-stack developer blending AI, backend engineering, and system design into products where solid architecture quietly powers simple user experiences. He likes taking messy, ambitious problems and turning them into systems that just work.

Journey into tech: ${journey}

Education: ${education}

Skills: ${skillNames.join(", ")}.

Work experience:
${formatExperience()}

Projects:
${projects}

Contact: ${contact}
`.trim();
}
