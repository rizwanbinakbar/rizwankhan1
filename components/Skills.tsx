import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { BarChart3, CloudCog, Code2, Database } from "lucide-react";

const capabilityGroups = [
  {
    title: "Analytics & BI",
    icon: BarChart3,
    description:
      "Build Power BI dashboards, clean messy datasets, model KPIs, and create reporting views that business users can understand quickly.",
    tools: ["Power BI", "DAX", "Power Query", "Excel", "Data Visualization", "KPI Modeling"],
  },
  {
    title: "Data Engineering",
    icon: Database,
    description:
      "Design SQL-first data workflows, prepare warehouse layers, handle data quality checks, and turn raw tables into analysis-ready models.",
    tools: ["SQL", "ETL", "Data Warehousing", "Medallion Architecture", "PySpark", "Apache Spark"],
  },
  {
    title: "Automation & Cloud",
    icon: CloudCog,
    description:
      "Automate recurring reporting steps, connect source files and cloud storage, and make handoffs easier for clients and teammates.",
    tools: ["SharePoint", "AWS", "Docker", "Git", "Workflow Automation"],
  },
  {
    title: "Programming & Databases",
    icon: Code2,
    description:
      "Use Python and database tools to prepare data, validate assumptions, write reusable scripts, and support dashboard or pipeline work.",
    tools: ["Python", "PostgreSQL", "MySQL", "MongoDB", "Pandas", "GitHub"],
  },
];

export function Skills() {
  return (
    <div className="section-shell bg-section-light px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="section-heading">
          <p className="section-kicker">Capabilities</p>
          <h2>Practical data skills, organized by the work they support.</h2>
          <p>
            I am strongest where analytics and engineering meet: getting data into shape, building reliable reporting
            layers, and making the output clear enough for decisions.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {capabilityGroups.map((group) => {
            const Icon = group.icon;

            return (
              <Card key={group.title} className="premium-card">
                <CardContent className="p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-border bg-secondary/60 p-3 text-accent-blue">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{group.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{group.description}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {group.tools.map((tool) => (
                      <Badge key={tool} variant="secondary">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
