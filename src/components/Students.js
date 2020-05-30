import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { listStudents, listSubjects } from "../graphql/queries";
import { updateSubject, updateStudent } from "../graphql/mutations";

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
  const [saveSetting, setSaveSetting] = useState(0);
  const [inpuVisible, setInpuVisible] = useState(false);
  const _isMounted = useRef(null);
  let date = new Date();
  let year = date.getFullYear();
  let month =
    1 + date.getMonth() >= 10
      ? 1 + date.getMonth()
      : "0" + (1 + date.getMonth());
  let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
  const newDate = Number(year + "" + month + "" + day);

  const [doUpdateStudent] = useMutation(gql(updateStudent));
  const { loading: stuLoading, error: stuError, data: students } = useQuery(
    gql(listStudents)
  );
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
  if (stuLoading || sbjLoading)
    return (
      <div className="loading-layer">
        <div>Loading...</div>
      </div>
    );
  if (stuError || sbjError) return <div>Error!</div>;
  const studentSelectHandler = (student, e) => {
    e.preventDefault();
    setSelectedStudent(student);
    setSelectedSubject(student.SubjectInfo);
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
  const inputLayer = () => {
    if (inpuVisible) {
      return (
        <div className="input-layer">
          <form>
            <div className="input-layer-title"></div>
            <div className="input-layer-key"></div>
            <div className="input-layer-input">
              <input type="text" placeholder="Name" />
            </div>
            <div className="input-layer-key"></div>
            <div className="input-layer-input">
              <input type="text" placeholder="Age" />
            </div>
          </form>
        </div>
      );
    }
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
          <div className="selected-item-key">Job</div>
          <div className="selected-item-value">Businessman</div>
          <div className="selected-item-key">Date</div>
          <div className="selected-item-value">
            {String(selectedStudent.createdAt).substr(0, 4) +
              "/" +
              String(selectedStudent.createdAt).substr(5, 2) +
              "/" +
              String(selectedStudent.createdAt).substr(8, 2)}
          </div>
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
  const saveMessage = () => {
    if (saveSetting === 1 && subjectSelect) {
      return (
        <div className="selected-item-completed">
          <div>Saving to the database ...</div>
        </div>
      );
    } else if (saveSetting === 2 && subjectSelect) {
      return (
        <div className="selected-item-completed">
          <div>Successed to save!</div>
        </div>
      );
    } else {
      return;
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
  const selectedItem = () => {
    if (selectedStudent !== null && selectedSubject !== null) {
      return (
        <div className="selected-item">
          {saveMessage()}
          {studentInfo()}
          {subjectInfo()}
          {changeBtn()}
        </div>
      );
    } else {
      return (
        <div className="add-btn-wrap">
          <div className="add-btn">add student</div>
        </div>
      );
    }
  };
  const itemList = () => {
    var itemClassName = "item-student";
    var subjectClassName = "item-subject";
    if (subjectSelect) {
      return (
        <div className="list-subject-wrap">
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
                  itemClassName = "item-subject-selected";
                } else {
                  itemClassName = "item-subject";
                }
              }
              return (
                <div
                  key={subject.id}
                  className={itemClassName}
                  onClick={subjectSelectHandler.bind(this, subject)}
                >
                  <div className="subject-type">
                    SUBJECT [ {subject.StudentsInfo.items.length} /{" "}
                    {subject.total} ]
                  </div>
                  <div className="subject-subject">{subject.subject}</div>
                  <div className="subject-teacher">
                    {subject.TeacherInfo.name}
                  </div>
                  <div className="subject-apply">
                    {String(subject.startApply).substr(2, 2) +
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
            .map(function (student, index) {
              if (selectedStudent !== null) {
                if (selectedStudent.id === student.id) {
                  itemClassName = "item-student-selected";
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
                  <div key={student.id} className="item-student-started">
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
      {selectedItem()}
      {itemList()}
    </div>
  );
};

export default Students;
