'use client';

import { useState } from "react";

// Define the type for the onSearch function
type HeroProps = {
    onSearch: (searchTerm: string) => void;
};

export default function Hero({ onSearch }: HeroProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    return (
        <section className="container my-16">
            <h1 className="mb-4 text-lg font-extrabold text-gray-900 dark:text-white md:text-4xl md:text-5xl max-w-lg mx-auto text-center">
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-green-400 whitespace-nowrap animate-moving-gradient bg-[length:200%]">
      Empowering Your Future,
    </span>
                <span className="block">
      One Flexible Gig at a Time.
    </span>
            </h1>




            <form onSubmit={handleSearch} className="flex gap-2 mt-4 max-w-md mx-auto">
                <input
                    type="search"
                    className="border border-gray-400 w-full py-2 px-3 rounded-md"
                    placeholder="Search for your dream job
                    "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 py-2 px-4 rounded-md">
                    Search
                </button>
            </form>
        </section>
    );
}
