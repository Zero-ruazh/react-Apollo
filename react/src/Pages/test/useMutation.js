import { gql, useMutation } from "@apollo/client";

const ADD_TODO = gql`
  mutation Add($input1: Test!) {
    add(input1: $input1) {
      text
    }
  }
`;
function UseMutation() {
  let input;
  const [add] = useMutation(ADD_TODO, {
    variables: {
      input1: {
        text: "placeholder",
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

  //   if (loading) return "Submitting...";
  //   if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          add({ variables: { input1: { text: input.value } } });
          console.log(input.value, e);
          input.value = "";
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default UseMutation;
