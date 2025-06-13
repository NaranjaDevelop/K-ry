
const GenreTags = (tags: {tags: string[]}) => {
  const colors = [
    "bg-blue-500",
    "bg-orange-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-purple-600",
    "bg-orange-600",
    "bg-blue-600",
    "bg-green-400",
    "bg-purple-500"
  ]
  const genres = tags.tags.map((tag, index) => ({
    name: tag,
    color: colors[index % colors.length]
  }))

  return (
    <div className="bg-gray-900/50 rounded-lg p-6 max-w-xs">
      <h2 className="text-xl font-semibold text-white mb-6">Genres</h2>
      
      <div className="flex flex-wrap gap-4">
        {genres.map((genre) => (
          <span
            key={genre.name}
            className={`${genre.color} text-white px-5 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer`}

          >
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GenreTags;
