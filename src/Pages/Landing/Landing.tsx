
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black">
      <Hero />
      <Statistics />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Landing;
