"use client"
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./experience";
import { UI } from "./ui";
import { ChatProvider } from "./use-3d-chat";

export function ThreeD() {
    return (
        <ChatProvider>
            <Loader />
            <Leva hidden />
            <UI />
            <Canvas className="bg-red-500 border-blue-600 border-2 w-full !h-screen" shadows camera={{ position: [0, 0, 1], fov: 30 }}>
                <Experience />
            </Canvas>
        </ChatProvider>
    );
}

