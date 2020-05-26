/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSubject = /* GraphQL */ `
  mutation CreateSubject(
    $input: CreateSubjectInput!
    $condition: ModelSubjectConditionInput
  ) {
    createSubject(input: $input, condition: $condition) {
      Id
      Subject
    }
  }
`;
export const updateSubject = /* GraphQL */ `
  mutation UpdateSubject(
    $input: UpdateSubjectInput!
    $condition: ModelSubjectConditionInput
  ) {
    updateSubject(input: $input, condition: $condition) {
      Id
      Subject
    }
  }
`;
export const deleteSubject = /* GraphQL */ `
  mutation DeleteSubject(
    $input: DeleteSubjectInput!
    $condition: ModelSubjectConditionInput
  ) {
    deleteSubject(input: $input, condition: $condition) {
      Id
      Subject
    }
  }
`;
export const createAcademyDb = /* GraphQL */ `
  mutation CreateAcademyDb($input: CreateAcademyDBInput!) {
    createAcademyDB(input: $input) {
      Id
      Subject
    }
  }
`;
export const updateAcademyDb = /* GraphQL */ `
  mutation UpdateAcademyDb($input: UpdateAcademyDBInput!) {
    updateAcademyDB(input: $input) {
      Id
      Subject
    }
  }
`;
export const deleteAcademyDb = /* GraphQL */ `
  mutation DeleteAcademyDb($input: DeleteAcademyDBInput!) {
    deleteAcademyDB(input: $input) {
      Id
      Subject
    }
  }
`;
