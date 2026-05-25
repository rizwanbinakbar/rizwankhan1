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
import { ExternalLink, Github, LayoutDashboard, Search } from "lucide-react";

interface Project {
  title: string;
  eyebrow: string;
  description: string;
  problem: string;
  role: string;
  tags: string[];
  github?: string;
  live?: string;
  image?: string;
  imageColor: string;
  caseStudy: {
    problem: string[];
    solution: string[];
    impact: ReactNode[];
  };
}

const projects: Project[] = [
  {
    title: "Athlete Performance Tracking Dashboard",
    eyebrow: "Power BI case study",
    description: "A reporting system for a fitness coach managing athlete progress across training phases.",
    problem: "Manual tracking made it hard to see progress trends, prepare reports, and communicate performance clearly.",
    role: "Designed the dashboard model, Power BI report, SharePoint-connected workflow, DAX measures, and reporting views.",
    tags: ["Power BI", "SharePoint", "DAX", "ETL", "Data Modeling"],
    github: "https://github.com/rizwanbinakbar/Athlete-Performance-Tracking-Dashboard",
    live: "https://rizwanbinakbar.notion.site/r?p=31540e4cba6880b6a069ed93d0489cb1&pm=c",
    image: "/FitnessDashboard1.png",
    imageColor: "from-slate-900 to-blue-900",
    caseStudy: {
      problem: [
        "Tracking progress for 45 athletes was handled manually with no centralized reporting layer.",
        "Strength, mobility, and phase progress were difficult to compare over time.",
        "Monthly reporting required repeated manual analysis before the coach could share updates.",
      ],
      solution: [
        "Built a Power BI dashboard connected to SharePoint to centralize athlete performance data.",
        "Created ETL transformations and 17 DAX measures for 1RM progression, mobility scores, and phase comparisons.",
        "Designed interactive filters and reporting pages so the coach could review athlete-level and group-level progress.",
      ],
      impact: [
        <>Reduced recurring reporting work by roughly 8 hours per week based on the project workflow.</>,
        <>Gave the coach a cleaner way to monitor 45 athletes and explain progress to clients.</>,
        <>Improved the quality and consistency of monthly performance communication.</>,
      ],
    },
  },
  {
    title: "SQL Data Warehouse / Medallion Architecture",
    eyebrow: "Data engineering project",
    description: "A layered SQL warehouse that converts messy source data into reporting-ready analytical views.",
    problem: "Raw data arrived with inconsistent schemas, duplicates, missing values, and no reliable analytical layer.",
    role: "Designed Bronze, Silver, and Gold layers, wrote transformation SQL, and prepared optimized reporting views.",
    tags: ["SQL", "MySQL", "ETL", "Data Warehouse", "Medallion Architecture"],
    github: "https://github.com/rizwanbinakbar/Sql-Data-warehouse-Project",
    live: "https://rizwanbinakbar.notion.site/r?p=2bd40e4cba6881ed90f1e1b2dba3947c&pm=c",
    image: "/data_architecture.png",
    imageColor: "from-slate-900 to-indigo-900",
    caseStudy: {
      problem: [
        "Data arrived from multiple sources with inconsistent formats, duplicates, and missing values.",
        "Analytical queries depended on repeated manual cleaning before reporting could start.",
        "There was no central dataset designed for repeatable BI or analytics work.",
      ],
      solution: [
        "Designed a Medallion Architecture warehouse in MySQL with Bronze, Silver, and Gold layers.",
        "Built ETL transformations to standardize schemas, remove duplicates, and handle missing values.",
        "Created optimized SQL views and indexed analytical tables for downstream reporting queries.",
      ],
      impact: [
        <>Improved selected reporting queries from roughly 30 seconds to around 1 second in the project environment.</>,
        <>Reduced repeated preprocessing work by preparing reusable clean layers.</>,
        <>Created a clearer source of truth for analytics and dashboard development.</>,
      ],
    },
  },
  {
    title: "HR Analytics Dashboard",
    eyebrow: "Analytics dashboard",
    description: "A Power BI dashboard for understanding attrition, workforce demographics, and performance patterns.",
    problem: "HR reporting was scattered across files, making it difficult to identify attrition patterns and explain trends.",
    role: "Prepared datasets, modeled KPIs, built DAX measures, and designed Power BI views for HR analysis.",
    tags: ["Power BI", "SQL", "Python", "Power Query", "DAX"],
    github: "https://github.com/rizwanbinakbar/HR-Analytics-Dashboard",
    live: "https://rizwanbinakbar.notion.site/r?p=2bd40e4cba6881828107f31847dcbceb&pm=c",
    image: "/Summary-Dashboard.png",
    imageColor: "from-slate-900 to-emerald-900",
    caseStudy: {
      problem: [
        "HR lacked a single place to inspect attrition trends, performance distribution, and workforce demographics.",
        "Turnover was increasing, but the likely segments and drivers were not easy to isolate.",
        "Quarterly reporting required manual aggregation before insights could be presented.",
      ],
      solution: [
        "Developed a Power BI dashboard that combines SQL datasets with Power Query transformations.",
        "Used Python preprocessing and DAX measures for attrition, tenure, demographics, and performance KPIs.",
        "Built interactive pages for workforce overview, performance analysis, and retention exploration.",
      ],
      impact: [
        <>Identified a high-risk attrition segment in the sample HR dataset.</>,
        <>Made department, tenure, compensation, and performance patterns easier to compare.</>,
        <>Reduced manual reporting work by turning repeated analysis into reusable dashboard views.</>,
      ],
    },
  },
];

