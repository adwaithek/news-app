"use client";
import { createContext, useContext, useState, useEffect } from "react";

const NewsContext = createContext();

export function NewsProvider({ children }) {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNews(category); // ✅ Fetch news whenever the category changes
  }, [category]);

  const fetchNews = async (selectedCategory) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
      if (!apiKey) {
        throw new Error("API Key is missing. Set it in .env.local");
      }

      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?category=${selectedCategory}&country=us&apiKey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setNews(data.articles); // ✅ Update news state
    } catch (error) {
      console.error("Error fetching news:", error.message);
    }
  };

  return (
    <NewsContext.Provider value={{ category, setCategory, searchQuery, setSearchQuery }}>
    {children}
  </NewsContext.Provider>
  );
}

export function useNews() {
  return useContext(NewsContext);
}
