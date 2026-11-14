import CategoryProductList from "@/app/component/CategoryProductList";
import ProductCard from "@/app/component/ProductCard";
import { IProducts } from "@/type/type";
import { Home } from "lucide-react";
import Link from "next/link";

const CategoryDetailsPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;

    let products: IProducts[] = [];

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products?category=${slug}`
        );

        if (res.ok) {
            products = await res.json();
        }
    } catch (error) {
        console.error("Error fetching product details:", error);
    }

    if (!products.length) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center space-y-4">
                <span className="text-6xl block">🗺️</span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                    পণ্যের তথ্য খুঁজে পাওয়া যায়নি
                </h1>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                    আপনি যে পণ্যের তথ্য খুঁজছেন সেটি সঠিক নয় অথবা সিস্টেম থেকে সরিয়ে নেওয়া হয়েছে।
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors"
                >
                    <Home className="w-5 h-5" />
                    <span>হোম পেজে ফিরে যান</span>
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen w-full bg-[#f1f6f2] px-4 py-6 sm:px-6 sm:py-10">
            <div className="mx-auto max-w-6xl space-y-4">

                {/* Header Card */}
                <div className="flex items-center gap-3 rounded-xl border border-[#e8eee9] bg-white px-4 py-3">
                    <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-black">
                        <div className="flex h-full w-full flex-col">
                            <div className="h-1/2 bg-white" />
                            <div className="flex-1 bg-[#ed1c24]" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-[#26352d]">
                            {products[0].categoryNameBn}
                        </h2>
                        <p className="text-[11px] text-gray-500">
                            {products[0].categoryNameBn} এর বাজারদর ও বিস্তারিত
                        </p>
                    </div>
                </div>

                {/* Filter Card */}
               <CategoryProductList products={products} />

                {/* Products */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <Link
                            href={`/products/${product.slug}`}
                            key={product.id}
                        >
                            <ProductCard key={product.id} product={product}/>
                            
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default CategoryDetailsPage;