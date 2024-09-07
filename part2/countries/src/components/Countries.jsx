import { useEffect, useState } from "react";
import CountryDetails from "./CountryDetails";

export default function Countries({ countries, searchCountry, search }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const filteredCountries = countries.filter((country) =>
    searchCountry(country.name.common)
  );

  useEffect(() => {
    setSelectedCountry(null);
  }, [search]);

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (selectedCountry) {
    return <CountryDetails country={selectedCountry} />;
  }

  return (
    <div>
      {filteredCountries.map((country) => (
        <li key={country.name.common + country.tld}>
          {country.name.common}
          <button onClick={() => setSelectedCountry(country)}>Show</button>
        </li>
      ))}
    </div>
  );
}
