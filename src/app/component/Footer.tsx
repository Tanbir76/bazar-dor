
export default function Footer() {
    return (
        <footer className="bg-[#d8f7de] text-white py-5">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">

                {/* Left */}
                <p className="text-sm md:text-base font-medium text-black">
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                {/* Right */}
                <p className="text-xs md:text-sm  text-center text-black">
                    “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
                </p>
            </div>
        </footer>
    )
}