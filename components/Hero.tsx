import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight, Download, Mail } from "lucide-react";

const notes = [
  "Currently focused on SQL, Power BI, and data engineering fundamentals.",
  "Building small projects that make reports easier to trust and use.",
];

export function Hero() {
  return (
    <div className="section-wrap pt-16 sm:pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-w-0 gap-10 border-b border-border pb-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div className="min-w-0">
            <Badge className="mb-6 rounded-full border-orange bg-orange-soft px-3 py-1 text-accent-orange hover:bg-orange-soft">
              Open to data internships and junior roles
            </Badge>

            <p className="section-label">Rizwan Khan - AI/Data Engineering Student</p>
            <h1 className="mt-4 max-w-4xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              I build dashboards and data workflows that make messy data usable.
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground">
              I&apos;m an AI/Data Engineering student working across Power BI, SQL, reporting workflows, and practical data
              systems. I like turning raw files and unclear requirements into something teams can actually use.
            </p>

            <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <a href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <a href="/Rizwan_DA_Resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              <Button size="lg" variant="ghost" asChild className="w-full sm:w-auto">
                <a href="mailto:rizwanfordata@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </a>
              </Button>
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 h-1 w-12 rounded-full bg-accent-orange" aria-hidden="true" />
            <p className="text-sm font-semibold text-foreground">Currently working on</p>
            <div className="mt-4 space-y-4">
              {notes.map((note) => (
                <p key={note} className="text-sm leading-6 text-muted-foreground">
                  {note}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
