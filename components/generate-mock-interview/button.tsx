'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useGenerateMockInterviewStore } from '@/stores/generate-mock-interview';
import { GenerateMockInterviewForm } from './form';
import { ConfirmationCard } from './confirmation-card';

export const GenerateMockInterviewButton = () => {
    const { closeDialog, isDialogOpen, openDialog, isGenerated } = useGenerateMockInterviewStore();


    return (
        <>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    onClick={() => openDialog()}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    size="lg"
                >
                    Generate Mock Interview
                </Button>
            </motion.div>

            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    {!isGenerated ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>Generate Mock Interview</DialogTitle>
                                <DialogDescription>
                                    Enter a job listing URL to generate tailored interview questions.
                                </DialogDescription>
                            </DialogHeader>
                            <GenerateMockInterviewForm />
                        </>
                    ) : (
                        <ConfirmationCard
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};