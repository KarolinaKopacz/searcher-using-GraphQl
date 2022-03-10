import { Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import "./App.css";

import CountryProperties from "./screens/SingleCountryScreen";
import GetCountries from "./screens/CountriesScreen";
import client from "./graphQL/client";

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
