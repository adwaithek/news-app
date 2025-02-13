"use client";
import { useNews } from "@/context/NewsContext";
import SearchBar from "@/components/SearchBar";

export default function Navbar() {
  const { setCategory } = useNews();
  const categories = ["general", "business", "technology", "sports", "entertainment"];

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center bg-gray-800 text-white container mx-auto p-4">
       

      {/* Use SearchBar Component */}
      <SearchBar />

      {/* Category Selection */}
      <div className="flex gap-4 mt-2 sm:mt-0">
        {categories.map((cat) => (
          <button
            key={cat}
            className="hover:underline"
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );
}
