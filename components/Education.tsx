import { useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { ExternalLink, Award } from "lucide-react";
import { Button } from "./ui/button";

// ─── University Data ──────────────────────────────────────────────────────────

const university = {
  name: "Emerson University Multan",
  degree: "Bachelor of Science in Artificial Intelligence",
  cgpa: "3.8/4.0",
  period: "2024 – 2028",
  coursework: [
    "Data Structures & Algorithms",
    "Statistics & Probability",
    "Computer Organization & Assembly Language",
    "Software Engineering",
  ],
  activities: [
    "AI-Club",
    "EUM Book Club",
  ],
};

// ─── Certifications Data ──────────────────────────────────────────────────────

interface Certification {
  name: string;
  date: string;
  logo: string;
  issuer?: string;
  credentialUrl?: string;
}

const certifications: Certification[] = [
  {
    name: "Data Engineering Certificate",
    date: "2027",
    logo: "DE-Foundation-Cert.png",
    issuer: "IBM",
    credentialUrl:
      "https://coursera.org/verify/specialization/JNTWD3LU47K3",
  },
  {
    name: "Python for DE & AI",
    date: "2027",
    logo: "/Python-For-DE-and-AI.png",
    issuer: "IBM",
    credentialUrl:
      "https://coursera.org/verify/U3RPULUZXVDT",
  },
  {
    name: "LUMS (ilmx) AI Professional",
    date: "2028",
    logo: "/LUMS-(ilmx)-AI-4-professionals.png",
    issuer: "LUMS (ilmx)",
    credentialUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
  },
  {
    name: "SQL Intermediate",
    date: "2027",
    logo: "/SQL-Inter-HackerRank.png",
    issuer: "HacerRank",
    credentialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/",
  },
];

// ─── Cert Logo with fallback ──────────────────────────────────────────────────

function CertLogo({
  src,
  alt,
  size = 48,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  const [errored, setErrored] = useState(false);
  const px = `${size}px`;

  if (errored) {
    return (
      <div
        className="flex items-center justify-center rounded bg-secondary text-muted-foreground shrink-0"
        style={{ width: px, height: px }}
      >
        <Award style={{ width: size * 0.6, height: size * 0.6 }} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className="rounded object-contain shrink-0"
      style={{ width: px, height: px }}
    />
  );
}

// ─── Certification Card ───────────────────────────────────────────────────────

function CertificationCard({
  cert,
  onClick,
}: {
  cert: Certification;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
      aria-label={`View details for ${cert.name}`}
    >
      <Card className="border bg-card hover:shadow-md hover:border-primary/40 transition-all duration-200 cursor-pointer">
        <CardContent className="p-4 flex items-center gap-4">
          <CertLogo src={cert.logo} alt={`${cert.issuer ?? cert.name} logo`} size={48} />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm leading-snug line-clamp-2">{cert.name}</p>
            {cert.issuer && (
              <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
            )}
            <p className="text-xs text-muted-foreground mt-0.5">{cert.date}</p>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}

// ─── Certification Modal ──────────────────────────────────────────────────────

function CertificationModal({
  cert,
  open,
  onClose,
}: {
  cert: Certification | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!cert) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <CertLogo
              src={cert.logo}
              alt={`${cert.issuer ?? cert.name} logo`}
              size={56}
            />
            <div>
              <DialogTitle className="text-lg leading-snug">{cert.name}</DialogTitle>
              {cert.issuer && (
                <DialogDescription className="mt-1">{cert.issuer}</DialogDescription>
              )}
              <p className="text-sm text-muted-foreground mt-0.5">{cert.date}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-6">
          <CertLogo
            src={cert.logo}
            alt={`${cert.issuer ?? cert.name} logo`}
            size={96}
          />
          <div className="text-center">
            <p className="font-semibold text-base">{cert.name}</p>
            {cert.issuer && (
              <p className="text-muted-foreground text-sm mt-1">{cert.issuer}</p>
            )}
            <p className="text-muted-foreground text-sm mt-0.5">{cert.date}</p>
          </div>
          {cert.credentialUrl && (
            <Button size="sm" asChild>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-1.5 h-4 w-4" />
                View Credential
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Education Section ────────────────────────────────────────────────────────

export function Education() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section className="py-24 px-4 bg-secondary/10">
      <div className="max-w-4xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="section-label">Background</span>
          <h2 className="text-4xl font-bold mb-3 gradient-text">Education</h2>
          <div className="section-accent-line" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-5">
            Academic background and professional certifications.
          </p>
        </div>

        {/* University */}
        <div className="relative border-l border-border pl-8 mb-16 animate-fade-in-up">
          <span className="absolute -left-[0.625rem] top-[5px] flex h-5 w-5 items-center justify-center rounded-full bg-[#2c4c9c] ring-4 ring-background" />

          <div className="mb-1 flex flex-wrap items-center gap-3">
            <h3 className="font-semibold text-xl">{university.name}</h3>
          </div>
          {university.degree && (
            <p className="text-muted-foreground font-medium mb-1">{university.degree}</p>
          )}
          <p className="text-sm text-muted-foreground mb-1">
            {university.period}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            CGPA: <span className="font-medium text-foreground">{university.cgpa}</span>
          </p>

          {/* Relevant Coursework */}
          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">Relevant Coursework</p>
            <div className="flex flex-wrap gap-2">
              {university.coursework.map((course) => (
                <Badge key={course} variant="secondary">
                  {course}
                </Badge>
              ))}
            </div>
          </div>

          {/* Activities & Societies */}
          <div>
            <p className="text-sm font-semibold mb-2">Activities &amp; Societies</p>
            <div className="flex flex-wrap gap-2">
              {university.activities.map((activity) => (
                <Badge key={activity} variant="outline">
                  {activity}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="animate-fade-in-up">
          <h3 className="text-2xl font-semibold mb-6">Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <CertificationCard
                key={cert.name}
                cert={cert}
                onClick={() => setSelectedCert(cert)}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Certification Modal */}
      <CertificationModal
        cert={selectedCert}
        open={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
