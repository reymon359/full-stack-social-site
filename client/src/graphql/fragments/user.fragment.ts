import gql from 'graphql-tag';

export default gql`
  fragment User on User {
    id
    name
    isername
    email
    followers
    following
    picture
  }
`;
