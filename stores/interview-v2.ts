import { Interview, InterviewSession, Question } from "@/types";
import { create } from "zustand";
import { useCameraStore } from "./camera";

interface State {
    hasJoined: boolean
    setHasJoined: (val: boolean) => void

    // Interview
    currentInterview: Interview | null;
    setCurrentInterview: (interview: Interview) => void;

    // Session state
    currentInterviewSession: InterviewSession | null;
    setCurrentInterviewSession: (interviewSession: InterviewSession) => void;
    interviewSessionId: string | null;
    setInterviewSessionId: (interviewSessionId: string | null) => void;

    // Microphone state
    isMicOn: boolean;
    setIsMicOn: (val: boolean) => void;
    toggleMicrophone: () => void;

    // Recording state
    isRecording: boolean;
    mediaRecorder: MediaRecorder | null;
    audioChunks: Blob[];
    startMic: () => Promise<void>;
    stopMic: () => void;

    // Chat sidebar state
    isChatOpen: boolean;
    toggleChat: () => void;

    // Question navigation
    currentQuestion: Question | null;
    setCurrentQuestion: (question: Question | null) => void;
    questionIndex: number;
    totalQuestions: number;
    setTotalQuestions: (data: number) => void
    nextQuestion: () => void;

    // Call control
    endCall: () => void;
    setEndCallHandler: (handler: () => void) => void;

}

