import Layout from "@/components/Layout";
import SearchSection from "./SearchSection";
import AboutSection from "./AboutSection";
import WhoWeAreSection from "./WhoWeAreSection";
import AiSection from "./AiSection";

function Landing() {
  return (
    <Layout>
      <SearchSection />
      <AboutSection />
      <WhoWeAreSection />
      <AiSection />
    </Layout>
  );
}

export default Landing;
