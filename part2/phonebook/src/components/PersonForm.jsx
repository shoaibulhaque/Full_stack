const PersonForm = ({ addPerson, newName, setNewName, number, setNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input onChange={(e) => setNewName(e.target.value)} value={newName} />
      </div>
      <div>
        number:
        <input onChange={(e) => setNumber(e.target.value)} value={number} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
