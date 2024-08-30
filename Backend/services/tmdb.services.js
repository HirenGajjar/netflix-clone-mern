import axios from "axios";
import { ENV_VARIABLE } from "../config/envVars.js";
//
export const fetchFromMovieDataBase = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARIABLE.TMDB_API_KEY,
    },
  };
  const response = await axios.get(url, options);
  if (response.status !== 200) {
    throw new Error(
      `Failed to fetch data from TMDB API: ${response.statusText}`
    );
  }
  return response.data;
};
