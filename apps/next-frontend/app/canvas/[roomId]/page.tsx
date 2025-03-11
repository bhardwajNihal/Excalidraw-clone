"use client"
import { useRef,useEffect } from "react"

export default function Canvas(){

    const canvasRef = useRef<HTMLCanvasElement>(null)

    // initializing canvas operations on mount
    useEffect(()=>{
        const canvas = canvasRef.current
        if(!canvas) return;

        // initializing 2d canvas instance to draw shapes
        const ctx = canvas.getContext("2d");
        if(!ctx) return;

        // setting up the canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


    // solid rectangle
        ctx.fillStyle = "yellow";
        ctx.fillRect(200,10,100,300)

    // outlined rectangle
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.strokeRect(10,10,100,300);

    //circle
    ctx.beginPath();
    ctx.arc(500,200,100,0,Math.PI*2);
    // ctx.fill()
    ctx.stroke()


    },[])


    return <div className="h-screen w-full bg-black p-2">

    <canvas className="h-full w-full border-2 border-gray-400 rounded-lg bg-green-950"
    ref={canvasRef}
    >
        {/* here for all the drawing logic */}



    </canvas>

    </div>
}