export const useInterviewV2Store = create<State>(
    (set, get) => ({
        hasJoined: false,
        setHasJoined(val) {
            set({ hasJoined: val })
        },

        currentInterview: null,
        setCurrentInterview: (interview) => set({ currentInterview: interview }),
        currentInterviewSession: null,
        setCurrentInterviewSession: (interviewSession) => set({ currentInterviewSession: interviewSession }),
        interviewSessionId: null,
        setInterviewSessionId: (interviewSessionId) => set({ interviewSessionId }),


        // Microphone state
        isMicOn: true,
        setIsMicOn(val) {
            set({ isMicOn: val })
        },
        toggleMicrophone: () => {
            const { isMicOn } = get();

            // Get the mediaStream from the camera store
            const mediaStream = useCameraStore?.getState()?.mediaStream;

            if (mediaStream) {
                mediaStream.getAudioTracks().forEach((track) => {
                    track.enabled = !isMicOn;
                });
            }

            set({ isMicOn: !isMicOn });
        },

        // Recording state
        isRecording: false,
        mediaRecorder: null,
        audioChunks: [],

        startMic: async () => {
            try {
                // Create a dedicated audio stream for recording
                console.log('Requesting audio stream...');
                const audioStream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true
                    }
                });
                console.log('Audio stream obtained:', audioStream);

                // Check if the browser supports MediaRecorder
                if (!window.MediaRecorder) {
                    console.error('MediaRecorder is not supported in this browser');
                    return;
                }

                // Get supported MIME types
                const mimeTypes = [
                    'audio/webm',
                    'audio/webm;codecs=opus',
                    'audio/mp4',
                    'audio/ogg',
                    'audio/wav'
                ];

                // Find a supported MIME type
                let mimeType = '';
                for (const type of mimeTypes) {
                    if (MediaRecorder.isTypeSupported(type)) {
                        mimeType = type;
                        break;
                    }
                }

                if (!mimeType) {
                    console.error('No supported MIME type found for MediaRecorder');
                    return;
                }

                console.log(`Using MIME type: ${mimeType}`);

                // Store audio chunks in the state directly
                const audioChunks: Blob[] = [];

                // Create MediaRecorder with the supported MIME type
                const recorder = new MediaRecorder(audioStream, { mimeType });
                console.log('MediaRecorder created:', recorder);

                // Set up data handler - THIS IS CRUCIAL!
                recorder.ondataavailable = (event) => {
                    console.log('Data available event:', event.data?.size || 0, 'bytes');
                    if (event.data && event.data.size > 0) {
                        audioChunks.push(event.data);
                        console.log('Audio chunks count:', audioChunks.length);

                        // Update the state with the new chunks
                        set(() => ({
                            audioChunks: [...audioChunks]
                        }));
                    }
                };

                // Set up error handler
                recorder.onerror = (event) => {
                    console.error('MediaRecorder error:', event);
                    set({ isRecording: false });
                };

                // Update state before starting to avoid race conditions
                set({
                    mediaRecorder: recorder,
                    audioChunks: [],
                    isRecording: true
                });

                // Start recording with a smaller timeslice to ensure we get data frequently
                console.log('Starting MediaRecorder...');
                recorder.start(500); // Get data every 500ms
                console.log('MediaRecorder started successfully');
            } catch (error) {
                console.error('Error starting microphone recording:', error);
                set({ isRecording: false });
            }
        },

        stopMic: () => {
            const { mediaRecorder, audioChunks } = get();

            if (!mediaRecorder) {
                console.error("No active MediaRecorder found");
                set({ isRecording: false });
                return;
            }

            if (mediaRecorder.state === "inactive") {
                console.log("MediaRecorder is already inactive");
                set({ isRecording: false });
                return;
            }

            try {
                // Request one final chunk of data before stopping
                mediaRecorder.requestData();

                // Define what happens when recording stops
                mediaRecorder.onstop = () => {
                    try {
                        if (!audioChunks || audioChunks.length === 0) {
                            console.warn("No audio data recorded");
                            set({
                                mediaRecorder: null,
                                audioChunks: [],
                                isRecording: false,
                            });
                            return;
                        }

                        // Log the chunks to verify we have data
                        console.log("Audio chunks:", audioChunks.length, audioChunks);

                        // Combine audio chunks into a single blob
                        const mimeType = mediaRecorder.mimeType || "audio/webm";
                        const audioBlob = new Blob(audioChunks, { type: mimeType });

                        console.log("Blob created:", audioBlob.size, "bytes");

                        // Force download using a more direct approach
                        const url = URL.createObjectURL(audioBlob);
                        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

                        // Determine file extension based on MIME type
                        let extension = "webm";
                        if (mimeType.includes("mp4")) extension = "mp4";
                        if (mimeType.includes("ogg")) extension = "ogg";
                        if (mimeType.includes("wav")) extension = "wav";

                        const filename = `interview-recording-${timestamp}.${extension}`;

                        // Create and append link element
                        const a = document.createElement("a");
                        a.style.display = "none";
                        a.href = url;
                        a.download = filename;
                        document.body.appendChild(a);

                        // Trigger click and log it
                        console.log("Triggering download for:", filename);
                        a.click();

                        // Clean up
                        setTimeout(() => {
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);

                            // Stop all tracks in the stream
                            mediaRecorder.stream.getTracks().forEach((track) => {
                                track.stop();
                                console.log("Track stopped");
                            });

                            console.log("Download cleanup completed");
                        }, 100);

                        get().nextQuestion()
                    } catch (error) {
                        console.error("Error processing recording:", error);
                    } finally {
                        // Reset recording state
                        set({
                            mediaRecorder: null,
                            audioChunks: [],
                            isRecording: false,
                        });
                    }
                };

                // Stop the recording (this will trigger the onstop handler above)
                console.log("Stopping MediaRecorder...");
                mediaRecorder.stop();
                console.log("MediaRecorder stop command issued");
            } catch (error) {
                console.error("Error stopping MediaRecorder:", error);
                set({ isRecording: false });

                // Attempt to stop tracks even in case of error
                try {
                    if (mediaRecorder && mediaRecorder.stream) {
                        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
                    }
                } catch (e) {
                    console.error("Error stopping tracks:", e);
                }
            }
        },

        // Chat sidebar state
        isChatOpen: false,
        toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

        // Question navigation
        currentQuestion: null,
        questionIndex: 0,
        totalQuestions: 0,
        setTotalQuestions(data) {
            set({ totalQuestions: data })
        },
        setCurrentQuestion: (question) => {
            set({ currentQuestion: question });
        },

        nextQuestion: () => {
            console.log(`next question called from inteview control`)
            const { questionIndex, totalQuestions } = get();
            console.log(`totalQuestions - ${totalQuestions}`)

            if (questionIndex < totalQuestions - 1) {
                const questions = get().currentInterview?.questions || [];
                set({
                    questionIndex: questionIndex + 1,
                    currentQuestion: questions[questionIndex + 1] || null,
                });
            }
        },

        setInitialQuestions: (questions: Question[]) => {
            set({
                currentQuestion: questions.length > 0 ? questions[0] : null,
                questionIndex: 0,
                totalQuestions: questions.length,
            });
        },

        // Call control
        endCall: () => {
            // This will be set by the parent component
            // Default is a no-op function
        },
        setEndCallHandler: (handler: () => void) => {
            set({ endCall: handler });
        },
    })
);
