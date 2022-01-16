import "./App.css";
import { GET_STUDENTS } from "./graphql/Query";
import { useQuery } from "@apollo/client";
import AddStudents from "./components/AddStudents";
import Student from "./components/Student";
import { useState } from "react";
import { StudentContext } from "./StudentContext";

function App() {
  const [selectedId, setSelectedId] = useState(0);
  const { loading, error, data } = useQuery(GET_STUDENTS);
  if (loading) return <p>Fetching Students...</p>;
  if (error) return <p>{error.mesage}</p>;
  console.log(data);

  return (
    <>
      <StudentContext.Provider value={{ selectedId, setSelectedId }}>
        <div className="container mt-5 mx-auto">
          <AddStudents />

          <div className="list-group mt-5 mx-auto">
            {data?.getStudents.map((student) => (
              <Student
                key={student.id}
                id={student.id}
                name={student.name}
                course={student.course}
                year={student.year}
              />
            ))}
          </div>
        </div>
      </StudentContext.Provider>
    </>
  );
}

export default App;
