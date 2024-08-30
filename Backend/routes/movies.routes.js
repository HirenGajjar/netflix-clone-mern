import express from "express";
import { trendingMoviesController } from "../controllers/movies.controllers.js";
const route = express.Router();

//Trending movies

route.get("/trending", trendingMoviesController);

export default route;
