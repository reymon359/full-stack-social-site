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
import {ThemeProvider} from "styled-components";
import {theme} from "../../styles";

describe('ProfileContainer', () => {
	afterEach(() => {
		cleanup();

		delete window.location;
		window = Object.create(window);
		Object.defineProperty(window, 'location', {
			value: {
				href: '/uri',
			},
			writable: true,
		});
	});

	it('renders fetched user data', async () => {
		const client = mockApolloClient([
			{
				request: { query: queries.getUser },
				result: {
					data: {
						user: {
							id: "1",
							name: "Uri Goldshtein",
							username: "uri",
							picture: "https://robohash.org/uri?set=set5",
							email: "uri@uri.com",
							bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
							followers: 35,
							following: 33
						}
					}
				},
			},
		]);

		const history = createBrowserHistory();

		{
			const { container, getByTestId } = render(
				<ThemeProvider theme={theme}>
					<ApolloProvider client={client}>
						<ChatsList history={history} />
					</ApolloProvider>
				</ThemeProvider>
			);

			await waitFor(() => screen.getByTestId('name'));

			expect(getByTestId('name')).toHaveTextContent('Foo Bar');
			expect(getByTestId('picture')).toHaveAttribute(
				'src',
				'https://localhost:4000/picture.jpg'
			);
			expect(getByTestId('content')).toHaveTextContent('Hello');
			expect(getByTestId('date')).toHaveTextContent('01:00');
		}
	});
