import React from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import GetCountries from "./screens/CountriesScreen";
import { Routes, Route, Link } from "react-router-dom";
import CountryProperties from "./screens/SingleCountryScreen";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://countries.trevorblades.com/" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <Routes>
          <Route path="/" element={<GetCountries />} />
          <Route path="/:code" element={<CountryProperties />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
