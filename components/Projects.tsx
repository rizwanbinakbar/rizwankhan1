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
import { Github, ExternalLink, LayoutDashboard } from "lucide-react";

const projects = [
  {
    title: "Athlete Performance Tracking Dashboard",
    description:
      "Built a Power BI dashboard for a fitness coach tracking 45 athletes, calculating 1RM progress, mobility scores, and training phase comparisons. Automated monthly reporting, saved 8 hours/week, and contributed to a 20% increase in client retention.",
    tags: ["Power BI", "SharePoint", "Data Visualization", "Data Modeling", "ETL"],
    github: "https://github.com/rizwanbinakbar/Athlete-Performance-Tracking-Dashboard",
    live: "https://rizwanbinakbar.notion.site/r?p=31540e4cba6880b6a069ed93d0489cb1&pm=c",
    image: null,
    imageColor: "from-blue-900 to-blue-700",
  },
  {
    title: "DevFlow",
    description:
      "An open-source CI/CD pipeline visualiser that integrates with GitHub Actions, GitLab CI, and Jenkins to give teams a unified view.",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "Docker"],
    github: "https://github.com",
    live: "https://example.com",
    image: null,
    imageColor: "from-purple-900 to-purple-700",
  },
  {
    title: "MarketPulse",
    description:
      "Full-stack e-commerce analytics platform offering real-time sales dashboards, inventory tracking, and AI-powered demand forecasting.",
    tags: ["Python", "FastAPI", "React", "Redis", "Recharts"],
    github: "https://github.com",
    live: "https://example.com",
    image: null,
    imageColor: "from-emerald-900 to-emerald-700",
  },
  {
    title: "ChatKit",
    description:
      "Embeddable live-chat widget with a customisable UI, WebSocket-based messaging, and a self-hosted backend option.",
    tags: ["React", "Node.js", "Socket.IO", "MongoDB"],
    github: "https://github.com",
    live: null,
    image: null,
    imageColor: "from-orange-900 to-orange-700",
  },
];

export function Projects() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of projects I've built or contributed to.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="flex flex-col border bg-card hover:shadow-md transition-shadow overflow-hidden p-0"
            >
              {/* Project image header */}
              <div className="w-full h-48 overflow-hidden flex-shrink-0">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${project.imageColor} flex items-center justify-center`}>
                    <LayoutDashboard className="h-16 w-16 text-white/30" />
                  </div>
                )}
              </div>

              <CardHeader className="pt-5">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
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
    </section>
  );
}
