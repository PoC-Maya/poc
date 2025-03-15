import { ImageGallery } from "./image-gallery"

export function PostContent({ post }) {
  return (
    <article>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex items-center text-gray-500 mb-6">
        <span>{post.date}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag) => (
          <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>

      {post.gallery ? (
        <ImageGallery images={post.gallery} />
      ) : post.video ? (
        <div className="aspect-video bg-gray-200 relative mb-6 rounded-lg overflow-hidden">
          <video src={post.video} poster={post.coverImage} className="w-full h-full object-cover" controls />
        </div>
      ) : (
        <div className="aspect-video bg-gray-200 relative mb-6 rounded-lg overflow-hidden">
          <img src={post.coverImage || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="prose prose-lg max-w-none mt-6">
        <p>{post.content}</p>
      </div>
    </article>
  )
}

