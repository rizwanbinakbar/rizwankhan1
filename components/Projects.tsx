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
      "Built a Power BI dashboard for a fitness coach tracking 45 athletes and automating monthly reporting.",
    tags: ["Power BI", "SharePoint", "Data Visualization", "Data Modeling", "ETL"],
    github:
      "https://github.com/rizwanbinakbar/Athlete-Performance-Tracking-Dashboard",
    live:
      "https://rizwanbinakbar.notion.site/r?p=31540e4cba6880b6a069ed93d0489cb1&pm=c",
    image: "/FitnessDashboard1.png",
    imageColor: "from-blue-900 to-blue-700",
    caseStudy: {
      problem: [
        "No formal reporting system",
        "Athlete progress not visually tracked",
        "Hard to show measurable improvement",
        "Difficult to justify premium training packages",
        "Manual reporting would take ~8 hours per week"
      ],
      solution: [
        "Built a Power BI dashboard connected to SharePoint",
        "Designed ETL pipeline to clean raw training logs",
        "Created 17 DAX measures to calculate performance trends and training comparisons.",
        "Added interactive filters for athlete and training phase"
      ],
      outcome: [
        "Eliminated manual reporting (~8 hours saved per week)",
        "Increased client retention by an estimated 20% in the first month.",
        "Improved communication with athlete-facing reports",
        "Enabled data-driven training decisions"
      ],
    },
  },

  {
    title: "SQL Data Warehouse",
    description:
      "Built a layered data warehouse using Medallion Architecture with optimized analytical queries.",
    tags: ["SQL", "ETL", "Medallion Architecture", "MySQL"],
    github: "https://github.com/rizwanbinakbar/Sql-Data-warehouse-Project",
    live:
      "https://rizwanbinakbar.notion.site/r?p=2bd40e4cba6881ed90f1e1b2dba3947c&pm=c",
    image: "/data_architecture.png",
    imageColor: "from-purple-900 to-purple-700",
    caseStudy: {
      problem: [
        "Data arrived in inconsistent formats",
        "Duplicate and missing records in datasets",
        "Analysts manually cleaned data for every query",
        "No single source of truth for reporting"
      ],
      solution: [
        "Implemented Medallion Architecture (Bronze, Silver, Gold)",
        "Created ETL pipelines for cleaning and transformation",
        "Standardized schemas and handled missing values",
        "Built optimized SQL views for reporting"
      ],
      outcome: [
        "Improved query performance from 30 seconds to 1 second",
        "Eliminated manual data cleaning and ~saved 12 hours per week",
        "Created reliable datasets for analysts",
        "Enabled scalable addition of new data sources"
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
        "HR lacked analytical visibility into workforce data",
        "Attrition causes were unclear",
        "Performance reviews disconnected from retention",
        "Headcount planning was guess-based"
      ],
      solution: [
        "Built HR analytics dashboard in Power BI",
        "Integrated SQL datasets with Power Query transformations",
        "Used Python scripts for preprocessing",
        "Created DAX KPIs for attrition and tenure analysis"
      ],
      outcome: [
        "Identified high attrition segment in Sales department",
        "Enabled targeted retention initiatives",
        "Replaced manual PowerPoint reporting",
        "Saved ~6 hours per reporting cycle"
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

          {/* Problem */}
          <div>
            <h4 className="font-semibold mb-2">Problem</h4>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
              {project.caseStudy.problem.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div>
            <h4 className="font-semibold mb-2">Solution</h4>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
              {project.caseStudy.solution.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Outcome */}
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
            <a href={project.github} target="_blank">
              <Github className="mr-1.5 h-4 w-4" />
              Code
            </a>
          </Button>

          {project.live && (
            <Button size="sm" asChild>
              <a href={project.live} target="_blank">
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
                  <a href={project.github} target="_blank">
                    <Github className="mr-1.5 h-4 w-4" />
                    Code
                  </a>
                </Button>

                {project.live && (
                  <Button size="sm" asChild>
                    <a href={project.live} target="_blank">
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
