import { gql } from "@apollo/client";

export const LOAD_COUNTRIES = gql`
  query {
    countries {
      name
      code
      languages {
        name
      }
      emoji
      continent {
        name
      }
    }
  }
`;

export const LOAD_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      code
      languages {
        name
      }
      emoji
      continent {
        name
      }
    }
  }
`;
