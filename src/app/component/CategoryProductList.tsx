
"use client";

import { useMemo, useState } from "react";
import { IProducts } from "@/type/type";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";

interface Props {
    products: IProducts[];
}

const CategoryProductList = ({ products }: Props) => {
    const [sort, setSort] = useState("default");

    const sortedProducts = useMemo(() => {
        const data = [...products];

        switch (sort) {
            case "asc":
                return data.sort((a, b) => a.today - b.today);

            case "desc":
                return data.sort((a, b) => b.today - a.today);
            default:
                return data;
        }
    }, [products, sort]);

    return (
        <>
            <div className="flex items-center justify-end gap-2 rounded-xl border border-[#e8eee9] bg-white px-5 py-2">
                <span className="text-[11px] text-gray-600">
                    সাজান
                </span>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] text-gray-600 outline-none focus:border-gray-400"
                >
                    <option value="default">নির্বাচন</option>
                    <option value="asc">দাম কম থেকে বেশি</option>
                    <option value="desc">দাম বেশি থেকে কম</option>
                </select>
            </div>

           
        </>
    );
};

export default CategoryProductList;
