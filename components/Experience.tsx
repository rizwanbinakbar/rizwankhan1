import { Badge } from "./ui/badge";

const experiences = [
  {
    role: "Data Analyst",
    organization: "HashTurn",
    period: "2024 - Present",
    location: "Pakistan",
    bullets: [
      "Support reporting work across SQL, Power BI, and Python.",
      "Build dashboard views, reporting datasets, and simple checks.",
      "Write notes that make the analysis easier to follow.",
    ],
    tools: ["SQL", "Power BI", "Python", "AWS", "PySpark"],
  },
  {
    role: "Independent Data Projects",
    organization: "Client and portfolio work",
    period: "2024 - Present",
    location: "Remote",
    bullets: [
      "Build dashboards from spreadsheets, SQL data, and client notes.",
      "Prepare reusable measures and reporting views.",
      "Document assumptions in plain language.",
    ],
    tools: ["Power BI", "SQL", "Python", "Power Query"],
  },
];

export function Experience() {
  return (
    <div className="section-wrap">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="section-heading">
          <p className="section-label">Experience</p>
          <h2>Experience.</h2>
          <p>Early data work across reporting, dashboards, and client-facing projects.</p>
        </div>

        <div className="grid gap-4">
          {experiences.map((experience) => (
            <article key={`${experience.role}-${experience.organization}`} className="quiet-card">
              <div className="grid gap-5 md:grid-cols-[280px_minmax(0,1fr)]">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{experience.role}</h3>
                  <p className="mt-1 text-sm font-medium text-accent-orange">{experience.organization}</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {experience.period} | {experience.location}
                  </p>
                </div>

                <div>
                  <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                    {experience.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-orange" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {experience.tools.map((tool) => (
                      <Badge key={tool} variant="outline">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
