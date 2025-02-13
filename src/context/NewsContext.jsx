"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const NewsContext = createContext();

export function NewsProvider({ children }) {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async (selectedCategory, query = "") => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
      const url = query
        ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
        : `https://newsapi.org/v2/top-headlines?category=${selectedCategory}&country=us&apiKey=${API_KEY}`;

      const response = await axios.get(url);
      setNews(response.data.articles);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(category, searchQuery);
  }, [category, searchQuery]); //  

  return (
    <NewsContext.Provider value={{ news, category, setCategory, searchQuery, setSearchQuery, fetchNews, loading, error }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  return useContext(NewsContext);
}
