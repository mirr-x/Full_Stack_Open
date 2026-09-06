const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ name, exercises }) => (
    <p>
        {name} {exercises}
    </p>
);

const Content = ({ parts }) => (
    <div>
        {parts.map((part) => (
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
    </div>
);

const Course = ({ course }) => {
    const totalExercises = course.parts.reduce(
        (sum, part) => sum + part.exercises,
        0,
    );

    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <p>Number of exercises {totalExercises}</p>
        </div>
    );
};

export default Course;
