import React from 'react';
import { Country } from '../interfaces/country';

interface CountryDetailProps {
  country: Country;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ country }) => {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold mb-4">{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital?.[0]}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
      <p><strong>Currencies:</strong> {Object.values(country.currencies || {}).map(currency => currency.name).join(', ')}</p>
      <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
      <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
      <p><strong>Flag:</strong> <span className="text-4xl">{country.flag}</span></p>
    </div>
  );
};

export default CountryDetail;
