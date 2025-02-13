"use client";
import { useNews } from "@/context/NewsContext";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
  const { setCategory } = useNews();
  const router = useRouter();
  const categories = ["general", "business", "technology", "sports", "entertainment"];

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center border-b-2 border-black bg-white text-black dark:bg-gray-900 dark:text-white container mx-auto p-4 transition-colors duration-300">
      <SearchBar />
      
      <div className="flex gap-4 overflow-x-auto sm:overflow-visible whitespace-nowrap scrollbar-hide sm:flex-wrap mt-4 sm:mt-0">
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

      <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-300 dark:bg-gray-700">
        {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-900" />}
      </button>
    </nav>
  );
}
