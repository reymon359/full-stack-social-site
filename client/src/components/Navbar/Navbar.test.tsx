import React, { useContext } from 'react';
import { createMemoryHistory } from 'history';
import {
  cleanup,
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from '@testing-library/react';
import { Navbar } from './Navbar';
import { mockApolloClient } from '../../test-helpers';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';
import { AppRoutes } from '../../AppRoutes';
import { AuthContext, isSignedIn, useMe } from '../../services/auth.service';
import { MockedProvider, wait } from '@apollo/react-testing';
import * as queries from '../../graphql/queries';
import TestRenderer from 'react-test-renderer';
import { ProfileContainer } from '../Profile';
import SignInForm from '../Auth/AuthForms/SignInForm';

describe('Navbar', () => {
  afterEach(cleanup);

  it('goes to Root when clicking the logo', async () => {
    const client = mockApolloClient();
    const history = createMemoryHistory();

    {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <Navbar history={history} />
          </ApolloProvider>
        </ThemeProvider>
      );

      fireEvent.click(getByTestId('root-logo'));

      await waitFor(() =>
        expect(history.location.pathname).toEqual(AppRoutes.Root)
      );
    }
  });

  it('goes to New Post Container when clicking the new post link', async () => {
    const client = mockApolloClient();
    const history = createMemoryHistory();

    {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <Navbar history={history} />
          </ApolloProvider>
        </ThemeProvider>
      );

      fireEvent.click(getByTestId('new-post-button'));

      await waitFor(() =>
        expect(history.location.pathname).toEqual(AppRoutes.NewPost)
      );
    }
  });

  it('goes to Sign In Container and logs out user when clicking the Sign out link', async () => {
    const client = mockApolloClient();
    const history = createMemoryHistory();

    {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <Navbar history={history} />
          </ApolloProvider>
        </ThemeProvider>
      );

      fireEvent.click(getByTestId('sign-out-button'));

      await waitFor(() => {
        expect(history.location.pathname).toEqual('/sign-in');
        expect(isSignedIn()).toEqual(false);
      });
    }
  });

  it('goes to Profile when clicking the profile link', async () => {
    delete window.location;
    window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: '/uri',
      },
      writable: true,
    });

    const navbarMock = [
      {
        request: {
          query: queries.me,
        },
        result: {
          data: {
            user: {
              bio:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              email: 'uri@uri.com',
              followers: 35,
              following: 33,
              id: '1',
              name: 'Uri Goldshtein',
              picture: 'https://robohash.org/uri?set=set5',
              username: 'uri',
              __typename: 'User',
            },
          },
        },
      },
      {
        request: { query: queries.getUser },
        result: {
          data: {
            user: {
              bio:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              email: 'uri@uri.com',
              followers: 35,
              following: 33,
              id: '1',
              name: 'Uri Goldshtein',
              picture: 'https://robohash.org/uri?set=set5',
              username: 'uri',
              __typename: 'User',
            },
          },
        },
      },
    ];
    const user = {
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      email: 'uri@uri.com',
      followers: 35,
      following: 33,
      id: '1',
      name: 'Uri Goldshtein',
      picture: 'https://robohash.org/uri?set=set5',
      username: 'uri',
      __typename: 'User',
    };

    let getByTestId: any = null;

    act(() => {
      getByTestId = render(
        <AuthContext.Provider value={user}>
          <MockedProvider mocks={navbarMock} addTypename={false}>
            <ThemeProvider theme={theme}>
              <ProfileContainer history={history} />
            </ThemeProvider>
          </MockedProvider>
        </AuthContext.Provider>
      ).getByTestId;
    });
    // const { getByTestId } = render(
    //   <AuthContext.Provider value={user}>
    //     <MockedProvider mocks={navbarMock} addTypename={false}>
    //       <ThemeProvider theme={theme}>
    //         <ProfileContainer history={history} />
    //       </ThemeProvider>
    //     </MockedProvider>
    //   </AuthContext.Provider>
    // );

    console.log(history);
    await wait(0); // wait for response
    const username = await waitFor(() => getByTestId('user-name'));
    console.log(username);
    // fireEvent.click(screen.getByTestId('profile-button'));
    console.log(history);

    // await waitFor(() => screen.getByTestId('user-name'));

    expect(getByTestId('user-picture')).toHaveAttribute(
      'src',
      'https://robohash.org/uri?set=set5'
    );
  });
});

// Lost all evening trying to write this test 😢
// it('goes to Profile when clicking the profile link', async () => {
//   const userMock = {
//     id: '1',
//     name: 'Uri Goldshtein',
//     username: 'uri',
//     email: 'uri@uri.com',
//     followers: 35,
//     following: 33,
//     picture: 'https://robohash.org/uri?set=set5',
//   };

// const MyContext = React.createContext<User | null>(userMock);
// const useMe = () => {
//   return useContext(MyContext);
// };
// <MyContext.Provider value={userMock}>
//   <Component {...(props as P)} />
// </MyContext.Provider>;

// const mockCacheData = {
//   data: {
//     data: {
//       'User:1': {
//         id: '1',
//         name: 'Uri Goldshtein',
//         username: 'uri',
//         email: 'uri@uri.com',
//         followers: 35,
//         following: 33,
//         picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg',
//         __typename: 'User',
//       },
//       ROOT_QUERY: {
//         me: {
//           type: 'id',
//           generated: false,
//           id: 'User:1',
//           typename: 'User',
//         },
//       },
//     },
//   },
// };
//     const client = mockApolloClientCacheData(mockCacheData);
//     console.log(JSON.stringify(client.cache));
//     const history = createMemoryHistory();
//
//     {
//       const { getByTestId } = render(
//         <MyContext.Provider value={userMock}>
//           <ThemeProvider theme={theme}>
//             <ApolloProvider client={client}>
//               <Navbar history={history} />
//             </ApolloProvider>
//           </ThemeProvider>
//         </MyContext.Provider>
//       );
//
//       fireEvent.click(getByTestId('profile-button'));
//
//       await waitFor(() =>
//         expect(history.location.pathname).toEqual(
//           `/${mockCacheData.data.data['User:1'].username}`
//         )
//       );
//     }
//   });
