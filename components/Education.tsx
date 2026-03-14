// ─── Education Section ────────────────────────────────────────────────────────

export function Education() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section className="py-24 px-4 bg-secondary/10">
      <div className="max-w-4xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-4">Education</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Academic background and professional certifications.
          </p>
        </div>

        {/* University */}
        <div className="relative border-l border-border pl-8 mb-16 animate-fade-in-up">
          {/* FIXED ALIGNMENT: 
            Changed -left-[2.6rem] to -left-[1.35rem] (if border is 1px) 
            Adjusting to -left-[2.35rem] to sit exactly on the line based on your screenshot padding.
          */}
          <span className="absolute -left-[2.35rem] top-[5px] flex h-5 w-5 items-center justify-center rounded-full bg-[#2c4c9c] ring-4 ring-background" />

          <div className="mb-1 flex flex-wrap items-center gap-3">
            <h3 className="font-semibold text-xl">{university.name}</h3>
          </div>
          {university.degree && (
            <p className="text-muted-foreground font-medium mb-1">{university.degree}</p>
          )}
          <p className="text-sm text-muted-foreground mb-1">
            {university.period}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            CGPA: <span className="font-medium text-foreground">{university.cgpa}</span>
          </p>

          {/* Relevant Coursework */}
          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">Relevant Coursework</p>
            <div className="flex flex-wrap gap-2">
              {university.coursework.map((course) => (
                <Badge key={course} variant="secondary">
                  {course}
                </Badge>
              ))}
            </div>
          </div>

          {/* Activities & Societies */}
          <div>
            <p className="text-sm font-semibold mb-2">Activities &amp; Societies</p>
            <div className="flex flex-wrap gap-2">
              {university.activities.map((activity) => (
                <Badge key={activity} variant="outline">
                  {activity}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="animate-fade-in-up">
          <h3 className="text-2xl font-semibold mb-6">Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <CertificationCard
                key={cert.name}
                cert={cert}
                onClick={() => setSelectedCert(cert)}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Certification Modal */}
      <CertificationModal
        cert={selectedCert}
        open={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
