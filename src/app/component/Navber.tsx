'use client'
import { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Label, ProgressCircle, Separator } from "@heroui/react";
import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { GiShoppingCart } from "react-icons/gi";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icatagory } from "@/type/type";

export default function Navber() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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



    const authLink = <>
        {isPending ? (
            <ProgressCircle aria-label="Loading" value={60}>
                <ProgressCircle.Track>
                    <ProgressCircle.TrackCircle />
                    <ProgressCircle.FillCircle />
                </ProgressCircle.Track>
            </ProgressCircle>
        ) : session?.user ?
            (<Dropdown>
                <Dropdown.Trigger className="rounded-full">
                    <Avatar className="rounded-2xl">
                        <Avatar.Image alt="John Doe" src={session?.user?.image} />
                        <Avatar.Fallback className="rounded-lg">{session?.user?.name?.charAt(0).toUpperCase()}</Avatar.Fallback>
                    </Avatar>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                    <div className="px-3 pt-3 pb-1">
                        <div className="flex items-center gap-2">
                            <Avatar size="sm">
                                <Avatar.Image alt="John Doe" src={session?.user?.image} />
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
                                Profile
                            </Link>
                        </Dropdown.Item>

                        <Dropdown.Item id="dashboard" textValue="Dashboard">
                            <Label>Dashboard</Label>
                        </Dropdown.Item>

                        <Dropdown.Item id="logout" textValue="Logout" variant="danger">
                            <div className="flex w-full items-center justify-between gap-2">
                                <Button onClick={() => signOut()} className='bg-red-400'>Log Out</Button>
                                <ArrowRightFromSquare className="size-3.5 text-danger" />
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>) : <>
                <Link href="../signin">Login</Link>
                <Link href="../signup"><Button className="bg-green-600">Sign Up</Button></Link>
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
        <div>

        <nav className="sticky top-0 pt-2 pb-2 z-40 w-full border-b border-separator bg-white backdrop-blur-lg">
            <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only text-black">Menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                    <div>
                        <div className="flex items-center gap-1">
                            <span className=""><GiShoppingCart className="bg-green-600 rounded text-3xl p-1 text-black " /></span>
                            <p className="font-bold text-black">Ba<span className="text-green-400">z</span>ar <span className="text-green-400">D</span>or</p>
                        </div>
                        <span className="text-gray-800 text-[12px] ">{formattedDate}</span>
                    </div>
                </div>

                <div className="hidden items-center gap-4 md:flex">
                    {authLink}
                </div>
            </header>
            {isMenuOpen && (
                <div className="border-t border-separator md:hidden">
                    <ul className="flex flex-col gap-2 p-4">

                        <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
                            {authLink}
                        </li>
                    </ul>
                </div>
            )}
            <div className="max-w-7xl mx-auto">

                <Separator className="max-w-7xl mx-atuo bg-slate-100" />
                {/*dynamic catagory*/}
                <nav
                    aria-label="Category Navigation"
                    className="max-w-7xl flex items-center gap-5 sm:gap-8 py-2.5 overflow-x-auto no-scrollbar"
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
        </div>

    );
}