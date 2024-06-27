import React, {useEffect, useState} from "react";
import './CountryDetails.css';
import axios from "axios";
import {Country} from "../../types";

interface CountryDetailsProps {
  alpha3Code: string;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({alpha3Code}) => {
  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      const {data} = await axios.get<Country>(`https://restcountries.com/v2/alpha/${alpha3Code}`);

      setCountry(data);
      if (data.borders !== null) {
        const borderResponses = await Promise.all(
          data.borders.map((borderCode: string) => axios.get<{
            name: string
          }>(`https://restcountries.com/v2/alpha/${borderCode}`))
        );
        const borderNames = borderResponses.map(response => response.data.name);
        setBorderCountries(borderNames);
      }
    };

      void fetchCountryDetails();
  }, [alpha3Code]);

  return (
    <>
      {country && (
        <div>
          <div className="d-flex justify-content-between">
            <div>
              <h1>{country.name}</h1>
              <p>Capital: {country.capital}</p>
              <p>Region: {country.region}</p>
              <p>Population: {country.population}</p>
            </div>
            <div className='pe-5'>
              <img src={country.flag} alt="" className="countryFlag rounded"/>
            </div>
          </div>
          {borderCountries && (
            <div>
              <h3>Bordering Countries:</h3>
              <ul>
                {borderCountries.map((borderCountry, index) => (
                  <li key={index}>{borderCountry}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CountryDetails;
