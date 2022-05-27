import { useState, useMemo } from "react";

function useInteractions() {
  // Search all books
  const [allBooksList, setAllBookList] = useState([]);
  function onGetBooksList(value) {
    setAllBookList(value);
  }
  const initialValues = useMemo(() => ({
    name: "",
    numbering: "",
    sort: "",
    synopsis: "",
  }));
  // Add books
  const [inputData, setInputData] = useState(initialValues);
  function onBeforeAdd() {
    return inputData;
  }
  function onAfterAdd() {
    //Clear the value of the add input box
    setInputData(initialValues);
  }

  //Get the value of the add input box
  function onGetInput(e, name) {
    setInputData((i) => {
      let val = e.target.value;
      if (name === "numbering") {
        val = Number(e.target.value);
      }
      return { ...i, [name]: val };
    });
  }

  //Pagination function
  const [bookList, setBooksList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  function onShowBooksList(value) {
    setBooksList(value);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function onBeforeCutPage() {
    return { page, rowsPerPage };
  }

  return {
    page,
    bookList,
    inputData,
    rowsPerPage,
    allBooksList,
    onGetInput,
    onShowBooksList,
    onGetBooksList,
    onBeforeAdd,
    onAfterAdd,
    onBeforeCutPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}
export default useInteractions;
