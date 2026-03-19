export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  points: string[];
};

export const experiences: Experience[] = [
  {
    company: "Servein Technologies",
    role: "AI Engineer",
    period: "July 2025 – Present",
    description: "Building AI systems that ship content while keeping GPUs and cloud bills under control.",
    points: [
      "Built a fully automated AI pipeline that generates educational text and videos — Celery workers, Redis queues, and a lot of background jobs quietly doing the heavy lifting.",
      "Plugged diffusion models into the video generation pipeline so lessons don’t just talk at you, they actually look good on screen.",
      "Took ML models from 14 minutes inference → 3 minutes using quantization and CUDA‑accelerated OpenCV (my GPU finally felt appreciated).",
      "Designed a cloud‑agnostic GPU architecture so we can hop clouds without rewriting the whole stack.",
      "Orchestrated cloud GPU workers for video rendering and built an auto‑destruction system that kills idle instances (cloud bills cried less afterwards).",
      "Built a RAG‑powered AI tutor that pulls lesson context from a vector store so the AI actually knows what it’s talking about.",
      "Juggled multiple LLMs (GPT‑4, Gemini, Claude) with failover, retries, and cost tracking so production didn’t become a surprise invoice.",
      "Researched a tricky edtech delivery problem, wrote the BRD/FRD/PRD, then shipped an architecture that serves interactive content in seconds instead of minutes.",
      "Added granular learner analytics for multiple universities so instructors can see who’s actually engaging, not just who logged in.",
      "Hooked up Grafana monitoring so GPU, queue, and model metrics are visible before something explodes.",
      "Used Nginx as a smart proxy router in front of model and media services to keep routing, SSL, and rate limiting tidy.",
      "Used ngrok tunnels to sneak past remote access restrictions during early prototyping and debugging.",
      "Built GPU lifecycle management and cost‑optimization workflows so idle cards get recycled instead of just burning cash.",
      "Introduced “vibe coding”‑inspired productivity flows — short, focused build loops with quick feedback for the whole team.",
      "Built a B2B2C learning delivery platform so universities can distribute courses and track learner engagement without living in spreadsheets.",
    ],
  },
  {
    company: "Brad Technology",
    role: "Software Development Engineer",
    period: "June 2024 – June 2025",
    description: "Backend-heavy work for an event-driven dating app (yes, really) built on Kafka and a lot of async glue.",
    points: [
      "Built backend systems for an event‑based dating platform where users meet people attending the same events — matchmaking, but with APIs.",
      "Glued together an event‑driven architecture using Apache Kafka so every booking, swipe, and match flows through a clean stream.",
      "Implemented real‑time chat and user discovery based on shared interests and bookings (messages delivered faster than feelings).",
      "Shipped a feature that notifies you when someone checks your profile, designed as a women‑first privilege to keep things safer and less spammy.",
      "Built a recommendation engine that learns from swipe data (left/right) to surface better matches instead of random faces.",
      "Implemented API rate limiting at the edge to keep the backend sane when the app gets excited traffic spikes.",
      "Built and wired a LangChain chatbot so common user questions get answered instantly without paging a human.",
      "Improved admin dashboards for user insights and platform analytics — less spreadsheet export, more live analytics.",
      "Tuned infrastructure and push pipelines so notifications land reliably instead of “maybe sometime later, who knows”.",
    ],
  },
];

