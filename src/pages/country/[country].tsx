import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import CountryDetail from '@/app/components/CountryDetail';
import { Country } from '@/app/interfaces/country';

interface CountryPageProps {
  countryData: Country[];
  error?: string;
}


const CountryPage: React.FC<CountryPageProps> = ({ countryData, error }) => {
  const router = useRouter();

  if (error) return <p>{error}</p>;
  if (!countryData) return <p>Country not found.</p>;

  return <CountryDetail country={countryData} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { country } = context.query;

  if (!country) {
    return {
      notFound: true, 
    };
  }

  try {

    const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country as string)}`);
    const data = await response.json();

    if (!data || data.length === 0) {
      return {
        props: {
          error: 'Country not found.',
        },
      };
    }

   
    return {
      props: {
        countryData: data[0],
      },
    };
  } catch (err) {
    return {
      props: {
        error: 'Failed to load country data.',
      },
    };
  }
};

export default CountryPage;
