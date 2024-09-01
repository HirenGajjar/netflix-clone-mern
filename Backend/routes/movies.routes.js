import express from "express";
import {
  trendingMoviesController,
  movieTrailerController,
} from "../controllers/movies.controllers.js";
const route = express.Router();

//Trending movies

route.get("/trending", trendingMoviesController);
route.get("/:id/trailers", movieTrailerController);

export default route;
