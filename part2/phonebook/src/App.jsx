import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const searchPerson = (person) => {
    if (search.length > 0) {
      const word = person.name.substring(0, search.length);
      return word === search;
    } else {
      return person.name.includes(search);
    }
  };

  const addPerson = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number };
        personService
          .updateObj(updatedPerson, existingPerson.id)
          .then((updatedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            );
            setPersons(updatedPersons);
          });
      }
    } else {
      const newPerson = { name: newName, number };
      personService.createObj(newPerson).then((newPerson) => {
        setPersons([...persons, newPerson]);
      });
    }

    setNewName("");
    setNumber("");
  };

  const deletePerson = (id, personName) => {
    const handleDelete = () => {
      if (window.confirm(`Delete ${personName}?`)) {
        personService.deleteObj(id).then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        });
      }
    };
    return handleDelete;
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter search={search} setSearch={setSearch} />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        number={number}
        setNumber={setNumber}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        searchPerson={searchPerson}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
