import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { v4 as uuidv4 } from "uuid";
import { listStudents, listSubjects } from "../graphql/queries";
import {
  updateStudent,
  createStudent,
  deleteStudent,
} from "../graphql/mutations";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";

import sortStarted from "../sortStarted";
import sortSbId from "../sortSbId";
import filterApply from "../filterApply";
import sortDate from "../sortDate";
import sortCreatedAt from "../sortCreatedAt";
import blankImage from "../images/blank-profile.png";
import "./Students.css";
import "./Subjects.css";

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectSelect, setSubjectSelect] = useState(false);
  const [inpuVisible, setInpuVisible] = useState(false);
  const [originalSubject, setOriginalSubject] = useState();
  const [newStudentId, setNewStudentId] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentAge, setNewStudentAge] = useState("");
  const [newStudentSbId, setNewStudentSbId] = useState(0);
  const [validationMessage, setValidationMessage] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [filterNoitem, setFilterNoitem] = useState(true);
  const [modifyItem, setModifyItem] = useState(false);
  let date = new Date();
  let year = date.getFullYear();
  let month =
    1 + date.getMonth() >= 10
      ? 1 + date.getMonth()
      : "0" + (1 + date.getMonth());
  let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
  const newDate = Number(year + "" + month + "" + day);

  const [doUpdateStudent] = useMutation(gql(updateStudent));
  const [
    doCreateStudent,
    { loading: createStudentLoading, error: createStudentError },
  ] = useMutation(gql(createStudent));
  const [
    doDeleteStudent,
    { loading: deleteStudentLoading, error: deleteStudentError },
  ] = useMutation(gql(deleteStudent));
  const {
    loading: stuLoading,
    error: stuError,
    data: students,
    refetch: stdRefetch,
    networkStatus: stdNetworkStatus,
  } = useQuery(gql(listStudents), {
    notifyOnNetworkStatusChange: true,
  });
  const {
    loading: sbjLoading,
    error: sbjError,
    data: subjects,
    refetch: sbjRefetch,
    networkStatus: sbjNetworkStatus,
  } = useQuery(gql(listSubjects), {
    notifyOnNetworkStatusChange: true,
  });
  if (sbjNetworkStatus === 4)
    return (
      <div className="loading-layer">
        <div>Refetching...</div>
      </div>
    );
  if (stuLoading || sbjLoading || createStudentLoading || deleteStudentLoading)
    return (
      <div className="loading-layer">
        <div>Loading...</div>
      </div>
    );
  if (stuError || sbjError) return <div>Error!</div>;
  const studentSelectHandler = (student, e) => {
    e.preventDefault();
    setNewStudentAge("");
    setNewStudentName("");
    setNewStudentSbId("0");
    setInpuVisible(false);
    setValidationMessage(null);
    setSelectedStudent(student);
    setSelectedSubject(student.SubjectInfo);
    setOriginalSubject(student.SubjectInfo);
  };
  const closeChangeSubjectHandler = (e) => {
    e.preventDefault();
    setSelectedStudent(null);
    setSubjectSelect(false);
  };
  const openChangeSubjectHandler = (e) => {
    e.preventDefault();
    setSubjectSelect(true);
  };
  const closeSelectedItem = (e) => {
    e.preventDefault();
    setSelectedStudent(null);
    setSubjectSelect(false);
  };
  const subjectSelectHandler = (subject, e) => {
    e.preventDefault();
    setSelectedSubject(subject);
  };
  const saveSubjectHandler = async (e) => {
    e.preventDefault();
    setSubjectSelect(false);
    if (selectedStudent.id !== null && selectedSubject.id !== null) {
      await doUpdateStudent({
        variables: {
          input: { id: selectedStudent.id, sbId: selectedSubject.id },
        },
      }).then(async (updatedata) => {
        setSelectedStudent(updatedata.data.updateStudent);
        await sbjRefetch().then(() => {
          setSubjectSelect(false);
        });
      });
    }
  };
  const studentInfo = () => {
    if (!subjectSelect) {
      return (
        <div className="selected-item-info">
          <div className="selected-item-type">STUDENT</div>
          <div className="selected-item-photo">
            <img src={blankImage} alt="profile photo" />
          </div>
          <div className="selected-item-key">Name</div>
          <div className="selected-item-value">{selectedStudent.name}</div>
          <div className="selected-item-key">Age</div>
          <div className="selected-item-value">{selectedStudent.age}</div>
          <div className="selected-item-key">Date</div>
          <div className="selected-item-value">
            {String(selectedStudent.createdAt).substr(0, 4) +
              "/" +
              String(selectedStudent.createdAt).substr(5, 2) +
              "/" +
              String(selectedStudent.createdAt).substr(8, 2)}
          </div>
          <div className="modify-delete-btn">
            <div
              className="selected-item-modify"
              onClick={async () => {
                if (window.confirm("Are you sure to modify?")) {
                  setNewStudentId(selectedStudent.id);
                  setNewStudentName(selectedStudent.name);
                  setNewStudentAge(selectedStudent.age);
                  setNewStudentSbId(selectedStudent.sbId);
                  setSelectedStudent(null);
                  setModifyItem(true);
                  setInpuVisible(true);
                }
              }}
            >
              <AiOutlineEdit />
            </div>
            <div
              className="selected-item-delete"
              onClick={async () => {
                if (window.confirm("Are you sure to delete?")) {
                  await doDeleteStudent({
                    variables: {
                      input: { id: selectedStudent.id },
                    },
                  }).then(async () => {
                    await sbjRefetch().then(async () => {
                      await stdRefetch().then(() => {
                        setSelectedStudent(null);
                      });
                    });
                  });
                }
              }}
            >
              <AiFillDelete />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="selected-item-info">
          <div className="selected-item-type">STUDENT</div>
          <div className="selected-item-key">Name</div>
          <div className="selected-item-value">{selectedStudent.name}</div>
        </div>
      );
    }
  };
  const changeBtn = () => {
    if (subjectSelect) {
      return (
        <div className="selected-item-btns">
          <div className="btn-change-subject-save" onClick={saveSubjectHandler}>
            SAVE
          </div>
          <div
            className="btn-change-subject-cancel"
            onClick={closeChangeSubjectHandler}
          >
            CANCEL
          </div>
        </div>
      );
    } else {
      if (selectedSubject.id === "0") {
        return (
          <div className="selected-item-btns">
            <div
              className="btn-change-subject"
              onClick={openChangeSubjectHandler}
            >
              SELECT
            </div>
            <div
              className="btn-close-selected-item"
              onClick={closeSelectedItem}
            >
              CLOSE
            </div>
          </div>
        );
      } else {
        return (
          <div className="selected-item-btns">
            <div
              className="btn-change-subject"
              onClick={openChangeSubjectHandler}
            >
              CHANGE
            </div>
            <div
              className="btn-close-selected-item"
              onClick={closeSelectedItem}
            >
              CLOSE
            </div>
          </div>
        );
      }
    }
  };
  const subjectInfo = () => {
    if (selectedSubject.id === "0") {
      return (
        <div className="selected-item-subject">
          <div className="selected-item-subject-title">SELECTED SUBJECT</div>
          <div className="selected-item-subject-key">Subject</div>
          <div className="selected-item-subject-value">
            {selectedSubject.subject}
          </div>
          <div className="selected-item-subject-key">Teacher</div>
          <div className="selected-item-subject-value">-</div>
          <div className="selected-item-subject-key">Start</div>
          <div className="selected-item-subject-value">-</div>
          <div className="selected-item-subject-key">End</div>
          <div className="selected-item-subject-value">-</div>
        </div>
      );
    } else {
      return (
        <div className="selected-item-subject">
          <div className="selected-item-subject-title">SELECTED SUBJECT</div>
          <div className="selected-item-subject-key">Subject</div>
          <div className="selected-item-subject-value">
            {selectedSubject.subject}
          </div>
          <div className="selected-item-subject-key">Teacher</div>
          <div className="selected-item-subject-value">
            {selectedSubject.TeacherInfo.name}
          </div>
          <div className="selected-item-subject-key">Start</div>
          <div className="selected-item-subject-value">
            {String(selectedSubject.startDay).substr(0, 4) +
              "/" +
              String(selectedSubject.startDay).substr(4, 2) +
              "/" +
              String(selectedSubject.startDay).substr(6, 2)}
          </div>
          <div className="selected-item-subject-key">End</div>
          <div className="selected-item-subject-value">
            {String(selectedSubject.endDay).substr(0, 4) +
              "/" +
              String(selectedSubject.endDay).substr(4, 2) +
              "/" +
              String(selectedSubject.endDay).substr(6, 2)}
          </div>
        </div>
      );
    }
  };
  const onChangeNameHandler = (e) => {
    e.preventDefault();
    if (e.target.value.length <= 10) setNewStudentName(e.target.value);
  };
  const onChangeAgeHandler = (e) => {
    e.preventDefault();
    if (isNaN(e.target.value - 1)) return;
    if (e.target.value < 80) setNewStudentAge(e.target.value);
  };
  const onChangeSubjectHandler = (e) => {
    e.preventDefault();
    setNewStudentSbId(e.target.value);
  };
  const onChangeKeywordHandler = (e) => {
    e.preventDefault();
    setFilterKeyword(e.target.value);
  };
  const onClickNoitemHandler = (e) => {
    e.preventDefault();
    setFilterNoitem(!filterNoitem);
  };
  const selectedItem = () => {
    if (selectedStudent !== null && selectedSubject !== null) {
      return (
        <div className="selected-item">
          {studentInfo()}
          {subjectInfo()}
          {changeBtn()}
        </div>
      );
    } else if (inpuVisible) {
      return (
        <div className="add-form">
          <div className="add-form-title">
            {(modifyItem && "Modify") || "Register"} a student
          </div>
          <div className="add-form-label">Name</div>
          <div className="add-form-input">
            <input
              type="text"
              id="studentName"
              value={newStudentName}
              placeholder="Name"
              onChange={onChangeNameHandler}
            />
          </div>
          <div className="add-form-label">Age</div>
          <div className="add-form-input">
            <input
              type="text"
              name="studentAge"
              value={newStudentAge}
              placeholder="Age"
              onChange={onChangeAgeHandler}
            />
          </div>
          <div className="add-form-label">Subject</div>
          <div className="add-form-input">
            <select onChange={onChangeSubjectHandler} value={newStudentSbId}>
              <option value="0">NONE</option>
              {[]
                .concat(subjects.listSubjects.items)
                .sort(sortDate("endApply"))
                .filter((obj) => {
                  return obj.id !== "0";
                })
                .filter((obj) => {
                  return obj.tcId !== "0";
                })
                .filter((obj) => {
                  return obj.total > obj.StudentsInfo.items.length;
                })
                .filter(filterApply())
                .map((subject, index) => {
                  return (
                    <option key={index} value={subject.id}>
                      {subject.subject}
                    </option>
                  );
                })}
            </select>
          </div>
          {validationMessage !== null && (
            <div className="validation-message">{validationMessage}</div>
          )}
          <div className="add-form-btns">
            <button
              className="add-form-confirm"
              onClick={async (e) => {
                e.preventDefault();
                if (String(newStudentName).length < 3) {
                  setValidationMessage("Name is minimum 3 letters.");
                  return;
                }
                if (newStudentAge < 15) {
                  setValidationMessage("Age is minimum 15.");
                  return;
                }
                setValidationMessage(null);
                if (modifyItem) {
                  const inputStudent = {
                    id: newStudentId,
                    name: newStudentName,
                    age: newStudentAge,
                    sbId: newStudentSbId,
                  };
                  await doUpdateStudent({
                    variables: {
                      input: inputStudent,
                    },
                  }).then(async () => {
                    await sbjRefetch().then(async () => {
                      await stdRefetch().then(() => {
                        setNewStudentAge("");
                        setNewStudentName("");
                        setNewStudentSbId("0");
                        setInpuVisible(false);
                      });
                    });
                  });
                } else {
                  const inputStudent = {
                    id: uuidv4(),
                    name: newStudentName,
                    age: newStudentAge,
                    sbId: newStudentSbId,
                  };
                  await doCreateStudent({
                    variables: {
                      input: inputStudent,
                    },
                  }).then(async () => {
                    await sbjRefetch().then(async () => {
                      await stdRefetch().then(() => {
                        setNewStudentAge("");
                        setNewStudentName("");
                        setNewStudentSbId("0");
                        setInpuVisible(false);
                      });
                    });
                  });
                }
              }}
            >
              CONFIRM
            </button>
            <button
              className="add-form-cancel"
              onClick={() => {
                setNewStudentAge("");
                setNewStudentName("");
                setNewStudentSbId("0");
                setValidationMessage(null);
                setInpuVisible(false);
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      );
    }
  };
  const topFilter = () => {
    return (
      <div className="add-btn-wrap">
        <div className="top-info">
          Student List :{" "}
          {
            []
              .concat(students.listStudents.items)
              .sort(sortCreatedAt("updatedAt", "desc"))
              .sort(sortStarted())
              .sort(sortSbId("sbId"))
              .filter((obj) => {
                if (filterNoitem) return true;
                return obj.sbId !== "0";
              })
              .filter((obj) => {
                if (filterKeyword === "") return true;
                for (
                  var i = 0;
                  i < obj.name.length - filterKeyword.length + 1;
                  i++
                ) {
                  if (
                    String(obj.name)
                      .substr(i, filterKeyword.length)
                      .toUpperCase() === filterKeyword.toUpperCase()
                  )
                    return true;
                }
                for (
                  var j = 0;
                  j < obj.SubjectInfo.subject.length - filterKeyword.length + 1;
                  j++
                ) {
                  if (
                    String(obj.SubjectInfo.subject)
                      .substr(j, filterKeyword.length)
                      .toUpperCase() === filterKeyword.toUpperCase()
                  )
                    return true;
                }
                return false;
              }).length
          }
        </div>
        <input
          type="text"
          className="filter-keyword-input"
          onChange={onChangeKeywordHandler}
          value={filterKeyword}
        />
        <div
          className={"filter-noitem" + ((filterNoitem && "-selected") || "")}
          onClick={onClickNoitemHandler}
        >
          <div className="custom-label">No subject</div>
        </div>
        <div
          className="add-btn"
          onClick={() => {
            setInpuVisible(true);
            setSelectedStudent(null);
          }}
        >
          Register
        </div>
      </div>
    );
  };
  const itemList = () => {
    var itemClassName = "item-student";
    var subjectClassName = "item-subject";
    if (subjectSelect) {
      return (
        <div className="list-subject-wrap">
          <div className="list-msg">Please select a subject.</div>
          {[]
            .concat(subjects.listSubjects.items)
            .sort(sortDate("endApply"))
            .filter(function (obj) {
              return obj.tcId !== "0";
            })
            .filter(function (obj) {
              return obj.total > obj.StudentsInfo.items.length;
            })
            .filter(filterApply())
            .map(function (subject, index) {
              if (selectedSubject !== null) {
                if (selectedSubject.id === subject.id) {
                  subjectClassName = "item-subject-selected";
                } else {
                  subjectClassName = "item-subject";
                }
              }
              return (
                <div
                  key={subject.id}
                  className={
                    subjectClassName +
                    ((originalSubject.id === subject.id &&
                      " before-selected-subject") ||
                      "")
                  }
                  onClick={subjectSelectHandler.bind(this, subject)}
                >
                  <div className="subject-type">
                    SUBJECT [ {subject.StudentsInfo.items.length} /{" "}
                    {subject.total} ]
                    <span className="subject-apply-text">
                      {" " +
                        String(subject.startApply).substr(2, 2) +
                        "/" +
                        String(subject.startApply).substr(4, 2) +
                        "/" +
                        String(subject.startApply).substr(6, 2)}{" "}
                      ~{" "}
                      {String(subject.endApply).substr(2, 2) +
                        "/" +
                        String(subject.endApply).substr(4, 2) +
                        "/" +
                        String(subject.endApply).substr(6, 2)}
                    </span>
                  </div>
                  <div className="subject-subject">{subject.subject}</div>
                  <div className="subject-teacher">
                    {subject.TeacherInfo.name}
                  </div>
                  <div className="subject-apply">
                    {String(subject.startDay).substr(2, 2) +
                      "/" +
                      String(subject.startDay).substr(4, 2) +
                      "/" +
                      String(subject.startDay).substr(6, 2)}{" "}
                    ~{" "}
                    {String(subject.endDay).substr(2, 2) +
                      "/" +
                      String(subject.endDay).substr(4, 2) +
                      "/" +
                      String(subject.endDay).substr(6, 2)}
                  </div>
                  <div className="subject-indate">{subject.updatedAt}</div>
                </div>
              );
            })}
        </div>
      );
    } else {
      return (
        <div className="list-student-wrap">
          {[]
            .concat(students.listStudents.items)
            .sort(sortCreatedAt("updatedAt", "desc"))
            .sort(sortStarted())
            .sort(sortSbId("sbId"))
            .filter((obj) => {
              if (filterNoitem) return true;
              return obj.sbId !== "0";
            })
            .filter((obj) => {
              if (filterKeyword === "") return true;
              for (
                var i = 0;
                i < obj.name.length - filterKeyword.length + 1;
                i++
              ) {
                if (
                  String(obj.name)
                    .substr(i, filterKeyword.length)
                    .toUpperCase() === filterKeyword.toUpperCase()
                )
                  return true;
              }
              for (
                var j = 0;
                j < obj.SubjectInfo.subject.length - filterKeyword.length + 1;
                j++
              ) {
                if (
                  String(obj.SubjectInfo.subject)
                    .substr(j, filterKeyword.length)
                    .toUpperCase() === filterKeyword.toUpperCase()
                )
                  return true;
              }
              return false;
            })
            .map(function (student, index) {
              if (selectedStudent !== null) {
                if (student.SubjectInfo.subject === "NO SUBJECT") {
                  if (selectedStudent.id === student.id) {
                    itemClassName = "item-student-nosub-selected";
                  } else {
                    itemClassName = "item-student-nosub";
                  }
                } else {
                  if (selectedStudent.id === student.id) {
                    itemClassName = "item-student-selected";
                  } else {
                    itemClassName = "item-student";
                  }
                }
              } else {
                if (student.SubjectInfo.subject === "NO SUBJECT") {
                  itemClassName = "item-student-nosub";
                } else {
                  itemClassName = "item-student";
                }
              }

              if (
                student.sbId === "0" ||
                newDate <= Number(student.SubjectInfo.startDay)
              ) {
                return (
                  <div
                    key={student.id}
                    className={itemClassName}
                    onClick={studentSelectHandler.bind(this, student)}
                  >
                    <div className="student-type">STUDENT</div>
                    <div className="student-name">{student.name}</div>
                    <div className="student-subject">
                      {student.SubjectInfo.subject}
                    </div>
                    <div className="student-indate">{student.updatedAt}</div>
                  </div>
                );
              } else {
                return (
                  <div key={student.id} className={"item-student-started"}>
                    <div className="student-type">STUDENT (STARTED)</div>
                    <div className="student-name">{student.name}</div>
                    <div className="student-subject">
                      {student.SubjectInfo.subject}
                    </div>
                    <div className="student-indate">{student.updatedAt}</div>
                  </div>
                );
              }
            })}
        </div>
      );
    }
  };
  return (
    <div className="home-wrap">
      {topFilter()}
      {selectedItem()}
      {itemList()}
    </div>
  );
};

export default Students;
