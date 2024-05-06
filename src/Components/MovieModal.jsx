import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Paper, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import CloseIcon from "@mui/icons-material/Close";
import YouTubeIcon from "@mui/icons-material/YouTube";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "#212121",
  color: "#fff",
  height: "fit-content",
  p: 4,
  outline: "none",
  boxShadow: "0px 0px 10px 1px  #FFFFFF",
};

const MovieModal = ({ handleClose, open, singleMovie, loading }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Paper elevation={24} sx={style}>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  id="transition-modal-title"
                  variant="h2"
                  component="h2"
                >
                  Loading...
                </Typography>
              </Box>
            ) : (
              <>
                <CloseIcon
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    cursor: "pointer",
                  }}
                  fontSize="large"
                />
                <Stack
                  display={"flex"}
                  flexDirection={{
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  }}
                  justifyContent={"space-between"}
                  // alignItems={"center"}
                  width={"100%"}
                  height={"100%"}
                >
                  <Box
                    width={"100%"}
                    display={"flex"}
                    justifyContent={{
                      lg: "flex-start",
                      md: "flex-start",
                      sm: "center",
                      xs: "center",
                    }}
                    ml={{ lg: 5, md: 3, sm: 0, xs: 0 }}
                    alignItems={"center"}
                    sx={{
                      height: {
                        lg: "470px",
                        md: "450px",
                        sm: "400px",
                        xs: "300px",
                      },
                    }}
                  >
                    <img
                      style={{
                        objectFit: "contain",
                        height: "inherit",
                      }}
                      // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={singleMovie[0]?.poster_path}
                      alt={singleMovie[0]?.title}
                      loading="lazy"
                    />
                  </Box>
                  <Stack
                    width={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    // gap={2}
                    // justifyContent={"space-c"}
                    alignItems={"flex-start"}
                    position={"relative"}
                  >
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      mt={2}
                    >
                      {singleMovie[0]?.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      textAlign={"center"}
                      component="div"
                      sx={{
                        fontSize: {
                          lg: "23px",
                          md: "23px",
                          sm: "15px",
                          xs: "15px",
                        },
                      }}
                    >
                      Popularity : {singleMovie[0]?.popularity}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {
                          lg: "23px",
                          md: "23px",
                          sm: "15px",
                          xs: "15px",
                        },
                      }}
                      gutterBottom
                      textAlign={"center"}
                      component="div"
                    >
                      Released On :{" "}
                      {new Date(
                        singleMovie[0]?.release_date
                      ).toLocaleDateString("en-IN", { dateStyle: "long" })}
                    </Typography>
                    {singleMovie[0]?.vote_average > 0 && (
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        width={{
                          lg: "75%",
                          md: "75%",
                          sm: "100%",
                          xs: "100%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: {
                              lg: "23px",
                              md: "23px",
                              sm: "15px",
                              xs: "15px",
                            },
                          }}
                          gutterBottom
                        >
                          Vote Count: {singleMovie[0]?.vote_count}
                        </Typography>
                        <Rating
                          sx={{
                            color: "#fff",
                            mb: "1rem",
                            borderColor: "white",
                          }}
                          name="disabled"
                          value={singleMovie[0]?.vote_average / 2}
                          precision={0.5}
                          readOnly
                        />
                      </Box>
                    )}
                    <Typography variant="body2">
                      {singleMovie[0]?.overview.length > 300
                        ? `${singleMovie[0]?.overview.slice(0, 300)}...`
                        : singleMovie[0]?.overview}
                    </Typography>
                    <Button
                      href={singleMovie[0]?.trailer}
                      target="_blank"
                      sx={{
                        mt: 2,
                        position: { lg: "absolute", md: "absolute" },
                        bottom: 0,
                      }}
                      variant="contained"
                      fullWidth
                      startIcon={<YouTubeIcon />}
                    >
                      Watch Trailer
                    </Button>
                  </Stack>
                </Stack>
              </>
            )}
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};
export default MovieModal;
