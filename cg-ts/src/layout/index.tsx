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
            <div className="flex flex-row justify-evenly items-center mt-7">
                <Canvas refCanvas={canvasRef} />
                <Outlet context={canvasContext} />
            </div>
        </div>
    )
}