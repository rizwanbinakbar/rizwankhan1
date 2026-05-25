import { Badge } from "./ui/badge";

const capabilityGroups = [
  {
    title: "Analytics & BI",
    description: "Build Power BI dashboards, clean datasets, model KPIs, and make reports readable.",
    tools: ["Power BI", "DAX", "Power Query", "Excel"],
  },
  {
    title: "Data Engineering",
    description: "Use SQL to prepare clean layers, check data quality, and shape reporting tables.",
    tools: ["SQL", "ETL", "Data Warehousing", "PySpark", "Apache Spark"],
  },
  {
    title: "Automation",
    description: "Automate repeated reporting steps and connect files, dashboards, and simple workflows.",
    tools: ["SharePoint", "AWS", "Docker", "Git"],
  },
  {
    title: "Programming & Databases",
    description: "Use Python and databases to clean data and support dashboard work.",
    tools: ["Python", "PostgreSQL", "MySQL", "MongoDB", "GitHub"],
  },
];

export function Skills() {
  return (
    <div className="section-wrap">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="section-heading">
          <p className="section-label">Skills</p>
          <h2>What I use.</h2>
          <p>A short view of the tools and work I am building around.</p>
        </div>

        <div className="rounded-xl border border-border bg-card">
          {capabilityGroups.map((group) => (
            <article key={group.title} className="border-b border-border p-5 last:border-b-0 sm:grid sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-6">
              <h3 className="text-base font-semibold tracking-tight">{group.title}</h3>
              <div>
                <p className="mt-2 text-sm leading-7 text-muted-foreground sm:mt-0">{group.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.tools.map((tool) => (
                    <Badge key={tool} variant="secondary">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
