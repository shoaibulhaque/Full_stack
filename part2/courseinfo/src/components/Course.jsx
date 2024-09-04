const Header = (props) => {
  return <h1>{props.title}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => {
        return (
          <p key={index}>
            {part.name} : {part.exercises}
          </p>
        );
      })}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0);
  return (
    <p>
      <b>Total of {total} exercises</b>
    </p>
  );
};

export default function Course({ courses }) {
  return courses.map((course, index) => {
    return (
      <div key={index}>
        <Header title={course.name}></Header>
        <Content parts={course.parts}></Content>
        <Total parts={course.parts}></Total>
      </div>
    );
  });
}
