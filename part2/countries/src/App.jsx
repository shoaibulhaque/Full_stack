import { useEffect, useState } from "react";
import countryService from "./services/countries";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import "./index.css";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then((data) => setCountries(data));
  }, []);

  const searchCountry = (country) => {
    if (search.length > 0) {
      const word = country.substring(0, search.length);
      return word === search;
    } else {
      return country.includes(search);
    }
  };

  return (
    <div>
      <Filter search={search} setSearch={setSearch} />
      <Countries
        countries={countries}
        searchCountry={searchCountry}
        search={search}
      />
    </div>
  );
}

export default App;
