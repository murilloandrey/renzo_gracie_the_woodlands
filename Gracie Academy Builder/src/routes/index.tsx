import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Facebook, Youtube, Phone, MapPin, ChevronRight, Play, Plus, Minus, MessageSquare, Mail, Check, X } from "lucide-react";
import logo from "@/assets/logo.webp";
import heroBg from "@/assets/hero-bg.jpg";
import adultBjj from "@/assets/adult-bjj.jpg";
import muayThai from "@/assets/muay-thai.jpg";
import kidsBjj from "@/assets/kids-bjj.jpg";
import mma from "@/assets/mma.jpg";
import coach1 from "@/assets/coach-1.jpg";
import coach2 from "@/assets/coach-2.jpg";
import coachKids from "@/assets/coach-kids.jpg";
import coachMma from "@/assets/coach-mma.jpg";
import ig1 from "@/assets/ig-1.jpg";
import ig2 from "@/assets/ig-2.jpg";
import ig3 from "@/assets/ig-3.jpg";
import { SectionHeader } from "@/components/SectionHeader";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { Seo } from "@/components/Seo";

export const Route = createFileRoute("/")({
  component: Home,
});

const DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=9391+Grogans+Mill+Rd+Ste+B12+The+Woodlands+TX";
const YOUTUBE_URL = "https://www.youtube.com/channel/UCOLzhYYnoYRtR_HPvRLXD3Q";
const HOME_TITLE = "Jiu Jitsu & MMA in The Woodlands TX | Free Trial | Renzo Gracie The Woodlands";
const HOME_DESCRIPTION =
  "Train Brazilian Jiu-Jitsu, Muay Thai, MMA, and kids martial arts in The Woodlands, TX. Claim your free trial class at Renzo Gracie The Woodlands.";

const homeStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SportsActivityLocation"],
    name: "Renzo Gracie The Woodlands",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9391 Grogan's Mill Rd Ste B12",
      addressLocality: "The Woodlands",
      addressRegion: "TX",
      addressCountry: "US",
    },
    telephone: "+1-832-584-0565",
    email: "info@renzograciethewoodlands.com",
    url: "https://renzograciethewoodlands.com",
    sameAs: [
      "https://www.instagram.com/renzo_gracie_the_woodlands/",
      "https://www.facebook.com/renzograciethewoodlands1",
      YOUTUBE_URL,
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Wednesday", "Friday"],
        opens: "05:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Thursday"],
        opens: "11:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "11:00",
      },
    ],
  },
];

type Discipline = "BJJ" | "Muay Thai" | "Kids" | "MMA";
type ClassItem = { time: string; name: string; coach?: string; discipline: Discipline };

