import React, {useCallback, useEffect, useState} from "react";
import axios from 'axios';
import {ApiCountryList} from "../../types";

interface Props {
  alpha3Code: string;
}

const CountryList: React.FC<Props> = ({alpha3Code}) => {
  const [countries, setCountries] = useState<null | ApiCountryList[]>([]);

  const fetchCountryList = useCallback(async () => {
    if (alpha3Code !== null) {
      const {data: list} = await axios.get<ApiCountryList[]>('https://restcountries.com/v2/all?fields=alpha3Code,name');

      setCountries(list);
      console.log(list);
    }
  }, [alpha3Code]);

  useEffect(() => {
    void fetchCountryList();
  }, [fetchCountryList]);

  return countries && (
    <div>
      <select className="form-select form-select-lg" aria-label=".form-select-lg example">
        <option>Choose one of the country</option>
        {countries.map((country) => (
          <option key={country.alpha3Code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryList;