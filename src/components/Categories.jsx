"use client";
import { useNews } from "@/context/NewsContext";
import { useRouter } from "next/navigation";

export default function Categories() {
  const { setCategory } = useNews();
  const router = useRouter();
  const categories = ["general", "business", "technology", "sports", "entertainment"];

  return (
    <div className="flex gap-4 overflow-x-auto sm:overflow-visible whitespace-nowrap scrollbar-hide sm:flex-wrap mt-4 sm:mt-0">
      {categories.map((cat) => (
        <button
          key={cat}
          className="px-3 py-1 text-sm sm:text-base hover:underline flex-shrink-0"
          onClick={() => {
            setCategory(cat);
            router.push("/");
          }}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
}
