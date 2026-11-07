import { LockerHero } from "@/components/sections/locker-hero";
import { NowSection } from "@/components/sections/now-section";
import { LabPreviewSection } from "@/components/sections/lab-preview-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { InvestigationsSection } from "@/components/sections/investigations-section";
import { LearningSection } from "@/components/sections/learning-section";
import { AboutSection } from "@/components/sections/about-section";
import { WorkFormatsSection } from "@/components/sections/work-formats-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col space-y-0">
      <LockerHero />
      <NowSection />
      <LabPreviewSection />
      <ProjectsSection />
      <InvestigationsSection />
      <LearningSection />
      <AboutSection />
      <WorkFormatsSection />
      <ContactSection />
    </div>
  );
}
