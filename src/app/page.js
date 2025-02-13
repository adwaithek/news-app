"use client";
import { useNews } from "@/context/NewsContext";
import NewsList from "@/components/NewsList";

export default function HomePage() {
  const { news, loading, error } = useNews();

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      
      <NewsList articles={news} />
    </div>
  );
}
