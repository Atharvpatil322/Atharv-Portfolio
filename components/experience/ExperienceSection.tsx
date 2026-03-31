"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experiences } from "@/data/experience";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import type { IconType } from "react-icons";
import {
  SiApachespark,
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
  SiVectorlogozone,
} from "react-icons/si";
import { TbBraces, TbDatabase, TbBrandReactNative, TbVectorBezier } from "react-icons/tb";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SkillItem = {
  name: string;
  icon: IconType;
};

export function ExperienceSection() {
  const [openCompany, setOpenCompany] = React.useState<string | null>(null);
  const [openJourney, setOpenJourney] = React.useState<boolean>(false);
  const [openEducation, setOpenEducation] = React.useState<boolean>(false);
  const [highlightJourney, setHighlightJourney] = React.useState<boolean>(false);
  const [openProjectsSection, setOpenProjectsSection] = React.useState<boolean>(false);
  const [openProjects, setOpenProjects] = React.useState<Record<string, boolean>>({});

  const projectGroups = [
    {
      title: "Projects That Somehow Worked",
      items: [
        {
          name: "RAG QnA Application",
          projectTitle: "AI QnA System (RAG)",
          description:
            "Built an AI system that actually reads before answering — no random hallucinations, just context-aware responses powered by vector search.",
          points: [
            "Built a full RAG pipeline that ingests 500+ documents and answers queries in under 4 seconds",
            "Used LLMs + vector databases so answers are grounded in real data, not imagination",
            "Designed a system that balances speed, accuracy, and scalability",
            "Added fault tolerance using multiple backends (because one DB failing is never fun)",
            "Basically turned documents into something you can talk to",
          ],
        },
        {
          name: "Doctor Appointment System",
          projectTitle: "Doctor Appointment System",
          description:
            "A system that makes booking a doctor feel less painful than the actual appointment.",
          points: [
            "Built a full-stack system to manage doctor schedules, bookings, and user flow",
            "Designed backend APIs for handling appointments, availability, and user data",
            "Focused on making the system simple, fast, and actually usable",
            "Solved real-world problems like slot conflicts and booking consistency",
            "Because no one likes double-booked appointments",
          ],
        },
        {
          name: "Wanderlust",
          projectTitle: "Wanderlust",
          description:
            "A travel platform where you can explore places... instead of just dreaming about them.",
          points: [
            "Built a full-stack travel platform using MERN stack",
            "Users can browse, list, and explore properties/locations",
            "Implemented authentication, CRUD operations, and dynamic UI",
            "Focused on building a clean and intuitive user experience",
            "Basically Airbnb... but built from scratch and a lot of features missing",
          ],
        },
      ],
    },
    {
      title: "Freelance Work (a.k.a real users, real problems)",
      items: [
        {
          name: "Best Choice Tutors",
          url: "https://www.bestchoicetutors.com/",
          description:
            "Built a platform where students find tutors... and tutors find students... and both stop ghosting each other (hopefully).",
          points: [
            "Developed a platform connecting students with tutors",
            "Designed flows for session booking, discovery, and onboarding",
            "Focused on usability + smooth user experience",
            "Built features keeping in mind both learners and tutors",
            "Tried solving the classic finding a good tutor problem",
          ],
        },
        {
          name: "PG Patil",
          url: "https://atharventerprise.co.in/",
          description:
            "Built a portfolio website for my father to take his work from “word of mouth” to “Google search” showcasing years of experience, achievements, and awards in an industry that’s still largely offline.",
          points: [
            "Built a portfolio platform to showcase his work, achievements, and awards in the sugar industry",
            "Took something that mostly lived in conversations and turned it into a digital presence",
            "Designed the site to build trust instantly for new clients discovering him online",
            "Focused on simplicity, clarity, and credibility rather than overcomplicating the UI",
            "A small step toward bringing digital visibility to a traditionally offline industry",
          ],
        },
      ],
    },
  ];

  const skills: SkillItem[] = [
    { name: "Java", icon: SiOpenjdk },
    { name: "JavaScript", icon: SiJavascript },
    { name: "Python", icon: SiPython },
    { name: "SQL", icon: TbDatabase },
    { name: "MongoDB", icon: SiMongodb },
    { name: "React", icon: SiReact },
    { name: "React Native", icon: TbBrandReactNative },
    { name: "Node", icon: SiNodedotjs },
    { name: "Express", icon: SiExpress },
    { name: "FastAPI", icon: SiFastapi },
    { name: "Redis", icon: SiRedis },
    { name: "Docker", icon: SiDocker },
    { name: "Kafka", icon: SiApachekafka },
    { name: "Celery", icon: SiCelery },
    { name: "RAG", icon: SiApachespark },
    { name: "Vector DBs", icon: SiVectorlogozone },
    { name: "LangChain", icon: SiLangchain },
    { name: "Fine-tuning", icon: TbBraces },
    { name: "System Design", icon: TbVectorBezier },
  ];

  return (
    <section
      id="experience"
      className="bg-white px-6 pb-12 text-black sm:px-10 sm:pb-16"
    >
      {highlightJourney && openJourney ? (
        <div
          className="pointer-events-none fixed inset-0 z-40 bg-white/20 backdrop-blur-sm"
          aria-hidden
        />
      ) : null}
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 flex items-end justify-between gap-6"
        >
          <div>
            <p className="text-xs font-medium tracking-wide text-black/50">
              Things I Built &amp; Broke (Experience)
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              War stories, but make it readable
            </h2>
          </div>
          <div className="hidden text-sm text-black/50 sm:block">
            Click a card to expand
          </div>
        </motion.div>

        <div className="mb-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          >
            <Card className="h-full transition-shadow hover:shadow-lg hover:shadow-black/5">
              <CardHeader className="pb-3">
                <button
                  type="button"
                  onClick={() =>
                    setOpenJourney((prev) => {
                      if (prev) setHighlightJourney(false);
                      return !prev;
                    })
                  }
                  className="block w-full text-left focus:outline-none"
                  aria-expanded={openJourney}
                >
                  <CardTitle className="text-sm font-semibold tracking-wide text-black/80">
                    Journey into Tech
                  </CardTitle>
                </button>
              </CardHeader>
              <AnimatePresence initial={false}>
                {openJourney ? (
                  <motion.div
                    key="journey-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <CardContent
                      className={`space-y-3 pt-0 text-sm leading-relaxed sm:text-[0.95rem] ${
                        highlightJourney ? "text-black/45" : "text-black/70"
                      }`}
                    >
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setHighlightJourney((prev) => !prev)}
                          aria-pressed={highlightJourney}
                          aria-label="Toggle journey highlights"
                          className={`relative z-50 inline-flex h-8 w-8 items-center justify-center rounded-md border transition ${
                            highlightJourney
                              ? "border-black/60 bg-black text-white"
                              : "border-black/15 bg-white text-black/70 hover:border-black/30 hover:text-black"
                          }`}
                          title="Highlight summary words"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 21h6" />
                            <path d="m13.4 4.6 6 6" />
                            <path d="m6.5 17.5 8.9-8.9a2.1 2.1 0 0 0 0-3l-1-1a2.1 2.1 0 0 0-3 0l-8.9 8.9L2 22l8.5-.5Z" />
                          </svg>
                        </button>
                      </div>
                      <p>
                        My journey into tech started in{" "}
                        <span
                          className={
                            highlightJourney
                              ? "relative z-50 bg-yellow-200/80 font-semibold text-black"
                              : "font-normal"
                          }
                        >
                          11th grade with Arduino Uno
                        </span>
                        , where I built small sensor-based projects and learned{" "}
                        <span
                          className={
                            highlightJourney
                              ? "relative z-50 bg-yellow-200/80 font-semibold text-black"
                              : "font-normal"
                          }
                        >
                          C++ while figuring out hardware the hard way
                        </span>
                        .
                      </p>
                      <p>
                        In engineering, I began with{" "}
                        <span
                          className={
                            highlightJourney
                              ? "relative z-50 bg-yellow-200/80 font-semibold text-black"
                              : "font-normal"
                          }
                        >
                          Java and explored DSA through arrays, stacks, queues, and trees
                        </span>
                        , solving problems and building a strong foundation in core concepts.
                      </p>
                      <p>
                        Curiosity then led me into{" "}
                        <span
                          className={
                            highlightJourney
                              ? "relative z-50 bg-yellow-200/80 font-semibold text-black"
                              : "font-normal"
                          }
                        >
                          data science, where I worked with machine learning, deep learning, and NLP
                          on small projects
                        </span>
                        , experimenting and learning how models behave.
                      </p>
                      <p>
                        Wanting to build real-world applications, I moved into{" "}
                        <span
                          className={
                            highlightJourney
                              ? "relative z-50 bg-yellow-200/80 font-semibold text-black"
                              : "font-normal"
                          }
                        >
                          development using the MERN stack, building APIs, databases, and fullstack
                          systems
                        </span>
                        , bringing ideas to life.
                      </p>
                      <p>
                        This gradually evolved into an interest in{" "}
                        <span
                          className={
                            highlightJourney
                              ? "relative z-50 bg-yellow-200/80 font-semibold text-black"
                              : "font-normal"
                          }
                        >
                          system design, where I started architecting pipelines and distributed systems
                        </span>
                        , learning through both failures and working solutions.
                      </p>
                      <p>
                        I began my professional journey as a{" "}
                        <span
                          className={
                            highlightJourney
                              ? "relative z-50 bg-yellow-200/80 font-semibold text-black"
                              : "font-normal"
                          }
                        >
                          Software Development Engineer working on mobile and web applications
                        </span>
                        , gaining hands-on experience in building production systems.
                      </p>
                      <p>
                        Later, I transitioned into an{" "}
                        <span
                          className={
                            highlightJourney
                              ? "relative z-50 bg-yellow-200/80 font-semibold text-black"
                              : "font-normal"
                          }
                        >
                          AI Engineer role, building AI systems, distributed pipelines, and GPU-powered
                          workflows
                        </span>
                        , working on real-world AI-driven products.
                      </p>
                      <p>
                        Currently, I&apos;m exploring{" "}
                        <span
                          className={
                            highlightJourney
                              ? "relative z-50 bg-yellow-200/80 font-semibold text-black"
                              : "font-normal"
                          }
                        >
                          domains like edtech, fintech, and large-scale AI systems, continuously
                          building and learning
                        </span>
                        , driven by curiosity.
                      </p>
                    </CardContent>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.07 }}
          >
            <Card className="h-full transition-shadow hover:shadow-lg hover:shadow-black/5">
              <button
                type="button"
                onClick={() => setOpenEducation((prev) => !prev)}
                className="block w-full text-left focus:outline-none"
                aria-expanded={openEducation}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold tracking-wide text-black/80">
                    Education
                  </CardTitle>
                </CardHeader>
              </button>
              <AnimatePresence initial={false}>
                {openEducation ? (
                  <motion.div
                    key="education-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <CardContent className="space-y-3 pt-0 text-sm leading-relaxed text-black/75 sm:text-[0.95rem]">
                      <p>
                        My academic journey has mostly been about figuring things out step by step
                        sometimes the planned way, sometimes the “why isn&apos;t this working?” way.
                      </p>
                      <p>
                        I completed my <span className="font-medium">10th (SSC)</span> with{" "}
                        <span className="font-medium">91%</span>, which at the time felt like a
                        pretty big achievement and probably the first moment I thought, “Okay, maybe
                        studying actually works.”
                      </p>
                      <p>
                        Then came <span className="font-medium">12th (HSC)</span> where I scored{" "}
                        <span className="font-medium">78%</span>. Let&apos;s just say that phase
                        involved a mix of studying, exploring random interests, and slowly realizing
                        that I enjoyed building things more than memorizing them.
                      </p>
                      <p>
                        Later I pursued a{" "}
                        <span className="font-medium">B.E. in Computer Engineering</span>, graduating
                        with a <span className="font-medium">CGPA of 8.65</span>. Engineering is
                        where things really started getting interesting: from learning programming,
                        experimenting and eventually discovering the fun (and chaos) of building real
                        systems and products.
                      </p>
                      <p>
                        Looking back, the marks are nice milestones, but the real learning came from
                        the projects, experiments, and countless hours spent debugging things that
                        refused to work.
                      </p>
                    </CardContent>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.03 }}
            >
              <ExperienceCard
                experience={exp}
                isOpen={openCompany === exp.company}
                onToggle={() =>
                  setOpenCompany((prev) => (prev === exp.company ? null : exp.company))
                }
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.06 }}
          className="mt-14"
        >
          <Card className="border-black/10 transition-shadow hover:shadow-lg hover:shadow-black/5">
            <CardHeader className="pb-3">
              <p className="text-xs font-medium tracking-wide text-black/50">Skills</p>
              <CardTitle className="mt-2 text-xl font-semibold tracking-tight text-black sm:text-2xl">
                Stack I ship with
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.02] px-3 py-1.5 text-sm text-black/80"
                    >
                      <Icon className="h-4 w-4 text-black/75" aria-hidden />
                      <span>{skill.name}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-black/60">
                ...and a lot more still to learn, <b>this list is always a work in progress.</b>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          className="mt-14"
        >
          <Card className="border-black/10 transition-shadow hover:shadow-lg hover:shadow-black/5">
            <button
              type="button"
              onClick={() => setOpenProjectsSection((prev) => !prev)}
              className="block w-full text-left focus:outline-none"
              aria-expanded={openProjectsSection}
            >
              <CardHeader className="pb-3">
                <p className="text-xs font-medium tracking-wide text-black/50">Projects</p>
                <CardTitle className="mt-2 text-xl font-semibold tracking-tight text-black sm:text-2xl">
                  Built, shipped, survived
                </CardTitle>
              </CardHeader>
            </button>

            <AnimatePresence initial={false}>
              {openProjectsSection ? (
                <motion.div
                  key="projects-section-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <CardContent className="space-y-7 pt-0">
                    {projectGroups.map((group) => {
                      const isFreelanceGroup = group.title.includes("Freelance Work");
                      return (
                      <div
                        key={group.title}
                        className={
                          isFreelanceGroup
                            ? "rounded-xl border border-black/10 bg-gradient-to-b from-black/[0.02] to-transparent p-3 sm:p-4"
                            : ""
                        }
                      >
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <h4 className="text-sm font-semibold tracking-wide text-black/80">
                            {group.title}
                          </h4>
                          {isFreelanceGroup ? (
                            <span className="inline-flex items-center rounded-full border border-black/15 bg-white px-2.5 py-1 text-[0.7rem] font-medium tracking-wide text-black/60">
                              Client Projects · {group.items.length}
                            </span>
                          ) : null}
                        </div>

                        <div className="space-y-3">
                          {group.items.map((item) => {
                            const projectKey = `${group.title}-${item.name}`;
                            const isOpen = Boolean(openProjects[projectKey]);
                            const isFreelanceItem = isFreelanceGroup && "url" in item;

                            return (
                              <div
                                key={item.name}
                                className={`rounded-lg border transition ${
                                  isFreelanceItem
                                    ? "border-black/15 bg-white shadow-sm shadow-black/5"
                                    : "border-black/10"
                                }`}
                              >
                                <div className="flex items-center gap-2 px-4 py-3">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setOpenProjects((prev) => ({
                                        ...prev,
                                        [projectKey]: !prev[projectKey],
                                      }))
                                    }
                                    className="block flex-1 text-left focus:outline-none"
                                    aria-expanded={isOpen}
                                  >
                                    <div className="flex items-center gap-2">
                                      <p className="text-base font-semibold tracking-tight text-black">
                                        {item.name}
                                      </p>
                                      {isFreelanceItem ? (
                                        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[0.68rem] font-medium uppercase tracking-wide text-emerald-700">
                                          Live
                                        </span>
                                      ) : null}
                                    </div>
                                  </button>
                                  {"url" in item ? (
                                    <a
                                      href={item.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label={`Open ${item.name} website`}
                                      title={`Open ${item.name}`}
                                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-black/15 text-black/70 transition hover:border-black/35 hover:bg-black/5 hover:text-black"
                                    >
                                      <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="M14 3h7v7" />
                                        <path d="M10 14 21 3" />
                                        <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                                      </svg>
                                    </a>
                                  ) : null}
                                </div>

                                <AnimatePresence initial={false}>
                                  {isOpen ? (
                                    <motion.div
                                      key={`${projectKey}-content`}
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25, ease: "easeOut" }}
                                      className="overflow-hidden"
                                    >
                                      <div className="space-y-3 px-4 pb-4 text-sm leading-relaxed text-black/70">
                                        {"projectTitle" in item ? (
                                          <p>
                                            <span className="font-medium text-black/85">Title: </span>
                                            {item.projectTitle}
                                          </p>
                                        ) : null}
                                        <p>{item.description}</p>
                                        <ul className="space-y-1.5">
                                          {item.points.map((point) => (
                                            <li key={point} className="flex gap-2">
                                              <span className="mt-[0.35rem] h-1.5 w-1.5 rounded-full bg-black/70" />
                                              <span>{point}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </motion.div>
                                  ) : null}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )})}
                  </CardContent>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

