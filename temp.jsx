import React, { useState, useEffect } from "react";
import { Box, CircularProgress, useMediaQuery, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import MoviesList from "../MoviesList/MoviesList";

const Movies = () => {
  const { data, error, isFetching } = useGetMoviesQuery();
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies found
          <br />
          Please search for another movie
        </Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          Error fetching movies
          <br />
          Please try again
        </Typography>
      </Box>
    );
  }
  return (
    <div>
      <MoviesList movies={data} />
    </div>
  );
};

export default Movies;
