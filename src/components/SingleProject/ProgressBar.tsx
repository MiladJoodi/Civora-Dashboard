"use client";

import { useEffect, useState } from "react";

const ProgressBar = () => {

    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const container = document.querySelector("main") as HTMLElement | null;

        const computeProgress = () => {
            if (container) {
                const scrollTop = container.scrollTop;
                const scrollHeight = container.scrollHeight - container.clientHeight;
                const percent = scrollHeight > 0 ? Math.min((scrollTop / scrollHeight) * 100, 100) : 0;
                setScrollProgress(percent);
            } else {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const percent = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
                setScrollProgress(percent);
            }
        };

        // Initialize on mount
        computeProgress();

        const target: any = container || window;
        target.addEventListener("scroll", computeProgress, { passive: true });
        return () => target.removeEventListener("scroll", computeProgress);
    }, []);


    return (
        <div className="fixed top-0 left-0 w-full h-1 z-50">
            <div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-600 transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
            />
        </div>

    );
}

export default ProgressBar;