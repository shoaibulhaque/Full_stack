const Header = (Props) => {
  return (
    <div>
      <h1>{Props.course.name}</h1>
    </div>
  );
};

const Part = (Props) => {
  return (
    <div>
      <p>
        {Props.parts.name} - {Props.parts.exercises}
      </p>
    </div>
  );
};

const Content = (Props) => {
  return (
    <div>
      <Part parts={Props.course.parts[0]} />
      <Part parts={Props.course.parts[1]} />
      <Part parts={Props.course.parts[2]} />
    </div>
  );
};

const Total = (Props) => {
  return (
    <p>
      Number of exercises -{" "}
      {Props.course.parts[0].exercises +
        Props.course.parts[1].exercises +
        Props.course.parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
