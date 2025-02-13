"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ArticlePage() {
  const { id } = useParams(); // Get article ID from the URL
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-80 object-cover mt-4"
        />
      )}
      <p className="mt-4">{article.content || "Full article content not available."}</p>
      <a href={article.url} target="_blank" className="text-blue-500 mt-4 block">
        Read full article
      </a>
    </div>
  );
}
