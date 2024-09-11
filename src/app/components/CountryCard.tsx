"use client";

import { Country } from '../interfaces/country';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="font-bold text-xl text-gray-800 dark:text-white">{country.name.common}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Region:</strong> {country.region}</p>
    </div>
  );
};

export default CountryCard;
