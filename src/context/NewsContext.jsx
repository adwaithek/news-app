"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const NewsContext = createContext();

export function NewsProvider({ children }) {
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState(""); // Ensure this is defined
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;

      if (searchQuery) {
        url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${API_KEY}`;
      }

      const response = await axios.get(url);
      setNews(response.data.articles || []);
    } catch (err) {
      setError("Failed to fetch news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category, searchQuery]);

  return (
    <NewsContext.Provider value={{ category, setCategory, searchQuery, setSearchQuery, news, loading, error }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  return useContext(NewsContext);
}
