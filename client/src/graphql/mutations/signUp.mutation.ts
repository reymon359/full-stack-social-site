import gql from 'graphql-tag';

export default gql`
mutation signUp(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    signUp(
      name: $name
      username: $username
      email: $email
      password: $password
      passwordConfirm: $passwordConfirm
    ) {
      id
    }
  }
`;
