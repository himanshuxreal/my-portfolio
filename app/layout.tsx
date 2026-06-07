import type { Metadata, Viewport } from "next";
import { Sora, Outfit, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site, profile } from "@/data/portfolio";
import "./globals.css";

// Sora — hero name & display: geometric, premium, modern (replaces Cinzel serif).
const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-display", display: "swap" });
// Outfit — section headings & HUD labels: clean, confident, contemporary (replaces Rajdhani).
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-heading", display: "swap" });
// Inter — body copy: clean, neutral, recruiter-friendly.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// JetBrains Mono — numerals & data labels: precise, technical, developer-native.
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-mono", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s · Hunter System" },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: profile.name }],
  creator: profile.name,
  applicationName: site.shortTitle,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.shortTitle,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  category: "technology",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: site.url,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Dehradun", addressRegion: "Uttarakhand", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "UPES, Dehradun" },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ["DevOps", "Linux", "Docker", "Kubernetes", "CI/CD", "AWS", "Python", "Automation"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a
          href="#profile"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-monarch focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
