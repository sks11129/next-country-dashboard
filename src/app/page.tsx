import Head from 'next/head';
import { Country } from '@/app/interfaces/country';
import CountryFilterAndSort from './components/CountryFilterAndSort';
import { Suspense } from 'react';

const fetchCountries = async () => {
  const res = await fetch('https://restcountries.com/v3.1/all');
  
  if (!res.ok) {
    throw new Error('Failed to fetch countries');
  }

  return res.json();
};

const Home = async () => {
  let countries: Country[] = [];
  let error: string | null = null;

  try {
    countries = await fetchCountries();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Something went wrong';
  }

  return (
    <>
      <Head>
        <title>Country List</title>
        <meta name="description" content="A comprehensive list of countries with filtering and sorting options." />
      </Head>
      <div className="container mx-auto px-4 py-8">
        {error && <p className="text-red-500">{error}</p>}
        <Suspense fallback={<div>Loading...</div>}>
          {!error && <CountryFilterAndSort countries={countries} />}
        </Suspense>
      </div>
    </>
  );
};

export default Home;
