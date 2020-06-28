import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { v4 as uuidv4 } from "uuid";
import { listTeachers, listSubjects } from "../graphql/queries";
import {
  updateSubject,
  updateTeacher,
  createSubject,
  deleteSubject,
} from "../graphql/mutations";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";

import sortStarted from "../sortStarted";
import sortSbId from "../sortSbId";
import filterApply from "../filterApply";
import sortDate from "../sortDate";
import sortCreatedAt from "../sortCreatedAt";
import sortSjStarted from "../sortSjStarted";
import blankImage from "../images/no-image.png";
import "./Teachers.css";
import "./Subjects.css";

const Subjects = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectSelect, setSubjectSelect] = useState(false);
  const [inpuVisible, setInpuVisible] = useState(false);
  const [originalTeacher, setOriginalTeacher] = useState();
  const [oldSubjectTcId, setOldSubjectTcId] = useState("");
  const [newSubjectId, setNewSubjectId] = useState("");
  const [newSubjectTitle, setNewSubjectTitle] = useState("");
  const [newSubjectTotal, setNewSubjectTotal] = useState("");
  const [newSubjectStartApply, setNewSubjectStartApply] = useState("");
  const [newSubjectEndApply, setNewSubjectEndApply] = useState("");
  const [newSubjectStartDay, setNewSubjectStartDay] = useState("");
  const [newSubjectEndDay, setNewSubjectEndDay] = useState("");
  const [newSubjectTcId, setNewSubjectTcId] = useState("0");
  const [validationMessage, setValidationMessage] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [filterNoitem, setFilterNoitem] = useState(true);
  const [modifyItem, setModifyItem] = useState(false);
  const [searchLength, setSearchLength] = useState(0);

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
  const [
    doCreateSubject,
    { loading: createSubjectLoading, error: createSubjectError },
  ] = useMutation(gql(createSubject));
  const [
    doDeleteSubject,
    { loading: deleteSubjectLoading, error: deleteSubjectError },
  ] = useMutation(gql(deleteSubject));
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
  if (
    stuLoading ||
    sbjLoading ||
    updateTeacherLoading ||
    updateSubjectLoading ||
    deleteSubjectLoading
  )
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
    setOriginalTeacher(selectedSubject.TeacherInfo);
  };
  const closeSelectedItem = (e) => {
    e.preventDefault();
    setSelectedTeacher(null);
    setSelectedSubject(null);
    setSubjectSelect(false);
  };
  const subjectSelectHandler = (subject, e) => {
    e.preventDefault();
    setInpuVisible(false);
    setNewSubjectTitle("");
    setNewSubjectTotal("");
    setNewSubjectStartApply("");
    setNewSubjectEndApply("");
    setNewSubjectStartDay("");
    setNewSubjectEndDay("");
    setNewSubjectTcId("0");
    setValidationMessage(null);
    setSelectedSubject(subject);
    setSelectedTeacher(subject.TeacherInfo);
    setOriginalTeacher(subject.TeacherInfo);
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
            setSelectedSubject(updatedata.data.updateSubject);
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
  const subjectInfo = () => {
    if (!subjectSelect) {
      return (
        <div className="selected-item-info">
          <div className="selected-item-type">SUBJECT</div>
          <div className="selected-item-photo">
            <img src={blankImage} alt="profile photo" />
          </div>
          <div className="selected-item-key">Title</div>
          <div className="selected-item-value">{selectedSubject.subject}</div>
          <div className="selected-item-key">Applicant</div>
          <div className="selected-item-value">
            {"[ " +
              selectedSubject.StudentsInfo.items.length +
              " / " +
              selectedSubject.total +
              " ]"}
          </div>
          <div className="selected-item-key">Apply Period</div>
          <div className="selected-item-value">
            {String(selectedSubject.startApply).substr(0, 4) +
              "/" +
              String(selectedSubject.startApply).substr(4, 2) +
              "/" +
              String(selectedSubject.startApply).substr(6, 2) +
              " ~ " +
              String(selectedSubject.endApply).substr(0, 4) +
              "/" +
              String(selectedSubject.endApply).substr(4, 2) +
              "/" +
              String(selectedSubject.endApply).substr(6, 2)}
          </div>
          <div className="selected-item-key">Training Period</div>
          <div className="selected-item-value">
            {String(selectedSubject.startDay).substr(0, 4) +
              "/" +
              String(selectedSubject.startDay).substr(4, 2) +
              "/" +
              String(selectedSubject.startDay).substr(6, 2) +
              " ~ " +
              String(selectedSubject.endDay).substr(0, 4) +
              "/" +
              String(selectedSubject.endDay).substr(4, 2) +
              "/" +
              String(selectedSubject.endDay).substr(6, 2)}
          </div>
          <div className="modify-delete-btn">
            <div
              className="selected-item-modify"
              onClick={async () => {
                if (window.confirm("Are you sure to modify?")) {
                  setOldSubjectTcId(selectedSubject.tcId);
                  setNewSubjectId(selectedSubject.id);
                  setNewSubjectTitle(selectedSubject.subject);
                  setNewSubjectTotal(selectedSubject.total);
                  setNewSubjectStartApply(selectedSubject.startApply);
                  setNewSubjectEndApply(selectedSubject.endApply);
                  setNewSubjectStartDay(selectedSubject.startDay);
                  setNewSubjectEndDay(selectedSubject.endDay);
                  setNewSubjectTcId(selectedSubject.tcId);
                  setSelectedSubject(null);
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
                  await doDeleteSubject({
                    variables: {
                      input: { id: selectedSubject.id },
                    },
                  }).then(async () => {
                    await doUpdateTeacher({
                      variables: {
                        input: { id: selectedSubject.tcId, sbId: "0" },
                      },
                    }).then(async () => {
                      await sbjRefetch().then(async () => {
                        await tcRefetch().then(() => {
                          setSelectedSubject(null);
                        });
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
          <div className="selected-item-type">SUBJECT</div>
          <div className="selected-item-key">Name</div>
          <div className="selected-item-value">{selectedSubject.subject}</div>
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
      if (selectedTeacher.id === "0") {
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
  const teacherInfo = () => {
    if (selectedTeacher.id === "0") {
      return (
        <div className="selected-item-subject">
          <div className="selected-item-subject-title">TEACHER INFORMATION</div>
          <div className="selected-item-subject-key">Name</div>
          <div className="selected-item-subject-value">
            {selectedTeacher.name}
          </div>
        </div>
      );
    } else {
      return (
        <div className="selected-item-subject">
          <div className="selected-item-subject-title">TEACHER INFORMATION</div>
          <div className="selected-item-subject-key">Name</div>
          <div className="selected-item-subject-value">
            {selectedTeacher.name}
          </div>
        </div>
      );
    }
  };
  const onChangeTitleHandler = (e) => {
    e.preventDefault();
    if (e.target.value.length <= 14) setNewSubjectTitle(e.target.value);
  };
  const onChangeTotalHandler = (e) => {
    e.preventDefault();
    if (isNaN(e.target.value - 1)) return;
    if (e.target.value < 100) setNewSubjectTotal(e.target.value);
  };
  const onChangeStartApplyHandler = (e) => {
    e.preventDefault();
    if (isNaN(e.target.value - 1)) return;
    if (e.target.value.length <= 8) setNewSubjectStartApply(e.target.value);
  };
  const onChangeEndApplyHandler = (e) => {
    e.preventDefault();
    if (isNaN(e.target.value - 1)) return;
    if (e.target.value.length <= 8) setNewSubjectEndApply(e.target.value);
  };
  const onChangeStartDayHandler = (e) => {
    e.preventDefault();
    if (isNaN(e.target.value - 1)) return;
    if (e.target.value.length <= 8) setNewSubjectStartDay(e.target.value);
  };
  const onChangeEndDayHandler = (e) => {
    e.preventDefault();
    if (isNaN(e.target.value - 1)) return;
    if (e.target.value.length <= 8) setNewSubjectEndDay(e.target.value);
  };
  const onChangeTcIdHandler = (e) => {
    e.preventDefault();
    setNewSubjectTcId(e.target.value);
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
    if (selectedTeacher !== null && selectedSubject !== null) {
      return (
        <div className="selected-item">
          {subjectInfo()}
          {teacherInfo()}
          {changeBtn()}
        </div>
      );
    } else if (inpuVisible) {
      return (
        <div className="add-form">
          <div className="add-form-title">
            {(modifyItem && "Modify") || "Register"} a subject
          </div>
          <div className="add-form-label">Title</div>
          <div className="add-form-input">
            <input
              type="text"
              id="subjectTitle"
              value={newSubjectTitle}
              placeholder="Title"
              onChange={onChangeTitleHandler}
            />
          </div>
          <div className="add-form-label">Applicant</div>
          <div className="add-form-input">
            <input
              type="text"
              name="subjectTotal"
              value={newSubjectTotal}
              placeholder="Minimum 10"
              onChange={onChangeTotalHandler}
            />
          </div>
          <div className="add-form-label">Apply Period</div>
          <div className="add-form-period-input">
            <input
              type="text"
              name="subjectSA"
              value={newSubjectStartApply}
              placeholder="20201021"
              onChange={onChangeStartApplyHandler}
            />
            ~
            <input
              type="text"
              name="subjectEA"
              value={newSubjectEndApply}
              placeholder="20201214"
              onChange={onChangeEndApplyHandler}
            />
          </div>
          <div className="add-form-label">Training Period</div>
          <div className="add-form-period-input">
            <input
              type="text"
              name="subjectSD"
              value={newSubjectStartDay}
              placeholder="20201214"
              onChange={onChangeStartDayHandler}
            />
            ~
            <input
              type="text"
              name="subjectED"
              value={newSubjectEndDay}
              placeholder="20201214"
              onChange={onChangeEndDayHandler}
            />
          </div>
          <div className="add-form-label">Teacher</div>
          <div className="add-form-input">
            <select onChange={onChangeTcIdHandler} value={newSubjectTcId}>
              <option value="0">NONE</option>
              {[]
                .concat(teachers.listTeachers.items)
                .sort(sortCreatedAt("updatedAt", "desc"))
                .filter((obj) => {
                  return obj.id !== "0";
                })
                .filter((obj) => {
                  return obj.sbId === "0" || obj.sbId === newSubjectId;
                })
                .map(function (teacher, index) {
                  return (
                    <option key={index} value={teacher.id}>
                      {teacher.name}
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
                if (String(newSubjectTitle).length < 2) {
                  setValidationMessage("Name is minimum 2 letters.");
                  return;
                }
                if (newSubjectTotal < 10) {
                  setValidationMessage("Minimum applicant is 10.");
                  return;
                }
                if (
                  String(newSubjectStartApply).length !== 8 ||
                  String(newSubjectEndApply).length !== 8 ||
                  String(newSubjectStartDay).length !== 8 ||
                  String(newSubjectEndDay).length !== 8
                ) {
                  setValidationMessage("Date is 8 letters. ex) 20200917");
                  return;
                }
                setValidationMessage(null);
                if (modifyItem) {
                  const inputSubject = {
                    id: newSubjectId,
                    subject: newSubjectTitle,
                    total: newSubjectTotal,
                    startApply: newSubjectStartApply,
                    endApply: newSubjectEndApply,
                    startDay: newSubjectStartDay,
                    endDay: newSubjectEndDay,
                    tcId: newSubjectTcId,
                  };
                  await doUpdateSubject({
                    variables: {
                      input: inputSubject,
                    },
                  }).then(async () => {
                    if (newSubjectTcId !== "0") {
                      await doUpdateTeacher({
                        variables: {
                          input: { id: oldSubjectTcId, sbId: "0" },
                        },
                      }).then(async () => {
                        await doUpdateTeacher({
                          variables: {
                            input: {
                              id: newSubjectTcId,
                              sbId: inputSubject.id,
                            },
                          },
                        });
                        await sbjRefetch().then(async () => {
                          await tcRefetch().then(() => {
                            setNewSubjectTitle("");
                            setNewSubjectTotal("");
                            setNewSubjectStartApply("");
                            setNewSubjectEndApply("");
                            setNewSubjectStartDay("");
                            setNewSubjectEndDay("");
                            setNewSubjectTcId("0");
                            setInpuVisible(false);
                          });
                        });
                      });
                    } else {
                      await doUpdateTeacher({
                        variables: {
                          input: { id: oldSubjectTcId, sbId: "0" },
                        },
                      }).then(async () => {
                        await sbjRefetch().then(async () => {
                          await tcRefetch().then(() => {
                            setNewSubjectTitle("");
                            setNewSubjectTotal("");
                            setNewSubjectStartApply("");
                            setNewSubjectEndApply("");
                            setNewSubjectStartDay("");
                            setNewSubjectEndDay("");
                            setNewSubjectTcId("0");
                            setInpuVisible(false);
                          });
                        });
                      });
                    }
                  });
                } else {
                  const inputSubject = {
                    id: uuidv4(),
                    subject: newSubjectTitle,
                    total: newSubjectTotal,
                    startApply: newSubjectStartApply,
                    endApply: newSubjectEndApply,
                    startDay: newSubjectStartDay,
                    endDay: newSubjectEndDay,
                    tcId: newSubjectTcId,
                  };
                  await doCreateSubject({
                    variables: {
                      input: inputSubject,
                    },
                  }).then(async () => {
                    if (newSubjectTcId !== "0") {
                      await doUpdateTeacher({
                        variables: {
                          input: { id: newSubjectTcId, sbId: inputSubject.id },
                        },
                      }).then(async () => {
                        await sbjRefetch().then(async () => {
                          await tcRefetch().then(() => {
                            setNewSubjectTitle("");
                            setNewSubjectTotal("");
                            setNewSubjectStartApply("");
                            setNewSubjectEndApply("");
                            setNewSubjectStartDay("");
                            setNewSubjectEndDay("");
                            setNewSubjectTcId("0");
                            setInpuVisible(false);
                          });
                        });
                      });
                    } else {
                      await sbjRefetch().then(async () => {
                        await tcRefetch().then(() => {
                          setNewSubjectTitle("");
                          setNewSubjectTotal("");
                          setNewSubjectStartApply("");
                          setNewSubjectEndApply("");
                          setNewSubjectStartDay("");
                          setNewSubjectEndDay("");
                          setNewSubjectTcId("0");
                          setInpuVisible(false);
                        });
                      });
                    }
                  });
                }
              }}
            >
              CONFIRM
            </button>
            <button
              className="add-form-cancel"
              onClick={() => {
                setNewSubjectTitle("");
                setNewSubjectTotal("");
                setNewSubjectStartApply("");
                setNewSubjectEndApply("");
                setNewSubjectStartDay("");
                setNewSubjectEndDay("");
                setNewSubjectTcId("0");
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
          Subject List :
          {
            []
              .concat(subjects.listSubjects.items)
              .sort(sortDate("endApply"))
              .sort(sortSbId("tcId"))
              .sort(sortSjStarted())
              .filter(function (obj) {
                return obj.id !== "0";
              })
              .filter((obj) => {
                if (filterNoitem) return true;
                return obj.tcId !== "0";
              })
              .filter((obj) => {
                if (filterKeyword === "") return true;
                for (
                  var i = 0;
                  i < obj.subject.length - filterKeyword.length + 1;
                  i++
                ) {
                  if (
                    String(obj.subject)
                      .substr(i, filterKeyword.length)
                      .toUpperCase() === filterKeyword.toUpperCase()
                  )
                    return true;
                }
                for (
                  var i = 0;
                  i < obj.TeacherInfo.name.length - filterKeyword.length + 1;
                  i++
                ) {
                  if (
                    String(obj.TeacherInfo.name)
                      .substr(i, filterKeyword.length)
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
          <div className="custom-label">No teacher</div>
        </div>
        <div
          className="add-btn"
          onClick={() => {
            setInpuVisible(true);
            setSelectedSubject(null);
          }}
        >
          Register
        </div>
      </div>
    );
  };
  const itemList = () => {
    var itemClassName = "item-subject";
    var subjectClassName = "item-teacher";
    if (subjectSelect) {
      itemClassName = "item-teacher";
      return (
        <div className="list-teacher-wrap">
          <div className="list-msg">Please select a teacher.</div>
          {[]
            .concat(teachers.listTeachers.items)
            .sort(sortCreatedAt("updatedAt", "desc"))
            .filter((obj) => {
              return obj.id !== "0";
            })
            .filter((obj) => {
              return obj.sbId === "0";
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
      let checkArr = true;
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
            .filter((obj) => {
              if (filterNoitem) return true;
              return obj.tcId !== "0";
            })
            .filter((obj) => {
              if (filterKeyword === "") return true;
              for (
                var i = 0;
                i < obj.subject.length - filterKeyword.length + 1;
                i++
              ) {
                if (
                  String(obj.subject)
                    .substr(i, filterKeyword.length)
                    .toUpperCase() === filterKeyword.toUpperCase()
                )
                  return true;
              }
              for (
                var i = 0;
                i < obj.TeacherInfo.name.length - filterKeyword.length + 1;
                i++
              ) {
                if (
                  String(obj.TeacherInfo.name)
                    .substr(i, filterKeyword.length)
                    .toUpperCase() === filterKeyword.toUpperCase()
                )
                  return true;
              }
              return false;
            })
            .map(function (subject, index, arr) {
              if (selectedSubject !== null) {
                if (subject.TeacherInfo.name === "NO TEACHER") {
                  if (selectedSubject.id === subject.id) {
                    itemClassName = "item-subject-nosub-selected";
                  } else {
                    itemClassName = "item-subject-nosub";
                  }
                } else {
                  if (selectedSubject.id === subject.id) {
                    itemClassName = "item-subject-selected";
                  } else {
                    itemClassName = "item-subject";
                  }
                }
              } else {
                if (subject.TeacherInfo.name === "NO TEACHER") {
                  itemClassName = "item-subject-nosub";
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
                      {subject.total} ]{" "}
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
              } else {
                return (
                  <div
                    key={subject.id}
                    className="item-subject-started"
                    onClick={subjectSelectHandler.bind(this, subject)}
                  >
                    <div className="subject-type">
                      SUBJECT [ {subject.StudentsInfo.items.length} /{" "}
                      {subject.total} ] (STARTED)
                    </div>
                    <div className="subject-subject">{subject.subject}</div>
                    <div className="subject-name">
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

export default Subjects;
