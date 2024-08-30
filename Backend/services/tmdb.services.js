import axios from "axios";
import { ENV_VARIABLE } from "../config/envVars";
//
export const fetchFromMovieDataBase = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARIABLE.TMDB_API_KEY,
    },
  };
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  );
  if (response.statusCode !== 200) {
    throw new Error(
      `Failed to fetch data from TMDB API: ${response.statusText}`
    );
  }
  return response.data;
};
