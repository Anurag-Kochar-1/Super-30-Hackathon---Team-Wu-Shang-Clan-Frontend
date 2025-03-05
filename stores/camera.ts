import { create } from "zustand";

interface CameraState {
    mediaStream: MediaStream | null;
    setMediaStream: (stream: MediaStream | null) => void;
    cameraPermission: "granted" | "denied" | "pending";
    microphonePermission: "granted" | "denied" | "pending";
    setCameraPermission: (permission: "granted" | "denied" | "pending") => void;
    setMicrophonePermission: (permission: "granted" | "denied" | "pending") => void;
}

export const useCameraStore = create<CameraState>()((set) => ({
    mediaStream: null,
    setMediaStream: (stream) => set({ mediaStream: stream }),
    cameraPermission: "pending",
    microphonePermission: "pending",
    setCameraPermission: (permission) => set({ cameraPermission: permission }),
    setMicrophonePermission: (permission) => set({ microphonePermission: permission }),
}));