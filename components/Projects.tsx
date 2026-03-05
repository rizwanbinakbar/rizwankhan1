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
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "CloudDash",
    description:
      "A real-time cloud infrastructure monitoring dashboard with alerts, metrics, and multi-cloud support for AWS, GCP, and Azure.",
    tags: ["React", "Node.js", "WebSockets", "AWS", "Terraform"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "DevFlow",
    description:
      "An open-source CI/CD pipeline visualiser that integrates with GitHub Actions, GitLab CI, and Jenkins to give teams a unified view.",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "Docker"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "MarketPulse",
    description:
      "Full-stack e-commerce analytics platform offering real-time sales dashboards, inventory tracking, and AI-powered demand forecasting.",
    tags: ["Python", "FastAPI", "React", "Redis", "Recharts"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "ChatKit",
    description:
      "Embeddable live-chat widget with a customisable UI, WebSocket-based messaging, and a self-hosted backend option.",
    tags: ["React", "Node.js", "Socket.IO", "MongoDB"],
    github: "https://github.com",
    live: null,
  },
];

export function Projects() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of projects I've built or contributed to.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-animation">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="flex flex-col border bg-card hover:shadow-md transition-shadow"
            >
              <CardHeader>
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
                      Live
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
