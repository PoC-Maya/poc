export default function BlogPostLoading() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>

        <div className="h-10 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>

        <div className="h-4 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>

        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
          ))}
        </div>

        <div className="aspect-video bg-gray-300 rounded-lg mb-6 animate-pulse"></div>

        <div className="space-y-4 mt-6">
          <div className="h-5 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

