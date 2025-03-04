import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer id="footer" className="container mx-auto py-12 shadow-lg">
            <div className="p-10 bg-card border border-secondary rounded-2xl">
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
                    <div className="col-span-full xl:col-span-2">
                        <Logo />
                        <p className="mt-4 text-muted-foreground">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa, dolores.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">Product</h3>
                        <div>
                            <Link href="#features" className="opacity-60 hover:opacity-100">
                                Features
                            </Link>
                        </div>
                        <div>
                            <Link href="#benefits" className="opacity-60 hover:opacity-100">
                                Benefits
                            </Link>
                        </div>
                        <div>
                            <Link href="#pricing" className="opacity-60 hover:opacity-100">
                                Pricing
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">Resources</h3>
                        <div>
                            <Link href="/blog" className="opacity-60 hover:opacity-100">
                                Blog
                            </Link>
                        </div>
                        <div>
                            <Link href="/guides" className="opacity-60 hover:opacity-100">
                                Writing Guides
                            </Link>
                        </div>
                        <div>
                            <Link href="/resources" className="opacity-60 hover:opacity-100">
                                For Educators
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">Help</h3>
                        <div>
                            <Link href="/contact" className="opacity-60 hover:opacity-100">
                                Contact Us
                            </Link>
                        </div>
                        <div>
                            <Link href="#faq" className="opacity-60 hover:opacity-100">
                                FAQ
                            </Link>
                        </div>
                        <div>
                            <Link href="/support" className="opacity-60 hover:opacity-100">
                                Support
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">Legal</h3>
                        <div>
                            <Link href="/privacy" className="opacity-60 hover:opacity-100">
                                Privacy Policy
                            </Link>
                        </div>
                        <div>
                            <Link href="/terms" className="opacity-60 hover:opacity-100">
                                Terms of Service
                            </Link>
                        </div>
                        <div>
                            <Link href="/accessibility" className="opacity-60 hover:opacity-100">
                                Accessibility
                            </Link>
                        </div>
                    </div>
                </div>
                <Separator className="my-6" />
                <section className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="">
                        &copy; 2025 Mock Mate. All rights reserved.
                    </h3>
                    <div className="flex gap-6">
                        <Link href="https://twitter.com/" className="opacity-60 hover:opacity-100">
                            Twitter
                        </Link>
                        <Link href="https://github.com/" className="opacity-60 hover:opacity-100">
                            Github
                        </Link>
                        <Link href="https://linkedin.com/" className="opacity-60 hover:opacity-100">
                            LinkedIn
                        </Link>
                    </div>
                </section>
            </div>
        </footer>
    );
};