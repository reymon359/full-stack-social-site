import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { render, waitFor, screen } from '@testing-library/react';
import { mockApolloClient } from '../../test-helpers';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';
import ProfileDetails from './ProfileDetails';

describe('ProfileDetails', () => {
  const mockUser = {
    id: '1',
    name: 'Uri Goldshtein',
    username: 'uri',
    picture: 'https://robohash.org/uri?set=set5',
    email: 'uri@uri.com',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    followers: 35,
    following: 33,
  };

  it('renders the user data', async () => {
    const client = mockApolloClient([]);

    {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <ProfileDetails user={mockUser} />
          </ApolloProvider>
        </ThemeProvider>
      );

      await waitFor(() => screen.getByTestId('user-name'));

      expect(getByTestId('user-picture')).toHaveAttribute(
        'src',
        'https://robohash.org/uri?set=set5'
      );
      expect(getByTestId('user-name')).toHaveTextContent(mockUser.name);
      expect(getByTestId('user-username')).toHaveTextContent(mockUser.username);
      expect(getByTestId('user-bio')).toHaveTextContent(mockUser.bio);
      expect(getByTestId('user-followers')).toHaveTextContent(
        mockUser.followers.toString()
      );
      expect(getByTestId('user-following')).toHaveTextContent(
        mockUser.following.toString()
      );
    }
  });
});
