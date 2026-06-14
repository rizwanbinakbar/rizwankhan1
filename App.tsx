import { useState } from "react";
import { Button } from "./components/ui/button";
import { Menu, X } from "lucide-react";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { FatherChatbot } from "./components/FatherChatbot";

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isFatherChatbotPage = window.location.pathname === "/father-chatbot";

  if (isFatherChatbotPage) {
    return <FatherChatbot />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
          <a
            href="#home"
            className="focus-ring rounded-sm text-sm font-semibold tracking-tight text-foreground hover:text-accent-orange"
            onClick={() => setMobileMenuOpen(false)}
          >
            Rizwan Khan
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="focus-ring rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:text-accent-orange"
              >
                {item.label}
              </a>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </nav>

        {mobileMenuOpen && (
          <div className="border-t border-border bg-background px-4 py-3 md:hidden">
            <div className="mx-auto grid max-w-6xl gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="focus-ring rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-accent-orange"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

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

      <footer className="border-t border-border px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-foreground">Rizwan Khan</p>
          <p>Dashboards, SQL, and reporting workflows.</p>
        </div>
      </footer>
    </div>
  );
}
