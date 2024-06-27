import React, {useCallback, useEffect, useState} from "react";
import axios from 'axios';

export interface ApiCountryList {
  name: string;
  alpha3Code: string;
}

interface Props {
  onSelect: (alpha3code: string) => void;
}

const CountryList: React.FC<Props> = ({onSelect}) => {
  const [countries, setCountries] = useState<null | ApiCountryList[]>([]);

  const fetchCountryList = useCallback(async () => {
      const {data: list} = await axios.get<ApiCountryList[]>('https://restcountries.com/v2/all?fields=alpha3Code,name');

      setCountries(list);
  }, []);

  useEffect(() => {
    void fetchCountryList();
  }, [fetchCountryList]);

  const selectCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAlpha3Code = e.target.value;
    onSelect(selectedAlpha3Code);
  };

  return countries && (
    <div>
      <select className="form-select form-select-lg" aria-label=".form-select-lg example" onChange={selectCountry}>
        <option value="">Choose one of the countries</option>
        {countries.map((country) => (
          <option key={country.alpha3Code} value={country.alpha3Code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryList;