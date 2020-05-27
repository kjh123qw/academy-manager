/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSubject = /* GraphQL */ `
  subscription OnCreateSubject {
    onCreateSubject {
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
export const onUpdateSubject = /* GraphQL */ `
  subscription OnUpdateSubject {
    onUpdateSubject {
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
export const onDeleteSubject = /* GraphQL */ `
  subscription OnDeleteSubject {
    onDeleteSubject {
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
export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent {
    onCreateStudent {
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
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent {
    onUpdateStudent {
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
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent {
    onDeleteStudent {
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
export const onCreateTeacher = /* GraphQL */ `
  subscription OnCreateTeacher {
    onCreateTeacher {
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
export const onUpdateTeacher = /* GraphQL */ `
  subscription OnUpdateTeacher {
    onUpdateTeacher {
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
export const onDeleteTeacher = /* GraphQL */ `
  subscription OnDeleteTeacher {
    onDeleteTeacher {
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
