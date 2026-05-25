import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight, Download, Mail } from "lucide-react";

export function Hero() {
  return (
    <div className="section-wrap pt-14 sm:pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl border-b border-border pb-16 text-center">
          <Badge className="mb-7 rounded-full border-orange bg-orange-soft px-3 py-1 text-accent-orange hover:bg-orange-soft">
            Open to data internships and junior roles
          </Badge>

          <p className="section-label">Rizwan Khan - AI/Data Engineering Student</p>
          <h1 className="font-display mx-auto mt-5 max-w-3xl text-balance text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            I build dashboards and data workflows that make <em>messy data</em> usable.
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            AI student working with Power BI, SQL, reporting workflows, and practical data systems.
            Turning raw files into something teams can actually use.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl min-w-0 flex-col justify-center gap-3 sm:flex-row">
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

          <p className="mx-auto mt-8 max-w-xl text-sm leading-6 text-muted-foreground">
            Currently building stronger SQL, Power BI, and data engineering fundamentals.
          </p>
        </div>
      </div>
    </div>
  );
}