const schedule: Record<string, ClassItem[]> = {
  MON: [
    { time: "5:00–6:00 AM", name: "Adult BJJ No-Gi", coach: "Vinnie", discipline: "BJJ" },
    { time: "6:30–7:30 AM", name: "Adult Muay Thai", coach: "Phillipe", discipline: "Muay Thai" },
    { time: "8:30–9:30 AM", name: "All-Ages Muay Thai", coach: "Phillipe", discipline: "Muay Thai" },
    { time: "11:00 AM–12:00 PM", name: "Adult BJJ Gi", coach: "Todd / Alex", discipline: "BJJ" },
    { time: "5:00–6:00 PM", name: "Kids BJJ Gi 7+", coach: "Nathan / Vinny", discipline: "Kids" },
    { time: "6:00–7:00 PM", name: "Teen BJJ", coach: "Nathan / Vinny", discipline: "Kids" },
    { time: "6:00–8:00 PM", name: "Adult BJJ", coach: "Fadi", discipline: "BJJ" },
  ],
  TUE: [
    { time: "11:00 AM–12:00 PM", name: "Adult BJJ No-Gi", coach: "Todd / Alex", discipline: "BJJ" },
    { time: "5:00–6:00 PM", name: "Kids BJJ Gi 7+", coach: "Nathan / Vinny", discipline: "Kids" },
    { time: "6:00–7:00 PM", name: "Adult Muay Thai", coach: "Phillipe", discipline: "Muay Thai" },
    { time: "7:00–8:00 PM", name: "Beginner Adult/Teen BJJ No-Gi", coach: "Eddie / Nathan / Vinny", discipline: "BJJ" },
  ],
  WED: [
    { time: "5:00–6:00 AM", name: "Adult BJJ Gi", coach: "Vinnie", discipline: "BJJ" },
    { time: "6:30–7:30 AM", name: "Adult Muay Thai", coach: "Phillipe", discipline: "Muay Thai" },
    { time: "8:30–9:30 AM", name: "All-Ages Muay Thai", coach: "Phillipe", discipline: "Muay Thai" },
    { time: "11:00 AM–12:00 PM", name: "Adult BJJ Gi", coach: "Todd / Alex", discipline: "BJJ" },
    { time: "5:00–6:00 PM", name: "Kids BJJ Gi 7+", coach: "Nathan / Vinny", discipline: "Kids" },
    { time: "6:00–7:00 PM", name: "Teen BJJ", coach: "Nathan / Vinny", discipline: "Kids" },
    { time: "6:00–8:00 PM", name: "Adult BJJ", coach: "Fadi", discipline: "BJJ" },
  ],
  THU: [
    { time: "11:00 AM–12:00 PM", name: "Adult BJJ No-Gi", coach: "Todd / Alex", discipline: "BJJ" },
    { time: "5:00–6:00 PM", name: "Kids BJJ Gi 7+", coach: "Nathan / Vinny", discipline: "Kids" },
    { time: "6:00–7:00 PM", name: "Adult Muay Thai", coach: "Phillipe", discipline: "Muay Thai" },
    { time: "7:00–8:00 PM", name: "Beginner Adult/Teen BJJ No-Gi", coach: "Eddie / Nathan / Vinny", discipline: "BJJ" },
  ],
  FRI: [
    { time: "5:00–6:00 AM", name: "Adult BJJ Rotating", coach: "Vinnie", discipline: "BJJ" },
    { time: "6:30–7:30 AM", name: "Adult Muay Thai", coach: "Phillipe", discipline: "Muay Thai" },
    { time: "8:30–9:30 AM", name: "All-Ages Muay Thai", coach: "Phillipe", discipline: "Muay Thai" },
    { time: "11:00 AM–12:00 PM", name: "Open Mat (Gi & No-Gi)", discipline: "BJJ" },
    { time: "5:00–6:00 PM", name: "Kids BJJ Gi 7+", coach: "Nathan / Vinny", discipline: "Kids" },
    { time: "6:00–7:30 PM", name: "MMA All Ages", coach: "Ollie", discipline: "MMA" },
  ],
  SAT: [
    { time: "8:00–9:30 AM", name: "Adult BJJ Open Mat", coach: "Fadi", discipline: "BJJ" },
    { time: "10:00–11:00 AM", name: "Kids BJJ Competition Class", coach: "Nathan / Vinny", discipline: "Kids" },
  ],
};

const disciplineFilters: ("ALL" | Discipline)[] = ["ALL", "BJJ", "Muay Thai", "Kids", "MMA"];

const disciplines = [
  { n: "01", title: "Adult BJJ", tag: "The Art of Control", img: adultBjj },
  { n: "02", title: "Muay Thai", tag: "The Science of Eight Limbs", img: muayThai },
  { n: "03", title: "Kids & Teens", tag: "Building Unshakable Confidence", img: kidsBjj, note: "Age-appropriate classes from age 4 up — Junior Members, Kids Gi, Teens, and a Competition class. Discipline that lasts a lifetime." },
  { n: "04", title: "MMA", tag: "The Ultimate Integration", img: mma },
];

const coaches = [
  { name: "Professor Todd", role: "Head Instructor · BJJ", cred: "4th-Degree Black Belt", img: coach1, badge: "4TH DEGREE" },
  { name: "Professor Eddie", role: "BJJ Instructor", cred: "Black Belt", img: coach2 },
  { name: "Coach Vinnie", role: "BJJ Instructor", cred: "Adult & Early-Morning BJJ", img: coach1 },
  { name: "Coach Phillipe", role: "Muay Thai Coach", cred: "The Science of Eight Limbs", img: muayThai },
  { name: "Coach Alex Garcia", role: "BJJ Instructor", cred: "Adult Gi & No-Gi", img: coach1 },
  { name: "Coach Nathan Bates", role: "Kids & Teens BJJ", cred: "Building Young Champions", img: coachKids },
  { name: "Coach Vinny", role: "Kids & Teens BJJ", cred: "Junior Development", img: coachKids },
  { name: "Coach Ollie", role: "MMA Coach", cred: "All-Ages Mixed Martial Arts", img: coachMma },
  { name: "Fadi Khouri", role: "BJJ Instructor", cred: "Evening & Open Mat", img: coach2 },
];

