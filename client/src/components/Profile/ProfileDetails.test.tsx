import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ReactDOM from 'react-dom';
import {
  cleanup,
  render,
  waitFor,
  fireEvent,
  screen,
} from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { mockApolloClient } from '../../test-helpers';
import * as queries from '../../graphql/queries';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';
import { ProfileContainer } from './ProfileContainer';
import ProfileDetails from './ProfileDetails';

describe('ProfileDetails', () => {
  it('renders the user data', async () => {
    const client = mockApolloClient();
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

    {
      const { container, getByTestId } = render(
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
