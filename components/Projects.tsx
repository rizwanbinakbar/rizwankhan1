import { useState, type ReactNode } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  summary: string;
  tags: string[];
  github?: string;
  live?: string;
  liveLabel?: string;
  image?: string;
  caseStudy: {
    problem: string[];
    built: string[];
    result: ReactNode[];
  };
}

const projects: Project[] = [
  {
    title: "Athlete Performance Tracking Dashboard",
    summary: "A Power BI reporting system for coach-led athlete progress review.",
    tags: ["Power BI", "SharePoint", "DAX", "ETL"],
    github: "https://github.com/rizwanbinakbar/Athlete-Performance-Tracking-Dashboard",
    live: "https://rizwanbinakbar.notion.site/r?p=31540e4cba6880b6a069ed93d0489cb1&pm=c",
    caseStudy: {
      problem: [
        "A coach was tracking 65+ athletes manually with no single reporting view.",
        "Strength, mobility, and phase progress were hard to compare over time.",
        "Monthly reporting required repeated manual preparation before updates could be shared.",
      ],
      built: [
        "Modeled SharePoint data into Power BI reporting views.",
        "Built ETL transformations for progress, mobility, and phase analysis.",
        "Created 17 DAX measures and filters for athlete-level and group-level review.",
      ],
      result: [
        <>Reduced repeated manual report preparation.</>,
        <>Made athlete progress easier to inspect across phases.</>,
        <>Kept monthly reporting more consistent.</>,
      ],
    },
  },
  {
    title: "SQL Data Warehouse / Medallion Architecture",
    summary: "A layered SQL warehouse that turns raw source data into reporting tables.",
    tags: ["SQL", "MySQL", "ETL", "Data Warehouse"],
    github: "https://github.com/rizwanbinakbar/Sql-Data-warehouse-Project",
    live: "https://rizwanbinakbar.notion.site/r?p=2bd40e4cba6881ed90f1e1b2dba3947c&pm=c",
    caseStudy: {
      problem: [
        "Raw data came from multiple sources with inconsistent formats, duplicates, and missing values.",
        "Analytical queries depended on repeated manual cleaning.",
        "There was no central dataset designed for repeatable BI work.",
      ],
      built: [
        "Designed Bronze, Silver, and Gold layers in MySQL.",
        "Wrote SQL transformations to standardize schemas, remove duplicates, and handle missing values.",
        "Prepared analytical views for downstream reporting and dashboard development.",
      ],
      result: [
        <>Reduced repeated preprocessing work.</>,
        <>Created cleaner tables for BI development.</>,
        <>Made selected reporting queries faster in the project setup.</>,
      ],
    },
  },
  {
    title: "HR Analytics Dashboard",
    summary: "A Power BI analysis workflow for attrition, tenure, and workforce reporting.",
    tags: ["Power BI", "SQL", "Python", "Power Query"],
    github: "https://github.com/rizwanbinakbar/HR-Analytics-Dashboard",
    live: "https://rizwanbinakbar.notion.site/r?p=2bd40e4cba6881828107f31847dcbceb&pm=c",
    caseStudy: {
      problem: [
        "HR reporting was scattered across files and hard to inspect quickly.",
        "Attrition patterns were difficult to compare by department, tenure, and compensation.",
        "Quarterly reporting required manual preparation before trends could be discussed.",
      ],
      built: [
        "Prepared data with SQL, Python, and Power Query transformations.",
        "Built DAX measures for attrition, tenure, demographics, and performance KPIs.",
        "Designed reusable Power BI views for workforce overview, performance analysis, and retention exploration.",
      ],
      result: [
        <>Identified a high-risk attrition segment in the sample HR dataset.</>,
        <>Made HR patterns easier to compare.</>,
        <>Turned repeated analysis into reusable dashboard views.</>,
      ],
    },
  },
  {
    title: "AI Chatbot - Father's Profession",
    summary: "A serverless LLM project embedded directly inside the portfolio.",
    tags: ["Gemini API", "Vercel Functions", "sessionStorage", "Prompt Engineering"],
    live: "/father-chatbot",
    liveLabel: "Live Demo",
    caseStudy: {
      problem: [
        "The assignment needed a public AI chatbot without a separate Streamlit app or iframe.",
        "The Gemini API key had to stay server-side.",
        "The chat needed temporary memory without a database or permanent storage.",
      ],
      built: [
        "Built a React chatbot route inside the existing Vite portfolio.",
        "Used a Vercel serverless function for secure LLM orchestration and Gemini API proxying.",
        "Stored temporary conversation state in sessionStorage for zero-latency stateless memory.",
        "Added a server-side profile fallback when Gemini is unavailable.",
      ],
      result: [
        <>Created a shareable AI course project at /father-chatbot.</>,
        <>Kept secrets out of the browser.</>,
        <>Made the answer source visible as Gemini, profile rule, or fallback.</>,
      ],
    },
  },
];

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-3">
      {project.github && (
        <Button variant="outline" size="sm" asChild>
          <a href={project.github} target="_blank" rel="noreferrer">
            <Github className="mr-2 h-4 w-4" />
            Source Code
          </a>
        </Button>
      )}
      {project.live && (
        <Button variant="outline" size="sm" asChild>
          <a
            href={project.live}
            target={project.live.startsWith("http") ? "_blank" : undefined}
            rel={project.live.startsWith("http") ? "noreferrer" : undefined}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            {project.liveLabel ?? "Case Notes"}
          </a>
        </Button>
      )}
    </div>
  );
}

