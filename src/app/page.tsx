
import HeroPage from "./component/Hero";
import PriceIncreaseSection from "./component/PriceIncreaseSection";
import PriceDecreaseSection from "./component/PriceDecreaseSection";
import AllProductsSection from "./component/AllProductsSection";

export default function Home() {
  return (
   <div>
    <HeroPage />
    <PriceIncreaseSection />
    <PriceDecreaseSection />
    <AllProductsSection />
   </div>
  );
}
