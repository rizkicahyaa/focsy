import React from "react";

const Home: React.FC = () => {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center relative bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')", // meja & buku
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
                    <h2 className="text-[120px] font-bold text-white leading-none mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">25:00</h2>

                    <div className="flex justify-center gap-6">
                        <button className="bg-orange-500 text-white text-xl font-semibold px-8 py-4 rounded-2xl shadow-md hover:bg-orange-600 active:scale-95 transition-all">Start</button>
                        <button className="bg-gray-200/80 text-gray-800 text-xl font-semibold px-8 py-4 rounded-2xl shadow-md hover:bg-gray-300 active:scale-95 transition-all">Reset</button>
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
