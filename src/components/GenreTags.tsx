
const GenreTags = () => {
  const genres = [
    { name: "Hip Hop", color: "bg-blue-500" },
    { name: "Modern Pop", color: "bg-orange-500" },
    { name: "Alternative Rock", color: "bg-green-500" },
    { name: "R&B", color: "bg-pink-500" },
    { name: "KPOP", color: "bg-purple-600" },
    { name: "Rock", color: "bg-orange-600" },
    { name: "Opera", color: "bg-blue-600" },
    { name: "Classical Jazz", color: "bg-green-400" },
    { name: "Blues", color: "bg-purple-500" }
  ];

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
