import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_STUDENT } from "../graphql/Mutation";
import { GET_STUDENTS } from "../graphql/Query";
import { StudentContext } from "../StudentContext";

function Student({ id, name, course, year }) {
  const { selectedId, setSelectedId } = useContext(StudentContext);
  const [deleteStudent] = useMutation(DELETE_STUDENT);
  const removeStudent = (id) => {
    deleteStudent({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: GET_STUDENTS }],
    });
  };
  return (
    <>
      <a
        onClick={() => setSelectedId(id)}
        href="#"
        className="list-group-item list-group-item-action flex-column align-items-start"
      >
        <div className="d-flex w-100 justify-content-between">
          <h4 className="mb-1">{name}</h4>
        </div>
        <p className="mb-1">{course}</p>
        <p className="mb-1">{year}</p>

        <a
          className="btn btn-danger"
          role="button"
          onClick={() => removeStudent(id)}
        >
          Delete
        </a>
      </a>
    </>
  );
}

export default Student;
