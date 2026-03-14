import { Badge } from "./ui/badge";

const experiences = [
  {
    role: "Data Analyst",
    company: "HashTurn",
    period: "2024 – Present",
    location: "Pakistan",
    description:
      "Built end-to-end ETL pipelines, designed Medallion Architecture data models, and developed Power BI dashboards, improving data reliability, freshness, and reporting efficiency by 30–35%, while presenting insights to international stakeholders to accelerate decisions by 20%.",
    tags: ["SQL", "Power BI", "Python", "AWS", "PySpark"],
  },
  {
    role: "Freelance Power BI Developer",
    company: "Self-Employed",
    period: "2024 – Present",
    location: "Remote",
    description:
      "Delivered insight-driven presentations to international clients, accelerating decision-making and improving stakeholder clarity by 20% (based on PM feedback).",
    tags: ["Power BI", "SQL", "Python", "Azure", "PySpark"],
  }
];

export function Experience() {
  return (
    <section className="py-24 px-4 bg-secondary/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My journey building solutions that matters.
          </p>
        </div>

        <div className="relative border-l border-border pl-8 space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative animate-fade-in-up">
              {/* CIRCLE COLOR UPDATED TO NAVY BLUE BELOW */}
              <span className="absolute -left-[2.6rem] flex h-5 w-5 items-center justify-center rounded-full bg-[#2c4c9c] ring-4 ring-background" />
              
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
