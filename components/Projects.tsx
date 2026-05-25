import { useState, type ReactNode } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ExternalLink, Github, LayoutDashboard } from "lucide-react";

interface Project {
  title: string;
  summary: string;
  tags: string[];
  github?: string;
  live?: string;
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
    summary: "A Power BI dashboard for athlete progress tracking.",
    tags: ["Power BI", "SharePoint", "DAX", "ETL"],
    github: "https://github.com/rizwanbinakbar/Athlete-Performance-Tracking-Dashboard",
    live: "https://rizwanbinakbar.notion.site/r?p=31540e4cba6880b6a069ed93d0489cb1&pm=c",
    image: "/FitnessDashboard1.png",
    caseStudy: {
      problem: [
        "A coach was tracking 45 athletes manually with no single reporting view.",
        "Strength, mobility, and phase progress were hard to compare over time.",
        "Monthly reporting required repeated manual work before updates could be shared.",
      ],
      built: [
        "Built a Power BI dashboard connected to SharePoint data.",
        "Created ETL transformations and 17 DAX measures for progress, mobility, and phase comparisons.",
        "Designed filters and reporting pages for athlete-level and group-level review.",
      ],
      result: [
        <>Reduced repeated manual report prep.</>,
        <>Made athlete progress easier to review.</>,
        <>Kept monthly reporting more consistent.</>,
      ],
    },
  },
  {
    title: "SQL Data Warehouse / Medallion Architecture",
    summary: "A SQL project for cleaning and layering source data.",
    tags: ["SQL", "MySQL", "ETL", "Data Warehouse"],
    github: "https://github.com/rizwanbinakbar/Sql-Data-warehouse-Project",
    live: "https://rizwanbinakbar.notion.site/r?p=2bd40e4cba6881ed90f1e1b2dba3947c&pm=c",
    image: "/data_architecture.png",
    caseStudy: {
      problem: [
        "Raw data came from multiple sources with inconsistent formats, duplicates, and missing values.",
        "Analytical queries depended on repeated manual cleaning.",
        "There was no central dataset designed for repeatable BI work.",
      ],
      built: [
        "Designed Bronze, Silver, and Gold layers in MySQL.",
        "Wrote SQL transformations to standardize schemas, remove duplicates, and handle missing values.",
        "Prepared optimized analytical views for downstream reporting.",
      ],
      result: [
        <>Made selected reporting queries faster in the project setup.</>,
        <>Reduced repeated preprocessing work.</>,
        <>Created cleaner tables for dashboard development.</>,
      ],
    },
  },
  {
    title: "HR Analytics Dashboard",
    summary: "A Power BI dashboard for HR and attrition analysis.",
    tags: ["Power BI", "SQL", "Python", "Power Query"],
    github: "https://github.com/rizwanbinakbar/HR-Analytics-Dashboard",
    live: "https://rizwanbinakbar.notion.site/r?p=2bd40e4cba6881828107f31847dcbceb&pm=c",
    image: "/Summary-Dashboard.png",
    caseStudy: {
      problem: [
        "HR reporting was scattered across files and hard to inspect quickly.",
        "Attrition patterns were difficult to compare by department, tenure, and compensation.",
        "Quarterly reporting required manual preparation before trends could be discussed.",
      ],
      built: [
        "Prepared data with SQL, Python, and Power Query transformations.",
        "Built DAX measures for attrition, tenure, demographics, and performance KPIs.",
        "Designed Power BI pages for workforce overview, performance analysis, and retention exploration.",
      ],
      result: [
        <>Identified a high-risk attrition segment in the sample HR dataset.</>,
        <>Made HR patterns easier to compare.</>,
        <>Turned repeated analysis into reusable dashboard views.</>,
      ],
    },
  },
];

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.github && (
        <Button variant="outline" size="sm" asChild>
          <a href={project.github} target="_blank" rel="noreferrer">
            <Github className="mr-2 h-4 w-4" />
            Code
          </a>
        </Button>
      )}
      {project.live && (
        <Button variant="outline" size="sm" asChild>
          <a href={project.live} target="_blank" rel="noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Details
          </a>
        </Button>
      )}
    </div>
  );
}

function SectionList({ title, items }: { title: string; items: ReactNode[] | string[] }) {
  return (
    <section>
      <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
        {items.map((item, index) => (
          <li key={index} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-orange" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ToolsList({ tools }: { tools: string[] }) {
  return (
    <section>
      <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">Tools</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {tools.map((tool) => (
          <Badge key={tool} variant="secondary">
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
      <DialogContent className="max-h-[92vh] overflow-y-auto p-0 sm:max-w-3xl">
        <div className="p-5 sm:p-7">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl font-normal leading-tight">{project.title}</DialogTitle>
            <DialogDescription className="text-base leading-7">{project.summary}</DialogDescription>
          </DialogHeader>

          {project.image && (
            <div className="mt-6 overflow-hidden rounded-xl border border-border bg-secondary">
              <img src={project.image} alt={`${project.title} screenshot`} className="max-h-[360px] w-full object-cover" />
            </div>
          )}

          <div className="mt-7 grid gap-6">
            <SectionList title="Problem" items={project.caseStudy.problem} />
            <SectionList title="What I built" items={project.caseStudy.built} />
            <ToolsList tools={project.tags} />
            <SectionList title="Result" items={project.caseStudy.result} />
          </div>

          <div className="mt-7">
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
          <p className="section-label">Projects</p>
          <h2>Projects first.</h2>
          <p>
            Short cards here. The useful detail lives inside each project.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.title} className="project-card">
              <CardContent className="flex h-full flex-col p-0">
                <button
                  type="button"
                  className="focus-ring block w-full overflow-hidden rounded-t-xl text-left"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`View details for ${project.title}`}
                >
                  <div className="aspect-[16/10] bg-secondary">
                    {project.image ? (
                      <img src={project.image} alt={`${project.title} screenshot`} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <LayoutDashboard className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                </button>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-semibold leading-snug tracking-tight">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-auto pt-6">
                    <Button variant="link" className="h-auto p-0 text-accent-orange" onClick={() => setSelectedProject(project)}>
                      View details
                      <ArrowIcon />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} open={selectedProject !== null} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

function ArrowIcon() {
  return <span className="ml-1.5" aria-hidden="true">-&gt;</span>;
}
