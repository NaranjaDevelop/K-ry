
const Statistics = () => {
  const stats = [
    { number: "4.7", label: "Average rating on App Store" },
    { number: "92%", label: "Higher streaming & Plays on Spotify" },
    { number: "100+", label: "Playlists algorithmically curated" },
    { number: "+10", label: "Artists ready to become fans" }
  ];

  return (
    <div className="py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-white/60 text-sm leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
