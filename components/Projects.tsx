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
    problem: string[];
    solution: string[];
    outcome: string[];
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
    image: "FitnessDashboard1.png",
    imageColor: "from-blue-900 to-blue-700",
    caseStudy: {
      problem: [
        "Tracking progress for 45 athletes was done manually with no centralized reporting system.",
        "Athlete performance trends (1RM, mobility, training phase progress) were not visible over time.",
        "Manual monthly reporting required ~8 hours/week."
      ],
      solution: [
        "Built an automated Power BI dashboard connected to SharePoint.",
        "Developed ETL transformations and 17 DAX measures for performance tracking.",
        "Added interactive filters and automated reporting."
      ],
      outcome: [
        "Reduced reporting workload by ~8 hours per week.",
        "Enabled real-time tracking of 45 athletes.",
        "Improved athlete communication and retention."
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
    image: "data_architecture.png",
    imageColor: "from-purple-900 to-purple-700",
    caseStudy: {
      problem: [
        "Operational data arrived with inconsistent formats and duplicates.",
        "Analysts spent hours manually cleaning datasets.",
        "No centralized analytical dataset existed."
      ],
      solution: [
        "Designed a Medallion Architecture warehouse (Bronze → Silver → Gold).",
        "Built ETL pipelines to clean and standardize datasets.",
        "Created indexed SQL views for reporting queries."
      ],
      outcome: [
        "Improved analytical query speed from ~30s to ~1s.",
        "Saved ~12 hours/week of analyst preprocessing time.",
        "Created a reliable single source of truth."
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
    image: "Summary-Dashboard.png",
    imageColor: "from-emerald-900 to-emerald-700",
    caseStudy: {
      problem: [
        "HR lacked visibility into attrition and performance trends.",
        "Turnover was increasing but causes were unclear.",
        "Quarterly reporting required manual PowerPoint preparation."
      ],
      solution: [
        "Built a Power BI HR analytics dashboard.",
        "Integrated SQL datasets with Power Query transformations.",
        "Created Python preprocessing scripts and DAX KPIs."
      ],
      outcome: [
        "Identified high-risk attrition segments.",
        "Enabled targeted retention strategies.",
        "Saved ~6 hours per reporting cycle."
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

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of real-world data analytics and engineering projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projects.map((project) => (
            <Card
              key={project.title}
              className="cursor-pointer hover:shadow-md transition"
              onClick={() => setSelectedProject(project)}
            >
              <div className="w-full h-56 overflow-hidden">
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

              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

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

      <ProjectModal
        project={selectedProject}
        open={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
