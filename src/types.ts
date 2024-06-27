export interface ApiCountryList {
  name: string;
  alpha3Code: string;
}

export interface Country {
  name: string;
  capital: string;
  region: string;
  population: number;
  borders: string[];
  flag: string;
}