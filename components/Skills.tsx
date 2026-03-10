import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const skillCategories = [
  {
    title: "Data Analytics",
    skills: [
      "Python",
      "SQL",
      "Power BI",
      "Excel",
      "Data Visualization",
      "A/B Testing"
    ],
  },
  {
    title: "Data Engineering",
    skills: [
      "PySpark",
      "Apache Spark",
      "ETL / ELT Pipelines",
      "Data Warehousing",
      "Medallion Architecture",
      "Data Pipeline Orchestration"
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      "AWS",
      "Docker",
      "Git",
    ],
  },
  {
    title: "Databases",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Snowflake",
      "BigQuery"
    ],
  },
];

export function Skills() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-4">Skills &amp; Technologies</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated set of tools and technologies I use to help in
            key decision making.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 stagger-animation">
          {skillCategories.map((category) => (
            <Card key={category.title} className="border bg-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
