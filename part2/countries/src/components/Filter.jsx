export default function Filter({ search, setSearch }) {
  return (
    <div className="input">
      <label>Find countries</label>
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></input>
    </div>
  );
}