function SectionList({ title, items }: { title: string; items: ReactNode[] | string[] }) {
  return (
    <section className="border-t border-border pt-5">
      <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</h4>
      <ul className="mt-4 grid gap-3 text-sm leading-7 text-foreground">
        {items.map((item, index) => (
          <li key={index} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
            <span className="text-xs font-bold text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ToolsList({ tools }: { tools: string[] }) {
  return (
    <section className="border-t border-border pt-5">
      <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Data Stack</h4>
      <div className="mt-4 flex flex-wrap gap-2">
        {tools.map((tool) => (
          <Badge key={tool} variant="outline">
            {tool}
          </Badge>
        ))}
      </div>
    </section>
  );
}

function ProjectModal({
  project,
  open,
  onClose,
}: {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-none border-border bg-card p-0 sm:max-w-4xl">
        <div className="p-5 sm:p-8">
          <DialogHeader>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Case Study</p>
            <DialogTitle className="mt-3 text-3xl font-bold leading-none tracking-[-0.04em] sm:text-5xl">
              {project.title}
            </DialogTitle>
            <DialogDescription className="max-w-2xl pt-3 text-base leading-7 text-muted-foreground">
              {project.summary}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8 grid gap-7">
            <ToolsList tools={project.tags} />
            <SectionList title="Problem" items={project.caseStudy.problem} />
            <SectionList title="Architecture / Build" items={project.caseStudy.built} />
            <SectionList title="Result" items={project.caseStudy.result} />
          </div>

          <div className="mt-8 border-t border-border pt-5">
            <ProjectLinks project={project} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="section-wrap">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="section-heading">
          <p className="section-label">Selected Work</p>
          <h2>Operational data systems, not portfolio decoration.</h2>
          <p>
            Case studies focused on reporting architecture, data preparation, and decision-ready outputs.
          </p>
        </div>

        <div className="border-t border-border">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="project-card grid gap-8 border-b border-border py-8 lg:grid-cols-[9rem_minmax(0,1fr)_18rem] lg:py-10"
            >
              <div className="text-sm font-bold text-muted-foreground">{String(index + 1).padStart(2, "0")}</div>

              <div>
                <button
                  type="button"
                  className="focus-ring text-left"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`View details for ${project.title}`}
                >
                  <h3 className="max-w-3xl text-2xl font-bold leading-none tracking-[-0.035em] text-foreground sm:text-4xl">
                    {project.title}
                  </h3>
                </button>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.slice(0, 5).map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start justify-between gap-5 lg:items-end">
                <Button variant="link" className="h-auto p-0 text-accent-orange" onClick={() => setSelectedProject(project)}>
                  View case study
                  <ArrowIcon />
                </Button>
                <ProjectLinks project={project} />
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} open={selectedProject !== null} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

function ArrowIcon() {
  return (
    <span className="ml-1.5" aria-hidden="true">
      -&gt;
    </span>
  );
}
