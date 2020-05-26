/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSubject = /* GraphQL */ `
  query GetSubject($Id: ID!) {
    getSubject(Id: $Id) {
      Id
      Subject
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
      }
      nextToken
    }
  }
`;
export const getAcademyDb = /* GraphQL */ `
  query GetAcademyDb($Id: String!) {
    getAcademyDB(Id: $Id) {
      Id
      Subject
    }
  }
`;
export const listAcademyDbs = /* GraphQL */ `
  query ListAcademyDbs(
    $filter: TableAcademyDBFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAcademyDBS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        Id
        Subject
      }
      nextToken
    }
  }
`;
