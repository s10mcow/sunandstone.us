import Layout from "@/components/Layout";
import SearchSection from "./SearchSection";
import AboutSection from "./AboutSection";
import WhoWeAreSection from "./WhoWeAreSection";
import ContactUsSection from "./ContactUsSection";

function Landing() {
  return (
    <Layout>
      <SearchSection />
      <AboutSection />
      <WhoWeAreSection />
      <ContactUsSection />
    </Layout>
  );
}

export default Landing;
