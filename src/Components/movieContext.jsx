import React, { createContext, useContext, useState } from "react";
import { movieList } from "../utils/moviedata";
const MovieContext = createContext();
export const MovieContextProvider = ({ children }) => {
  const [movieArr, setMovieArr] = useState(movieList);
  return (
    <MovieContext.Provider value={{ movieArr, setMovieArr }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
