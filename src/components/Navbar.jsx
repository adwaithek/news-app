"use client";
import { useEffect } from "react";
import { useNews } from "@/context/NewsContext";
import SearchBar from "@/components/SearchBar";
import Categories from "@/components/Categories";
import { Moon, Sun } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
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
    <nav className="border-b-2 border-black bg-white text-black dark:bg-gray-900 dark:text-white container mx-auto p-4 transition-colors duration-300">
   
      <div className="flex justify-between items-center sm:hidden">
        <SearchBar />
        <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 ms-3">
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-900" />}
        </button>
      </div>

     
      <div className="flex justify-center sm:hidden mt-3">
        <Categories />
      </div>

      <div className="hidden sm:flex justify-between items-center">
        <Categories />
        <div className="flex items-center gap-4">
          <SearchBar />
          <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-300 dark:bg-gray-700">
            {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-900" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
