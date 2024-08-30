import { fetchFromMovieDataBase } from "../services/tmdb.services.js";
export const trendingMoviesController = async (req, res) => {
  try {
    const data = await fetchFromMovieDataBase(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
    );
    const randomMovie = await data.results[
      Math.floor(Math.random() * data.results?.length)
    ];
    res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    res.status(400).json({ success: false, message: "Internal server error!" });
  }
};
