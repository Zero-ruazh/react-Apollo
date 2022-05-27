import React, { useEffect, Fragment } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";

import useInteractions from "./useInteractions";
import userDataAccess from "./useDataAccess";

function Books() {
  const {
    page,
    rowsPerPage,
    bookList,
    allBooksList,
    inputData,
    onGetInput,
    onShowBooksList,
    onGetBooksList,
    onBeforeAdd,
    onAfterAdd,
    onBeforeCutPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useInteractions();

  const { onAddBook, onRemoveBook, onCutPageShowBooks } = userDataAccess({
    onGetBooksList,
    onShowBooksList,
    onBeforeAdd,
    onAfterAdd,
    onBeforeCutPage,
  });

  useEffect(() => {
    onCutPageShowBooks();
  }, [page, rowsPerPage, allBooksList]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAddBook();
        }}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            id="name"
            size="small"
            label="书名"
            variant="outlined"
            value={inputData.name}
            onChange={(e) => {
              onGetInput(e, "name");
            }}
          />
          &nbsp;
          <TextField
            id="numbering"
            size="small"
            label="编号"
            variant="outlined"
            value={inputData.numbering}
            onChange={(e) => {
              onGetInput(e, "numbering");
            }}
          />
          &nbsp;
          <TextField
            id="sort"
            size="small"
            label="类别"
            variant="outlined"
            value={inputData.sort}
            onChange={(e) => {
              onGetInput(e, "sort");
            }}
          />
          &nbsp;
          <TextField
            id="synopsis"
            size="small"
            label="简介"
            variant="outlined"
            value={inputData.synopsis}
            onChange={(e) => {
              onGetInput(e, "synopsis");
            }}
          />
          &nbsp;
          <Button variant="outlined" type="submit">
            增加书籍
          </Button>
        </Stack>
      </form>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">书名</TableCell>
              <TableCell align="left">编号</TableCell>
              <TableCell align="left">类别</TableCell>
              <TableCell align="left">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookList.map((row) => (
              <TableRow
                key={row?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.numbering}</TableCell>
                <TableCell align="left">{row.sort}</TableCell>
                <TableCell align="left">
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon fontSize="small" />}
                    onClick={() => {
                      onRemoveBook({ variables: { id: Number(row.id) } });
                    }}
                  >
                    删除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={allBooksList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default Books;
