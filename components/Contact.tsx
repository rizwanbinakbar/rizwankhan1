import { useState } from "react";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail, MapPin, User } from "lucide-react";

const email = "rizwanfordata@gmail.com";

const contactLinks = [
  {
    label: "Email",
    value: email,
    href: `mailto:${email}?subject=${encodeURIComponent("Portfolio inquiry")}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/rizwanbinakbar",
    href: "https://linkedin.com/in/rizwanbinakbar",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "github.com/rizwanbinakbar",
    href: "https://github.com/rizwanbinakbar",
    icon: Github,
  },
];

export function Contact() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="section-wrap pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)_320px] lg:items-center">
            <div className="mx-auto w-full max-w-[180px] lg:mx-0">
              <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-secondary">
                {imgError ? (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <User className="h-10 w-10" />
                  </div>
                ) : (
                  <img
                    src="/RizwanKhan.pfp.png"
                    alt="Portrait of Rizwan Khan"
                    className="h-full w-full object-cover"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <p className="section-label">Contact</p>
              <h2 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl">Let&apos;s talk.</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                Available for data roles, reporting work, and serious client projects. Email or LinkedIn works best.
              </p>
              <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent-orange" />
                <span>Pakistan - available for remote work</span>
              </div>
            </div>

            <div className="grid gap-3">
              {contactLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="contact-link">
                    <Icon className="h-4 w-4" />
                    <span>
                      <strong>{link.label}</strong>
                      <span>{link.value}</span>
                    </span>
                  </a>
                );
              })}
              <Button asChild className="mt-2">
                <a href={`mailto:${email}?subject=${encodeURIComponent("Portfolio inquiry")}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Open email draft
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
