import express from "express";
import {
  trendingMoviesController,
  movieTrailerController,
  movieDetailsController,
} from "../controllers/movies.controllers.js";
const route = express.Router();

//Trending movies

route.get("/trending", trendingMoviesController);
route.get("/:id/trailers", movieTrailerController);
route.get("/:id/details", movieDetailsController);

export default route;
