import React, { useState } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginLogout = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <div
            className="min-h-screen h-screen bg-gray-100 flex flex-col"
            style={{
                backgroundImage:
                    "url('https://static.vecteezy.com/system/resources/previews/004/243/021/non_2x/abstract-template-background-white-and-bright-blue-squares-overlapping-with-halftone-and-texture-free-vector.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Header */}
            <header className="bg-teal-400 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-left">AT System</h1>

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

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-4">
                {/* Two Sections Layout */}
                <section
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white shadow-md rounded-md p-6"
                    style={{ minHeight: '70vh' }}
                >
                    {/* Text Section */}
                    <div className="text-center md:text-left flex flex-col items-center justify-center">
                        <h2 className="text-3xl font-bold mb-4">Welcome to AT Translator System!</h2>
                        <p className="text-gray-700 mb-4 px-4 md:px-0">
                            AT is a translation system for ebooks provided by customers. From there, you can earn
                            profits from translation tasks for translators. We hope you will have great experiences when
                            coming to our system.
                        </p>
                        <button className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-teal-600">
                            Learn More
                            <ArrowRightOutlined className="ml-2" />
                        </button>
                    </div>

                    {/* Image Section */}
                    <div>
                        <img
                            src="https://ideascale.com/wp-content/uploads/2022/03/Task-Management-Advantages-scaled.jpg"
                            alt="Translation System"
                            className="w-full h-auto rounded-md shadow"
                        />
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center p-4 mt-6">
                <p>&copy; 2025 Translator System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
