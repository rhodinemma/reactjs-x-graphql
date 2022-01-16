import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_STUDENT, UPDATE_STUDENT } from "../graphql/Mutation";
import { GET_STUDENT, GET_STUDENTS } from "../graphql/Query";
import { StudentContext } from "../StudentContext";

function AddStudents() {
  const [student, setStudent] = useState({
    name: "",
    course: "",
    year: "",
  });
  const { selectedId, setSelectedId } = useContext(StudentContext);
  const [updateStudent] = useMutation(UPDATE_STUDENT);
  const { data } = useQuery(GET_STUDENT, {
    variables: { id: selectedId },
    onCompleted: (data) => setStudent(data?.getStudent),
  });
  console.log(data?.getStudent);

  const [addStudent] = useMutation(ADD_STUDENT);
  const onSubmit = (e) => {
    if (student.name === "") {
      alert("Please enter a name");
      return;
    }
    e.preventDefault();
    if (selectedId === 0) {
      addStudent({
        variables: {
          name: student.name,
          course: student.course,
          year: student.year,
        },
        refetchQueries: [{ query: GET_STUDENTS }],
      });
    } else {
      updateStudent({
        variables: {
          id: selectedId,
          name: student.name,
          course: student.course,
          year: student.year,
        },
        refetchQueries: [{ query: GET_STUDENTS }],
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label">Your Name</label>
        {/*<pre>{JSON.stringify(todo, null, '\t')}</pre>*/}
        <input
          type="text"
          className="form-control"
          placeholder="Enter name here"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Your Course</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter course here"
          value={student.course}
          onChange={(e) => setStudent({ ...student, course: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Year of study</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter year here"
          value={student.year}
          onChange={(e) => setStudent({ ...student, year: e.target.value })}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {selectedId === 0 ? "Add Student" : "Update Student"}
      </button>
    </form>
  );
}

export default AddStudents;
