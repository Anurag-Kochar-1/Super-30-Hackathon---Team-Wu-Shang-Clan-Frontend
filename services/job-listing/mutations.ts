import { useMutation } from "@tanstack/react-query"
import { createJobListing } from "./apis"

export const useCreateJobListingMutation = () => {
    return useMutation({
        mutationFn: createJobListing,
    })
}