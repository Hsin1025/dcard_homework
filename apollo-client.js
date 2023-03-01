import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useSession } from "next-auth/react";

export const getApolloClient = () => {
  const { data: session } = useSession()
  // console.log('session', session)

  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql'
  });
      
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: 'Bearer ' + session.accessToken
      }
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
      
  return client;
};