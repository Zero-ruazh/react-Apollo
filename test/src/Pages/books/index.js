import { Fragment } from "react";
import useInteractions from "./useInteractions";
import userDataAccess from "./useDataAccess";
function Books() {
  const {
    getinput,
    bookList,
    inputData,
    onGetBooksList,
    onBeforeAdd,
    onAfterAdd,
  } = useInteractions();
  const { onAddBook, onRemoveBook } = userDataAccess({
    onGetBooksList,
    onBeforeAdd,
    onAfterAdd,
  });
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAddBook();
        }}
      >
        书名
        <input
          value={inputData.name}
          onChange={(e) => {
            getinput(e, "name");
          }}
        />
        编号
        <input
          value={inputData.numbering}
          onChange={(e) => {
            getinput(e, "numbering");
          }}
        />
        类别
        <input
          value={inputData.sort}
          onChange={(e) => {
            getinput(e, "sort");
          }}
        />
        简介
        <input
          value={inputData.synopsis}
          onChange={(e) => {
            getinput(e, "synopsis");
          }}
        />
        <button type="submit">增加书籍</button>
      </form>
      <table>
        <thead>
          <tr>
            <th style={{ width: "80px" }}>ID</th>
            <th style={{ width: "200px" }}>书名</th>
            <th style={{ width: "100px" }}>编号</th>
            <th style={{ width: "200px" }}>类别</th>
            <th style={{ width: "200px" }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((book) => (
            <Fragment key={book?.id}>
              <tr>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.numbering}</td>
                <td>{book.sort}</td>
                <td>
                  <button
                    onClick={() => {
                      onRemoveBook({ variables: { id: Number(book.id) } });
                    }}
                  >
                    删除
                  </button>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Books;
