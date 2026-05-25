import { useState } from "react";
import { Button } from "./components/ui/button";
import { Menu, X } from "lucide-react";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme" attribute="class" enableSystem>
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border/70 bg-background/82 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a
              href="#home"
              className="link-focus rounded-md text-sm font-semibold tracking-tight text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rizwan Khan
            </a>

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="link-focus rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary/70 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="border-t border-border/70 bg-background/95 px-4 py-3 shadow-lg md:hidden">
              <div className="mx-auto grid max-w-7xl gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="link-focus rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        <main>
          <section id="home" className="scroll-mt-20">
            <Hero />
          </section>
          <section id="projects" className="scroll-mt-20">
            <Projects />
          </section>
          <section id="skills" className="scroll-mt-20">
            <Skills />
          </section>
          <section id="experience" className="scroll-mt-20">
            <Experience />
          </section>
          <section id="education" className="scroll-mt-20">
            <Education />
          </section>
          <section id="contact" className="scroll-mt-20">
            <Contact />
          </section>
        </main>

        <footer className="border-t border-border/70 bg-background px-4 py-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p className="font-medium text-foreground">Rizwan Khan</p>
            <p>AI/Data Engineering student building analytics systems that people can use.</p>
            <p>(c) 2026</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
