
import HeroPage from "./component/Hero";
import PriceIncreaseSection from "./component/PriceIncreaseSection";
import PriceDecreaseSection from "./component/PriceDecreaseSection";
import AllProductsSection from "./component/AllProductsSection";

export default function Home() {
  return (
   <div className="bg-[#f1f6f2]">
    <HeroPage />
    <PriceIncreaseSection />
    <PriceDecreaseSection />
    <AllProductsSection />
   </div>
  );
}
