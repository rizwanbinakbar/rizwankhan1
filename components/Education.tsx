import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Award, ExternalLink } from "lucide-react";

const university = {
  name: "Emerson University Multan",
  degree: "BS Artificial Intelligence",
  cgpa: "3.8/4.0",
  period: "2024 - 2028",
  coursework: [
    "Data Structures & Algorithms",
    "Statistics & Probability",
    "Computer Organization",
    "Software Engineering",
  ],
};

const certifications = [
  {
    name: "Data Engineering Foundations",
    status: "Completed",
    logo: "/DE-Foundation-Cert.png",
    issuer: "IBM",
    credentialUrl: "https://coursera.org/verify/specialization/JNTWD3LU47K3",
  },
  {
    name: "Python for Data Engineering & AI",
    status: "Completed",
    logo: "/Python-For-DE-and-AI.png",
    issuer: "IBM",
    credentialUrl: "https://coursera.org/verify/U3RPULUZXVDT",
  },
  {
    name: "AI for Professionals",
    status: "Completed",
    logo: "/LUMS-(ilmx)-AI-4-professionals.png",
    issuer: "LUMS (ilmx)",
  },
  {
    name: "SQL Intermediate",
    status: "Completed",
    logo: "/SQL-Inter-HackerRank.png",
    issuer: "HackerRank",
  },
];

function CertLogo({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground">
        <Award className="h-5 w-5" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className="h-12 w-12 shrink-0 rounded-xl border border-border bg-white object-contain p-1"
    />
  );
}

export function Education() {
  return (
    <div className="section-shell bg-section-light px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="section-heading">
          <p className="section-kicker">Education</p>
          <h2>Academic background and focused credentials.</h2>
          <p>
            Education supports the work rather than taking over the page: AI coursework, statistics, programming, and
            practical data certifications.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <Card className="premium-card">
            <CardContent className="p-6 sm:p-7">
              <p className="section-kicker">University</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{university.name}</h3>
              <p className="mt-2 text-base text-muted-foreground">{university.degree}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border bg-secondary/45 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Period</p>
                  <p className="mt-2 font-medium">{university.period}</p>
                </div>
                <div className="rounded-2xl border border-border bg-secondary/45 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">CGPA</p>
                  <p className="mt-2 font-medium">{university.cgpa}</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold">Relevant coursework</p>
                <div className="flex flex-wrap gap-2">
                  {university.coursework.map((course) => (
                    <Badge key={course} variant="secondary">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardContent className="p-6 sm:p-7">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="section-kicker">Certifications</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">Compact proof of continued learning.</h3>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {certifications.map((cert) => (
                  <div key={cert.name} className="rounded-2xl border border-border bg-secondary/35 p-4">
                    <div className="flex gap-4">
                      <CertLogo src={cert.logo} alt={`${cert.issuer} certificate preview`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold leading-6">{cert.name}</p>
                        <p className="text-xs text-muted-foreground">{cert.issuer} - {cert.status}</p>
                        {cert.credentialUrl && (
                          <Button variant="link" size="sm" asChild className="mt-2 h-auto p-0 text-accent-blue">
                            <a href={cert.credentialUrl} target="_blank" rel="noreferrer">
                              View credential
                              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
