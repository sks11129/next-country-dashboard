import { Country } from '@/app/interfaces/country';
import CountryFilterAndSort from './components/CountryFilterAndSort';

const Home = async () => {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const countries: Country[] = await res.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <CountryFilterAndSort countries={countries} />
    </div>
  );
};

export default Home;
