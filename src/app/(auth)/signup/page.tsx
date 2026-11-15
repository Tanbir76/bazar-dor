
"use client";

import { signIn, signUp } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Card, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";

export default function SingUpPage() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const { data: resData, error } = await signUp.email({
            email: data.email as string,
            password: data.password as string,
            name: data.name as string,
        })
        if (resData?.user?.name) {
            router.push('/signin');
            toast.success('Account creat successfully!')
        } else if (error) {
            toast.error(error.message || "Something went wrong!")
        }
    }
    const handleGoogleSignIn = async() => {
        const resData = await signIn.social({
            provider: "google",
        });
    }
    const handleGithubSignIn =async()=>{
         const gitData = await signIn.social({
        provider: "github"
    })


    }

    return (
        <div className=" h-full flex items-center justify-center px-4 py-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-5">
                    <h1 className="text-2xl font-bold text-[#17251c]">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        নিচের ফর্মটি পূরণ করে নতুন অ্যাকাউন্ট তৈরি করুন
                    </p>
                </div>
                <Card>
                    <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>

                        <TextField
                            isRequired
                            name="name"
                            validate={(value) => {
                                if (value.length < 3) {
                                    return "Name must be at least 3 characters";
                                }
                                return null;
                            }}
                        >
                            <Label>নাম</Label>
                            <Input placeholder="আপনার সম্পূর্ণ নাম" />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }

                                return null;
                            }}
                        >
                            <Label>ইমেইল</Label>
                            <Input placeholder="আপনার ই-মেইলে" />
                            <FieldError />
                        </TextField>


                        <TextField className="w-full " name="password">
                            <Label>পাসওয়ার্ড</Label>
                            <InputGroup>
                                <InputGroup.Input
                                    className="w-full "
                                    type={isVisible ? "text" : "password"}
                                />
                                <InputGroup.Suffix className="pe-0">
                                    <Button
                                        isIconOnly
                                        aria-label={isVisible ? "Hide password" : "Show password"}
                                        size="sm"
                                        variant="ghost"
                                        onPress={() => setIsVisible(!isVisible)}
                                    >
                                        {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                                    </Button>
                                </InputGroup.Suffix>
                            </InputGroup>
                        </TextField>


                        <Button type="submit" className="w-full bg-[#078b43] text-white font-semibold rounded-md mt-1"
                            size="lg">
                            <Check />
                            Submit
                        </Button>
                    </Form>

                    <div className="flex items-center gap-3 my-4">
                        <div className="h-px bg-gray-200 flex-1" />
                        <span className="text-xs text-gray-500">অথবা</span>
                        <div className="h-px bg-gray-200 flex-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            onClick={handleGoogleSignIn}
                            type="button"
                            className="border-[#e0e8e2] text-xs"

                        >
                            <FcGoogle />Google দিয়ে চালিয়ে যান
                        </Button>

                        <Button
                            type="button"
                            className="border-[#e0e8e2] text-xs"
                            onClick={handleGithubSignIn}

                        >
                            <ImGithub className="text-black" />GitHub দিয়ে চালিয়ে যান
                        </Button>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-400 text-[15px]">অ্যাকাউন্ট আছে? <span className="text-black"> <Link href='/signin'>SignIn</Link> </span></p>
                    </div>

                </Card>
                <p className="text-center text-xs text-gray-400 mt-5">
                    © ২০২৬ · আপনার তথ্য নিরাপদে সংরক্ষিত থাকবে
                </p>
            </div>
        </div>
    )
}