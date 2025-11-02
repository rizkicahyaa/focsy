import React, { useState, useEffect, useRef } from "react";

const Home: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState<"focus" | "break">("focus");
    const [hasLoaded, setHasLoaded] = useState(false);
    const [note, setNote] = useState("");
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const playSound = () => {
        const audio = new Audio("/notif.mp3");
        audio.play();
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    useEffect(() => {
        if ("Notification" in window) Notification.requestPermission();
    }, []);

    useEffect(() => {
        const savedTime = localStorage.getItem("timeLeft");
        const savedMode = localStorage.getItem("mode");
        const savedRunning = localStorage.getItem("isRunning");
        const lastUpdate = localStorage.getItem("lastUpdate");
        const savedNote = localStorage.getItem("note");

        let isRunningFromStorage = savedRunning === "true";

        if (savedTime) {
            let updatedTime = parseInt(savedTime);
            if (isRunningFromStorage && lastUpdate) {
                const elapsed = Math.floor((Date.now() - parseInt(lastUpdate)) / 1000);
                updatedTime -= elapsed;
                if (updatedTime < 0) updatedTime = 0;
            }
            setTimeLeft(updatedTime);
        }

        if (savedMode === "focus" || savedMode === "break") setMode(savedMode);
        setIsRunning(isRunningFromStorage);
        if (savedNote) setNote(savedNote);
        setHasLoaded(true);
    }, []);

    useEffect(() => {
        if (!hasLoaded) return;
        localStorage.setItem("timeLeft", String(timeLeft));
        localStorage.setItem("mode", mode);
        localStorage.setItem("isRunning", String(isRunning));
        localStorage.setItem("lastUpdate", String(Date.now()));
        localStorage.setItem("note", note);
    }, [timeLeft, mode, isRunning, note, hasLoaded]);

    useEffect(() => {
        if (!hasLoaded) return;

        if (isRunning) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        if (timerRef.current) clearInterval(timerRef.current);
                        setIsRunning(false);
                        playSound();

                        if (Notification.permission === "granted") {
                            new Notification(mode === "focus" ? "Focus session completed! Take a short break." : "Break's over! Back to focus.");
                        }

                        if (mode === "focus") {
                            setMode("break");
                            setTimeLeft(5 * 60);
                        } else {
                            setMode("focus");
                            setTimeLeft(25 * 60);
                        }

                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isRunning, mode, hasLoaded]);

    const handleStartPause = () => setIsRunning((prev) => !prev);
    const handleReset = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsRunning(false);
        setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
        localStorage.removeItem("lastUpdate");
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center relative bg-cover bg-center bg-no-repeat text-white py-10 sm:py-16"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1200')",
            }}
        >
            <div className="absolute inset-0 bg-white/20 backdrop-blur-md"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"></div>

            <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 text-center">
                <header className="mb-6 sm:mb-10">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-orange-400 drop-shadow-lg tracking-wide">Focsy</h1>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-200 mt-2 font-medium max-w-md">Fokus. Istirahat. Ulangi. Bangun ritme kerja yang produktif dan seimbang.</p>
                </header>

                <div className="bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/20 rounded-3xl p-6 sm:p-8 w-full max-w-xs sm:max-w-sm lg:max-w-md">
                    <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none mb-6 drop-shadow-lg">{formatTime(timeLeft)}</h2>

                    <div className="flex justify-center gap-4 sm:gap-5 mb-5">
                        <button onClick={handleStartPause} className={`${isRunning ? "bg-red-500 hover:bg-red-600" : "bg-orange-500 hover:bg-orange-600"} text-white text-base sm:text-lg font-semibold px-6 sm:px-7 py-2 sm:py-3 rounded-xl shadow-md active:scale-95 transition-all`}>
                            {isRunning ? "Pause" : "Start"}
                        </button>
                        <button onClick={handleReset} className="bg-gray-200/80 text-gray-800 text-base sm:text-lg font-semibold px-6 sm:px-7 py-2 sm:py-3 rounded-xl shadow-md hover:bg-gray-300 active:scale-95 transition-all">
                            Reset
                        </button>
                    </div>

                    <div className="text-left">
                        <label className="block text-xs sm:text-sm text-gray-300 mb-1 font-semibold">Catatan:</label>
                        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Tulis catatan singkatmu di sini..." className="w-full h-24 sm:h-28 text-gray-800 p-2.5 rounded-xl bg-white/80 backdrop-blur-md focus:ring-2 focus:ring-orange-400 outline-none resize-none text-sm" />
                    </div>
                </div>

                <footer className="mt-8 sm:mt-10 text-gray-300 text-xs sm:text-sm">
                    Made with ❤️ by <span className="text-orange-400 font-medium">Focsy</span>
                </footer>
            </div>
        </div>
    );
};

export default Home;
