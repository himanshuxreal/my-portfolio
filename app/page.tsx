import { ExperienceShell } from "@/components/system/ExperienceShell";
import { Hero } from "@/components/sections/Hero";
import { HunterProfile } from "@/components/sections/HunterProfile";
import { ShadowAbilities } from "@/components/sections/ShadowAbilities";
import { ShadowArmy } from "@/components/sections/ShadowArmy";
import { DungeonRecords } from "@/components/sections/DungeonRecords";
import { MonarchAchievements } from "@/components/sections/MonarchAchievements";
import { SystemQuests } from "@/components/sections/SystemQuests";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { SectionTransition } from "@/components/system/SectionTransition";

export default function Home() {
  return (
    <ExperienceShell>
      <Hero />
      <SectionTransition />
      <HunterProfile />
      <SectionTransition />
      <ShadowAbilities />
      <SectionTransition />
      <ShadowArmy />
      <SectionTransition />
      <DungeonRecords />
      <SectionTransition />
      <MonarchAchievements />
      <SectionTransition />
      <SystemQuests />
      <SectionTransition />
      <Contact />
      <Footer />
    </ExperienceShell>
  );
}
