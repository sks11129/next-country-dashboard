import { Country } from '../interfaces/country';

export const sortCountriesByPopulation = (countries: Country[], ascending: boolean) => {
  return [...countries].sort((a, b) => ascending ? a.population - b.population : b.population - a.population);
};

export const filterCountriesByRegion = (countries: Country[], region: string) => {
  return region ? countries.filter(country => country.region === region) : countries;
};

export const searchCountries = (countries: Country[], searchTerm: string) => {
  const term = searchTerm.toLowerCase();
  return countries.filter(country =>
    country.name.common.toLowerCase().includes(term) ||
    (country.capital && country.capital[0].toLowerCase().includes(term))
  );
};
