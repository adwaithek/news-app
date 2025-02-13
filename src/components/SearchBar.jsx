"use client";
import { useNews } from "@/context/NewsContext";
 

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useNews();

  return (
    <div className="relative flex items-center w-[300px] sm:w-[400px]"> 
      {/* Increased width */}
      <input
        type="text"
        placeholder="Search News..."
        className="w-full p-2 pr-10 rounded text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Close (X) Button */}
      {searchQuery && (
        <button
          className="absolute right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setSearchQuery("")} // Clear input
        >
        X
        </button>
      )}
    </div>
  );
}
