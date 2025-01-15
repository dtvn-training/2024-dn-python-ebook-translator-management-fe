import React, { useState } from 'react';
const CustomHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginLogout = () => {
        setIsLoggedIn(!isLoggedIn);
    };
    return (
        <div>
            {/* Header */}
            <header className="bg-teal-400 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-left">AT Translator System</h1>

                    <nav className="flex items-center space-x-4">
                        <div className="flex-1 flex justify-center">
                            <ul className="flex space-x-6 md:space-x-8">
                                <li>
                                    <a href="/about" className="font-bold hover:underline">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="/instructions" className="font-bold hover:underline">
                                        Instructions
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="font-bold hover:underline">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="space-x-4">
                            {isLoggedIn ? (
                                <>
                                    <button
                                        onClick={handleLoginLogout}
                                        className="bg-orange-400 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-orange-300"
                                    >
                                        Sign Out
                                    </button>
                                    <button className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-teal-600">
                                        Profile
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleLoginLogout}
                                        className="bg-orange-400 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-orange-300"
                                    >
                                        Login
                                    </button>
                                    <button className="bg-orange-400 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-orange-300">
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default CustomHeader;
