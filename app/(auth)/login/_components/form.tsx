"use client"
import { useForm } from "react-hook-form"
import { loginSchema, LoginValues } from "./form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useLoginMutation } from "@/services/auth/mutations"

export function LoginForm() {
    const { mutateAsync, isPending, error } = useLoginMutation()

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
    })

    async function onSubmit(data: LoginValues) {
        try {
            await mutateAsync(data)
            toast.success("Login Successful")
            // router.replace("/dashboard")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error_: any) {
            console.log(error_)
            const message = error_?.response?.data?.message ?? error?.message ?? "Something went wrong"
            toast.error(message)

        }
    }


    return (
        <div className="grid gap-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="name@example.com"
                                        disabled={isPending}
                                        autoComplete="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        disabled={isPending}
                                        autoComplete="current-password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign in
                    </Button>
                </form>
            </Form>
        </div>
    )

}