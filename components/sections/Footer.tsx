import { Github, Linkedin, Mail } from "lucide-react";
import { profile, character } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";

const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  profile.email
)}&su=${encodeURIComponent("Hello Himanshu — from your portfolio")}`;

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-mono text-sm font-semibold tracking-[0.2em] text-white">
            {profile.name.toUpperCase()}
            <span className="ml-2 text-monarch-glow">{character.rankLabel}</span>
          </p>
          <p className="mt-1 font-sans text-xs text-mist">
            {profile.title} · Built with Next.js, Tailwind &amp; Framer Motion.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <FooterLink href={profile.github} label="GitHub">
            <Github className="h-4 w-4" />
          </FooterLink>
          <FooterLink href={profile.linkedin} label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </FooterLink>
          <FooterLink href={gmailCompose} label="Email">
            <Mail className="h-4 w-4" />
          </FooterLink>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-7xl text-center font-sans text-[11px] text-mist/60 sm:text-left">
        Original artwork &amp; interface. Inspired by the atmosphere of the hunter-system genre — no
        copyrighted assets used.
      </p>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  children,
  external = true,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <MagneticButton
      href={href}
      external={external}
      aria-label={label}
      variant="ghost"
      size="icon"
      shape="square"
      className="border-white/10 bg-white/[0.03] text-mist hover:text-white"
    >
      {children}
    </MagneticButton>
  );
}
