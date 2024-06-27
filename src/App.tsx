import CountryList from "./components/CountryList/CountryList";
import CountryDetails from "./components/CountryDetails/CountryDetails";
import {useState} from "react";

const App = () => {
  const [country, setCountry] = useState<string | null>(null);

  const selectCountry = (alpha3code: string) => {
    setCountry(alpha3code);
  };

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-3">
            <CountryList onSelect={selectCountry}/>
          </div>
          <div className="col-9 justify-content-center">
            {country && <CountryDetails alpha3Code={country}/>}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
