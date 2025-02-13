"use client";
import { useNews } from "@/context/NewsContext";
import { useParams } from "next/navigation";

export default function NewsDetails() {
  const { news } = useNews();
  const { id } = useParams();
  const article = news.find((item) => item.source.id === id);

  if (!article) return <p>Article not found!</p>;

  return (
    <div className="p-6">
      <img src={article.urlToImage} alt={article.title} className="w-full h-60 object-cover rounded" />
      <h1 className="text-2xl font-bold mt-4">{article.title}</h1>
      <p className="text-sm text-gray-500">{article.publishedAt}</p>
      <p className="mt-2">{article.content}</p>
      <a href={article.url} target="_blank" className="text-blue-500 mt-4 inline-block">
        Read full article
      </a>
    </div>
  );
}
