import React from "react";

const Home: React.FC = () => {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center relative bg-cover bg-center"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')", // contoh: meja & buku
            }}
        >
            <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

            <div className="relative z-10 flex flex-col items-center text-gray-800 px-6">
                <header className="mb-16 text-center">
                    <h1 className="text-6xl font-extrabold text-orange-600 drop-shadow-sm tracking-wide">Focsy</h1>
                    <p className="text-xl text-gray-700 mt-3 font-medium">Fokus. Istirahat. Ulangi. Jadi versi produktif terbaikmu.</p>
                </header>

                <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-16 w-[440px] text-center border border-orange-100">
                    <h2 className="text-[120px] font-bold text-gray-700 leading-none mb-10">25:00</h2>

                    <div className="flex justify-center gap-6">
                        <button className="bg-orange-500 text-white text-xl font-semibold px-8 py-4 rounded-2xl shadow-md hover:bg-orange-600 active:scale-95 transition-all">Start</button>
                        <button className="bg-gray-200 text-gray-700 text-xl font-semibold px-8 py-4 rounded-2xl shadow-md hover:bg-gray-300 active:scale-95 transition-all">Reset</button>
                    </div>
                </div>

                <footer className="mt-16 text-gray-600 text-sm">
                    Made with ❤️ by <span className="text-orange-500 font-medium">Focsy</span>
                </footer>
            </div>
        </div>
    );
};

export default Home;
