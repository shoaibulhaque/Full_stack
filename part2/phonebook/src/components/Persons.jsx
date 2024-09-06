import React from "react";

const Persons = ({ persons, searchPerson }) => {
  return (
    <div>
      {persons
        .filter((person) => searchPerson(person))
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
    </div>
  );
};

export default Persons;
