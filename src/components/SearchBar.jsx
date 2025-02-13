"use client";
import { useNews } from "@/context/NewsContext";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useNews();

  return (
    <div className="relative w-full sm:w-64">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for news..."
        className="p-2 pr-10 rounded border border-gray-300  text-black   w-full"
      />
      
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
         X
        </button>
      )}
    </div>
  );
}
