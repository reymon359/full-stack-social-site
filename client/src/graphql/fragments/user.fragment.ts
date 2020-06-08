import gql from 'graphql-tag';

export default gql`
  fragment User on User {
    id
    name
    username
    bio
    email
    followers
    following
    picture
  }
`;
