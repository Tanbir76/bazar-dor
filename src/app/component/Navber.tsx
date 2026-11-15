'use client'
import { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Separator, Spinner } from "@heroui/react";
import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { GiShoppingCart } from "react-icons/gi";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icatagory } from "@/type/type";
import toast from "react-hot-toast";

export default function Navber() {
    const router = useRouter();
    const pathname = usePathname();
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, isPending } = useSession();

    const [categories, setCategories] = useState<Icatagory[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
            const data = await res.json();
            setCategories(data);
        };
        fetchCategories();
    }, []);
    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("Logged out successfully!");
            router.push('/');

        } catch (error: unknown) {
            const message = error instanceof Error
                ? error.message
                : "Logout failed!";
            toast.error(message);
        }

    }




    const authLink = <>
        {isPending ? (
            <Spinner color="success" />
        ) : session?.user ?
            (<Dropdown>
                <Dropdown.Trigger className="rounded-full">
                    <Avatar className="rounded-2xl">

                        <Avatar.Image
                            alt="John Doe"
                            src={session?.user?.image ?? undefined}
                        />
                        <Avatar.Fallback className="rounded-lg">{session?.user?.name?.charAt(0).toUpperCase()}</Avatar.Fallback>
                    </Avatar>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                    <div className="pl-2 pt-3 pb-1">
                        <div className="flex items-center gap-2">
                            <Avatar size="sm">
                                <Avatar.Image
                                    alt="John Doe"
                                    src={session?.user?.image ?? undefined}
                                />
                                <Avatar.Fallback className="rounded-lg">{session?.user?.name?.charAt(0).toUpperCase()}</Avatar.Fallback>
                            </Avatar>
                            <div className="flex flex-col gap-0">
                                <p className="text-sm leading-5 font-medium">{session?.user?.name}</p>
                                <p className="text-xs leading-none text-muted">{session?.user?.email}</p>
                            </div>
                        </div>
                    </div>
                    <Dropdown.Menu>
                        <Dropdown.Item id="profile" textValue="Profile">
                            <Link href={'/profile'} className="block py-2">
                            <div>
                                Profile
                            </div>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item id="logout" textValue="Logout" variant="danger">
                            <div className="flex w-full items-center justify-between gap-2" onClick={handleSignOut}>
                                Log Out
                                <ArrowRightFromSquare className="size-3.5 text-danger" />
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>) : <>
                <Link href="../signin" className="mr-3 text-[1rem]">সাইন ইন</Link>
                <Link href="../signup"><Button className="bg-green-600">সাইন আপ</Button></Link>
            </>
        }
    </>
    const formattedDate = new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
       
            <nav className="sticky top-0 z-[999] w-full pt-4 px-2 md:px-1 pb-2 bg-white/95 backdrop-blur-lg">
                <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2">
                    <div className="flex items-center gap-4">
                        <div>
                            <Link href="/" >
                                <div className="flex items-center gap-1 mr-2">
                                    <span className=""><GiShoppingCart className="bg-green-600 rounded text-3xl p-1 text-black " /></span>
                                    <p className="font-bold text-xl text-black">বাজার দর</p>
                                </div>
                            </Link>
                            <span className="text-gray-800 text-[12px] ">{formattedDate}</span>
                        </div>
                    </div>

                    <div>
                        <ul>
                            <li>
                                {authLink}
                            </li>
                        </ul>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto">

                    <Separator className="max-w-7xl mx-atuo bg-slate-100" />
                    {/*dynamic catagory*/}
                    <nav
                        aria-label="Category Navigation"
                        className="max-w-7xl flex items-center ml-2 ms:ml-1 gap-5 sm:gap-8 py-2.5 overflow-x-auto no-scrollbar"
                    >
                        {categories.map((cat) => {
                            const isActive =
                                pathname === `/${cat.slug}` ||
                                pathname === `/category/${cat.slug}`;

                            return (
                                <Link
                                    key={cat.id}
                                    href={`/category/${cat.slug}`}
                                    title={cat.nameBn}
                                    className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium whitespace-nowrap py-1 transition-colors ${isActive
                                        ? "text-[#0d6efd] font-semibold"
                                        : "text-slate-700 hover:text-[#0d6efd]"
                                        }`}
                                >
                                    <span className="text-base leading-none">{cat.icon}</span>
                                    <span>{cat.nameBn}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </nav>
    );
}