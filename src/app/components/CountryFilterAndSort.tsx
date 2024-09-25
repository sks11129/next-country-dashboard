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
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  const getRegions = () => {
    const regions = new Set<string>(["All"]);
    countries.forEach(
      (country) => country.region && regions.add(country.region)
    );
    return Array.from(regions);
  };

  const filteredCountries = countries.filter((country) => {
    const name = country.name.common.toLowerCase();
    const capital = country.capital?.[0]?.toLowerCase() || "";
    const isRegionMatch =
      selectedRegion === "All" || country.region === selectedRegion;

    return (
      (name.includes(searchTerm.toLowerCase()) ||
        capital.includes(searchTerm.toLowerCase())) &&
      isRegionMatch
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
        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          {getRegions().map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {sortedCountries.map((country) => (
          <Link
            href={`/country/${country.name.common}`}
            key={country.name.common}
            className="block max-w-xs w-full mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="w-full h-32 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-4">{country.name.common}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Capital: {country.capital?.[0] || "N/A"}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Population: {country.population.toLocaleString()}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Region: {country.region}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountryFilterAndSort;
