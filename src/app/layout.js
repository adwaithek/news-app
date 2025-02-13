"use client";
import { useState, useEffect } from "react";
import { NewsProvider } from "@/context/NewsContext";
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme from localStorage
  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme");
  //   if (savedTheme === "dark") {
  //     setDarkMode(true);
  //     document.documentElement.classList.add("dark");
  //   }
  // }, []);

  return (
    <html lang="en">
      <body className={`transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
        <NewsProvider>
          <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
          <main className="container mx-auto p-4">{children}</main>
        </NewsProvider>
      </body>
    </html>
  );
}
