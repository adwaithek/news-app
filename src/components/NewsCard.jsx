import Link from "next/link";

export default function NewsCard({ article }) {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      {/* Only render image if article.urlToImage exists */}
      {article.urlToImage ? (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-40 object-cover rounded"
        />
      ) : (
        <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded">
          <span className="text-gray-600">No Image Available</span>
        </div>
      )}

      <h2 className="text-lg font-bold mt-2">{article.title}</h2>
      <p className="text-sm">{article.description}</p>
      <Link href={article.url} className="text-blue-500 mt-2 inline-block">
        Read More
      </Link>
    </div>
  );
}
