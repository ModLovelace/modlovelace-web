import { LockerHero } from "@/components/sections/locker-hero";
import { ProjectsSection } from "@/components/sections/projects-section";
import { LabPreviewSection } from "@/components/sections/lab-preview-section";
import { StackSection } from "@/components/sections/stack-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col space-y-6 md:space-y-12">
      <LockerHero />
      <ProjectsSection />
      <LabPreviewSection />
      <StackSection />
      <ContactSection />
    </div>
  );
}
