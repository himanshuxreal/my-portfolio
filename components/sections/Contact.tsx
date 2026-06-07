"use client";

import { Mail, Github, Linkedin, MapPin, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/system/Section";
import { Reveal } from "@/components/system/Reveal";
import { InteractiveCard } from "@/components/system/InteractiveCard";
import { ContactForm } from "./ContactForm";
import { profile } from "@/data/portfolio";

const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  profile.email
)}&su=${encodeURIComponent("Hello Himanshu — from your portfolio")}`;

const channels = [
  { icon: Mail, label: "Email", value: profile.email, href: gmailCompose, external: true },
  { icon: Github, label: "GitHub", value: "@himanshuxreal", href: profile.github, external: true },
  { icon: Linkedin, label: "LinkedIn", value: "Himanshu", href: profile.linkedin, external: true },
  { icon: MapPin, label: "Location", value: profile.location, href: null, external: false },
];

export function Contact() {
  return (
    <Section
      id="contact"
      index="07"
      eyebrow="Open a Channel"
      title="Summon the Hunter"
      description="Recruiting, collaborating, or just curious? The gate is open — send a message or reach out directly."
    >
      <Reveal>
        <InteractiveCard scan={false} className="hud-corners p-5 sm:p-6 md:p-10">
          <div
            aria-hidden
            className="glow-orb pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:gap-10">
            {/* Form */}
            <div>
              <h3 className="font-heading text-3xl font-semibold leading-tight text-white md:text-4xl">
                Ready to add a <span className="text-gradient">disciplined builder</span> to your guild.
              </h3>
              <p className="mt-3 max-w-md font-sans text-mist">
                Open to DevOps internships, open-source collaboration, and real-world infrastructure
                challenges. I reply fast.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>

            {/* Channels */}
            <ul className="grid h-fit gap-3">
              {channels.map((c) => {
                const Inner = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition group-hover:border-monarch/50">
                      <c.icon className="h-4 w-4 text-monarch-glow" />
                    </span>
                    <span className="min-w-0">
                      <span className="block hud-label">{c.label}</span>
                      <span className="block truncate font-sans text-sm text-white/90">{c.value}</span>
                    </span>
                    {c.href && (
                      <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-mist transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    )}
                  </>
                );
                const cls =
                  "group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300";
                return (
                  <li key={c.label}>
                    {c.href ? (
                      <a
                        href={c.href}
                        data-cursor
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={`btn-energy ${cls} cursor-pointer hover:-translate-y-0.5 hover:border-monarch/50 hover:bg-white/[0.04] hover:shadow-glow`}
                      >
                        {Inner}
                      </a>
                    ) : (
                      <div className={cls}>{Inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </InteractiveCard>
      </Reveal>
    </Section>
  );
}
