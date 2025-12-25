import SellerProductCard from "@/components/seller_comps/SellerProductCard";
import BrandStrip from "@/components/shared/BrandStrip";
import BrowseByStyle from "@/components/shared/BrowseByStyle";
import HeroSection from "@/components/shared/HeroSection";
import ProductSection from "@/components/shared/ProductSection";
import Testimonials from "@/components/shared/Testimonials";

const page = () => {
  return (
    <div>
      <HeroSection />
      <BrandStrip />
      <ProductSection title="NEW ARRIVALS" />
      <ProductSection title="TOP SELLING" />
      <BrowseByStyle />
      <Testimonials />
    </div>
  );
};

export default page;
