import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    const serviceId =
      (import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined) ??
      "service_93408m7";
    const templateId =
      (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined) ??
      "template_1gupdeb";
    const publicKey =
      (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined) ??
      "ZqPm3NJgT4e8m48a_";

    setSending(true);
    setError(null);
    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="py-24 px-4 bg-secondary/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I'd love to hear
            from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="font-medium">Email</p>
                <a
                  href="mailto:rizwanfordata@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  rizwanfordata@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-muted-foreground">Available Worldwide · Remote</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Github className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="font-medium">GitHub</p>
                <a
                  href="https://github.com/rizwanbinakbar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  github.com/rizwanbinakbar
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Linkedin className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="font-medium">LinkedIn</p>
                <a
                  href="https://linkedin.com/in/rizwanbinakbar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  linkedin.com/in/rizwanbinakbar
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="animate-fade-in-up">
            {submitted ? (
              <div className="flex items-center justify-center h-full min-h-48 rounded-lg border border-border bg-card p-8 text-center">
                <div>
                  <p className="text-xl font-semibold mb-2">Message sent! 🎉</p>
                  <p className="text-muted-foreground">
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="from_name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="reply_to"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="What's this about?" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message…"
                    rows={5}
                    required
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
                <Button type="submit" className="w-full" disabled={sending}>
                  {sending ? "Sending…" : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
