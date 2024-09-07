import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

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

    if (!newName || !number) {
      setNotification({
        message: "Both name and number fields must be filled",
        type: "error",
      });
      setTimeout(() => setNotification({ message: "", type: "" }), 3000);
      return;
    }

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
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNotification({
              message: `Updated ${newName}'s number`,
              type: "success",
            });
            setTimeout(() => setNotification({ message: "", type: "" }), 3000);
          })
          .catch((error) => {
            setNotification({
              message: `Information of ${newName} has already been removed from server`,
              type: "error",
            });
            setTimeout(() => setNotification({ message: "", type: "" }), 3000);
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
          });
      }
    } else {
      const newPerson = { name: newName, number };
      personService
        .createObj(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotification({ message: `Added ${newName}`, type: "success" });
          setTimeout(() => setNotification({ message: "", type: "" }), 3000);
        })
        .catch((error) => {
          setNotification({
            message: `Failed to add ${newName}`,
            type: "error",
          });
          setTimeout(() => setNotification({ message: "", type: "" }), 3000);
        });
    }

    setNewName("");
    setNumber("");
  };

  const deletePerson = (id, name) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deleteObj(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({ message: `Deleted ${name}`, type: "success" });
          setTimeout(() => setNotification({ message: "", type: "" }), 3000);
        })
        .catch((error) => {
          setNotification({
            message: `Failed to delete ${name}`,
            type: "error",
          });
          setTimeout(() => setNotification({ message: "", type: "" }), 3000);
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={notification.message} type={notification.type} />

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
