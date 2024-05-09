import React, { createContext, useState } from "react";
import { movieList } from "../utils/moviedata";
const MovieContext = createContext();
export const MovieContextProvider = ({ children }) => {
  const [movieData, setMovieData] = useState(movieList);
  return (
    <MovieContext.Provider value={{ movieData, setMovieData }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
