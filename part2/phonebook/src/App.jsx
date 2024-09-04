import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState();

  function addPerson() {
    let isDuplicate = false;

    const newPersons = persons.map((person) =>
      person.name === newName
        ? (isDuplicate = true) &&
          alert(`${newName} is already added to phonebook`)
        : person
    );

    !isDuplicate &&
      setPersons([...newPersons, { name: newName, number: number }]);
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with: <input />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPerson();
        }}
      >
        <h1>Add a new</h1>
        <div>
          name:
          <input
            onChange={(e) => {
              setNewName(e.target.value);
            }}
            value={newName}
          />
        </div>
        <div>
          number:
          <input
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
