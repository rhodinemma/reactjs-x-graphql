import { gql } from "@apollo/client";

export const ADD_STUDENT = gql`
  mutation addStudent($name: String, $course: String, $year: String) {
    addStudent(name: $name, course: $course, year: $year) {
      id
      name
      course
      year
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation updateStudent(
    $id: ID
    $name: String
    $course: String
    $year: String
  ) {
    updateStudent(id: $id, name: $name, course: $course, year: $year) {
      id
      name
      course
      year
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation deleteStudent($id: ID) {
    deleteStudent(id: $id)
  }
`;