const testimonials = [
  { name: "Boyd", role: "Visiting Grappler", quote: "Visiting from out of town and they welcomed me in for a drop-in immediately. High-level technique on the mats — exactly what you want from a Renzo affiliate." },
  { name: "James", role: "Out-of-Town Dad", quote: "Drove in with my son and he got to roll with Professor Todd — a 4th-degree black belt. They treated us like family from the first handshake." },
  { name: "Martin", role: "Parent", quote: "My 6-year-old daughter was nervous her whole first class. Coach Oli helped her every single step, and by the end she was laughing. We never looked back." },
  { name: "Anthony", role: "Adult Beginner", quote: "Felt part of the community from day one. Coach Phillipe breaks down the Muay Thai combos so clearly that even a total beginner gets it fast." },
];

// Paste the YouTube video ID here to activate the embed.
const TESTIMONIAL_VIDEO_ID = "";

const faqs = [
  { q: "Do I need any experience to start?", a: "None at all. Most of our students walked in as complete beginners. Our coaches are experts at meeting you exactly where you are — your only job is to show up." },
  { q: "What should I wear to my first class?", a: "T-shirt and shorts or leggings without zippers. No gi needed for your trial — we'll get you sorted." },
  { q: "Is it safe? I'm worried about getting hurt.", a: "Yes. Training is progressive, supervised, and technique-first. You'll learn to tap early and train responsibly from day one." },
  { q: "How young can my child start?", a: "Typically ages 4–5, depending on focus and maturity, with age-specific groups all the way through teens." },
  { q: "How often should I train?", a: "2–3 times per week is ideal for a beginner. Consistency beats intensity — show up regularly and progress will follow." },
];

const igTiles = [
  { img: ig1, label: "STUDENT STORY · BOYD" },
  { img: ig2, label: null },
  { img: ig3, label: "STUDENT STORY · MARTIN" },
  { img: adultBjj, label: null },
  { img: muayThai, label: "STUDENT STORY · JAMES" },
  { img: mma, label: null },
];

function Stars() {
  return <div className="flex gap-1 text-bone">{Array.from({ length: 5 }).map((_, i) => <span key={i}>★</span>)}</div>;
}

