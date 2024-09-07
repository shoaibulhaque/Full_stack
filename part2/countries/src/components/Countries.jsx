export default function Countries({ countries, searchCountry, search }) {
  return (
    <div>
      {search
        ? countries
            .filter((country) => searchCountry(country.name.common))
            .map((country) => {
              return (
                <li key={country.name.common + country.tld}>
                  {country.name.common}
                </li>
              );
            })
        : null}
    </div>
  );
}
