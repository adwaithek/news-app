"use client";
import { useNews } from "@/context/NewsContext";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { setCategory } = useNews();
  const router = useRouter();
  const categories = ["general", "business", "technology", "sports", "entertainment"];

  return (
    <nav className="bg-gray-800 text-white container mx-auto p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      {/* SearchBar - Full width only on mobile */}
      <div className="w-full sm:w-auto">
        <SearchBar />
      </div>

      {/* Category Selection - Scrollable only on mobile */}
      <div className="flex gap-4 overflow-x-auto sm:overflow-visible whitespace-nowrap scrollbar-hide sm:flex-wrap   mt-4 sm:mt-0">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-3 py-1 text-sm sm:text-base hover:underline flex-shrink-0"
            onClick={() => {
              setCategory(cat);
              router.push("/");
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );
}
