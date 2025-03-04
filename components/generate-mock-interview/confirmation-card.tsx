'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useGenerateMockInterviewStore } from '@/stores/generate-mock-interview';

export const ConfirmationCard = () => {
    const [copied, setCopied] = useState(false);
    const { closeDialog, interviewLink } = useGenerateMockInterviewStore()

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(interviewLink);
            setCopied(true);
            toast.success("Copied to clipboard");

            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.log(err);
            toast.error("Failed to copy");
        }
    };

    return (
        <Card className="border-none shadow-none">
            <CardHeader className="flex flex-col items-center pb-2">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <CheckCircle className="h-16 w-16 text-green-500 mb-2" />
                </motion.div>
                <CardTitle className="text-center">
                    Interview Generated Successfully!
                </CardTitle>
            </CardHeader>

            <CardContent className="text-center text-gray-600 pb-2">
                Your mock interview is ready. Copy the link below to access it.
            </CardContent>

            <CardFooter className="flex flex-col space-y-2 pt-2">
                <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="w-full flex items-center justify-center"
                >
                    {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy Interview Link'}
                </Button>
                <Button
                    onClick={closeDialog}
                    variant="default"
                    className="w-full"
                >
                    Close
                </Button>
            </CardFooter>
        </Card>
    );
};