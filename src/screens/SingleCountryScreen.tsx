import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { CountryResponse } from "../graphQL/types";
import { LOAD_COUNTRY } from "../graphQL/Queries";
import { useError } from "../hooks/useError";

const SingleCountryScreen = () => {
  const { code } = useParams<{ code: string }>();

  const { error, loading, data } = useQuery<CountryResponse>(LOAD_COUNTRY, {
    variables: { code: code?.toLocaleUpperCase() },
  });

  useError(error);

  return (
    <div className="country-container">
      <div className="country-site">
        {loading ? (
          "Loading..."
        ) : (
          <>
            <div className="flag">
              <span>{data?.country.emoji}</span>
            </div>
            <div className="title">
              <p className="label">Code:</p>
              <p>{data?.country.code}</p>
            </div>
            <div className="title">
              <p className="label">Country:</p>
              <p>{data?.country.name}</p>
            </div>
            <div className="title">
              <p className="label">Language:</p>
              <p>{data?.country.languages[0].name}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleCountryScreen;
