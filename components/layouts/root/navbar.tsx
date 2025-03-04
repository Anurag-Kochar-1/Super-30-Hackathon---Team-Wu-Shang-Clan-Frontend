"use client";
import { Menu } from "lucide-react";
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/logo";

interface RouteProps {
    href: string;
    label: string;
}


const routeList: RouteProps[] = [
    {
        href: "#features",
        label: "Features",
    },
    {
        href: "#benefits",
        label: "Benefits",
    },
    {
        href: "#pricing",
        label: "Pricing",
    },
    {
        href: "#faq",
        label: "FAQ",
    },
];


export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <header className="shadow-lg bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
            <Logo />

            {/* <!-- Desktop Navigation --> */}
            <nav className="hidden lg:flex items-center">
                <ul className="flex space-x-8">
                    {routeList.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* <!-- Mobile Menu --> */}
            <div className="flex items-center lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Menu
                            onClick={() => setIsOpen(!isOpen)}
                            className="cursor-pointer lg:hidden"
                        />
                    </SheetTrigger>

                    <SheetContent
                        side="left"
                        className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
                    >
                        <div>
                            <SheetHeader className="mb-4 ml-4">
                                <SheetTitle className="flex items-center">
                                    <Logo />
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-2">
                                {routeList.map(({ href, label }) => (
                                    <Button
                                        key={href}
                                        onClick={() => setIsOpen(false)}
                                        asChild
                                        variant="ghost"
                                        className="justify-start text-base"
                                    >
                                        <Link href={href}>{label}</Link>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <SheetFooter className="flex-col sm:flex-col justify-start items-start">
                            <Separator className="mb-2" />
                            <div className="flex flex-col w-full gap-2">
                                <Link
                                    href="/login"
                                    className={buttonVariants({ variant: "outline", className: "w-full" })}
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/register"
                                    className={buttonVariants({ className: "w-full" })}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>


            <div className="hidden lg:flex lg:gap-4">
                <Link href="/login" className={buttonVariants({ variant: "secondary" })}>
                    Log In
                </Link>
                <Link href="/sign-up" className={buttonVariants({})}>
                    Sign Up
                </Link>
            </div>
        </header>
    );
};