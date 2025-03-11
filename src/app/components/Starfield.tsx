'use client';

import { useEffect, useRef, useState } from 'react';
import Image from "next/image";

const Starfield: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [scrollY, setScrollY] = useState(0);
    let angle = 0;
    const rotationSpeed = 0.0003;
    const numStars = 8000;
    const stars: { x: number; y: number; size: number; flicker: number }[] = [];

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            const imageHeight = document.getElementById('hero-image')?.clientHeight || window.innerHeight;
            canvas.width = document.getElementById('hero-image')?.clientWidth as number;
            canvas.height = imageHeight;
            stars.length = 0;
            createStars();
        };

        const createStars = () => {
            for (let i = 0; i < numStars; i++) {
                let radius = Math.sqrt(canvas.height ** 2 + (canvas.width / 2) ** 2) * Math.sqrt(Math.random());
                let theta = Math.random() * Math.PI * 2;
                let x = canvas.width / 2 + radius * Math.cos(theta);
                let y = canvas.height - radius * Math.sin(theta);
                let size = Math.random() * 2;
                let flicker = Math.random() * 0.5 + 0.75;
                stars.push({ x, y, size, flicker });
            }
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height);
            ctx.rotate(angle);
            ctx.translate(-canvas.width / 2, -canvas.height);

            for (let star of stars) {
                let distanceFromCenter = Math.sqrt((star.x - canvas.width / 2) ** 2 + (star.y - canvas.height) ** 2);
                let maxDistance = canvas.width / 2;
                let baseBrightness = 0.1 + 0.5 * (distanceFromCenter / maxDistance);
                let brightness = baseBrightness * (Math.sin(Date.now() * 0.002 + star.x) * 0.7 + 1);
                ctx.fillStyle = `rgba(255, 255, 255, ${brightness * star.flicker})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        };

        const updateStars = () => {
            angle += rotationSpeed;
            if (angle >= Math.PI * 2) angle -= Math.PI * 2;
            drawStars();
            requestAnimationFrame(updateStars);
        };

        createStars();
        updateStars();

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    return (
        <div className="relative top-0 flex items-center justify-center max-w-screen overflow-clip">
            <div className="absolute w-fit h-full z-20 flex flex-col items-center pt-[256px]">
                <h3 className="glowing text-[24px]">Добро пожаловать во вселенную</h3>
                <img src="/logo.png" alt="logo" className="scale-105 w-full object-fill"/>
            </div>
            <div className="relative w-full" id="hero-image">
                <img src="/heroparallax/card-1.webp" alt="hero" className="w-full h-full absolute bottom-0 z-10" style={{ transform: `translateY(${scrollY * 0.1}px)` }} />
                <img src="/heroparallax/card-2.webp" alt="hero" className="w-full h-full absolute bottom-0 z-[9]" style={{ transform: `translateY(${scrollY * 0.3}px)` }} />
                <img src="/heroparallax/card-3.webp" alt="hero" className="w-full h-full relative z-[8]" style={{ transform: `translateY(${scrollY * 0.5}px)` }} />
            </div>
            <div className="z-0 absolute top-0 left-0 w-full h-full bg-[radial-gradient(100%_100%_at_50%_100%,_#854A4B_0%,_#080045_60%)] opacity-90" />
            <canvas ref={canvasRef} className="absolute z-5 top-0 left-0 w-full opacity-30" />
            <div className="w-full absolute top-0 left-0 z-[5] opacity-90" />
        </div>
    );
};

export default Starfield;