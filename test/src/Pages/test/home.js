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
function Home() {
  // 查询所有书籍
  const { loading, error, data } = useQuery(GET_DATA, {
    onError: (error) => {
      return `Submission error! ${error.message}`;
    },
    onCompleted: (res) => {
      return console.log(res);
    },
  });
  // console.log(data);

  // 增加书籍
  // let [input, setinput] = useState({});
  let name1, numbering, sort, synopsis, id;
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
  // function onRemove(id) {
  //   console.log(id);
  const [onRemove] = useMutation(REMOVE_BOOK, {
    onError: (error) => {
      return `Submission error! ${error.message}`;
    },
    onCompleted: (res) => {
      return console.log(res);
    },
  });
  // }

  if (loading) return "Submitting...";
  // if (error) return `Submission error! ${error.message}`;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addbook({
            variables: {
              input: {
                name: name1.value,
                numbering: Number(numbering.value),
                sort: sort.value,
                synopsis: synopsis.value,
              },
            },
          });
          // console.log("wwwww", name1.value, numbering.value, e);
          // synopsis.value = "";
        }}
      >
        书名
        <input
          ref={(node) => {
            name1 = node;
          }}
        />
        编号
        <input
          ref={(node) => {
            numbering = node;
          }}
        />
        类别
        <input
          ref={(node) => {
            sort = node;
          }}
        />
        简介
        <input
          ref={(node) => {
            synopsis = node;
          }}
        />
        <button type="submit">增加书籍</button>
      </form>
      <table>
        <thead>
          <tr>
            <th style={{ width: "20%" }}>ID</th>
            <th style={{ width: "20%" }}>书名</th>
            <th style={{ width: "20%" }}>编号</th>
            <th style={{ width: "20%" }}>类别</th>
            {/* <th style={{ width: "20%" }}>简介</th> */}
            <th style={{ width: "200px" }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.showAllBooks.map((book) => (
            <Fragment key={book?.id}>
              <tr>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.numbering}</td>
                <td>{book.sort}</td>
                {/* <td>{book.synopsis}</td> */}
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

export default Home;
