import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";

const email = "rizwanfordata@gmail.com";

function buildMailto(form: HTMLFormElement) {
  const data = new FormData(form);
  const name = String(data.get("from_name") ?? "").trim();
  const replyTo = String(data.get("reply_to") ?? "").trim();
  const subject = String(data.get("subject") ?? "Portfolio inquiry").trim();
  const message = String(data.get("message") ?? "").trim();
  const body = [`Name: ${name}`, `Email: ${replyTo}`, "", message].join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(subject || "Portfolio inquiry")}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

    if (!serviceId || !templateId || !publicKey) {
      window.location.href = buildMailto(formRef.current);
      return;
    }

    setSending(true);
    setError(null);

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("The form could not send right now. Please use the email link below instead.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="section-shell bg-section-dark px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="section-heading">
          <p className="section-kicker">Contact</p>
          <h2>Easy next step for recruiters, data teams, and clients.</h2>
          <p>
            I am open to data internships, junior analytics roles, data engineering learning roles, and focused client
            projects around dashboards or reporting workflows.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="premium-card rounded-3xl p-6 sm:p-7">
            <h3 className="text-2xl font-semibold tracking-tight">Reach me directly</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Best for roles, internships, dashboard work, SQL/ETL projects, or a quick conversation about how I can help.
            </p>

            <div className="mt-7 grid gap-4">
              <a href={`mailto:${email}`} className="contact-row">
                <Mail className="h-5 w-5" />
                <span>
                  <strong>Email</strong>
                  <span>{email}</span>
                </span>
              </a>
              <a href="https://github.com/rizwanbinakbar" target="_blank" rel="noreferrer" className="contact-row">
                <Github className="h-5 w-5" />
                <span>
                  <strong>GitHub</strong>
                  <span>github.com/rizwanbinakbar</span>
                </span>
              </a>
              <a href="https://linkedin.com/in/rizwanbinakbar" target="_blank" rel="noreferrer" className="contact-row">
                <Linkedin className="h-5 w-5" />
                <span>
                  <strong>LinkedIn</strong>
                  <span>linkedin.com/in/rizwanbinakbar</span>
                </span>
              </a>
              <div className="contact-row">
                <MapPin className="h-5 w-5" />
                <span>
                  <strong>Location</strong>
                  <span>Pakistan - Available for remote work</span>
                </span>
              </div>
            </div>
          </div>

          <div className="premium-card rounded-3xl p-6 sm:p-7">
            {submitted ? (
              <div className="flex min-h-[360px] flex-col justify-center text-center">
                <p className="text-2xl font-semibold">Message sent.</p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                  Thanks for reaching out. I will reply as soon as I can.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="from_name" placeholder="Your name" required maxLength={100} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="reply_to" type="email" placeholder="you@example.com" required maxLength={254} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="Role, project, or question" required maxLength={150} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me what you are looking for."
                    rows={6}
                    required
                    maxLength={2000}
                  />
                </div>

                <p className="text-xs leading-5 text-muted-foreground">
                  If the contact service is not configured, this button opens a pre-filled email draft instead of showing
                  a fake success state.
                </p>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button type="submit" className="w-full rounded-full" disabled={sending}>
                  {sending ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
