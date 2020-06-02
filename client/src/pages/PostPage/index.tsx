import React from 'react';
import { History } from 'history';

interface PostPageProps {
  history: History;
}

const PostPage: React.FC<PostPageProps> = ({ history }) => <h1>Post</h1>;

export default PostPage;
