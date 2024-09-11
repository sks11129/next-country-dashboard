import { useState, useEffect } from 'react';
import axios from 'axios';
import { Country } from '../interfaces/country';

const useCountries = (countryName?: string) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        if (countryName) {
          const response = await axios.get<Country[]>(
            `https://restcountries.com/v3.1/name/${countryName}`
          );
          setCountry(response.data[0]);
        } else {

          const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');
          setCountries(response.data);
        }
      } catch (err) {
        setError('Failed to fetch countries');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [countryName]);


  return { countries, country, loading, error };
};

export default useCountries;



// Added for the  client Side Rendering if used