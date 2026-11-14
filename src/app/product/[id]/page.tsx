
import { IProducts } from "@/type/type";
import {  ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const ProductDetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
    );

    if (!res.ok) notFound();

    const product: IProducts = await res.json();

    const markets = product.markets || [];

    const minPrice = markets.length
        ? Math.min(...markets.map((m) => m.min))
        : product.today;

    const maxPrice = markets.length
        ? Math.max(...markets.map((m) => m.max))
        : product.today;

    const avgPrice = markets.length
        ? markets.reduce((sum, m) => sum + m.max, 0) / markets.length
        : product.today;

    const priceCards = [
        {
            label: "সর্বনিম্ন দাম",
            price: minPrice,
            color: "text-green-600",
        },
        {
            label: "গড় বাজারদর",
            price: avgPrice,
            color: "text-orange-600",
        },
        {
            label: "সর্বোচ্চ দাম",
            price: maxPrice,
            color: "text-[#26352d]",
        },
    ];

    return (
        <main className="min-h-screen bg-[#f1f6f2] px-4 py-6 sm:px-6 sm:py-10">
            <div className="mx-auto max-w-6xl space-y-4">

                {/* Breadcrumb */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <Link href="/" className="hover:text-green-700">
                        হোম
                    </Link>
                    <ChevronRight size={13} />

                    <Link
                        href={`/category/${product.category}`}
                        className="hover:text-green-700"
                    >
                        {product.categoryNameBn}
                    </Link>

                    <ChevronRight size={13} />

                    <span className="font-medium text-gray-800">
                        {product.nameBn}
                    </span>
                </div>

                {/* Product Header */}
                <section className="flex flex-col justify-between gap-4 rounded-xl border border-[#e8eee9] bg-white p-4 sm:flex-row sm:items-center sm:p-5">

                    <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f1f6f2] text-3xl">
                            {product.categoryIcon}
                        </div>

                        <div>
                            <h1 className="text-lg font-bold text-[#26352d] sm:text-xl">
                                {product.nameBn}
                            </h1>

                            <p className="mt-1 text-xs text-gray-500">
                                {product.categoryNameBn}
                            </p>

                            <p className="mt-1 text-[11px] text-gray-500">
                                {product.nameBn} এর বর্তমান বাজারদর ও বিস্তারিত
                            </p>
                        </div>
                    </div>

                    {/* Today's Price */}
                    <div className="min-w-[120px] rounded-xl bg-[#f1f6f2] px-5 py-3 text-center">
                        <p className="text-xs text-gray-500">
                            আজকের বাজারদর
                        </p>

                        <h2 className="mt-1 text-2xl font-black text-[#26352d]">
                            ৳{product.today}
                        </h2>

                        <p className="text-[10px] text-gray-500">
                            টাকা / {product.unit}
                        </p>

                        <div className={`mt-1 flex items-center justify-center gap-1 text-[10px] font-semibold ${
                            product.change.dir === "up"
                                ? "text-red-500"
                                : product.change.dir === "down"
                                    ? "text-green-600"
                                    : "text-gray-500"
                        }`}>
                            {product.change.dir === "up" ? (
                                <TrendingUp size={12} />
                            ) : product.change.dir === "down" ? (
                                <TrendingDown size={12} />
                            ) : null}

                            {product.change.dir === "flat"
                                ? "অপরিবর্তিত"
                                : `${product.change.dir === "up" ? "+" : "-"} ${product.change.pct}%`}
                        </div>
                    </div>
                </section>

                {/* Market Summary */}
                <section className="rounded-xl border border-[#e8eee9] bg-white p-4">

                    <h2 className="mb-3 text-sm font-bold text-[#26352d]">
                        দামের সারসংক্ষেপ
                    </h2>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">

                        {priceCards.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-xl border border-[#e8eee9] bg-[#fbfdfb] p-3"
                            >
                                <p className="text-xs text-gray-500">
                                    {item.label}
                                </p>

                                <h3 className={`mt-1 text-xl font-bold ${item.color}`}>
                                    ৳{item.price.toFixed(0)}
                                    <span className="ml-1 text-[10px] font-normal text-gray-500">
                                        {product.unit}
                                    </span>
                                </h3>

                                <p className="mt-1 text-[10px] text-gray-500">
                                    {product.nameBn} এর বাজারদর
                                </p>
                            </div>
                        ))}

                    </div>

                    {/* Market Table */}
                    <h2 className="mb-3 mt-5 text-sm font-bold text-[#26352d]">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    <div className="overflow-x-auto rounded-xl border border-[#e8eee9]">
                        <table className="w-full min-w-[650px] border-collapse text-xs">
                            <thead>
                                <tr className="bg-[#f8faf8] text-gray-600">
                                    <th className="border-b border-r border-[#e8eee9] px-3 py-3 text-left font-semibold">
                                        বাজার
                                    </th>

                                    <th className="border-b border-r border-[#e8eee9] px-3 py-3 text-left font-semibold">
                                        বিক্রেতা
                                    </th>

                                    <th className="border-b border-r border-[#e8eee9] px-3 py-3 text-right font-semibold">
                                        সর্বনিম্ন
                                    </th>

                                    <th className="border-b border-r border-[#e8eee9] px-3 py-3 text-right font-semibold">
                                        সর্বোচ্চ
                                    </th>

                                    <th className="border-b border-[#e8eee9] px-3 py-3 text-right font-semibold">
                                        গড়
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {markets.length > 0 ? (
                                    markets.map((market, index) => (
                                        <tr
                                            key={index}
                                            className={`transition-colors hover:bg-green-50 ${
                                                index % 2 === 0
                                                    ? "bg-white"
                                                    : "bg-[#f8faf8]"
                                            }`}
                                        >
                                            <td className="border-b border-r border-[#e8eee9] px-3 py-3 font-medium text-gray-800">
                                                {market.division}
                                            </td>

                                            <td className="border-b border-r border-[#e8eee9] px-3 py-3 text-gray-600">
                                                {market.market}
                                            </td>

                                            <td className="border-b border-r border-[#e8eee9] px-3 py-3 text-right text-green-700">
                                                ৳{market.min}
                                            </td>

                                            <td className="border-b border-r border-[#e8eee9] px-3 py-3 text-right text-gray-700">
                                                ৳{market.max}
                                            </td>

                                            <td className="border-b border-[#e8eee9] px-3 py-3 text-right font-semibold text-gray-800">
                                                   ৳{((market.min + market.max) / 2).toFixed(2)}

                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-3 py-10 text-center text-gray-500"
                                        >
                                            বর্তমানে কোনো বাজারের তথ্য পাওয়া যায়নি।
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </section>
            </div>
        </main>
    );
};

export default ProductDetailsPage;
