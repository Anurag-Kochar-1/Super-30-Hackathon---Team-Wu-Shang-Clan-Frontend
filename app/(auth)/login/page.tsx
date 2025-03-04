import { Logo } from "@/components/logo"
import Link from "next/link"
import { LoginForm } from "./_components/form"

export default function LoginPage() {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-foreground p-10 text-background lg:flex dark:border-r">
                <div className="absolute inset-0 bg-foreground" />
                <Logo  />
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci odio eos suscipit illum possimus doloribus voluptate in minima consequuntur corrupti?&rdquo;
                        </p>
                        <footer className="text-sm">Alexa W., CTO</footer>
                    </blockquote>
                </div>
            </div>
            <div className="p-6 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Welcome back
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your credentials to access your account
                        </p>
                    </div>
                    <LoginForm />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        New user?{" "}
                        <Link
                            href="/register"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
