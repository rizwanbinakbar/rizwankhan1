import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Github, ExternalLink, LayoutDashboard } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live?: string;
  image?: string;
  imageColor: string;
  caseStudy: {
    problem: string;
    solution: string;
    outcome: string;
  };
}

const projects: Project[] = [
  {
    title: "Athlete Performance Tracking Dashboard",
    description:
      "Built a Power BI dashboard for a fitness coach tracking 45 athletes, calculating 1RM progress, mobility scores, and training phase comparisons. Automated monthly reporting, saving 8 hours/week and improving decision visibility.",
    tags: ["Power BI", "SharePoint", "Data Visualization", "Data Modeling", "ETL"],
    github:
      "https://github.com/rizwanbinakbar/Athlete-Performance-Tracking-Dashboard",
    live:
      "https://rizwanbinakbar.notion.site/r?p=31540e4cba6880b6a069ed93d0489cb1&pm=c",
    image: "/FitnessDashboard1.png",
    imageColor: "from-blue-900 to-blue-700",
    caseStudy: {
      problem:
        "A fitness coach managing 45 athletes had no centralized system to track individual progress across training cycles. Performance data was scattered across spreadsheets, making it nearly impossible to compare athletes, identify plateaus, or prepare monthly reports without spending hours on manual compilation. Decisions were reactive rather than data-driven, and the coach struggled to communicate progress clearly to athletes and stakeholders.",
      solution:
        "I designed and built a Power BI dashboard connected to SharePoint as the data source. The solution included a custom ETL pipeline that cleaned and transformed raw training logs into structured analytical tables. Key metrics such as 1RM (one-rep max) progress, mobility scores, and phase-by-phase performance comparisons were calculated using DAX measures. Interactive filters let the coach drill down by athlete, date range, and training phase. Automated monthly report generation was configured via Power BI's scheduled refresh and export features.",
      outcome:
        "Monthly reporting time dropped from 8+ hours to near zero. The coach gained real-time visibility into every athlete's progress and could spot underperformers early. Athlete-facing reports improved communication and accountability, and the data-driven approach led to better periodization decisions across all training groups.",
    },
  },
  {
    title: "SQL Data Warehouse",
    description:
      "Built a layered data warehouse using Medallion Architecture, transforming raw datasets into clean analytical tables and generating insights with optimized SQL queries.",
    tags: ["SQL", "ETL", "Medallion Architecture", "MySQL"],
    github: "https://github.com/rizwanbinakbar/Sql-Data-warehouse-Project",
    live:
      "https://rizwanbinakbar.notion.site/r?p=2bd40e4cba6881ed90f1e1b2dba3947c&pm=c",
    image: "/data_architecture.png",
    imageColor: "from-purple-900 to-purple-700",
    caseStudy: {
      problem:
        "Raw operational datasets were arriving from multiple sources in inconsistent formats — different date conventions, missing values, duplicate records, and no unified schema. Analysts had to manually clean data before every query, leading to wasted time, inconsistent results, and a lack of trust in the numbers. There was no single source of truth for reporting.",
      solution:
        "I implemented a Medallion Architecture data warehouse in MySQL with three distinct layers: Bronze (raw ingestion with minimal transformation), Silver (cleaned, deduplicated, and standardized tables), and Gold (business-ready aggregated tables optimized for analytical queries). ETL scripts handled incremental loads, type casting, and null handling. A library of optimized SQL views and stored procedures was built on top of the Gold layer for common reporting use cases.",
      outcome:
        "Query performance improved significantly thanks to indexed Gold-layer tables. Analysts now work from a consistent, trusted dataset with zero manual cleaning required. The warehouse supports ad-hoc analysis and scheduled reports, and the modular architecture makes it easy to add new data sources without disrupting existing pipelines.",
    },
  },
  {
    title: "HR Analytics Dashboard",
    description:
      "Power BI dashboard analyzing employee performance, attrition trends, and workforce demographics to support HR decision-making and planning.",
    tags: ["Python", "SQL", "Power BI", "ETL", "Power Query"],
    github: "https://github.com/rizwanbinakbar/HR-Analytics-Dashboard",
    live:
      "https://rizwanbinakbar.notion.site/r?p=2bd40e4cba6881828107f31847dcbceb&pm=c",
    image: "/Summary-Dashboard.png",
    imageColor: "from-emerald-900 to-emerald-700",
    caseStudy: {
      problem:
        "The HR team had access to raw employee data but lacked any analytical tooling to understand workforce trends. Attrition was rising but the causes were unclear — HR couldn't tell which departments, roles, or demographics were most at risk. Performance reviews were disconnected from retention data, and headcount planning was done entirely on gut feel. Leadership needed evidence-based insights to design better retention strategies.",
      solution:
        "I built a comprehensive HR Analytics Dashboard in Power BI, pulling data from SQL databases and transforming it with Power Query and Python preprocessing scripts. The dashboard covered three main areas: Attrition Analysis (turnover rates by department, tenure, age group, and salary band), Performance Overview (ratings distribution, high-performer identification, and manager effectiveness), and Workforce Demographics (headcount trends, diversity metrics, and role distribution). DAX was used for KPIs such as voluntary turnover rate, average tenure, and performance-to-attrition correlation.",
      outcome:
        "HR leadership identified that mid-level employees in the Sales department with below-average compensation had a 3× higher attrition rate than the company average. Targeted retention initiatives were launched for that segment. The dashboard became the standard reporting tool for quarterly HR reviews, replacing manual PowerPoint decks and saving the HR team approximately 6 hours per reporting cycle.",
    },
  },
];

// ─── Project Case Study Modal ────────────────────────────────────────────────

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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl leading-snug">{project.title}</DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-md object-cover max-h-52"
          />
        )}

        <div className="space-y-5 mt-2">
          <div>
            <h4 className="font-semibold text-base mb-1.5">🔍 Problem</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {project.caseStudy.problem}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-base mb-1.5">🛠 Solution</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {project.caseStudy.solution}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-base mb-1.5">✅ Outcome</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {project.caseStudy.outcome}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button variant="outline" size="sm" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-1.5 h-4 w-4" />
              Code
            </a>
          </Button>
          {project.live && (
            <Button size="sm" asChild>
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-4 w-4" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of real-world data analytics and engineering projects I've built.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
          {projects.map((project) => (
            <Card
              key={project.title}
              role="button"
              tabIndex={0}
              aria-label={`View case study for ${project.title}`}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) return;
                setSelectedProject(project);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              className="flex flex-col border bg-card hover:shadow-md hover:border-primary/40 transition-all duration-200 cursor-pointer overflow-hidden p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >

              {/* Project Image */}
              <div className="w-full h-56 overflow-hidden flex-shrink-0">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${project.imageColor} flex items-center justify-center`}
                  >
                    <LayoutDashboard className="h-16 w-16 text-white/30" />
                  </div>
                )}
              </div>

              {/* Card Header */}
              <CardHeader className="pt-5">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              {/* Tags */}
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              {/* Footer Buttons */}
              <CardFooter className="gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-1.5 h-4 w-4" />
                    Code
                  </a>
                </Button>

                {project.live && (
                  <Button size="sm" asChild>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-1.5 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                )}
              </CardFooter>

            </Card>
          ))}
        </div>

      </div>

      {/* Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        open={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
