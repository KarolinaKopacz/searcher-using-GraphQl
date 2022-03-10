import React, { useEffect, useMemo, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_COUNTRIES } from "../graphQL/Queries";
import { Link } from "react-router-dom";
import { CountriesResponse, Country, CountryResponse } from "../graphQL/types";
import Select from "react-select";
import { uniqBy, values } from "remeda";

const GetCountries = () => {
  const { error, loading, data } = useQuery<CountriesResponse>(LOAD_COUNTRIES);
  const [inputValue, setInputValue] = useState("");
  const [selectedContinent, setSelectContinent] = useState<string>();

  const countries = useMemo(() => {
    if (!data) {
      return [];
    }

    if (!inputValue && !selectedContinent) {
      return data?.countries;
    }

    const keyword = inputValue.toLocaleLowerCase();

    return data.countries.filter((country) => {
      if (selectedContinent && !inputValue) {
        return country.continent.name.includes(selectedContinent);
      }
      if (selectedContinent && inputValue) {
        return (
          country.continent.name.includes(selectedContinent) &&
          country.name.toLocaleLowerCase().includes(keyword)
        );
      }
      return country.name.toLocaleLowerCase().includes(keyword);
    });
  }, [inputValue, selectedContinent, data]);

  const continentOptions = useMemo(() => {
    if (data) {
      const results = data?.countries.map((country) => {
        console.log("country", country);
        return {
          label: country.continent.name,
          value: country.continent.name,
        };
      });
      return uniqBy(results, (result) => result.value);
    }
  }, [selectedContinent]);

  return (
    <div className="container">
      <Select
        options={continentOptions}
        onChange={(value) => setSelectContinent(value?.value)}
      />
      <input onChange={(ev) => setInputValue(ev.target.value)} />
      {countries.map((country) => {
        return (
          <div className="flex flex-row flex-wrap">
            <div className="basis-1/4">
              <nav>
                <Link to={`/${country.code.toLocaleLowerCase()}`}>
                  <li key={country.index}>
                    {country.name} {country.code}
                  </li>
                </Link>
              </nav>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GetCountries;
