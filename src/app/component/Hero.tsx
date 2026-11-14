"use client"
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import bazarHero from "../images/bazar-hero.png";
const HeroPage = () => {
    const formattedDate = new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const handleScrollToContent = () => {
        document.getElementById("all-products")?.scrollIntoView({
            behavior: "smooth",
        });
    }
    return (
        <section className="  px-1 py-8">
            <div className="mx-auto max-w-7xl">
                <Card className="overflow-hidden rounded-2xl border border-[#e1eae3] bg-[#fbfdfb] shadow-none">
                    <div className="grid min-h-[280px] grid-cols-1 items-center gap-6 px-6 py-8 md:grid-cols-2 md:px-10 lg:px-12">

                        <div className="flex flex-col items-start gap-4">
                            <div
                                className="bg-[#e2f4e8] text-[#078b43] font-medium px-4 py-1 rounded-2xl "
                            >
                                <span>{formattedDate}</span>
                            </div>

                            <h1 className="text-3xl font-bold mt-4 text-[#17251c] md:text-4xl">
                                আজকের বাজারের দাম এক নজরে
                            </h1>

                            <p className="max-w-lg text-sm  text-gray-500">
                                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                                বাজারভিত্তিক বিস্তারিত, চাহিদা, সরবরাহ এবং দামের
                                পরিবর্তন এক জায়গায়।
                            </p>
                            <Button className="mt-4 rounded-lg bg-[#078b43] px-5 font-semibold text-white " onClick={handleScrollToContent}>
                                সব দাম দেখুন
                            </Button>
                        </div>
                        <div>
                            <Image
                                src={bazarHero}
                                width={300}
                                height={200}
                                alt="Bazar products"
                                className="h-auto w-full max-w-md object-contain"
                            />
                        </div>




                    </div>
                </Card>
            </div>
        </section>
    );
};

export default HeroPage;
