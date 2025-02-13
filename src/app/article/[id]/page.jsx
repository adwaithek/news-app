"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ArticlePage() {
  const { id } = useParams();  
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedArticle = localStorage.getItem("selectedArticle");
      if (storedArticle) {
        setArticle(JSON.parse(storedArticle));
      }
    }
  }, []);

  if (!article) {
    return <p className="text-center mt-10">Loading article...</p>;
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-xl sm:text-3xl font-bold leading-tight">{article.title}</h1>

      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-auto max-h-[300px] sm:max-h-[400px] object-cover mt-4 rounded-lg"
        />
      )}

      <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
        {article.content || "Full article content not available."}
      </p>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 mt-4 inline-block text-sm sm:text-base font-semibold"
      >
        Read full article →
      </a>
    </div>
  );
}
