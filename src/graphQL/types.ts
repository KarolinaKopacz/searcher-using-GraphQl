export type Country = {
  name: string;
  code: string;
  index: string;
  emoji: string;
  languages: {
    name: string;
  }[];
  continent: {
    name: string;
  };
};

export type CountriesResponse = {
  countries: Country[];
};

export type CountryResponse = {
  country: Country;
};
