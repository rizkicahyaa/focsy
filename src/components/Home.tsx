import React, { useState, useEffect, useRef } from "react";

const Home: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current!);
                        setIsRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(timerRef.current!);
        }

        return () => clearInterval(timerRef.current!);
    }, [isRunning]);

    const handleStartPause = () => setIsRunning((prev) => !prev);
    const handleReset = () => {
        clearInterval(timerRef.current!);
        setTimeLeft(25 * 60);
        setIsRunning(false);
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center relative bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170')",
            }}
        >
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>

            <div className="relative z-10 flex flex-col items-center text-white px-6">
                <header className="mb-16 text-center">
                    <h1 className="text-6xl font-extrabold text-orange-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] tracking-wide">Focsy</h1>
                    <p className="text-xl text-gray-200 mt-3 font-medium max-w-xl">Fokus. Istirahat. Ulangi. Bangun ritme kerja yang produktif dan seimbang.</p>
                </header>

                <div className="bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/20 rounded-3xl p-16 w-[460px] text-center">
                    <h2 className="text-[120px] font-bold text-white leading-none mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">{formatTime(timeLeft)}</h2>

                    <div className="flex justify-center gap-6">
                        <button onClick={handleStartPause} className={`${isRunning ? "bg-red-500 hover:bg-red-600" : "bg-orange-500 hover:bg-orange-600"} text-white text-xl font-semibold px-8 py-4 rounded-2xl shadow-md active:scale-95 transition-all`}>
                            {isRunning ? "Pause" : "Start"}
                        </button>
                        <button onClick={handleReset} className="bg-gray-200/80 text-gray-800 text-xl font-semibold px-8 py-4 rounded-2xl shadow-md hover:bg-gray-300 active:scale-95 transition-all">
                            Reset
                        </button>
                    </div>
                </div>

                <footer className="mt-16 text-gray-300 text-sm">
                    Made with ❤️ by <span className="text-orange-400 font-medium">Focsy</span>
                </footer>
            </div>
        </div>
    );
};

export default Home;
