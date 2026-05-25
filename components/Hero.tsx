import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowRight, Download, Mail, User } from "lucide-react";

const proofPoints = [
  "BS Artificial Intelligence student",
  "Power BI, SQL, ETL, and automation",
  "Client and independent data projects",
  "CGPA 3.8/4.0",
];

export function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="hero-surface px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.72fr)]">
        <div className="max-w-3xl animate-fade-in-up">
          <Badge className="mb-6 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-200 hover:bg-emerald-400/10 dark:text-emerald-200">
            Available for data roles and internships
          </Badge>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent-blue">
            Rizwan Khan - AI/Data Engineering Student
          </p>

          <h1 className="max-w-4xl text-balance text-[clamp(2.45rem,4.9vw,4.65rem)] font-semibold leading-[1.05] tracking-tight text-hero">
            I build dashboards, data workflows, and reporting systems that turn messy data into clear decisions.
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
            I work across analytics and data engineering: cleaning datasets, modeling KPIs, designing Power BI
            dashboards, writing SQL, and building practical ETL workflows for teams that need reliable reporting.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild className="rounded-full">
              <a href="#projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full bg-background/40">
              <a href="/Rizwan_DA_Resume.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <Button size="lg" variant="ghost" asChild className="rounded-full">
              <a href="mailto:rizwanfordata@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </a>
            </Button>
          </div>

          <div className="mt-10 grid gap-3 border-t border-border/70 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map((point) => (
              <div key={point} className="rounded-2xl border border-border/70 bg-card/55 px-4 py-3 shadow-sm backdrop-blur">
                <p className="text-sm font-medium leading-6 text-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[380px] animate-scale-in lg:max-w-[420px]">
          <div className="absolute -inset-5 rounded-[2rem] bg-accent-blue/10 blur-3xl" aria-hidden="true" />
          <div className="premium-card relative overflow-hidden rounded-[1.75rem] p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-secondary">
              {imgError ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center text-muted-foreground">
                  <User className="h-14 w-14 opacity-50" />
                  <p className="text-sm">Profile image missing from public/Rizwan.PFP.png</p>
                </div>
              ) : (
                <img
                  src="/Rizwan.PFP.png"
                  alt="Portrait of Rizwan Khan"
                  className="h-full w-full object-cover"
                  onError={() => setImgError(true)}
                />
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5">
                <p className="text-sm font-medium text-white">Analytics + engineering, built for real reporting work.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
