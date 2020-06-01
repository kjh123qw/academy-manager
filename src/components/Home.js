import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { listTeachers, listSubjects, listStudents } from "../graphql/queries";

import sortDate from "../sortDate";
import "./Home.css";

const Home = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month =
    1 + date.getMonth() >= 10
      ? 1 + date.getMonth()
      : "0" + (1 + date.getMonth());
  let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
  const newDate = Number(year + "" + month + "" + day);
  const { loading: stuLoading, error: stuError, data: students } = useQuery(
    gql(listStudents)
  );
  const { loading: sbjLoading, error: sbjError, data: subjects } = useQuery(
    gql(listSubjects)
  );
  const { loading: tcLoading, error: tcError, data: teachers } = useQuery(
    gql(listTeachers)
  );
  if (stuLoading || sbjLoading || tcLoading)
    return (
      <div className="loading-layer">
        <div>Loading...</div>
      </div>
    );
  return (
    <div className="main-table-wrap">
      <div className="main-table">
        <h2>the List of Subjects</h2>
        <div className="main-table-subject-column">
          <div className="table-header table-subject">Subject</div>
          <div className="table-header">State</div>
          <div className="table-header">Applicant</div>
        </div>
        {[]
          .concat(subjects.listSubjects.items)
          .filter((obj) => {
            return obj.id !== "0";
          })
          .sort(sortDate("endApply"))
          .map((subject, index) => {
            console.log(subject.startApply > newDate);
            return (
              <div className="main-table-subject-column" key={index}>
                <div className="table-value table-subject">
                  {subject.subject}
                </div>
                <div className="table-value">
                  {(subject.startApply > newDate && "Ready") ||
                    (subject.endApply >= newDate && "Applying") ||
                    "Started"}
                </div>
                <div className="table-value">
                  {"[ " +
                    subject.StudentsInfo.items.length +
                    " / " +
                    subject.total +
                    " ]"}
                </div>
              </div>
            );
          })}
      </div>
      <div className="main-table">
        <h2>the Information of Teachers</h2>
        <div className="main-table-teacher-column">
          <div className="table-header">Name</div>
          <div className="table-header">Subject</div>
          <div className="table-header">State</div>
        </div>
        {[]
          .concat(teachers.listTeachers.items)
          .filter((obj) => {
            return obj.id !== "0";
          })
          .map((teacher, index) => {
            return (
              <div key={index} className="main-table-teacher-column">
                <div className="table-value">{teacher.name}</div>
                <div className="table-value">{teacher.SubjectInfo.subject}</div>
                <div className="table-value">
                  {(teacher.SubjectInfo.subject === "NO SUBJECT" && "-") ||
                    (teacher.SubjectInfo.endApply >= newDate && "Applying") ||
                    "Started"}
                </div>
              </div>
            );
          })}
      </div>
      <div className="main-table">
        <h2>the Information of Students</h2>
        <div className="main-table-student-column">
          <div className="table-header">Total</div>
          <div className="table-header">Applicant</div>
          <div className="table-header">Not</div>
        </div>
        <div className="main-table-student-column">
          <div className="table-value">
            {
              [].concat(students.listStudents.items).filter((obj) => {
                return obj.id !== "0";
              }).length
            }
          </div>
          <div className="table-value">
            {
              []
                .concat(students.listStudents.items)
                .filter((obj) => {
                  return obj.id !== "0";
                })
                .filter((obj) => {
                  return obj.sbId !== "0";
                }).length
            }
          </div>
          <div className="table-value">
            {
              []
                .concat(students.listStudents.items)
                .filter((obj) => {
                  return obj.id !== "0";
                })
                .filter((obj) => {
                  return obj.sbId === "0";
                }).length
            }
          </div>
        </div>
      </div>
      <div className="main-table">
        <h2>Notice</h2>
        <div className="notice-box">
          <div className="notice-title">1. 본 페이지의 기능</div>
          <div className="notice-content">
            {" "}
            - 본 페이지는 학원 관리 웹 어플리케이션으로 학생, 수업, 교사 3가지
            분류로 나누어 데이터를 관리 하도록 설계 된 페이지이다.
          </div>
          <div className="notice-title">2. 본 페이지 사용 기술</div>
          <div className="notice-content">
            {" "}
            - 본 페이지에는 AWS Amplify, AWS Appsync, AWS DynamoDB,
            NodeJs(v12.16.2), ReactJS(v16.13.1), ReactHooks(v3.1.5), Apollo,
            Graphql, Github 기술이 사용되어 만들어졌다.
          </div>
          <div className="notice-title">3. 본 페이지의 목적</div>
          <div className="notice-content">
            {" "}
            - 본 페이지는 포트폴리오를 목적으로 제작 되었다.
          </div>
        </div>
      </div>
      <div className="main-table">
        <h2>Version Record</h2>
        <div className="notice-box">
          <div className="notice-title">1.0.0</div>
          <div className="notice-content">
            - ReactJS 앱 AWS Amplify, AWS Appsync, AWS DynamoDB, Github 이용하여
            빌드
            <br />- [메인, 학생, 수업, 교사] 페이지 제작
          </div>
          <div className="notice-title">1.0.1</div>
          <div className="notice-content">
            - AWS Appsync(Graphql)을 이용하여 AWS DynamoDB CRUD 제작
          </div>
          <div className="notice-title">1.0.2</div>
          <div className="notice-content">
            - 학생(/students) 페이지 제작
            <br />- AWS DynamoDB에서 받은 학생 리스트 출력
            <br />- 학생이 선택한 수업 변경
            <br />- 학생 정보 입력, 변경, 삭제
            <br />- 학생 정보 정렬, 검색, 조건
          </div>
          <div className="notice-title">1.0.3</div>
          <div className="notice-content">
            - 수업(/subjects) 페이지 제작
            <br />- AWS DynamoDB에서 받은 수업 리스트 출력
            <br />- 수업 담당 교사 변경
            <br />- 수업 정보 입력, 변경, 삭제
            <br />- 수업 정보 정렬, 검색, 조건
          </div>
          <div className="notice-title">1.0.4</div>
          <div className="notice-content">
            - 교사(/teachers) 페이지 제작
            <br />- AWS DynamoDB에서 받은 교사 리스트 출력
            <br />- 교사 담당 수업 변경
            <br />- 교사 정보 입력, 변경, 삭제
            <br />- 교사 정보 정렬, 검색, 조건
          </div>
          <div className="notice-title">1.0.5</div>
          <div className="notice-content">
            - 메인(/) 페이지 제작
            <br />- 수업 리스트 정보 출력
            <br />- 교사 리스트 정보 출력
            <br />- 학생수 출력
            <br />- 공지, 버전 기록, 할일 목록 입력
          </div>
        </div>
      </div>
      <div className="main-table">
        <h2>Todo List</h2>
        <div className="notice-box">
          <div className="notice-title">코드 정리</div>
          <div className="notice-content">
            - 제작 시 작성한 프로토 타입 코드 삭제
            <br />- 중복 된 코드 삭제 및 정리
            <br />- 동일 기능 함수화 하여 정리
            <br />- 테스트 콘솔 삭제
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
