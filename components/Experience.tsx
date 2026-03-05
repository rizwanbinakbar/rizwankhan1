import { Badge } from "./ui/badge";

const experiences = [
  {
    role: "Senior Software Engineer",
    company: "TechCorp Inc.",
    period: "2022 – Present",
    location: "Remote",
    description:
      "Led the architecture and development of a microservices platform serving 2M+ daily users. Reduced deployment time by 60% through CI/CD automation.",
    tags: ["React", "Node.js", "AWS", "Kubernetes"],
  },
  {
    role: "Full-Stack Developer",
    company: "Startup Labs",
    period: "2020 – 2022",
    location: "New York, NY",
    description:
      "Built and shipped multiple SaaS products from 0 to 1. Designed REST and GraphQL APIs consumed by web and mobile clients.",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "GraphQL"],
  },
  {
    role: "Software Engineer",
    company: "Digital Agency Co.",
    period: "2018 – 2020",
    location: "San Francisco, CA",
    description:
      "Developed responsive web applications for enterprise clients. Collaborated closely with UX designers to deliver pixel-perfect interfaces.",
    tags: ["React", "Python", "Django", "Docker"],
  },
];

export function Experience() {
  return (
    <section className="py-24 px-4 bg-secondary/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My journey building software that matters.
          </p>
        </div>

        <div className="relative border-l border-border pl-8 space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative animate-fade-in-up">
              <span className="absolute -left-[2.6rem] flex h-5 w-5 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
              <div className="mb-1 flex flex-wrap items-center gap-3">
                <h3 className="font-semibold text-xl">{exp.role}</h3>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground font-medium">{exp.company}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {exp.period} · {exp.location}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
