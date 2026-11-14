"use client";

import { Chip } from "@heroui/react";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { IProducts } from "@/type/type";
import ProductCard from "./ProductCard";

const PriceIncreaseSection = () => {
  const [topIncreasedRoutes, setTopIncreasedRoutes] = useState<IProducts[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const data: IProducts[] = await res.json();
        const filteredData = data
          .filter((item) => item.change.dir === "up")
          .sort((a, b) => b.change.pct - a.change.pct)
          .slice(0, 6);
        setTopIncreasedRoutes(filteredData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  //   console.log(topIncreasedRoutes);
  return (
    <div>
      <section className="w-full mt-5">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-7">
            <div className="flex flex-col items-start gap-2">
              <Chip
                size="sm"
                className="px-3 py-1 h-auto rounded-full bg-[#ffe4e6] text-[#e11d48] font-bold text-xs flex items-center gap-1.5"
              >
                <TrendingUp size={14} className="shrink-0" />
                <span>মূল্য বৃদ্ধি</span>
              </Chip>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
                <span className="text-[#ef4444] text-xl sm:text-2xl">▲</span>
                <span>আজ দাম বেড়েছে</span>
              </h2>

             
            </div>
            <span className="text-xs text-slate-400 font-medium">
              সর্বোচ্চ থেকে ক্রমানুসারে সাজানো
            </span>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-52 rounded-3xl bg-slate-200/60 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {topIncreasedRoutes.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PriceIncreaseSection;
