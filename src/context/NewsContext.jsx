"use client";
import { createContext, useContext, useState, useEffect } from "react";

const NewsContext = createContext();

export function NewsProvider({ children }) {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  const fetchNews = async (selectedCategory) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
      if (!apiKey) {
        throw new Error("API Key is missing. Set it in .env.local");
      }

      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?category=${selectedCategory}&country=us&apiKey=${apiKey}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0",  // Added User-Agent header
            "Accept": "application/json",
          },
        }
      );

      console.log("API Response Status:", response.status); // Debugging

      if (!response.ok) {
        const errorData = await response.text();
        console.error("API Response Error:", errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setNews(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error.message);
    }
  };

  return (
    <NewsContext.Provider value={{ news, category, setCategory, searchQuery, setSearchQuery }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  return useContext(NewsContext);
}
