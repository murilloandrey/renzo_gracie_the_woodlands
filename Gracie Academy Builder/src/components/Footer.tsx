import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.webp";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, MessageSquare } from "lucide-react";

const YOUTUBE_URL = "https://www.youtube.com/channel/UCOLzhYYnoYRtR_HPvRLXD3Q";

export function Footer() {
  return (
    <footer className="border-t border-border bg-obsidian px-6 pt-16 pb-8 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <img src={logo} alt="Renzo Gracie The Woodlands" className="logo-white h-14 w-14" />
          <div className="mt-4 font-display text-2xl leading-none">
            Renzo Gracie<br />The Woodlands
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Affiliate academy of the Renzo Gracie team</p>
          <div className="mt-5 flex gap-4 text-muted-foreground">
            <a href="https://instagram.com/renzo_gracie_the_woodlands" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram size={18} /></a>
            <a href="https://facebook.com/renzograciethewoodlands1" aria-label="Facebook" className="hover:text-primary transition-colors"><Facebook size={18} /></a>
            <a href={YOUTUBE_URL} aria-label="YouTube" className="hover:text-primary transition-colors"><Youtube size={18} /></a>
          </div>
        </div>
        <div>
          <div className="eyebrow mb-4">Contact</div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3"><MapPin size={16} className="mt-1 shrink-0" />9391 Grogan's Mill Rd Ste B12, The Woodlands, Texas</li>
            <li className="flex gap-3"><Phone size={16} className="mt-1 shrink-0" /><a href="tel:+18325840565" className="hover:text-bone">(832) 584-0565</a></li>
            <li className="flex gap-3"><MessageSquare size={16} className="mt-1 shrink-0" /><a href="sms:+18325840565" className="hover:text-bone">Text Us</a></li>
            <li className="flex gap-3"><Mail size={16} className="mt-1 shrink-0" /><a href="mailto:info@renzograciethewoodlands.com" className="hover:text-bone break-all">info@renzograciethewoodlands.com</a></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4">Explore</div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/" hash="disciplines" className="hover:text-bone">Programs</Link></li>
            <li><Link to="/" hash="schedule" className="hover:text-bone">Weekly Schedule</Link></li>
            <li><Link to="/" hash="first-day" className="hover:text-bone">Your First Day</Link></li>
            <li><Link to="/" hash="coaches" className="hover:text-bone">Coaches</Link></li>
            <li><Link to="/" hash="location" className="hover:text-bone">Location</Link></li>
            <li>
              <a
                href="https://www.breakpointfc.com/collections/renzo-gracie-the-woodlands"
                target="_blank"
                rel="noreferrer"
                className="hover:text-bone"
              >
                Gear
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
        <div>© 2026 Renzo Gracie The Woodlands. All rights reserved.</div>
        <div className="font-display tracking-[0.18em]">Jiu-Jitsu is for everyone.</div>
      </div>
    </footer>
  );
}
