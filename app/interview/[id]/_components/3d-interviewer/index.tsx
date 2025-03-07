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
            <Canvas className="w-full bg-pink-900 !h-full aspect-square" shadows camera={{ position: [0, 0, 1], fov: 30 }}>
                <Experience />
            </Canvas>
        </ChatProvider>
    );
}

