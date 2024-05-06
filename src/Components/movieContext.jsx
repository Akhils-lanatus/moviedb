import React, { createContext, useContext, useState } from "react";
import { movieList } from "../utils/moviedata";
const MovieContext = createContext();
export const MovieContextProvider = ({ children }) => {
  const [movieData, setmovieData] = useState(movieList);
  return (
    <MovieContext.Provider value={{ movieData, setmovieData }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
