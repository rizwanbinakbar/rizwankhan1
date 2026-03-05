import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Github, Linkedin, Mail, Download } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
        <div className="mb-6">
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
            Available for new opportunities
          </Badge>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Hi, I'm <span className="text-primary">Rizwan Khan</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
          Senior Software Engineer · Full-Stack Developer · DevOps Enthusiast
        </p>

        <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          I build scalable web applications and cloud-native solutions with a
          passion for clean code, great user experiences, and continuous
          delivery.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" asChild>
            <a href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              Get in Touch
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#projects">View Projects</a>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <a href="/resume.pdf" download>
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
        </div>

        <div className="flex justify-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:rizwan@example.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
