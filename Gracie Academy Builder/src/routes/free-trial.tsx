import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronRight, ClipboardList, Shirt, Clock, MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import logo from "@/assets/logo.webp";
import heroBg from "@/assets/hero-bg.jpg";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";

export const Route = createFileRoute("/free-trial")({
  component: FreeTrial,
});

const DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=9391+Grogans+Mill+Rd+Ste+B12+The+Woodlands+TX";

function FreeTrial() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-obsidian text-bone">
      <Seo
        title="Free Trial Class | Renzo Gracie The Woodlands"
        description="Claim your free first BJJ, Muay Thai, or MMA class at Renzo Gracie The Woodlands. No experience needed."
        path="/free-trial"
        image={heroBg}
      />
      <section className="grain relative overflow-hidden px-6 pt-16 pb-20 text-center md:pt-24">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1280}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 to-obsidian" />
        <div className="relative mx-auto max-w-2xl">
          <img src={logo} alt="" className="logo-white mx-auto h-14 w-14" />
          <div className="eyebrow mt-8">Free Trial Class</div>
          <h1 className="font-display mt-4 text-5xl md:text-6xl">No Experience Needed.<br />First Class Free.</h1>
          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
            Walk through the door — we'll handle the rest. Fill out the form below and a coach will reach out to schedule your first class.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto max-w-2xl">
          {sent ? (
            <div className="border border-border bg-card p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary text-primary">
                <Check size={28} />
              </div>
              <h2 className="font-display mt-6 text-4xl">You're In.</h2>
              <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
                We've received your registration. A coach will reach out shortly to confirm your first class. See you on the mat.
              </p>
              <Link to="/" className="btn-outline mt-8 inline-flex">Back to Home</Link>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-5 border border-border bg-card p-6 md:p-10"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full Name" required>
                  <input required className="input" name="name" />
                </Field>
                <Field label="Phone" required>
                  <input required type="tel" className="input" name="phone" />
                </Field>
              </div>
              <Field label="Email" required>
                <input required type="email" className="input" name="email" />
              </Field>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Program of Interest" required>
                  <select required className="input" defaultValue="">
                    <option value="" disabled>Select...</option>
                    <option>Adult BJJ</option>
                    <option>Muay Thai</option>
                    <option>Kids & Teens</option>
                    <option>MMA</option>
                  </select>
                </Field>
                <Field label="Preferred Day" required>
                  <select required className="input" defaultValue="">
                    <option value="" disabled>Select...</option>
                    {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Message (optional)">
                <textarea className="input min-h-[120px]" />
              </Field>
              <button type="submit" className="btn-primary w-full">Claim Your Free Trial <ChevronRight size={16} /></button>
            </form>
          )}
        </div>
      </section>

      {/* Expect */}
      <section className="border-t border-border px-6 py-20 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="eyebrow mb-4">Your First Day</div>
          <h2 className="font-display text-4xl">What to Expect</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { icon: ClipboardList, t: "Arrive 10 Minutes Early", d: "Give yourself time to sign the waiver and meet the coach. No rush — we've got you." },
              { icon: Shirt, t: "No Gear, No Problem", d: "Wear comfortable athletic clothes. A t-shirt and shorts are perfect. No gi needed for your trial." },
              { icon: Clock, t: "Train At Your Pace", d: "A coach will help you get set up and guide every drill. Tap early, learn steadily, enjoy the process." },
            ].map((s) => (
              <div key={s.t} className="border border-border bg-card p-6 text-left">
                <s.icon className="text-primary" size={22} />
                <h3 className="font-display mt-4 text-lg">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="border-t border-border px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="eyebrow mb-4">09 — Find Us</div>
          <h2 className="font-display text-4xl md:text-5xl">The Woodlands Dojo</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="border border-border bg-card p-8 space-y-6">
              <Info icon={MapPin} title="Address" body="9391 Grogan's Mill Rd Ste B12, The Woodlands, Texas" sub="Hours: Mon–Sat · See weekly schedule" />
              <Info icon={Phone} title="Call or Text" body="(832) 584-0565" sub="We respond to texts throughout the day." />
              <Info icon={Mail} title="Email" body="info@renzograciethewoodlands.com" />
              <div className="flex flex-wrap gap-3 pt-2">
                <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="btn-primary"><MapPin size={16} /> Get Directions</a>
                <a href="sms:+18325840565" className="btn-outline"><MessageSquare size={16} /> Text Us</a>
              </div>
            </div>
            <div className="min-h-[360px] overflow-hidden border border-border">
              <iframe title="Map" className="h-full w-full" style={{ filter: "invert(0.92) hue-rotate(180deg) grayscale(0.4)" }}
                src="https://www.google.com/maps?q=9391+Grogans+Mill+Rd+Ste+B12+The+Woodlands+TX&output=embed" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .input {
          width: 100%;
          background: var(--color-obsidian);
          border: 1px solid var(--input);
          border-radius: 0.25rem;
          padding: 0.85rem 1rem;
          color: var(--color-bone);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          transition: border-color 0.15s ease;
        }
        .input:focus { outline: none; border-color: var(--color-primary); }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-display mb-2 block text-[11px] tracking-[0.18em] text-muted-foreground">
        {label}{required && " *"}
      </span>
      {children}
    </label>
  );
}

function Info({ icon: Icon, title, body, sub }: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; body: string; sub?: string }) {
  return (
    <div className="flex gap-4">
      <Icon size={18} className="mt-1 shrink-0 text-primary" />
      <div>
        <div className="font-display text-xs tracking-[0.18em]">{title}</div>
        <div className="mt-1 text-sm break-all">{body}</div>
        {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
      </div>
    </div>
  );
}
