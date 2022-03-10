import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Select from "react-select";
import { uniqBy } from "remeda";

import { CountriesResponse } from "../graphQL/types";
import { LOAD_COUNTRIES } from "../graphQL/Queries";
import { useError } from "../hooks/useError";

const CountriesScreen = () => {
  const { error, loading, data } = useQuery<CountriesResponse>(LOAD_COUNTRIES);
  const [inputValue, setInputValue] = useState("");
  const [selectedContinent, setSelectContinent] = useState<string>();

  useError(error);

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
      const results = data.countries.map((country) => {
        return {
          label: country.continent.name,
          value: country.continent.name,
        };
      });
      return uniqBy(results, (result) => result.value);
    }
  }, [data]);

  return (
    <div className="container">
      <div className="search">
        <input
          placeholder="Search...
          
          "
          className="input"
          onChange={(ev) => setInputValue(ev.target.value)}
        />
        <Select
          className="select"
          options={continentOptions}
          onChange={(value) => setSelectContinent(value?.value)}
        />
      </div>
      <div className="listOfCountry">
        {loading
          ? "Loading..."
          : countries.map((country) => {
              return (
                <div className="country">
                  <nav>
                    <Link to={`/${country.code.toLocaleLowerCase()}`}>
                      <li key={country.index}>
                        {country.name} {country.code}
                      </li>
                    </Link>
                  </nav>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default CountriesScreen;
