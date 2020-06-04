import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { MockLink } from 'apollo-link-mock';

export const mockApolloClient = (mocks: any) => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new MockLink(mocks),
  });
};

export const mockApolloClientCacheData = (cacheData: any) => {
  const mockCache = new InMemoryCache();
  mockCache.writeData(cacheData);

  return new ApolloClient({
    cache: mockCache,
    link: new MockLink([]),
  });
};
