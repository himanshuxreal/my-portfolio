/**
 * Single source of truth for all portfolio content.
 * Mirrors README.md. Every gamified label carries a plain-language
 * `real` field so recruiters instantly understand the underlying skill.
 */

export const profile = {
  name: "Himanshu",
  title: "Aspiring DevOps Engineer",
  location: "Dehradun, Uttarakhand, India",
  email: "himanshuxreal@gmail.com",
  github: "https://github.com/himanshuxreal",
  linkedin: "https://www.linkedin.com/in/himanshu-~-5192a432a",
  education: "B.Tech CSE Student — UPES, Dehradun, Uttarakhand",
} as const;

export const character = {
  hunterName: "Himanshu",
  class: "DevOps Engineer",
  guild: "Independent",
  rank: "S",
  rankLabel: "S-Rank Hunter",
  level: 80,
} as const;

export const introduction = [
  "B.Tech CSE student focused on DevOps, automation, cloud technologies, infrastructure engineering, and scalable systems.",
  "My mission is continuous growth through learning, experimentation, and building real-world projects.",
  "Core stack: Linux, Docker, Kubernetes, Git, CI/CD, Python, AWS fundamentals, and modern engineering practices.",
] as const;

export type Stat = {
  key: string;
  attribute: string;
  real: string;
  value: number;
  blurb: string;
};

/** Hunter Stats → real skills. Values are self-assessed proficiency (0–100). */
export const stats: Stat[] = [
  { key: "STR", attribute: "Strength", real: "Linux", value: 88, blurb: "System administration, shell, and the command line as home turf." },
  { key: "AGI", attribute: "Agility", real: "Docker", value: 85, blurb: "Containerizing apps and shipping reproducible environments fast." },
  { key: "INT", attribute: "Intelligence", real: "Problem Solving", value: 90, blurb: "Decomposing messy systems into clean, debuggable pieces." },
  { key: "MAN", attribute: "Mana", real: "Automation & CI/CD", value: 82, blurb: "Pipelines that build, test, and deploy without human babysitting." },
  { key: "VIT", attribute: "Vitality", real: "Consistency & Learning", value: 92, blurb: "Showing up daily — the compounding edge behind every other stat." },
];

export type Ability = { name: string; tier: "core" | "strong" | "growing" };

/** Shadow Abilities → tech stack, grouped by current depth. */
export const abilities: Ability[] = [
  { name: "Linux", tier: "core" },
  { name: "Docker", tier: "core" },
  { name: "Git", tier: "core" },
  { name: "GitHub", tier: "core" },
  { name: "Bash", tier: "core" },
  { name: "Python", tier: "strong" },
  { name: "CI/CD", tier: "strong" },
  { name: "Kubernetes", tier: "growing" },
  { name: "AWS Fundamentals", tier: "strong" },
  { name: "Networking Fundamentals", tier: "strong" },
  { name: "DevOps Fundamentals", tier: "strong" },
  { name: "Java", tier: "growing" },
  { name: "C++", tier: "growing" },
];

export type Project = {
  name: string;
  rank: string;
  power: number;
  description: string;
  features?: string[];
};

/** Shadow Army → projects. `power` drives the card's energy meter. */
export const projects: Project[] = [
  {
    name: "Legacy",
    rank: "Commander",
    power: 95,
    description:
      "Large-scale private project focused on architecture, automation, scalability, and long-term development.",
  },
  {
    name: "Feedback Nexus",
    rank: "Strategist",
    power: 90,
    description:
      "Collaborative feedback and voting platform built to practice modern DevOps workflows and software delivery.",
    features: ["Feedback Collection", "Voting System", "Comments", "Prioritization", "Collaboration"],
  },
  {
    name: "HabitX",
    rank: "Elite Knight",
    power: 88,
    description:
      "Modern habit-tracking platform focused on consistency, motivation, retention, and productivity.",
  },
  {
    name: "Gym Management System",
    rank: "Tank Class",
    power: 84,
    description:
      "Complete gym management solution for memberships, attendance, payments, and administration.",
  },
  {
    name: "Weather Oracle",
    rank: "Mage",
    power: 80,
    description:
      "Weather forecasting platform with API integrations and automated email notifications.",
  },
];

export type Experience = {
  title: string;
  real: string;
  xp: number;
  achievements: string[];
};

/** Dungeon Records → experience. */
export const experience: Experience[] = [
  {
    title: "Technical Internship",
    real: "Hands-on engineering exposure in a professional team.",
    xp: 2500,
    achievements: ["Industry Exposure", "Collaboration", "Documentation", "Practical Learning"],
  },
  {
    title: "NGO Experience",
    real: "Volunteer leadership and coordination work.",
    xp: 1800,
    achievements: ["Leadership", "Teamwork", "Communication", "Coordination"],
  },
];

export type Quest = { title: string; progress: number; status: "active" | "queued" };

/** System Quests → current goals. */
export const quests: Quest[] = [
  { title: "Master Docker", progress: 75, status: "active" },
  { title: "Master Kubernetes", progress: 40, status: "active" },
  { title: "AWS Certification", progress: 30, status: "active" },
  { title: "Advanced DevOps Projects", progress: 55, status: "active" },
  { title: "Open Source Contributions", progress: 20, status: "queued" },
  { title: "DevOps Internship", progress: 15, status: "queued" },
];

/** Monarch Achievements → derived milestone metrics. */
export const achievements = [
  { label: "Total XP", value: experience.reduce((s, e) => s + e.xp, 0), suffix: "" },
  { label: "Shadows Commanded", value: projects.length, suffix: "" },
  { label: "Abilities Unlocked", value: abilities.length, suffix: "" },
  { label: "Active Quests", value: quests.filter((q) => q.status === "active").length, suffix: "" },
] as const;

export type NavItem = { id: string; label: string; short: string; index: string };

export const navItems: NavItem[] = [
  { id: "hero", label: "Gate", short: "Gate", index: "00" },
  { id: "profile", label: "Hunter Profile", short: "Profile", index: "01" },
  { id: "abilities", label: "Shadow Abilities", short: "Abilities", index: "02" },
  { id: "army", label: "Shadow Army", short: "Army", index: "03" },
  { id: "records", label: "Dungeon Records", short: "Records", index: "04" },
  { id: "achievements", label: "Monarch Achievements", short: "Achievements", index: "05" },
  { id: "quests", label: "System Quests", short: "Quests", index: "06" },
  { id: "contact", label: "Contact", short: "Contact", index: "07" },
];

export const site = {
  title: "Himanshu — Shadow Monarch Portfolio",
  shortTitle: "Himanshu · Hunter System",
  description:
    "Himanshu — aspiring DevOps Engineer. Linux, Docker, Kubernetes, CI/CD, and cloud. An interactive hunter-system portfolio inspired by the atmosphere of Solo Leveling.",
  url: "https://himanshu-portfolio.vercel.app",
  keywords: [
    "Himanshu",
    "DevOps Engineer",
    "Portfolio",
    "Docker",
    "Kubernetes",
    "Linux",
    "CI/CD",
    "AWS",
    "Cloud",
    "Solo Leveling inspired",
  ],
} as const;
