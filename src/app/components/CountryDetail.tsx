import React from 'react';
import { Country } from '../interfaces/country';

interface CountryDetailProps {
  country: Country;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ country }) => {
 
  const numberFormatter = new Intl.NumberFormat('en-US'); 

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold mb-4">{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
      <p><strong>Population:</strong> {numberFormatter.format(country.population)}</p>
      <p><strong>Region:</strong> {country.region || 'N/A'}</p>
      <p><strong>Area:</strong> {numberFormatter.format(country.area)} km²</p>
      <p><strong>Currencies:</strong> {Object.values(country.currencies || {}).map(currency => currency.name).join(', ') || 'N/A'}</p>
      <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
      <p><strong>Timezones:</strong> {country.timezones.join(', ') || 'N/A'}</p>
      <p><strong>Flag:</strong> <span className="text-4xl">{country.flag || 'N/A'}</span></p>
    </div>
  );
};

export default CountryDetail;
