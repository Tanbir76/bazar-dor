"use client"

import { IProducts } from "@/type/type";
import { Chip } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";


const Marque = () => {
    const [categories, setCategories] = useState<IProducts[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
            const data = await res.json();
            setCategories(data);
        };
        fetchCategories();
    }, []);
    return (
        <div className="w-full bg-white text-black flex items-center h-11 overflow-hidden  border-slate-800">
            {/* Scrolling Marquee Section */}
            <Marquee
                pauseOnHover={true}
                speed={45}
                gradient={false}
                className="flex items-center h-full overflow-hidden"
            >
                {categories.map((item) => {
                    const isUp = item.change.dir === "up";
                    const isDown = item.change.dir === "down";

                    return (
                        <Link
                            key={item.id}
                            href={`/product/${item.id}`}
                            className="flex items-center gap-2 mx-3 px-3 py-1 rounded-lg hover:bg-slate-800/80 transition-colors whitespace-nowrap text-xs sm:text-sm"
                        >
                            {/* Transport Icon */}
                            <span className="text-base leading-none">{item.image}</span>

                            {/* Route Name */}
                            <span className="font-bold text-black">{item.nameBn}</span>

                            {/* Service Type */}
                            <span className="text-slate-400 text-xs">
                                ({item.categoryNameBn})
                            </span>

                            {/* Today's Fare */}
                            <span className="font-bold text-[#fbbf24]">
                                {item.today} টাকা
                            </span>

                            {/* Price Change Chip */}
                            <Chip
                                size="sm"
                                className={`px-2 py-0.5 h-5 rounded-full text-[11px] font-bold flex items-center gap-0.5 ${isUp
                                        ? "bg-[#ffe4e6] text-[#e11d48]"
                                        : isDown
                                            ? "bg-[#d1fae5] text-[#059669]"
                                            : "bg-slate-200 text-slate-700"
                                    }`}
                            >
                                {isUp && "▲ "}
                                {isDown && "▼ "}
                                {!isUp && !isDown && "— "}
                                {item.change.pct}
                            </Chip>
                        </Link>
                    );
                })}
            </Marquee>
        </div>
    );
};

export default Marque;