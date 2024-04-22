import Layout from "@/components/Layout";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import WhoWeAreSection from "./WhoWeAreSection";
import ContactUsSection from "./ContactUsSection";

function Landing() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <WhoWeAreSection />
      <ContactUsSection />
    </Layout>
  );
}

export default Landing;
