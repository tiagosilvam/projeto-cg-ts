import { useEffect, useRef, useState } from "react";
import { Canvas } from "../components/Canvas";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function Layout() {

    const canvasRef = useRef<HTMLCanvasElement>();
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>();

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        setCanvasContext(context);
    }, [canvasRef]);

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className="flex flex-row justify-evenly items-center h-full bg-zinc-100">
                <Canvas refCanvas={canvasRef} />
                <div className='bg-white rounded-xl px-6 py-4 shadow-md'>
                    <Outlet context={canvasContext} />
                </div>
            </div>
        </div>
    )
}