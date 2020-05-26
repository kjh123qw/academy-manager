/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSubject = /* GraphQL */ `
  query GetSubject($id: ID!) {
    getSubject(id: $id) {
      Id
      Subject
      createdAt
      updatedAt
    }
  }
`;
export const listSubjects = /* GraphQL */ `
  query ListSubjects(
    $filter: ModelSubjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        Id
        Subject
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAcademyDb = /* GraphQL */ `
  query GetAcademyDb($id: ID!) {
    getAcademyDB(id: $id) {
      Id
      Subject
      createdAt
      updatedAt
    }
  }
`;
export const listAcademyDBs = /* GraphQL */ `
  query ListAcademyDBs(
    $filter: ModelAcademyDBFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAcademyDBs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        Id
        Subject
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
