'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { extractTextFromPdf } from '@/utils/pdf';
import { useUploadResumeMutation } from '@/services/resume/mutations';


export const UploadResumeButton = () => {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { mutateAsync, isPending } = useUploadResumeMutation()

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast.error('Please upload a PDF file');
            return;
        }

        setIsUploading(true);

        try {
            const fileUrl = URL.createObjectURL(file);
            const text = await extractTextFromPdf(fileUrl);
            console.log('Extracted text length:', text.length);
            await mutateAsync({
                title: file.name,
                content: text
            })
            URL.revokeObjectURL(fileUrl);
            toast.success('Resume processed successfully');
            setIsUploading(false);
        } catch (error) {
            console.error('Error processing PDF:', error);
            toast.error(`Failed to process resume: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsUploading(false);
            if (event.target) {
                event.target.value = '';
            }
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
            />

            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    onClick={handleUploadClick}
                    className="bg-indigo-600 hover:bg-indigo-700"
                    size="lg"
                    disabled={isUploading || isPending}
                >
                    {isUploading || isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Upload className="mr-2 h-4 w-4" />
                    )}
                    {isUploading || isPending ? 'Processing...' : 'Upload Resume'}
                </Button>
            </motion.div>


            {isUploading || isPending ? (
                <div className="text-sm text-gray-600">
                    Analyzing PDF content...
                </div>
            ) : null}

        </div>
    );
};