import gql from 'graphql-tag';
import user from './user.fragment';

export default gql`
  fragment Post on Post {
    id
    title
    picture
    description
    content
    createdAt
    likes
    user {
      ...User
    }
  }
  ${user}
`;
