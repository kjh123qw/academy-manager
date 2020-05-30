/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSubject = /* GraphQL */ `
  query GetSubject($id: ID!) {
    getSubject(id: $id) {
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
export const listSubjects = /* GraphQL */ `
  query ListSubjects(
    $id: ID
    $filter: ModelSubjectFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSubjects(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
          items {
            id
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
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
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $id: ID
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStudents(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
          TeacherInfo {
            id
            name
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTeacher = /* GraphQL */ `
  query GetTeacher($id: ID!) {
    getTeacher(id: $id) {
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
export const listTeachers = /* GraphQL */ `
  query ListTeachers(
    $id: ID
    $filter: ModelTeacherFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTeachers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
          StudentsInfo {
            items {
              id
            }
            nextToken
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
