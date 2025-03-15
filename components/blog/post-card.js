import Link from "next/link"
import { ImageGallery } from "./image-gallery"

export function PostCard({ post }) {
  return (
    <article className="max-w-xl mx-auto border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/blog/${post.slug}`}>
        {post.gallery ? (
          <ImageGallery images={post.gallery} />
        ) : post.video ? (
          <div className="aspect-video bg-gray-200 relative">
            <video src={post.video} poster={post.coverImage} className="w-full h-full object-cover" controls />
          </div>
        ) : (
          <div className="aspect-video bg-gray-200 relative">
            <img src={post.coverImage || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}
      </Link>

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{post.date}</span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 transition-colors">{post.title}</h2>
        </Link>

        <p className="text-gray-600 mb-4 text-lg">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="text-blue-600 font-medium hover:underline inline-flex items-center"
        >
          Ler mais
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}

