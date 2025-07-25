import AboutHero from "@/components/about-hero";
import ActionCards from "@/components/action-cards";
import CommitmentSection from "@/components/commitment-section";
import ImpactNumbers from "@/components/impact-numbers";
import Pillars from "@/components/pillars";
import ProfilesSection from "@/components/profiles-section";
import PurposeSection from "@/components/purpose-section";
import TrustedBySection from "@/components/trusted-by-section";
import React from "react";

function AboutUs() {
  return (
    <div>
      <AboutHero />
      <CommitmentSection />
      <PurposeSection />
      <Pillars />
      <ActionCards />
      <ProfilesSection />
      <TrustedBySection />
      <ImpactNumbers />
    </div>
  );
}
export default AboutUs;
