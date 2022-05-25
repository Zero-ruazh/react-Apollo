import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client";
function useDataAccess(props) {
  const { onGetBooksList, inputData } = props;
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
  //查询所有书籍
  const { loading: loadingFetch, refetch } = useQuery(GET_DATA, {
    onError: (error) => {
      alert(`Submission error! ${error.message}`);
    },
    onCompleted: (res) => {
      const { showAllBooks = [] } = res || {};
      console.log(res);
      onGetBooksList(showAllBooks);
    },
  });
  //增加书籍
  const [addBook, { loading: loadingAddBook }] = useMutation(ADD_BOOK, {
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
      alert(`Submission error! ${error.message}`);
    },
    onCompleted: async (res) => {
      await refetch();
    },
  });
  //删除书籍
  const [onRemoveBook, { loading: loadingRemove }] = useMutation(REMOVE_BOOK, {
    onError: (error) => {
      alert(`Submission error! ${error.message}`);
    },
    onCompleted: async (res) => {
      await refetch();
    },
  });

  async function onAddBook() {
    await addBook({
      variables: {
        input: inputData,
      },
    });
  }

  return {
    loading: loadingFetch || loadingAddBook || loadingRemove,
    onAddBook,
    onRemoveBook,
  };
}

export default useDataAccess;
