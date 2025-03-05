'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useGenerateMockInterviewStore } from '@/stores/generate-mock-interview';
import { useCreateJobListingMutation } from '@/services/job-listing/mutations';
import { toast } from 'sonner';
import { useCreateInterviewMutation } from '@/services/interview/mutations';
import { useGetMyResumesQuery } from '@/services/resume/queries';

const formSchema = z.object({
    jobUrl: z.string()
        .url({ message: 'Please enter a valid URL' })
        .min(1, { message: 'Job listing URL is required' }),
});

type FormValues = z.infer<typeof formSchema>;


export const GenerateMockInterviewForm = () => {
    const { data: resumes } = useGetMyResumesQuery()
    const { closeDialog, setIsGenerated, setInterviewLink } = useGenerateMockInterviewStore();
    const { mutateAsync, isPending, error } = useCreateJobListingMutation()
    const { mutateAsync: createInterviewMutate, isPending: isCreateInterviewPending, error: interviewError } = useCreateInterviewMutation()

    // Initialize react-hook-form
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            jobUrl: '',
        },
    });

    const onSubmit = async (data: FormValues) => {

        try {
            const response = await mutateAsync({ url: data.jobUrl })
            console.log(response)

            if (resumes?.length === 0) {
                toast.error('Please create a resume first')
                return
            }
            const resumeId = resumes[0]?.id
            console.log(resumes)
            console.log(resumeId)
            const interview = await createInterviewMutate({ jobListingId: response.id, resumeId })
            
            console.log(interview)
            setIsGenerated(true)
            setInterviewLink(`/interview/${interview.id}`)

            toast.success('Mock interview generated successfully!')
            console.log(response)
            // setIsGenerated(true)
        } catch (error) {
            console.error('Error generating interview questions:', error);
        } finally {

        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="jobUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Listing URL</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="https://example.com/job-listing"
                                    {...field}
                                    disabled={isPending || isCreateInterviewPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending || isCreateInterviewPending}
                >
                    {isPending || isCreateInterviewPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        'Generate Mock Interview'
                    )}
                </Button>
            </form>
        </Form>
    );
};