import Link from "next/link"
import { RegisterForm } from "./_components/form"
import { Logo } from "@/components/logo"

export default function RegisterPage() {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-foreground p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-foreground" />
                <Link
                    href="/"
                    className="relative z-20 flex items-center text-lg font-medium"
                >
                    <Logo />
                </Link>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sit quasi beatae vitae minima pariatur?&rdquo;
                        </p>
                        <footer className="text-sm">Alex T., CEO</footer>
                    </blockquote>
                </div>
            </div>
            <div className="p-6 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your details below to create your account
                        </p>
                    </div>
                    <RegisterForm />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )

}