"use client";
import { useNews } from "@/context/NewsContext";
import { useRouter } from "next/navigation";

export default function Categories() {
  const { category, setCategory } = useNews();
  const router = useRouter();

  const categories = ["general", "business", "technology", "sports", "entertainment"];

  return (
    <div className="flex gap-4 overflow-x-auto sm:overflow-visible whitespace-nowrap scrollbar-hide sm:flex-wrap mt-4 sm:mt-0 justify-center">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-3 py-1 text-sm sm:text-base hover:underline flex-shrink-0 capitalize ${
            category === cat ? "font-bold underline" : ""
          }`}
          onClick={() => {
            setCategory(cat); // ✅ Update category state
            router.push("/"); // ✅ Ensure UI updates
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
