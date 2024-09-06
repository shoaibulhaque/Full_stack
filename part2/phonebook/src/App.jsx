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
    let word = "";
    if (search.length > 0) {
      for (let i = 0; i < search.length; i++) {
        word += person.name[i];
      }
      return word === search;
    } else {
      return person.name.includes(search);
    }
  };

  const addPerson = (e) => {
    e.preventDefault();
    const isDuplicate = persons.some((person) => person.name === newName);

    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number };
      personService.createObj(newPerson).then((newPerson) => {
        setPersons([...persons, newPerson]);
      });
    }

    setNewName("");
    setNumber("");
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
      <Persons persons={persons} searchPerson={searchPerson} />
    </div>
  );
};

export default App;
