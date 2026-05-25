import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const experiences = [
  {
    role: "Data Analyst",
    company: "HashTurn",
    period: "2024 - Present",
    location: "Pakistan",
    summary:
      "Work on reporting and data workflow tasks across SQL, Power BI, Python, and cloud-connected data sources.",
    details: [
      "Build dashboard views and reporting datasets for business and stakeholder review.",
      "Support ETL and data modeling work, including layered data preparation and data quality checks.",
      "Translate technical analysis into clearer reporting notes for non-technical stakeholders.",
    ],
    tools: ["SQL", "Power BI", "Python", "AWS", "PySpark"],
  },
  {
    role: "Independent Data Projects",
    company: "Client and portfolio work",
    period: "2024 - Present",
    location: "Remote",
    summary:
      "Deliver focused analytics projects for dashboards, reporting workflows, and SQL-based data preparation.",
    details: [
      "Create Power BI dashboards from messy spreadsheets, SQL datasets, and client-provided reporting requirements.",
      "Prepare reusable transformations, measures, and views so reports can be maintained after delivery.",
      "Document assumptions and workflow steps so clients understand how the reporting system works.",
    ],
    tools: ["Power BI", "SQL", "Python", "Power Query", "GitHub"],
  },
];

export function Experience() {
  return (
    <div className="section-shell bg-section-dark px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="section-heading">
          <p className="section-kicker">Experience</p>
          <h2>Grounded data work with dashboards, workflows, and client context.</h2>
          <p>
            My experience is early-career and practical: build the reporting layer, make the data easier to trust, and
            explain the output without hiding behind jargon.
          </p>
        </div>

        <div className="space-y-5">
          {experiences.map((experience) => (
            <Card key={`${experience.role}-${experience.company}`} className="premium-card">
              <CardContent className="p-6 sm:p-7">
                <div className="grid gap-5 md:grid-cols-[0.78fr_1.22fr]">
                  <div>
                    <p className="text-sm text-muted-foreground">{experience.period}</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">{experience.role}</h3>
                    <p className="mt-1 font-medium text-accent-blue">{experience.company}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{experience.location}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {experience.tools.map((tool) => (
                        <Badge key={tool} variant="outline">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-base leading-7 text-foreground">{experience.summary}</p>
                    <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
                      {experience.details.map((detail) => (
                        <li key={detail} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
