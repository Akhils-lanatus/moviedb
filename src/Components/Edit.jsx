import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Header from "./Header";
import { Container, Typography } from "@mui/material";
import { useContext } from "react";
import MovieContext from "./movieContext";

export default function Edit() {
  const { movieArr, setMovieArr } = useContext(MovieContext);
  // const [rows, setRows] = React.useState(movieArr);

  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "title", headerName: "Title", width: 550 },
    {
      field: "vote_count",
      headerName: "Vote Count",
      width: 100,
      editable: true,
      type: "number",
    },
    {
      field: "release_date",
      headerName: "Release Date",
      width: 100,
      editable: true,
      type: "date",
      align: "right",
      headerAlign: "right",
      valueGetter: (params) => new Date(params),
    },
  ];

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    setMovieArr(
      movieArr.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 7 }}>
        <Header />
      </Box>
      <Container style={{ width: "100%", marginTop: 100 }}>
        <Typography variant="h4" textAlign={"center"} color={"white"} mb={3}>
          Edit Movies
        </Typography>
        <DataGrid
          rows={movieArr}
          columns={columns}
          editMode="row"
          processRowUpdate={processRowUpdate}
          sx={{
            color: "black",
            bgcolor: "#212121",
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "whitesmoke",
            },
            "& .Mui-selected": {
              backgroundColor: "whitesmoke !important",
            },
            height: "auto !important",
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          slotProps={{
            toolbar: { setMovieArr },
          }}
        />
      </Container>
    </>
  );
}
