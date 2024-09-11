import { useState, useEffect } from 'react';
import { Country } from '../interfaces/country';

const useCountries = (countryName: string) => {
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!countryName) return;

    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        if (!response.ok) throw new Error('Failed to fetch country data');
        const data = await response.json();
        setCountry(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryName]);

  return { country, loading, error };
};

export default useCountries;
