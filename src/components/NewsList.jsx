"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useNews } from "@/context/NewsContext";
import axios from "axios";
import NewsCard from "./NewsCard";

export default function NewsList() {
  const { category, searchQuery } = useNews();
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const cacheRef = useRef({}); // Cache for API responses

  // Debounced fetch function
  const fetchNews = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
      const queryKey = `${category}-${searchQuery}-${page}`;

      // Use cache if available
      if (cacheRef.current[queryKey]) {
        setArticles((prev) => (page === 1 ? cacheRef.current[queryKey] : [...prev, ...cacheRef.current[queryKey]]));
        setLoading(false);
        return;
      }

      const url = searchQuery
        ? `https://newsapi.org/v2/everything?q=${searchQuery}&page=${page}&pageSize=10&apiKey=${API_KEY}`
        : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=10&apiKey=${API_KEY}`;

      const response = await axios.get(url);

      if (response.data.articles.length > 0) {
        setArticles((prev) => (page === 1 ? response.data.articles : [...prev, ...response.data.articles]));
        cacheRef.current[queryKey] = response.data.articles; // Store in cache
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  }, [category, searchQuery, page, hasMore, loading]);

  // Reset articles when category or searchQuery changes
  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
  }, [category, searchQuery]);

  // Fetch news when page updates
  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchNews();
    }, 500); // Debounce API calls

    return () => clearTimeout(debounce);
  }, [page, fetchNews]);

  // Infinite scroll observer
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loading, hasMore]);

  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {searchQuery ? `Search Results for "${searchQuery}"` : `${formattedCategory} News`}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>

      {loading && <p className="text-center mt-4">Loading more news...</p>}

      <div ref={observerRef} className="h-10"></div>
    </div>
  );
}
