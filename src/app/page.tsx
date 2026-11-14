import FaredecreaseSection from "./component/FaredecreaseSection";
import FareIncreaseSection from "./component/FareIncreaseSection";
import HeroPage from "./component/Hero";

export default function Home() {
  return (
   <div className="bg-[#f1f6f2]">
    <HeroPage />
    <FareIncreaseSection />
    <FaredecreaseSection />
   </div>
  );
}
