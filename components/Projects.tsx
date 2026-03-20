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
import { Github, ExternalLink, LayoutDashboard, Eye } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live?: string;
  image?: string;
  imageColor: string;
  caseStudy: {
    problem: string[];
    solution: string[];
    outcome: JSX.Element[];
  };
}

const projects: Project[] = [
  {
    title: "Athlete Performance Tracking Dashboard",
    description:
      "Used by a fitness coach managing 45 athletes to track and share athlete progress",
    tags: ["Power BI", "SharePoint", "Data Visualization", "Data Modeling", "ETL"],
    github:
      "https://github.com/rizwanbinakbar/Athlete-Performance-Tracking-Dashboard",
    live:
      "https://rizwanbinakbar.notion.site/r?p=31540e4cba6880b6a069ed93d0489cb1&pm=c",
    image: "/FitnessDashboard1.png",
    imageColor: "from-blue-900 to-blue-700",
    caseStudy: {
      problem: [
        "Tracking progress for 45 athletes was done manually with no centralized reporting system.",
        "Athlete performance trends (1RM, mobility, training phase progress) were not visible over time.",
        "Manual monthly reporting would require ~8 hours/week and made it difficult to justify premium coaching packages."
      ],
      solution: [
        "Built an automated Power BI dashboard connected to SharePoint to centralize athlete performance data.",
        "Developed ETL transformations and 17 DAX measures to calculate 1RM progression, mobility scores, and phase comparisons.",
        "Implemented interactive filters and automated monthly reporting to eliminate manual analysis."
      ],
      outcome: [
        <>Reduced reporting workload by <span className="font-bold text-green-600">~8 hours/week</span> through automated dashboards.</>,
        <>Enabled real-time tracking of 45 athletes, improving coaching decisions and performance monitoring.</>,
        <>Data-driven progress reports improved athlete communication and helped increase client retention (~20%).</>,
      ],
    },
  },

  {
    title: "SQL Data Warehouse",
    description:
      "Developed a layered data warehouse using Medallion Architecture with optimized analytical queries.",
    tags: ["SQL", "ETL", "Medallion Architecture", "MySQL"],
    github: "https://github.com/rizwanbinakbar/Sql-Data-warehouse-Project",
    live:
      "https://rizwanbinakbar.notion.site/r?p=2bd40e4cba6881ed90f1e1b2dba3947c&pm=c",
    image: "/data_architecture.png",
    imageColor: "from-purple-900 to-purple-700",
    caseStudy: {
      problem: [
        "Data arrived from multiple sources with inconsistent formats, duplicates, and missing values.",
        "Analysts spent hours manually cleaning data.",
        "No centralized analytical dataset existed."
      ],
      solution: [
        "Designed a Medallion Architecture warehouse (Bronze, Silver, Gold) in MySQL.",
        "Built ETL pipelines to standardize schemas, remove duplicates, and handle missing values.",
        "Created optimized SQL views and indexed analytical tables for reporting queries."
      ],
      outcome: [
        <>Improved query performance from ~30s to~1s.</>,
        <>Eliminated manual preprocessing and <span className="font-bold text-green-600">saved ~12 hours/week</span> of analyst time.</>,
        <>Established a reliable single source of truth for downstream analytics.</>,
      ],
    },
  },

  {
    title: "HR Analytics Dashboard",
    description:
      "Power BI dashboard analyzing employee performance, attrition, and workforce demographics.",
    tags: ["Python", "SQL", "Power BI", "ETL", "Power Query"],
    github: "https://github.com/rizwanbinakbar/HR-Analytics-Dashboard",
    live:
      "https://rizwanbinakbar.notion.site/r?p=2bd40e4cba6881828107f31847dcbceb&pm=c",
    image: "/Summary-Dashboard.png",
    imageColor: "from-emerald-900 to-emerald-700",
    caseStudy: {
      problem: [
        "HR lacked visibility into attrition trends, performance distribution, and workforce demographics.",
        "Employee turnover was increasing but the root causes were unclear.",
        "Quarterly reporting required manual PowerPoint preparation and data aggregation."
      ],
      solution: [
        "Developed a Power BI HR analytics dashboard integrating SQL datasets with Power Query transformations.",
        "Used Python preprocessing scripts and DAX measures to calculate attrition rates, tenure metrics, and performance KPIs.",
        "Built interactive dashboards for workforce demographics, performance analysis, and retention insights."
      ],
      outcome: [
        <>Identified a high-risk attrition segment (mid-level Sales employees with below-average compensation).</>,
        <>Enabled targeted retention strategies based on department and tenure analytics.</>,
        <>Replaced manual reporting workflows and <span className="font-bold text-green-600">saved ~ 6 hours</span> per quarterly reporting cycle.</>,
      ],
    },
  },
];

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
          <DialogTitle className="text-xl">{project.title}</DialogTitle>
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
            <h4 className="font-semibold mb-2">Problem</h4>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
              {project.caseStudy.problem.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Solution</h4>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
              {project.caseStudy.solution.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Outcome</h4>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
              {project.caseStudy.outcome.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button variant="outline" size="sm" asChild>
            <a href={project.github} target="_blank" rel="noreferrer">
              <Github className="mr-1.5 h-4 w-4" />
              Code
            </a>
          </Button>

          {project.live && (
            <Button 
              size="sm" 
              asChild 
              className="bg-[#2c4c9c] hover:bg-[#1e356e] text-white"
            >
              <a href={project.live} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-1.5 h-4 w-4 text-white" />
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

  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 gradient-text">Featured Projects</h2>
          <div className="section-accent-line" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-5">
            A selection of real-world data analytics and engineering projects.
          </p>
        </div>

        <div className="space-y-6">
          {/* Featured first project — full-width horizontal card */}
          <Card
            className="cursor-pointer overflow-hidden card-lift group border-2 hover:border-primary/50 transition-all duration-300"
            onClick={() => setSelectedProject(featured)}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image side */}
              <div className="relative lg:w-1/2 h-64 lg:h-80 overflow-hidden shrink-0">
                {featured.image ? (
                  <>
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 text-white font-semibold text-base">
                        <Eye className="h-5 w-5" />
                        <span>View Case Study</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${featured.imageColor} flex items-center justify-center`}>
                    <LayoutDashboard className="h-16 w-16 text-white/30" />
                  </div>
                )}
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1">
                  ★ Featured
                </Badge>
              </div>

              {/* Content side */}
              <div className="lg:w-1/2 flex flex-col justify-between p-6 lg:p-8">
                <div>
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl mb-2">{featured.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{featured.description}</CardDescription>
                  </CardHeader>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featured.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <p className="text-sm text-primary font-medium flex items-center gap-1.5 mt-4">
                    <Eye className="h-3.5 w-3.5" />
                    Click to view full case study
                  </p>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                    <a href={featured.github} target="_blank" rel="noreferrer">
                      <Github className="mr-1.5 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  {featured.live && (
                    <Button
                      size="sm"
                      asChild
                      className="bg-[#2c4c9c] hover:bg-[#1e356e] text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={featured.live} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-1.5 h-4 w-4 text-white" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Remaining project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((project) => (
              <Card
                key={project.title}
                className="cursor-pointer overflow-hidden card-lift group border hover:border-primary/50 transition-all duration-300"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image with overlay */}
                <div className="relative w-full h-56 overflow-hidden">
                  {project.image ? (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2 text-white font-semibold">
                          <Eye className="h-5 w-5" />
                          <span>View Case Study</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${project.imageColor} flex items-center justify-center`}>
                      <LayoutDashboard className="h-16 w-16 text-white/30" />
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="gap-3">
                  <Button variant="outline" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <Github className="mr-1.5 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  {project.live && (
                    <Button
                      size="sm"
                      asChild
                      className="bg-[#2c4c9c] hover:bg-[#1e356e] text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={project.live} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-1.5 h-4 w-4 text-white" />
                        Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        open={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
