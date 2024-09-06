import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

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
      setPersons([...persons, { name: newName, number }]);
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
