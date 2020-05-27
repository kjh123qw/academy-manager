/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSubject = /* GraphQL */ `
  mutation CreateSubject(
    $input: CreateSubjectInput!
    $condition: ModelSubjectConditionInput
  ) {
    createSubject(input: $input, condition: $condition) {
      id
      subject
      tcId
      startApply
      endApply
      startDay
      endDay
      total
      TeacherInfo {
        id
        name
        age
        sbId
        SubjectInfo {
          id
          subject
          tcId
          startApply
          endApply
          startDay
          endDay
          total
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      StudentsInfo {
        items {
          id
          name
          age
          sbId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateSubject = /* GraphQL */ `
  mutation UpdateSubject(
    $input: UpdateSubjectInput!
    $condition: ModelSubjectConditionInput
  ) {
    updateSubject(input: $input, condition: $condition) {
      id
      subject
      tcId
      startApply
      endApply
      startDay
      endDay
      total
      TeacherInfo {
        id
        name
        age
        sbId
        SubjectInfo {
          id
          subject
          tcId
          startApply
          endApply
          startDay
          endDay
          total
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      StudentsInfo {
        items {
          id
          name
          age
          sbId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteSubject = /* GraphQL */ `
  mutation DeleteSubject(
    $input: DeleteSubjectInput!
    $condition: ModelSubjectConditionInput
  ) {
    deleteSubject(input: $input, condition: $condition) {
      id
      subject
      tcId
      startApply
      endApply
      startDay
      endDay
      total
      TeacherInfo {
        id
        name
        age
        sbId
        SubjectInfo {
          id
          subject
          tcId
          startApply
          endApply
          startDay
          endDay
          total
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      StudentsInfo {
        items {
          id
          name
          age
          sbId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $input: CreateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    createStudent(input: $input, condition: $condition) {
      id
      name
      age
      sbId
      SubjectInfo {
        id
        subject
        tcId
        startApply
        endApply
        startDay
        endDay
        total
        TeacherInfo {
          id
          name
          age
          sbId
          createdAt
          updatedAt
        }
        StudentsInfo {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $input: UpdateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    updateStudent(input: $input, condition: $condition) {
      id
      name
      age
      sbId
      SubjectInfo {
        id
        subject
        tcId
        startApply
        endApply
        startDay
        endDay
        total
        TeacherInfo {
          id
          name
          age
          sbId
          createdAt
          updatedAt
        }
        StudentsInfo {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $input: DeleteStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    deleteStudent(input: $input, condition: $condition) {
      id
      name
      age
      sbId
      SubjectInfo {
        id
        subject
        tcId
        startApply
        endApply
        startDay
        endDay
        total
        TeacherInfo {
          id
          name
          age
          sbId
          createdAt
          updatedAt
        }
        StudentsInfo {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createTeacher = /* GraphQL */ `
  mutation CreateTeacher(
    $input: CreateTeacherInput!
    $condition: ModelTeacherConditionInput
  ) {
    createTeacher(input: $input, condition: $condition) {
      id
      name
      age
      sbId
      SubjectInfo {
        id
        subject
        tcId
        startApply
        endApply
        startDay
        endDay
        total
        TeacherInfo {
          id
          name
          age
          sbId
          createdAt
          updatedAt
        }
        StudentsInfo {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateTeacher = /* GraphQL */ `
  mutation UpdateTeacher(
    $input: UpdateTeacherInput!
    $condition: ModelTeacherConditionInput
  ) {
    updateTeacher(input: $input, condition: $condition) {
      id
      name
      age
      sbId
      SubjectInfo {
        id
        subject
        tcId
        startApply
        endApply
        startDay
        endDay
        total
        TeacherInfo {
          id
          name
          age
          sbId
          createdAt
          updatedAt
        }
        StudentsInfo {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteTeacher = /* GraphQL */ `
  mutation DeleteTeacher(
    $input: DeleteTeacherInput!
    $condition: ModelTeacherConditionInput
  ) {
    deleteTeacher(input: $input, condition: $condition) {
      id
      name
      age
      sbId
      SubjectInfo {
        id
        subject
        tcId
        startApply
        endApply
        startDay
        endDay
        total
        TeacherInfo {
          id
          name
          age
          sbId
          createdAt
          updatedAt
        }
        StudentsInfo {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
