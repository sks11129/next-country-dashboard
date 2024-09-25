"use client";

import { useRouter } from "next/router";
import CountryDetail from "@/app/components/CountryDetail";
import useCountries from "@/app/hooks/useCountries";

const CountryPage = () => {
  const router = useRouter();
  const { country } = router.query; 

  const { country: countryData, loading, error } = useCountries(country as string);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!countryData) return <p>Country not found.</p>;

  return <CountryDetail country={countryData} />;
};

export default CountryPage;