function Home() {
  const [filter, setFilter] = useState<"ALL" | Discipline>("ALL");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const days = Object.keys(schedule);

  return (
    <div className="min-h-screen bg-obsidian text-bone">
      <Seo title={HOME_TITLE} description={HOME_DESCRIPTION} image={heroBg} structuredData={homeStructuredData} />
      {/* HERO */}
      <section className="grain relative min-h-[100svh] overflow-hidden">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1280}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/70 to-obsidian" />
        {/* Top nav */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-8">
          <div className="flex items-center gap-4 md:gap-6">
            <img src={logo} alt="Renzo Gracie The Woodlands" className="logo-white h-10 w-10 md:h-12 md:w-12" />
            <span className="font-display hidden text-[11px] tracking-[0.18em] text-bone/80 md:block">
              Affiliate Academy of the Renzo Gracie Team
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs md:gap-8">
            <a
              href="https://www.breakpointfc.com/collections/renzo-gracie-the-woodlands"
              target="_blank"
              rel="noreferrer"
              className="font-display tracking-[0.18em] hover:text-primary"
            >
              Gear
            </a>
            <a href="#" className="font-display tracking-[0.18em] hover:text-primary">Member Login</a>
            <a href="tel:+18325840565" className="font-display flex items-center gap-2 tracking-[0.18em] hover:text-primary">
              <Phone size={14} /> (832) 584-0565
            </a>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex min-h-[calc(100svh-6rem)] flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24">
          <div className="max-w-5xl">
            <h1 className="font-display text-[15vw] leading-[0.85] md:text-[9rem]">
              <span
                className="block"
                style={{
                  WebkitTextStroke: "1.5px #F2F2F2",
                  color: "transparent",
                }}
              >
                Renzo Gracie
              </span>
              <span className="mt-2 block text-bone">The Woodlands</span>
            </h1>
            <div className="mt-10 max-w-xl">
              <p className="font-display text-xl tracking-wider md:text-2xl">
                "Jiu-Jitsu is for everyone. We'll take it from there."
              </p>
              <p className="mt-2 text-xs tracking-[0.18em] text-muted-foreground">— RENZO GRACIE</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/free-trial" className="btn-primary">
                Claim Your Free Trial Class <ChevronRight size={16} />
              </Link>
              <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="btn-outline">
                <MapPin size={16} /> Get Directions
              </a>
            </div>
            <div className="mt-8 flex gap-5 text-muted-foreground">
              <a href="https://instagram.com/renzo_gracie_the_woodlands" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="https://facebook.com/renzograciethewoodlands1" aria-label="Facebook" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href={YOUTUBE_URL} aria-label="YouTube" className="hover:text-primary transition-colors"><Youtube size={20} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section id="disciplines" className="px-6 py-20 md:px-12 md:py-32">
        <SectionHeader
          eyebrow="02 — The Disciplines"
          title="Choose Your Path"
          note="Four disciplines, one standard. Every program is built around world-class technique and a welcoming first step."
        />
        <div className="grid gap-4 md:grid-cols-4">
          {disciplines.map((d) => (
            <Link
              key={d.n}
              to="/free-trial"
              className="group relative block h-[420px] overflow-hidden rounded-sm border border-border md:h-[520px]"
            >
              <img
                src={d.img}
                alt={d.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale brightness-50 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-90 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-6">
                <div className="font-display text-4xl text-muted-foreground mb-3">{d.n}</div>
                <h3 className="font-display text-3xl">{d.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.tag}</p>
                {d.note && <p className="mt-3 text-xs text-muted-foreground/80">{d.note}</p>}
                <span className="mt-6 font-display flex items-center gap-1 text-xs tracking-[0.18em] text-primary">
                  Start Training <ChevronRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="border-t border-border px-6 py-20 md:px-12 md:py-32">
        <SectionHeader
          eyebrow="03 — The Chrono-Grid"
          title="Weekly Schedule"
          note={<>Filter by discipline to find your classes. Drop-ins welcome — just arrive 10 minutes early.</>}
        />
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {disciplineFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-display border px-4 py-2 text-xs tracking-[0.18em] transition-all ${
                  filter === f ? "border-primary bg-primary text-white" : "border-border text-muted-foreground hover:text-bone"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="font-display text-sm tracking-[0.18em] text-muted-foreground">
            {new Date().toLocaleString("en-US", { month: "long", year: "numeric" }).toUpperCase()}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-6">
          {days.map((day) => {
            const items = schedule[day].filter((c) => filter === "ALL" || c.discipline === filter);
            return (
              <div key={day}>
                <div className="mb-3 border-b border-border pb-2 font-display text-sm tracking-[0.18em]">{day}</div>
                <div className="space-y-2">
                  {items.length === 0 && <div className="text-xs text-muted-foreground/60">—</div>}
                  {items.map((c, i) => (
                    <div key={i} className="rounded-sm border border-border bg-card p-3 transition-colors hover:border-primary/50">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{c.time}</div>
                      <div className="mt-1.5 text-sm text-bone">{c.name}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{c.coach ?? "—"}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">Schedule subject to seasonal updates. Call or text to confirm today's classes.</p>
          <Link to="/free-trial" className="btn-primary">Claim Your Free Trial</Link>
        </div>
      </section>

      {/* FIRST DAY */}
      <section id="first-day" className="border-t border-border px-6 py-20 md:px-12 md:py-32">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <div className="eyebrow mb-4">04 — Your First Day</div>
            <h2 className="font-display text-5xl md:text-6xl">No Experience Needed.<br />Just Show Up.</h2>
            <p className="mt-6 max-w-md text-sm text-muted-foreground">
              You don't need to be in shape. You don't need to know a single move. You don't need to be "tough." You just need to walk through the door — our coaches will take it from there.
            </p>
            <Link to="/free-trial" className="btn-primary mt-8">Book Your First Class Free</Link>
          </div>
          <div className="space-y-6">
            {[
              { n: "01", t: "Arrive 10 Minutes Early", d: "Give yourself time to sign the waiver and meet the coach. No rush — we've got you." },
              { n: "02", t: "No Gear, No Problem", d: "Wear comfortable athletic clothes. A t-shirt and shorts are perfect. No gi needed for your trial." },
              { n: "03", t: "Train At Your Pace", d: "A coach will help you get set up and guide every drill. Tap early, learn steadily, enjoy the process." },
            ].map((s) => (
              <div key={s.n} className="grid grid-cols-[auto_1fr] gap-8 border-t border-border pt-6">
                <div className="font-display text-3xl text-muted-foreground/70 leading-none">{s.n}</div>
                <div>
                  <h3 className="font-display text-xl">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COACHES */}
      <section id="coaches" className="border-t border-border px-6 py-20 md:px-12 md:py-32">
        <SectionHeader
          eyebrow="05 — The Lineage"
          title="The Coaches"
          note="World-class credentials, handed down from one of the most respected lineages in martial arts."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {coaches.map((c) => (
            <div key={c.name} className="group relative overflow-hidden border border-border">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale brightness-75 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent" />
                {c.badge && (
                  <span className="absolute right-3 top-3 border border-bone/60 px-2 py-1 font-display text-[10px] tracking-[0.18em]">
                    {c.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg">{c.name}</h3>
                <div className="mt-1 font-display text-[10px] tracking-[0.18em] text-muted-foreground">{c.role}</div>
                <p className="mt-2 text-xs text-muted-foreground">{c.cred}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-border px-6 py-20 md:px-12 md:py-32">
        <SectionHeader eyebrow="06 — Voices from the Mat" title="Five-Star Reputation" />
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <div className="eyebrow mb-3">Student Testimonial</div>
            <p className="mb-6 max-w-xl text-sm text-muted-foreground">
              Don't just take it from us — hear it from Ilena, an active competitor at the academy.
            </p>
            <div className="aspect-video overflow-hidden border border-border bg-card">
              {TESTIMONIAL_VIDEO_ID ? (
                <iframe
                  title="Student testimonial from Ilena at Renzo Gracie The Woodlands"
                  src={`https://www.youtube-nocookie.com/embed/${TESTIMONIAL_VIDEO_ID}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-muted-foreground">
                  <div className="rounded-full border border-bone/30 p-4">
                    <Play size={28} fill="currentColor" />
                  </div>
                  <div className="font-display text-xs tracking-[0.18em]">Video Coming Soon</div>
                </div>
              )}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {testimonials.map((t) => (
              <div key={t.name} className="border border-border bg-card p-6">
                <Stars />
                <p className="mt-4 text-sm text-muted-foreground">"{t.quote}"</p>
                <div className="mt-6 border-t border-border pt-4">
                  <div className="font-display tracking-[0.18em]">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR YOU */}
      <section className="border-t border-border px-6 py-20 md:px-12 md:py-32">
        <div className="mb-12">
          <div className="eyebrow mb-4">07 — The Honest Filter</div>
          <h2 className="font-display text-5xl md:text-6xl">Is This For You?</h2>
          <p className="mt-4 text-sm text-muted-foreground">We're not for everyone — and that's the point. Here's the straight truth.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border border-border bg-card p-8">
            <h3 className="font-display text-xl">This is for you if</h3>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "You want a supportive but serious training environment",
                "You value real skill development, not just a workout",
                "You want coaches who care about your progress",
                "You're looking for a community that pushes you to improve",
                "You want your kids to build confidence on and off the mats",
              ].map((x) => (
                <li key={x} className="flex gap-3"><Check size={16} className="mt-1 shrink-0 text-primary" />{x}</li>
              ))}
            </ul>
          </div>
          <div className="border border-border bg-card p-8 opacity-70">
            <h3 className="font-display text-xl text-muted-foreground">This is not for you if</h3>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {[
                "You only want a casual drop-in fitness class",
                "You're not interested in structured learning",
                "You prefer a no-contact workout",
                "You're unwilling to train respectfully",
              ].map((x) => (
                <li key={x} className="flex gap-3"><X size={16} className="mt-1 shrink-0" />{x}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link to="/free-trial" className="btn-primary">Claim Your Free Trial Class</Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border px-6 py-20 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <div className="eyebrow mb-4">08 — Questions</div>
            <h2 className="font-display text-4xl md:text-5xl">Before You Walk In</h2>
            <p className="mt-4 text-sm text-muted-foreground">Still unsure? Call or text us — we answer every question, no pressure.</p>
          </div>
          <div>
            {faqs.map((f, i) => (
              <div key={i} className="border-t border-border last:border-b">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className={`font-display text-sm tracking-[0.12em] ${openFaq === i ? "text-primary" : "text-bone"}`}>{f.q}</span>
                  {openFaq === i ? <Minus size={16} className="text-primary" /> : <Plus size={16} className="text-muted-foreground" />}
                </button>
                {openFaq === i && <p className="pb-6 text-sm text-muted-foreground">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="border-t border-border px-6 py-20 md:px-12 md:py-32">
        <div className="mb-12">
          <div className="eyebrow mb-4">09 — Find Us</div>
          <h2 className="font-display text-5xl md:text-6xl">The Woodlands Dojo</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border border-border bg-card p-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-primary" size={18} />
                <div>
                  <div className="font-display text-xs tracking-[0.18em]">Address</div>
                  <div className="mt-1 text-sm">9391 Grogan's Mill Rd Ste B12, The Woodlands, Texas</div>
                  <div className="mt-1 text-xs text-muted-foreground">Hours: Mon–Sat · See weekly schedule</div>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="mt-1 shrink-0 text-primary" size={18} />
                <div>
                  <div className="font-display text-xs tracking-[0.18em]">Call or Text</div>
                  <div className="mt-1 text-sm">(832) 584-0565</div>
                  <div className="mt-1 text-xs text-muted-foreground">We respond to texts throughout the day.</div>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="mt-1 shrink-0 text-primary" size={18} />
                <div>
                  <div className="font-display text-xs tracking-[0.18em]">Email</div>
                  <div className="mt-1 text-sm break-all">info@renzograciethewoodlands.com</div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="btn-primary">
                <MapPin size={16} /> Get Directions
              </a>
              <a href="sms:+18325840565" className="btn-outline">
                <MessageSquare size={16} /> Text Us
              </a>
            </div>
          </div>
          <div className="min-h-[400px] overflow-hidden border border-border">
            <iframe
              title="Map"
              className="h-full w-full"
              style={{ filter: "grayscale(1) invert(0.92) hue-rotate(180deg) contrast(0.95) brightness(0.95)" }}
              src="https://www.google.com/maps?q=9391+Grogans+Mill+Rd+Ste+B12+The+Woodlands+TX&output=embed"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* IG */}
      <section className="border-t border-border px-6 py-20 md:px-12 md:py-32">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="eyebrow mb-4">10 — Follow the Academy</div>
            <h2 className="font-display text-5xl md:text-6xl">On The Gram</h2>
            <p className="mt-3 text-sm text-muted-foreground">@renzo_gracie_the_woodlands</p>
          </div>
          <a href="https://instagram.com/renzo_gracie_the_woodlands" target="_blank" rel="noreferrer" className="btn-outline">
            View on Instagram <ChevronRight size={14} />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {igTiles.map((t, i) => (
            <a key={i} href="#" className="group relative block aspect-square overflow-hidden border border-border">
              <img
                src={t.img}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover grayscale brightness-50 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full border border-bone/40 bg-obsidian/40 p-3 backdrop-blur-sm transition-transform group-hover:scale-110">
                  <Play size={20} className="text-bone" fill="currentColor" />
                </div>
              </div>
              {t.label && (
                <span className="absolute left-3 bottom-3 border border-bone/40 bg-obsidian/60 px-2 py-1 font-display text-[10px] tracking-[0.18em] backdrop-blur-sm">
                  {t.label}
                </span>
              )}
            </a>
          ))}
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
