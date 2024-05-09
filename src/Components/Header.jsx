import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Typography, Box, TextField } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
const Header = ({ isAscending, searchQuery, setSearchQuery, sortMovies }) => {
  const { pathname } = useLocation();
  //   console.log(pathname);

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#254061" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          <Link
            to="/"
            style={{
              cursor: "pointer",
              color: "white",
              textDecoration: "none",
            }}
          >
            MovieDB
          </Link>
        </Typography>

        {pathname !== "/edit" && (
          <Box
            sx={{
              display: "flex",
              gap: {
                lg: 4,
                md: 4,
                sm: 3,
                xs: 1,
              },
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography variant="h6" component="div">
              <Link
                to="/edit"
                style={{
                  cursor: "pointer",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Edit
              </Link>
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer", display: "flex" }}
              onClick={() => sortMovies()}
              alignItems={"center"}
            >
              Sort{" "}
              <span style={{ display: "flex" }}>
                {isAscending ? (
                  <ArrowUpwardIcon fontSize="small" />
                ) : (
                  <ArrowDownwardIcon fontSize="small" />
                )}
              </span>
            </Typography>
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{ width: "50%" }}
              inputProps={{ style: { color: "white" } }}
              placeholder="Search"
              type="search"
            />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
