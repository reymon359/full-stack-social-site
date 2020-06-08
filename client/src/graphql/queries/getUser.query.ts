import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query GetUser($username: String!) {
    user(username: $username) {
      ...User
    }
  }
  ${fragments.user}
`;
