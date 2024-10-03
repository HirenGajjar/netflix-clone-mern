import express from "express";
import {
  trendingMoviesController,
  movieTrailerController,
  movieDetailsController,
  movieSimilarController,
  moviesByCategoriesController,
} from "../controllers/movies.controllers.js";
const route = express.Router();

//Trending movies

route.get("/trending", trendingMoviesController);
route.get("/:id/trailers", movieTrailerController);
route.get("/:id/details", movieDetailsController);
route.get("/:id/similar", movieSimilarController);
route.get("/:category", moviesByCategoriesController);

export default route;
