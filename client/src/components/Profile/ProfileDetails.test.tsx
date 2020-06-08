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
import { createBrowserHistory, createMemoryHistory } from 'history';
import { mockApolloClient } from '../../test-helpers';
import * as queries from '../../graphql/queries';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';
import { ProfileContainer } from './ProfileContainer';
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
  // beforeEach(() => {
  //   cleanup();
  //
  //   delete window.location;
  //   window = Object.create(window);
  //   Object.defineProperty(window, 'location', {
  //     value: {
  //       href: '/uri',
  //     },
  //     writable: true,
  //   });
  // });

  it('renders the user data', async () => {
    const client = mockApolloClient();

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

  // Trying to test with mocked user
  // it('profile test 2', async () => {
  //   const client = mockApolloClient([
  //     {
  //       request: { query: queries.me },
  //       result: {
  //         data: {
  //           user: {
  //             bio:
  //               'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  //             email: 'uri@uri.com',
  //             followers: 35,
  //             following: 33,
  //             id: '1',
  //             name: 'Uri Goldshtein',
  //             picture: 'https://robohash.org/uri?set=set5',
  //             username: 'uri',
  //             __typename: 'User',
  //           },
  //         },
  //       },
  //     },
  //     {
  //       request: { query: queries.getUser },
  //       result: {
  //         data: {
  //           user: {
  //             bio:
  //               'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  //             email: 'uri@uri.com',
  //             followers: 35,
  //             following: 33,
  //             id: '1',
  //             name: 'Uri Goldshtein',
  //             picture: 'https://robohash.org/uri?set=set5',
  //             username: 'uri',
  //             __typename: 'User',
  //           },
  //         },
  //       },
  //     },
  //   ]);
  //
  //   const history = createBrowserHistory();
  //   // history.push('/uri');
  //
  //   {
  //     const { container, getByTestId } = render(
  //       <ThemeProvider theme={theme}>
  //         <ApolloProvider client={client}>
  //           <ProfileContainer history={history} username={'uri'} />
  //         </ApolloProvider>
  //       </ThemeProvider>
  //     );
  //     await waitFor(() => screen.getByTestId('user-name'));
  //
  //     expect(getByTestId('user-picture')).toHaveAttribute(
  //       'src',
  //       'https://robohash.org/uri?set=set5'
  //     );
  //     expect(getByTestId('user-name')).toHaveTextContent(mockUser.name);
  //     expect(getByTestId('user-username')).toHaveTextContent(mockUser.username);
  //     expect(getByTestId('user-bio')).toHaveTextContent(mockUser.bio);
  //     expect(getByTestId('user-followers')).toHaveTextContent(
  //       mockUser.followers.toString()
  //     );
  //     expect(getByTestId('user-following')).toHaveTextContent(
  //       mockUser.following.toString()
  //     );
  //
  //   }
  // });
});
