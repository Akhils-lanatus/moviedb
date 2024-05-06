import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import { Container } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import MovieModal from "./MovieModal";
import "./Home.css";
import Header from "./Header";
import { useContext } from "react";
import MovieContext from "./movieContext";
const Home = () => {
  const [singleMovie, setSingleMovie] = useState([]);
  const [isAscending, setIsAscending] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [searchquery, setsearchquery] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSingleMovie([]);
  };
  const { movieData } = useContext(MovieContext);
  const [searchedData, setSearchedData] = useState(movieData);

  const handleSingleMovie = async (id) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDAwOGUxNmU1ZjNkZTk3NGJhNTIxODNlZWM1NGU0YyIsInN1YiI6IjY2MzFlNmU4YWQ1OWI1MDEyMjZjOTU4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lV4WarBzFSjLIoRIts8j_WvD4S7pKNo9Kb6viqRjKD0",
      },
    };

    let temp = searchedData.filter((item) => item.id == id);
    setOpen(true);
    setLoading(true);
    await fetch(
      `https://api.themoviedb.org/3/movie/${temp[0]?.id}/videos`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        let tempNew = temp.map((items) => {
          return {
            ...items,
            trailer: `https://www.youtube.com/watch?v=${response.results[0].key}`,
          };
        });
        setSingleMovie(tempNew);
      })
      .catch((err) => console.error(err));
    setLoading(false);
  };

  useEffect(() => {
    setSearchedData(
      movieData.filter(
        (values) =>
          values?.title
            .trim()
            .toLowerCase()
            .includes(searchquery.trim().toLowerCase()) ||
          values?.overview
            .trim()
            .toLowerCase()
            .includes(searchquery.trim().toLowerCase()) ||
          new Date(values?.release_date)
            .toLocaleDateString("en-IN")
            .includes(searchquery.trim().toLowerCase())
      )
    );
  }, [searchquery]);

  // console.log(singleMovie[0]?.title);

  const sortMovies = () => {
    let temp = [];
    if (isAscending) {
      temp = searchedData.sort((a, b) => (a.title > b.title ? 1 : -1));
    } else {
      temp = searchedData.sort((a, b) => (a.title > b.title ? -1 : 1));
    }
    setSearchedData(temp);
    setIsAscending(!isAscending);
    // scrollTo(top);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, mb: 7 }}>
        <Header
          isAscending={isAscending}
          searchquery={searchquery}
          setsearchquery={setsearchquery}
          sortMovies={sortMovies}
        />
      </Box>
      <Container width={"100%"}>
        <Grid container spacing={3} paddingBlock={4}>
          {searchedData?.map((movies, index) => {
            return (
              <Grid item lg={3} md={4} sm={6} xs={12} key={movies.id}>
                <Paper
                  elevation={4}
                  onClick={() => handleSingleMovie(movies.id)}
                >
                  <Card
                    sx={{
                      maxWidth: "100%",
                      height: 470,
                      cursor: "pointer",
                      transition: "transform .2s ease-in-out",
                      ":hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <CardHeader
                      subheader={new Date(
                        movies.release_date
                      ).toLocaleDateString("en-IN")}
                      subheaderTypographyProps={{
                        fontWeight: "bold",
                      }}
                      sx={{
                        textAlign: "center",
                      }}
                    />
                    <CardMedia
                      component="img"
                      height="250"
                      sx={{ objectFit: "contain", mt: 1 }}
                      image={movies.poster_path}
                      alt={movies.title}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        textAlign={"center"}
                        component="div"
                      >
                        {movies.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        marginInline={1}
                      >
                        {movies.overview.length > 70
                          ? `${movies.overview.slice(0, 70)}...`
                          : movies.overview}
                      </Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <MovieModal
        open={open}
        handleClose={handleClose}
        singleMovie={singleMovie}
        loading={loading}
      />
    </div>
  );
};

export default Home;
