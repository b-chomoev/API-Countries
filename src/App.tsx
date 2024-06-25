import CountryList from "./components/CountryList/CountryList";
import CountryDetails from "./components/CountryDetails/CountryDetails";

const App = () => {
  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-3">
            <CountryList/>
          </div>
          <div className="col-9 justify-content-center">
            <CountryDetails/>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