function ProjectLinks({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.github && (
        <Button variant="outline" size={compact ? "sm" : "default"} asChild>
          <a href={project.github} target="_blank" rel="noreferrer">
            <Github className="mr-2 h-4 w-4" />
            Code
          </a>
        </Button>
      )}
      {project.live && (
        <Button size={compact ? "sm" : "default"} asChild>
          <a href={project.live} target="_blank" rel="noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Details
          </a>
        </Button>
      )}
    </div>
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
      <DialogContent className="max-h-[92vh] overflow-y-auto p-0 sm:max-w-4xl">
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-secondary/50 p-4 sm:p-6">
            <div className="overflow-hidden rounded-2xl border border-border bg-background">
              {project.image ? (
                <img src={project.image} alt={`${project.title} screenshot`} className="h-full max-h-[420px] w-full object-cover" />
              ) : (
                <div className={`flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${project.imageColor}`}>
                  <LayoutDashboard className="h-16 w-16 text-white/45" />
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <DialogHeader>
              <p className="section-kicker">{project.eyebrow}</p>
              <DialogTitle className="text-2xl leading-tight sm:text-3xl">{project.title}</DialogTitle>
              <DialogDescription className="text-base leading-7">{project.description}</DialogDescription>
            </DialogHeader>

            <div className="mt-7 grid gap-6">
              <div>
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-foreground">Problem</h4>
                <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                  {project.caseStudy.problem.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-foreground">Solution</h4>
                <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                  {project.caseStudy.solution.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-foreground">Impact</h4>
                <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                  {project.caseStudy.impact.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <ProjectLinks project={project} compact />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [featured, ...rest] = projects;

  return (
    <div className="section-shell bg-section-dark px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="section-heading">
          <p className="section-kicker">Selected Work</p>
          <h2>Case studies with real data work behind them.</h2>
          <p>
            These projects show how I think through reporting problems: define the messy data issue, build a reliable
            workflow, and turn the output into something a stakeholder can actually read.
          </p>
        </div>

        <Card className="premium-card overflow-hidden">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <button
              type="button"
              onClick={() => setSelectedProject(featured)}
              className="group relative min-h-[280px] overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Open case study for ${featured.title}`}
            >
              {featured.image ? (
                <img
                  src={featured.image}
                  alt={`${featured.title} screenshot`}
                  className="h-full min-h-[280px] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className={`flex h-full min-h-[280px] items-center justify-center bg-gradient-to-br ${featured.imageColor}`}>
                  <LayoutDashboard className="h-16 w-16 text-white/45" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 text-white">
                <span className="rounded-full bg-white/16 px-3 py-1 text-xs font-medium backdrop-blur">Featured case study</span>
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <Search className="h-4 w-4" />
                  Open
                </span>
              </div>
            </button>

            <CardContent className="flex flex-col justify-between p-6 sm:p-8">
              <div>
                <p className="section-kicker">{featured.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{featured.title}</h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{featured.description}</p>
                <div className="mt-5 rounded-2xl border border-border/80 bg-secondary/40 p-4">
                  <p className="text-sm font-semibold text-foreground">Problem solved</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{featured.problem}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button onClick={() => setSelectedProject(featured)}>
                  View Case Study
                  <Search className="ml-2 h-4 w-4" />
                </Button>
                <ProjectLinks project={featured} compact />
              </div>
            </CardContent>
          </div>
        </Card>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((project) => (
            <Card key={project.title} className="premium-card overflow-hidden">
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="group block w-full overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Open case study for ${project.title}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className={`flex h-full items-center justify-center bg-gradient-to-br ${project.imageColor}`}>
                      <LayoutDashboard className="h-16 w-16 text-white/45" />
                    </div>
                  )}
                </div>
              </button>
              <CardContent className="p-6">
                <p className="section-kicker">{project.eyebrow}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p>
                <div className="mt-4 rounded-2xl border border-border/80 bg-secondary/35 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">Problem solved</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.problem}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button size="sm" onClick={() => setSelectedProject(project)}>
                    View Case Study
                  </Button>
                  <ProjectLinks project={project} compact />
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
