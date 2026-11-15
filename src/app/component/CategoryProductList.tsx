
"use client";

import { useMemo, useState } from "react";
import { IProducts } from "@/type/type";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { ArrowUpDown } from "lucide-react";

interface Props {
    products: IProducts[];
}

const CategoryProductList = ({ products }: Props) => {
    const [sort, setSort] = useState("default");

    const sortedProducts = useMemo(() => {
        const data = [...products];

        switch (sort) {
            case "asc":
                return data.sort(
                    (a, b) => Number(a.today) - Number(b.today)
                );

            case "desc":
                return data.sort(
                    (a, b) => Number(b.today) - Number(a.today)
                );

            default:
                return data;
        }
    }, [products, sort]);

    return (
        <div className="space-y-4">

            {/* Sorting */}
            <div className="flex items-center justify-end gap-2 rounded-xl border border-[#e8eee9] bg-white px-5 py-2">
                <span className="text-[11px] text-gray-600">
                   <span className="flex"><ArrowUpDown size={14} className="text-blue-600" />সাজান</span> 
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

            {/* Products */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((product) => (
                    <Link
                        href={`/products/${product.slug}`}
                        key={product.id}
                    >
                        <ProductCard product={product} />
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default CategoryProductList;
