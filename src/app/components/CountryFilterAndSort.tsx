"use client";

import { useState } from "react";
import { Country } from "@/app/interfaces/country";
import Link from "next/link";

interface CountryFilterAndSortProps {
  countries: Country[];
}

const CountryFilterAndSort: React.FC<CountryFilterAndSortProps> = ({
  countries,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortKey, setSortKey] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const filteredCountries = countries.filter((country) => {
    const name = country.name.common.toLowerCase();
    const capital = country.capital?.[0]?.toLowerCase() || "";
    return (
      name.includes(searchTerm.toLowerCase()) ||
      capital.includes(searchTerm.toLowerCase())
    );
  });


  const sortedCountries = filteredCountries.sort((a, b) => {
    let comparison = 0;
    if (sortKey === "name") {
      comparison = a.name.common.localeCompare(b.name.common);
    } else if (sortKey === "population") {
      comparison = a.population - b.population;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded"
          placeholder="Search by country or capital"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex items-center gap-4">
          <select
            className="p-2 border border-gray-300 rounded"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="population">Sort by Population</option>
          </select>

          <select
            className="p-2 border border-gray-300 rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedCountries.map((country) => (
          <Link href={`/country/${country.name.common}`} key={country.name.common} className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold">{country.name.common}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Capital: {country.capital?.[0] || "N/A"}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Population: {country.population.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountryFilterAndSort;
