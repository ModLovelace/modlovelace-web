import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects-section";
import { StackSection } from "@/components/sections/stack-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4 md:space-y-8">
      <Hero />
      <ProjectsSection />
      <StackSection />
      <ContactSection />
    </div>
  );
}
