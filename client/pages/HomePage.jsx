import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";

export const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />
    </div>
  );
};
