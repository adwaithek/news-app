"use client";
import { useEffect, useState, useRef } from "react";
import { useNews } from "@/context/NewsContext";
import axios from "axios";

export default function NewsList() {
  const { category, searchQuery } = useNews();
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  const fetchNews = async () => {
    if (!hasMore) return;
    setLoading(true);

    try {
      const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
      const url = searchQuery
        ? `https://newsapi.org/v2/everything?q=${searchQuery}&page=${page}&pageSize=10&apiKey=${API_KEY}`
        : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=10&apiKey=${API_KEY}`;

      const response = await axios.get(url);
      setArticles((prev) => [...prev, ...response.data.articles]);
      setHasMore(response.data.articles.length > 0);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page, category, searchQuery]);

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

  // Capitalize first letter of category name
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="p-4">
      {/* Show dynamic category name */}
      <h2 className="text-2xl font-bold mb-4">
        {searchQuery ? `Search Results for "${searchQuery}"` : `${formattedCategory} News`}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md">
            <img
              src={article.urlToImage || "/default-news.jpg"}
              alt={article.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="font-semibold mt-2">{article.title}</h3>
            <p className="text-sm text-gray-600">{article.source.name}</p>
            <a href={article.url} target="_blank" className="text-blue-500 mt-2 block">
              Read More
            </a>
          </div>
        ))}
      </div>

      {loading && <p className="text-center mt-4">Loading more news...</p>}

      <div ref={observerRef} className="h-10"></div>
    </div>
  );
}
