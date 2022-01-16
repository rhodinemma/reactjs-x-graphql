import { gql } from "@apollo/client";

export const GET_STUDENTS = gql`
  {
    getStudents {
      id
      name
      course
      year
    }
  }
`;

export const GET_STUDENT = gql`
  query getStudent($id: ID) {
    getStudent(id: $id) {
      id
      name
      course
      year
    }
  }
`;
