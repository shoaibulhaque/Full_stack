const Header = (Props) => {
  return (
    <div>
      <h1>{Props.course}</h1>
    </div>
  );
};

const Part = (Props) => {
  return (
    <div>
      <p>
        {Props.parts} -{Props.exercises}
      </p>
    </div>
  );
};

const Content = (Props) => {
  return (
    <div>
      <Part parts={Props.parts[0]} exercises={Props.exercises[0]} />
      <Part parts={Props.parts[1]} exercises={Props.exercises[1]} />
      <Part parts={Props.parts[2]} exercises={Props.exercises[2]} />
    </div>
  );
};

const Total = (Props) => {
  return (
    <p>
      Number of exercises -{" "}
      {Props.exercises[0] + Props.exercises[1] + Props.exercises[2]}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    "Fundamentals of React",
    "Using props to pass data",
    "State of a component",
  ];

  const exercises = [10, 7, 14];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  );
};

export default App;
