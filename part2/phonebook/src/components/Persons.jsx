import React from "react";

const Persons = ({ persons, searchPerson, deletePerson }) => {
  return (
    <div>
      {persons
        .filter((person) => searchPerson(person))
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
            <button onClick={deletePerson(person.id, person.name)}>
              Delete
            </button>
          </p>
        ))}
    </div>
  );
};

export default Persons;
