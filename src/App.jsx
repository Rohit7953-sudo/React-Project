import { useState } from "react";

const API_KEY = "8d9a02c";

function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

 
  const handleSearch = () => {
    if (search.trim() === "") return;

    setLoading(true);
    setQuery(search);

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.Search || []);
        setLoading(false);
      });
  };

  const getMovieDetails = (id) => {
    setLoading(true);

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedMovie(data);
        setLoading(false);
      });
  };

  
  if (selectedMovie) {
    return (
      <div className="container">
        <button className="back-btn" onClick={() => setSelectedMovie(null)}>
          ⬅ Back
        </button>

        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div className="details-box">
            <img
              src={
                selectedMovie.Poster !== "N/A"
                  ? selectedMovie.Poster
                  : "https://via.placeholder.com/250x350"
              }
              alt=""
            />
            <div>
              <h2>{selectedMovie.Title}</h2>
              <p>{selectedMovie.Plot}</p>
              <p><b>⭐ {selectedMovie.imdbRating}</b></p>
            </div>
          </div>
        )}
      </div>
    );
  }

 
  return (
    <div className="container">
      <h1 className="title"> MovieMatrix</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}

        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="card"
              onClick={() => getMovieDetails(movie.imdbID)}
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/200x300"
                }
                alt=""
              />
              <h3>{movie.Title}</h3>
            </div>
          ))
        ) : (
          !loading && query && <p>No movies found</p>
        )}
      </div>
    </div>
  );
}

export default App;