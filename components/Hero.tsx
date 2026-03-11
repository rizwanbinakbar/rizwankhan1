import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Github, Linkedin, Mail, Download, ArrowDown, User } from "lucide-react";

export function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="min-h-screen flex flex-col justify-center px-4 pt-16">
      <div className="max-w-7xl mx-auto w-full">
        {/* Two-column hero layout */}
        <div className="flex flex-col md:flex-row items-center gap-12 py-16">

          {/* Left column – text content */}
          <div className="flex-1 animate-fade-in-up">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5 inline-flex items-center gap-2">
              <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Available for Work
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Hello, I'm<br />
              <span className="text-primary">Rizwan Khan</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-3 font-medium">
              Data Analyst · Power BI Developer · ETL & Cloud Infrastructure
            </p>

            <p className="text-sm md:text-base text-muted-foreground mb-8 leading-relaxed max-w-xl">
              I build end-to-end Data Analytics solutions and Power BI Dashboards
              to help track KPIs and drive key business decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" asChild>
  <a href="/Rizwan_Resume_DA.pdf" target="_blank" rel="noopener noreferrer">
    <Download className="mr-2 h-4 w-4" />
    View Resume
  </a>
</Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#projects">View My Work</a>
              </Button>
            </div>

            <div className="flex gap-3">
              <a
                href="https://github.com/rizwanbinakbar"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border p-3 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/rizwanbinakbar"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border p-3 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:rizwanfordata@gmail.com"
                className="rounded-full border p-3 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right column – profile image */}
          <div className="flex-shrink-0 relative animate-scale-in md:-ml-16">
            <div className="relative w-80 h-80 md:w-[420px] md:h-[420px]">
              {/* Circular profile photo */}
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-border bg-muted flex items-center justify-center">
                {imgError ? (
                  <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-6 gap-3">
                    <User className="h-16 w-16 opacity-40" />
                    <p className="text-xs leading-relaxed opacity-70">
                      Place your photo at<br />
                      <code className="font-mono font-semibold">public/Rizwan.PFP.png</code>
                    </p>
                  </div>
                ) : (
                  <img
                    src="/Rizwan.PFP.png"
                    alt="Rizwan Khan"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>

              {/* Available for hire badge */}
              <div className="absolute bottom-3 -right-2 md:right-0 bg-background border rounded-full px-3 py-1.5 flex items-center gap-2 shadow-lg whitespace-nowrap">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block flex-shrink-0"></span>
                <span className="text-sm font-medium">Available for hire</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 py-8 border-t">
          <div>
            <p className="text-3xl md:text-4xl font-bold">6+</p>
            <p className="text-muted-foreground text-sm mt-1">Projects</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold">2+</p>
            <p className="text-muted-foreground text-sm mt-1">Years Exp</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold">100%</p>
            <p className="text-muted-foreground text-sm mt-1">Client Satisfaction</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center py-4 text-muted-foreground">
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
