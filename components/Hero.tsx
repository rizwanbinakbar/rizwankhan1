import { Button } from "./ui/button";
import { ArrowRight, Download, Mail } from "lucide-react";

export function Hero() {
  return (
    <div className="section-wrap pt-14 sm:pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl border-b border-border pb-20 text-center">
          <p className="section-label">Rizwan Khan - Data Engineer</p>
          <h1 className="font-display mx-auto mt-6 max-w-4xl text-balance text-5xl leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            I build dashboards and data workflows that make messy data usable.
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            Power BI, SQL, ETL, and reporting systems for teams that need cleaner data and clearer decisions.
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

          <p className="mx-auto mt-10 max-w-xl text-sm font-medium leading-6 text-muted-foreground">
            Current focus: SQL modeling, Power BI reporting, and practical data engineering fundamentals.
          </p>
        </div>
      </div>
    </div>
  );
}
