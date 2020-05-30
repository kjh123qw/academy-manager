import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { listTeachers, listSubjects } from "../graphql/queries";
import { updateSubject, updateTeacher } from "../graphql/mutations";

import sortStarted from "../sortStarted";
import sortSbId from "../sortSbId";
import filterApply from "../filterApply";
import sortDate from "../sortDate";
import sortCreatedAt from "../sortCreatedAt";
import blankImage from "../images/blank-profile.png";
import "./Teachers.css";
import "./Subjects.css";
import sortSjStarted from "../sortSjStarted";

const Subjects = (props) => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectSelect, setSubjectSelect] = useState(false);
  const [saveSetting, setSaveSetting] = useState(0);
  const [inpuVisible, setInpuVisible] = useState(false);
  const [originalTeacher, setOriginalTeacher] = useState();

  let date = new Date();
  let year = date.getFullYear();
  let month =
    1 + date.getMonth() >= 10
      ? 1 + date.getMonth()
      : "0" + (1 + date.getMonth());
  let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
  const newDate = Number(year + "" + month + "" + day);

  const [
    doUpdateTeacher,
    { loading: updateTeacherLoading, error: updateTeacherError },
  ] = useMutation(gql(updateTeacher));
  const [
    doUpdateSubject,
    { loading: updateSubjectLoading, error: updateSubjectError },
  ] = useMutation(gql(updateSubject));
  const {
    loading: stuLoading,
    error: stuError,
    data: teachers,
    refetch: tcRefetch,
    networkStatus: tcNetworkStatus,
  } = useQuery(gql(listTeachers), {
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
  if (sbjNetworkStatus === 4 || tcNetworkStatus === 4)
    return (
      <div className="loading-layer">
        <div>Refetching...</div>
      </div>
    );
  if (stuLoading || sbjLoading || updateTeacherLoading || updateSubjectLoading)
    return (
      <div className="loading-layer">
        <div>Loading...</div>
      </div>
    );
  if (stuError || sbjError) return <div>Error!</div>;
  const teacherSelectHandler = (teacher, e) => {
    e.preventDefault();
    setSelectedTeacher(teacher);
  };
  const closeChangeSubjectHandler = (e) => {
    e.preventDefault();
    setSelectedTeacher(null);
    setSubjectSelect(false);
  };
  const openChangeSubjectHandler = (e) => {
    e.preventDefault();
    setSubjectSelect(true);
  };
  const closeSelectedItem = (e) => {
    e.preventDefault();
    setSelectedTeacher(null);
    setSubjectSelect(false);
  };
  const subjectSelectHandler = (subject, e) => {
    e.preventDefault();
    setSelectedSubject(subject);
    setSelectedTeacher(subject.TeacherInfo);
    setOriginalTeacher(subject.TeacherInfo);
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
    if (selectedTeacher.id !== null && selectedSubject.id !== null) {
      await doUpdateTeacher({
        variables: {
          input: { id: originalTeacher.id, sbId: "0" },
        },
      }).then(async () => {
        await doUpdateTeacher({
          variables: {
            input: { id: selectedTeacher.id, sbId: selectedSubject.id },
          },
        }).then(async () => {
          await doUpdateSubject({
            variables: {
              input: { id: selectedSubject.id, tcId: selectedTeacher.id },
            },
          }).then(async (updatedata) => {
            setSelectedTeacher(updatedata.data.updateSubject);
            await sbjRefetch().then(async () => {
              await tcRefetch().then(() => {
                setSubjectSelect(false);
              });
            });
          });
        });
      });
    }
  };
  const teacherInfo = () => {
    if (!subjectSelect) {
      return (
        <div className="selected-item-info">
          <div className="selected-item-type">TEACHER</div>
          <div className="selected-item-photo">
            <img src={blankImage} alt="profile photo" />
          </div>
          <div className="selected-item-key">Name</div>
          <div className="selected-item-value">{selectedTeacher.name}</div>
          <div className="selected-item-key">Age</div>
          <div className="selected-item-value">{selectedTeacher.age}</div>
          <div className="selected-item-key">Job</div>
          <div className="selected-item-value">Businessman</div>
          <div className="selected-item-key">Date</div>
          <div className="selected-item-value">
            {String(selectedTeacher.createdAt).substr(0, 4) +
              "/" +
              String(selectedTeacher.createdAt).substr(5, 2) +
              "/" +
              String(selectedTeacher.createdAt).substr(8, 2)}
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
  const subjectInfo = () => {
    if (selectedSubject.id === "0") {
      return (
        <div className="selected-item-subject">
          <div className="selected-item-subject-title">SUBJECT</div>
          <div className="selected-item-subject-key">Subject</div>
          <div className="selected-item-subject-value">
            {selectedSubject.subject}
          </div>
          <div className="selected-item-subject-key">Applicant</div>
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
          <div className="selected-item-subject-title">SUBJECT</div>
          <div className="selected-item-subject-key">Subject</div>
          <div className="selected-item-subject-value">
            {selectedSubject.subject}
          </div>
          <div className="selected-item-subject-key">Applicant</div>
          <div className="selected-item-subject-value">
            {"[ " +
              selectedSubject.StudentsInfo.items.length +
              " / " +
              selectedSubject.total +
              " ]"}
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
    if (selectedTeacher !== null && selectedSubject !== null) {
      return (
        <div className="selected-item">
          {teacherInfo()}
          {subjectInfo()}
          {changeBtn()}
        </div>
      );
    } else {
      return (
        <div className="add-btn-wrap">
          <div className="add-btn">add teacher</div>
        </div>
      );
    }
  };
  const itemList = () => {
    var itemClassName = "item-subject";
    var subjectClassName = "item-teacher";
    if (subjectSelect) {
      itemClassName = "item-teacher";
      return (
        <div className="list-teacher-wrap">
          {[]
            .concat(teachers.listTeachers.items)
            .sort(sortCreatedAt("updatedAt", "desc"))
            .sort(sortStarted())
            .sort(sortSbId())
            .filter((obj) => {
              return obj.id !== "0";
            })
            .map(function (teacher, index) {
              if (selectedTeacher !== null) {
                if (selectedTeacher.id === teacher.id) {
                  subjectClassName = "item-teacher-selected";
                } else {
                  subjectClassName = "item-teacher";
                }
              }

              if (
                teacher.sbId === "0" ||
                newDate <= Number(teacher.SubjectInfo.startDay)
              ) {
                return (
                  <div
                    key={teacher.id}
                    className={subjectClassName}
                    onClick={teacherSelectHandler.bind(this, teacher)}
                  >
                    <div className="teacher-type">TEACHER</div>
                    <div className="teacher-name">{teacher.name}</div>
                    <div className="teacher-subject">
                      {teacher.SubjectInfo.subject}
                    </div>
                    <div className="teacher-indate">{teacher.updatedAt}</div>
                  </div>
                );
              } else {
                return (
                  <div key={teacher.id} className="item-teacher-started">
                    <div className="teacher-type">TEACHER (STARTED)</div>
                    <div className="teacher-name">{teacher.name}</div>
                    <div className="teacher-subject">
                      {teacher.SubjectInfo.subject}
                    </div>
                    <div className="teacher-indate">{teacher.updatedAt}</div>
                  </div>
                );
              }
            })}
        </div>
      );
    } else {
      return (
        <div className="list-subject-wrap">
          {[]
            .concat(subjects.listSubjects.items)
            .sort(sortDate("endApply"))
            .sort(sortSbId("tcId"))
            .sort(sortSjStarted())
            .filter(function (obj) {
              return obj.id !== "0";
            })
            .map(function (subject, index) {
              if (selectedSubject !== null) {
                if (selectedSubject.id === subject.id) {
                  itemClassName = "item-subject-selected";
                } else {
                  itemClassName = "item-subject";
                }
              }
              if (subject.tcId === "0" || newDate <= Number(subject.endApply)) {
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
                    <div className="subject-name">
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
              } else {
                return (
                  <div key={subject.id} className="item-subject-started">
                    <div className="subject-type">
                      SUBJECT [ {subject.StudentsInfo.items.length} /{" "}
                      {subject.total} ] (STARTED)
                    </div>
                    <div className="subject-subject">{subject.subject}</div>
                    <div className="subject-name">
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

export default Subjects;
