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

export const movieTrailerController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromMovieDataBase(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

export const movieDetailsController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromMovieDataBase(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.status(200).json({ success: true, details: data });
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

export const movieSimilarController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromMovieDataBase(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
// Here category means 1.Popular 2.Top_rated 3. Now playing 4.Upcoming
export const moviesByCategoriesController = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromMovieDataBase(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, movies: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
