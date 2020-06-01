import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { v4 as uuidv4 } from "uuid";
import { listTeachers, listSubjects } from "../graphql/queries";
import {
  updateSubject,
  updateTeacher,
  createTeacher,
  deleteTeacher,
} from "../graphql/mutations";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";

import sortStarted from "../sortStarted";
import sortSbId from "../sortSbId";
import filterApply from "../filterApply";
import sortDate from "../sortDate";
import sortCreatedAt from "../sortCreatedAt";
import blankImage from "../images/blank-profile.png";
import "./Teachers.css";
import "./Subjects.css";

const Teachers = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectSelect, setSubjectSelect] = useState(false);
  const [inpuVisible, setInpuVisible] = useState(false);
  const [originalSubject, setOriginalSubject] = useState();
  const [oldTeacherSbId, setOldTeacherSbId] = useState("");
  const [newTeacherId, setNewTeacherId] = useState("");
  const [newTeacherName, setNewTeacherName] = useState("");
  const [newTeacherAge, setNewTeacherAge] = useState("");
  const [newTeacherSbId, setNewTeacherSbId] = useState(0);
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
  const [
    doUpdateTeacher,
    { loading: updateTeacherLoading, error: updateTeacherError },
  ] = useMutation(gql(updateTeacher));
  const [
    doUpdateSubject,
    { loading: updateSubjectLoading, error: updateSubjectError },
  ] = useMutation(gql(updateSubject));
  const [
    doCreateTeacher,
    { loading: createTeacherLoading, error: createTeacherError },
  ] = useMutation(gql(createTeacher));
  const [
    doDeleteTeacher,
    { loading: deleteTeacherLoading, error: deleteTeacherError },
  ] = useMutation(gql(deleteTeacher));
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
    // fetchPolicy: "no-cache",
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
    createTeacherLoading
  )
    return (
      <div className="loading-layer">
        <div>Loading...</div>
      </div>
    );
  if (stuError || sbjError) return <div>Error!</div>;
  const teacherSelectHandler = (teacher, e) => {
    e.preventDefault();
    setNewTeacherAge("");
    setNewTeacherName("");
    setNewTeacherSbId("0");
    setInpuVisible(false);
    setValidationMessage(null);
    setSelectedTeacher(teacher);
    setSelectedSubject(teacher.SubjectInfo);
  };
  const closeChangeSubjectHandler = (e) => {
    e.preventDefault();
    setSelectedTeacher(null);
    setSubjectSelect(false);
  };
  const openChangeSubjectHandler = (e) => {
    e.preventDefault();
    setSubjectSelect(true);
    setOriginalSubject(selectedTeacher.SubjectInfo);
  };
  const closeSelectedItem = (e) => {
    e.preventDefault();
    setSelectedTeacher(null);
    setSubjectSelect(false);
  };
  const subjectSelectHandler = (subject, e) => {
    e.preventDefault();
    setSelectedSubject(subject);
  };
  const saveSubjectHandler = async (e) => {
    e.preventDefault();
    if (selectedTeacher.id !== null && selectedSubject.id !== null) {
      // await client.resetStore().then(async () => {
      // client.cache.reset();
      // console.log(client);
      await doUpdateSubject({
        variables: {
          input: { id: originalSubject.id, tcId: "0" },
        },
      }).then(async () => {
        await doUpdateSubject({
          variables: {
            input: { id: selectedSubject.id, tcId: selectedTeacher.id },
          },
        }).then(async () => {
          await doUpdateTeacher({
            variables: {
              input: { id: selectedTeacher.id, sbId: selectedSubject.id },
            },
          }).then(async (updatedata) => {
            setSelectedTeacher(updatedata.data.updateTeacher);
            setSubjectSelect(false);
            // await sbjRefetch().then(async () => {
            //   await tcRefetch().then(() => {
            //     setSubjectSelect(false);
            //   });
            // });
          });
        });
      });
      // });
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
          <div className="selected-item-key">Date</div>
          <div className="selected-item-value">
            {String(selectedTeacher.createdAt).substr(0, 4) +
              "/" +
              String(selectedTeacher.createdAt).substr(5, 2) +
              "/" +
              String(selectedTeacher.createdAt).substr(8, 2)}
          </div>
          <div className="modify-delete-btn">
            <div
              className="selected-item-modify"
              onClick={async () => {
                if (window.confirm("Are you sure to modify?")) {
                  setOldTeacherSbId(selectedTeacher.sbId);
                  setNewTeacherId(selectedTeacher.id);
                  setNewTeacherName(selectedTeacher.name);
                  setNewTeacherAge(selectedTeacher.age);
                  setNewTeacherSbId(selectedTeacher.sbId);
                  setSelectedTeacher(null);
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
                  await doDeleteTeacher({
                    variables: {
                      input: { id: selectedTeacher.id },
                    },
                  }).then(async () => {
                    await doUpdateSubject({
                      variables: {
                        input: { id: selectedTeacher.sbId, tcId: "0" },
                      },
                    }).then(async () => {
                      await sbjRefetch().then(async () => {
                        await tcRefetch().then(() => {
                          setSelectedTeacher(null);
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
          <div className="selected-item-type">TEACHER</div>
          <div className="selected-item-key">Name</div>
          <div className="selected-item-value">{selectedTeacher.name}</div>
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
          <div className="selected-item-subject-title">SUBJECT INFORMATION</div>
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
          <div className="selected-item-subject-title">SUBJECT INFORMATION</div>
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
  const onChangeNameHandler = (e) => {
    e.preventDefault();
    if (e.target.value.length <= 10) setNewTeacherName(e.target.value);
  };
  const onChangeAgeHandler = (e) => {
    e.preventDefault();
    if (isNaN(e.target.value - 1)) return;
    if (e.target.value < 80) setNewTeacherAge(e.target.value);
  };
  const onChangeSubjectHandler = (e) => {
    e.preventDefault();
    setNewTeacherSbId(e.target.value);
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
          {teacherInfo()}
          {subjectInfo()}
          {changeBtn()}
        </div>
      );
    } else if (inpuVisible) {
      return (
        <div className="add-form">
          <div className="add-form-title">
            {(modifyItem && "Modify") || "Register"} a teacher
          </div>
          <div className="add-form-label">Name</div>
          <div className="add-form-input">
            <input
              type="text"
              id="teacherName"
              value={newTeacherName}
              placeholder="Name"
              onChange={onChangeNameHandler}
            />
          </div>
          <div className="add-form-label">Age</div>
          <div className="add-form-input">
            <input
              type="text"
              name="teacherAge"
              value={newTeacherAge}
              placeholder="Age"
              onChange={onChangeAgeHandler}
            />
          </div>
          <div className="add-form-label">Subject</div>
          <div className="add-form-input">
            <select onChange={onChangeSubjectHandler} value={newTeacherSbId}>
              <option value="0">NONE</option>
              {[]
                .concat(subjects.listSubjects.items)
                .sort(sortDate("endApply"))
                .filter(function (obj) {
                  return obj.id !== "0";
                })
                .filter(function (obj) {
                  return obj.tcId === "0" || obj.tcId === newTeacherId;
                })
                .map(function (subject, index) {
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
                if (String(newTeacherName).length < 3) {
                  setValidationMessage("Name is minimum 3 letters.");
                  return;
                }
                if (newTeacherAge < 15) {
                  setValidationMessage("Age is minimum 15.");
                  return;
                }
                setValidationMessage(null);

                if (modifyItem) {
                  const inputTeacher = {
                    id: newTeacherId,
                    name: newTeacherName,
                    age: newTeacherAge,
                    sbId: newTeacherSbId,
                  };
                  await doUpdateTeacher({
                    variables: {
                      input: inputTeacher,
                    },
                  }).then(async () => {
                    if (newTeacherSbId !== "0") {
                      await doUpdateSubject({
                        variables: {
                          input: { id: oldTeacherSbId, tcId: "0" },
                        },
                      }).then(async () => {
                        await doUpdateSubject({
                          variables: {
                            input: {
                              id: newTeacherSbId,
                              tcId: inputTeacher.id,
                            },
                          },
                        });
                        await sbjRefetch().then(async () => {
                          await tcRefetch().then(() => {
                            setNewTeacherAge("");
                            setNewTeacherName("");
                            setNewTeacherSbId("0");
                            setInpuVisible(false);
                          });
                        });
                      });
                    } else {
                      await doUpdateSubject({
                        variables: {
                          input: { id: oldTeacherSbId, tcId: "0" },
                        },
                      }).then(async () => {
                        await sbjRefetch().then(async () => {
                          await tcRefetch().then(() => {
                            setNewTeacherAge("");
                            setNewTeacherName("");
                            setNewTeacherSbId("0");
                            setInpuVisible(false);
                          });
                        });
                      });
                    }
                  });
                } else {
                  const inputTeacher = {
                    id: uuidv4(),
                    name: newTeacherName,
                    age: newTeacherAge,
                    sbId: newTeacherSbId,
                  };
                  await doCreateTeacher({
                    variables: {
                      input: inputTeacher,
                    },
                  }).then(async () => {
                    if (newTeacherSbId !== "0") {
                      await doUpdateSubject({
                        variables: {
                          input: { id: newTeacherSbId, tcId: inputTeacher.id },
                        },
                      }).then(async () => {
                        await sbjRefetch().then(async () => {
                          await tcRefetch().then(() => {
                            setNewTeacherAge("");
                            setNewTeacherName("");
                            setNewTeacherSbId("0");
                            setInpuVisible(false);
                          });
                        });
                      });
                    } else {
                      await sbjRefetch().then(async () => {
                        await tcRefetch().then(() => {
                          setNewTeacherAge("");
                          setNewTeacherName("");
                          setNewTeacherSbId("0");
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
                setNewTeacherAge("");
                setNewTeacherName("");
                setNewTeacherSbId("0");
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
          Teacher List :{" "}
          {
            []
              .concat(teachers.listTeachers.items)
              .sort(sortCreatedAt("updatedAt", "desc"))
              .sort(sortStarted())
              .sort(sortSbId("sbId"))
              .filter((obj) => {
                return obj.id !== "0";
              })
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
                  var i = 0;
                  i < obj.SubjectInfo.subject.length - filterKeyword.length + 1;
                  i++
                ) {
                  if (
                    String(obj.SubjectInfo.subject)
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
          <div className="custom-label">No subject</div>
        </div>
        <div
          className="add-btn"
          onClick={() => {
            setInpuVisible(true);
            setSelectedTeacher(null);
          }}
        >
          Register
        </div>
      </div>
    );
  };
  const itemList = () => {
    var itemClassName = "item-teacher";
    var subjectClassName = "item-subject";
    if (subjectSelect) {
      itemClassName = "item-subject";
      return (
        <div className="list-subject-wrap">
          <div className="list-msg">Please select a subject.</div>
          {[]
            .concat(subjects.listSubjects.items)
            .sort(sortDate("endApply"))
            .filter(function (obj) {
              return obj.id !== "0";
            })
            .filter(function (obj) {
              return obj.tcId === "0";
            })
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
                  className={subjectClassName}
                  onClick={subjectSelectHandler.bind(this, subject)}
                >
                  <div className="subject-type">
                    SUBJECT [{" "}
                    {"[ " +
                      subject.StudentsInfo.items.length +
                      " / " +
                      subject.total +
                      " ]"}
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
        <div className="list-teacher-wrap">
          {[]
            .concat(teachers.listTeachers.items)
            .sort(sortCreatedAt("updatedAt", "desc"))
            .sort(sortStarted())
            .sort(sortSbId("sbId"))
            .filter((obj) => {
              return obj.id !== "0";
            })
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
                var i = 0;
                i < obj.SubjectInfo.subject.length - filterKeyword.length + 1;
                i++
              ) {
                if (
                  String(obj.SubjectInfo.subject)
                    .substr(i, filterKeyword.length)
                    .toUpperCase() === filterKeyword.toUpperCase()
                )
                  return true;
              }
              return false;
            })
            .map(function (teacher, index) {
              if (selectedTeacher !== null) {
                if (teacher.SubjectInfo.subject === "NO SUBJECT") {
                  if (selectedTeacher.id === teacher.id) {
                    itemClassName = "item-teacher-nosub-selected";
                  } else {
                    itemClassName = "item-teacher-nosub";
                  }
                } else {
                  if (selectedTeacher.id === teacher.id) {
                    itemClassName = "item-teacher-selected";
                  } else {
                    itemClassName = "item-teacher";
                  }
                }
              } else {
                if (teacher.SubjectInfo.subject === "NO SUBJECT") {
                  itemClassName = "item-teacher-nosub";
                } else {
                  itemClassName = "item-teacher";
                }
              }
              if (
                teacher.sbId === "0" ||
                newDate <= Number(teacher.SubjectInfo.endApply)
              ) {
                return (
                  <div
                    key={teacher.id}
                    className={itemClassName}
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

export default Teachers;
