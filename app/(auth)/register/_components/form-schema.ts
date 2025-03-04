import { z } from "zod"

export const registerSchema = z.object({
    firstName: z.string({ required_error: "First name is required" }).min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string({ required_error: "Last name is required" }).min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    email: z.string({ required_error: "Email is required" }).email({
        message: "Please enter a valid email address.",
    }),
    password: z.string({ required_error: "Password is required" }).min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string({ required_error: "Confirm password is required" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export type RegisterValues = z.infer<typeof registerSchema>