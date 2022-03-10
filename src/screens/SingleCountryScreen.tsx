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
    <>
      <div>{data?.country.languages[0].name}</div>
      <div>{data?.country.emoji}</div>
      <div>{data?.country.code}</div>
      <div>{data?.country.name}</div>
    </>
  );
};

export default CountryProperties;
