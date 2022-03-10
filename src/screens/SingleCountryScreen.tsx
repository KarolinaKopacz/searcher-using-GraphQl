import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { LOAD_COUNTRY } from "../graphQL/Queries";
import { CountryResponse } from "../graphQL/types";

const CountryProperties = () => {
  const { code } = useParams<{ code: string }>();

  const { error, loading, data } = useQuery<CountryResponse>(LOAD_COUNTRY, {
    variables: { code: code?.toLocaleUpperCase() },
  });

  return (
    <div className="country-container">
      <div className="country-site">
        <div className="flag">
          <span>{data?.country.emoji}</span>
        </div>
        <div className="title">
          <p className="label">Country:</p>
          <p>{data?.country.name}</p>
        </div>
        <div className="title">
          <p className="label">Code:</p>
          <p>{data?.country.code}</p>
        </div>
        <div className="title">
          <p className="label">Language:</p>
          <p>{data?.country.languages[0].name}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryProperties;
