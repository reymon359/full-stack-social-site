import React, { useContext } from 'react';
import { createMemoryHistory } from 'history';
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import { Navbar } from './Navbar';
import { mockApolloClient } from '../../test-helpers';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles';
import { AppRoutes } from '../../AppRoutes';
import { isSignedIn, useMe } from '../../services/auth.service';

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
