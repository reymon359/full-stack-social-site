import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { render, waitFor, screen } from '@testing-library/react';
import { mockApolloClient } from '../../test-helpers';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';
import PostCard from './PostCard';
import { timeFromNow } from '../../utils/timeFromNow';
import { BrowserRouter as Router } from 'react-router-dom';
describe('PostCard', () => {
  const mockPost = {
    id: '4',
    title: 'Alicante is the best',
    picture: 'https://source.unsplash.com/1600x900/?alicante',
    description:
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet volutpat consequat mauris nunc. A diam maece',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet volutpat consequat mauris nunc. A diam maecenas sed enim ut sem. In tellus integer feugiat scelerisque. Scelerisque varius morbi enim nunc faucibus a pellentesque. Placerat orci nique. Magna sit amet purus gravida quis blandit. Aliquam sem fringilla ut morbi tincidunt augue. Suspendisse in est ante in nibh. Nulla aliquet porttitor lacus luctus accumsan tortor. Risus ultricies tristique nulla aliquet enim. Ornare aenean euismod elementum nisi quis. Auctor urna nunc id cursus metus aliquam eleifend mi. Eget nunc lobortis mattis aliquam faucibus.',
    createdAt: '2020-06-11T12:40:00.000Z',
    likes: 1,
    user: {
      id: '3',
      name: 'Bryan Wallace',
      username: 'bryan',
      picture: 'https://robohash.org/bryan?set=set5',
      email: 'bryan@bryan.com',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      followers: 1,
      following: 2,
    },
  };

  const createdAtTfn = timeFromNow(new Date(mockPost.createdAt));

  it('renders the post data', async () => {
    const client = mockApolloClient();

    {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <Router>
              <PostCard post={mockPost} />
            </Router>
          </ApolloProvider>
        </ThemeProvider>
      );

      await waitFor(() => screen.getByTestId('post-user-picture'));

      expect(getByTestId('post-user-picture')).toHaveAttribute(
        'src',
        'https://robohash.org/bryan?set=set5'
      );
      expect(getByTestId('post-user-username')).toHaveTextContent(
        mockPost.user.username
      );

      expect(getByTestId('post-created-at')).toHaveTextContent(
        `${createdAtTfn?.time} ${createdAtTfn?.unitOfTime} ago`
      );
      expect(getByTestId('post-picture')).toHaveStyle(
        `background-image: url('${mockPost.picture}')`
      );
      expect(getByTestId('post-title')).toHaveTextContent(mockPost.title);
      expect(getByTestId('post-description')).toHaveTextContent(
        mockPost.description
      );
    }
  });
});
