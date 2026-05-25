import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Award, ExternalLink } from "lucide-react";

const university = {
  name: "Emerson University Multan",
  degree: "BS Artificial Intelligence",
  cgpa: "3.8/4.0",
  period: "2024 - 2028",
  coursework: ["Data Structures", "Statistics", "Computer Organization", "Software Engineering"],
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
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground">
        <Award className="h-4 w-4" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className="h-10 w-10 shrink-0 rounded-md border border-border bg-white object-contain p-1"
    />
  );
}

export function Education() {
  return (
    <div className="section-wrap">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="section-heading">
          <p className="section-label">Education</p>
          <h2>Education.</h2>
          <p>AI coursework, data fundamentals, and a few supporting certificates.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="quiet-card">
            <h3 className="text-xl font-semibold tracking-tight">{university.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{university.degree}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-border bg-secondary p-3">
                <p className="text-muted-foreground">Period</p>
                <p className="mt-1 font-medium">{university.period}</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary p-3">
                <p className="text-muted-foreground">CGPA</p>
                <p className="mt-1 font-medium">{university.cgpa}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {university.coursework.map((course) => (
                <Badge key={course} variant="secondary">
                  {course}
                </Badge>
              ))}
            </div>
          </article>

          <article className="quiet-card">
            <h3 className="text-xl font-semibold tracking-tight">Certifications</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {certifications.map((cert) => (
                <div key={cert.name} className="rounded-lg border border-border bg-background p-3">
                  <div className="flex gap-3">
                    <CertLogo src={cert.logo} alt={`${cert.issuer} certificate preview`} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-5">{cert.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {cert.issuer} | {cert.status}
                      </p>
                      {cert.credentialUrl && (
                        <Button variant="link" size="sm" asChild className="mt-1 h-auto p-0 text-accent-orange">
                          <a href={cert.credentialUrl} target="_blank" rel="noreferrer">
                            View credential
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
