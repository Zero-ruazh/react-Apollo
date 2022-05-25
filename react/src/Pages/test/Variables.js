import { gql, useQuery } from "@apollo/client";

const GET_DOGS = gql`
  query Books {
    books {
      title
      price
    }
  }
`;
function Variables({ onDogSelected }) {
  const { loading, error, data } = useQuery(GET_DOGS, {
    variables: { onDogSelected },
  });
  console.log(loading, error, data);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <select name="dog" onChange={onDogSelected}>
      {data.books.map((book) => (
        <option key={book.title} value={book.title}>
          {book.title}
        </option>
      ))}
    </select>
  );
}

export default Variables;
