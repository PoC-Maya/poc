export default function BlogLoading() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-8 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-12 animate-pulse"></div>

        <div className="space-y-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="max-w-xl mx-auto border rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-video bg-gray-300 animate-pulse"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                  ))}
                </div>
                <div className="h-4 bg-gray-200 rounded w-1/5 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

