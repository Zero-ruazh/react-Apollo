import { gql } from "@apollo/client";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
function useDataAccess(props) {
  const {
    onGetBooksList,
    onBeforeAdd,
    onAfterAdd,
    onBeforeCutPage,
    onShowBooksList,
  } = props;
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
  const CUTPAGE_BOOK = gql`
    query CutPageShowBooks($cutPage: PageData) {
      cutPageShowBooks(cutPage: $cutPage) {
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
        code
        message
        data {
          id
          name
          numbering
          sort
          synopsis
        }
      }
    }
  `;
  const REMOVE_BOOK = gql`
    mutation removeBooks($id: Int!) {
      removeBooks(id: $id) {
        data {
          id
        }
        code
        message
      }
    }
  `;
  //Search all books
  const { loading: loadingFetch, refetch } = useQuery(GET_DATA, {
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      alert(`Submission error! ${error.message}`);
    },
    onCompleted: (res) => {
      const { showAllBooks = [] } = res || {};
      onGetBooksList(showAllBooks);
    },
  });
  //Paging Search Books
  const [cutPageShowBooks, { loading: loadingCutPageBook }] = useLazyQuery(
    CUTPAGE_BOOK,
    {
      fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true,
      onError: (error) => {
        alert(`Submission error! ${error.message}`);
      },
      onCompleted: (res) => {
        const { cutPageShowBooks = [] } = res || {};
        onShowBooksList(cutPageShowBooks);
      },
    }
  );
  //Add Books
  const [addBook, { loading: loadingAddBook }] = useMutation(ADD_BOOK, {
    onError: (error) => {
      alert(`Submission error! ${error.message}`);
    },
    onCompleted: async (res) => {
      await refetch();
      onAfterAdd();
    },
  });
  //Delete Books
  const [onRemoveBook, { loading: loadingRemove }] = useMutation(REMOVE_BOOK, {
    onError: (error) => {
      alert(`Submission error! ${error.message}`);
    },
    onCompleted: async (res) => {
      await refetch();
    },
  });

  async function onAddBook() {
    const input = onBeforeAdd();
    if (input) {
      await addBook({
        variables: { input },
      });
    }
  }

  async function onCutPageShowBooks() {
    const { page, rowsPerPage } = onBeforeCutPage();
    if (rowsPerPage) {
      await cutPageShowBooks({
        variables: {
          cutPage: {
            page: page * rowsPerPage,
            rowsPerPage: rowsPerPage,
          },
        },
      });
    }
  }

  return {
    loading:
      loadingFetch || loadingAddBook || loadingRemove || loadingCutPageBook,
    onAddBook,
    onRemoveBook,
    onCutPageShowBooks,
  };
}

export default useDataAccess;
