import { gql, useQuery, useMutation } from "@apollo/client";
import { Fragment } from "react";
import { useState } from "react";
const GET_DATA = gql`
  query ShowAllBooks {
    showAllBooks {
      id
      name
      numbering
      sort
      synopsis
    }
  }
`;
const ADD_BOOK = gql`
  mutation AddBooks($input: AddBook!) {
    addBooks(input: $input) {
      name
      numbering
      sort
      synopsis
    }
  }
`;
const REMOVE_BOOK = gql`
  mutation removeBooks($id: Int!) {
    removeBooks(id: $id) {
      id
    }
  }
`;
function Books() {
  // 查询所有书籍
  //保存书籍列表
  const [bookList, setBookList] = useState({});
  const { loading } = useQuery(GET_DATA, {
    onError: (error) => {
      return `Submission error! ${error.message}`;
    },
    onCompleted: (res) => {
      return setBookList(res);
    },
  });

  console.log(bookList);

  // 增加书籍
  let [inputData, setinput] = useState({
    name: "",
    numbering: "",
    sort: "",
    synopsis: "",
  });
  //获取输入框的值
  function getinput(e, name) {
    setinput((i) => {
      let val = e.target.value;
      if (name == "numbering") {
        val = Number(e.target.value);
      }
      return { ...i, [name]: val };
    });
  }
  const [addbook] = useMutation(ADD_BOOK, {
    variables: {
      input: {
        name: "placeholder",
        numbering: "placeholder",
        sort: "placeholder",
        synopsis: "placeholder",
        someOtherVariable: 1234,
      },
    },
    onError: (error) => {
      return `Submission error! ${error.message}`;
    },
    onCompleted: (res) => {
      return console.log(res);
    },
  });

  //删除书籍
  const [onRemove] = useMutation(REMOVE_BOOK, {
    onError: (error) => {
      return `Submission error! ${error.message}`;
    },
    onCompleted: (res) => {
      return console.log(res);
    },
  });

  if (loading) return "Submitting...";

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addbook({
            variables: {
              input: inputData,
            },
          });
          console.log("wwwww", inputData);
          setinput({ name: "", numbering: "", sort: "", synopsis: "" });
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
            {/* <th style={{ width: "200px" }}>简介</th> */}
            <th style={{ width: "200px" }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {bookList.showAllBooks.map((book) => (
            <Fragment key={book?.id}>
              <tr>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.numbering}</td>
                <td>{book.sort}</td>
                <td>
                  <a
                    onClick={() => {
                      onRemove({ variables: { id: Number(book.id) } });
                    }}
                  >
                    删除
                  </a>
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
