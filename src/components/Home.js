import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { listTeachers, listSubjects, listStudents } from "../graphql/queries";

import flagKor from "../images/Flag_of_South_Korea.png";
import flagJpn from "../images/Flag_of_Japan.png";
import sortDate from "../sortDate";
import "./Home.css";

const Home = () => {
  const [selectedLang, setSelectedLang] = useState("JP");
  let date = new Date();
  let year = date.getFullYear();
  let month =
    1 + date.getMonth() >= 10
      ? 1 + date.getMonth()
      : "0" + (1 + date.getMonth());
  let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
  const newDate = Number(year + "" + month + "" + day);
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
  const {
    loading: tcLoading,
    error: tcError,
    data: teachers,
    refetch: tcRefetch,
    networkStatus: tcNetworkStatus,
  } = useQuery(gql(listTeachers), {
    notifyOnNetworkStatusChange: true,
  });
  // const { loading: stuLoading, error: stuError, data: students } = useQuery(
  //   gql(listStudents)
  // );
  // const { loading: sbjLoading, error: sbjError, data: subjects } = useQuery(
  //   gql(listSubjects)
  // );
  // const { loading: tcLoading, error: tcError, data: teachers } = useQuery(
  //   gql(listTeachers)
  // );
  if (stuLoading || sbjLoading || tcLoading)
    return (
      <div className="loading-layer">
        <div>Loading...</div>
      </div>
    );

  const contentJp = () => {
    return (
      <>
        <div className="main-table">
          <h2>Notice</h2>
          <div className="notice-box">
            <div className="notice-title">１．このページの機能</div>
            <div className="notice-content">
              {" "}
              　-　このページはアカデミーの管理をする目的で、学生、授業、教師の3種類で分類してデータを管理するように設計したページである。
            </div>
            <div className="notice-title">２．このページで使用した技術</div>
            <div className="notice-content">
              {" "}
              　-　このページではAWS Amplify, AWS Appsync, AWS DynamoDB,
              NodeJs(v12.16.2), ReactJS(v16.13.1), ReactHooks(v3.1.5), Apollo,
              Graphql, Githubの技術を使って制作した。
            </div>
            <div className="notice-title">３．このページの目的</div>
            <div className="notice-content">
              {" "}
              　-　このページはポートフォリオの目的で制作した。
            </div>
            <div className="notice-title">４．政策の期間</div>
            <div className="notice-content">　-　2020/05/26 ~</div>
            <div className="notice-title">５．テストしたブラウザ</div>
            <div className="notice-content">　-　Microsoft Edge, Chrome</div>
          </div>
        </div>
        <div className="main-table">
          <h2>Version record</h2>
          <div className="notice-box">
            <div className="notice-title">1.0.0 (05/26)</div>
            <div className="notice-content">
              　-　ReactJSのアプリをAWS Amplify, AWS Appsync, AWS DynamoDB,
              Githubを利用してビルドとデータの連結。
              <br />
              　-　「メーン、学生、授業、教師」のページを制作。
            </div>
            <div className="notice-title">1.0.1 (05/27)</div>
            <div className="notice-content">
              　-　AWS Appsync(Graphql)を利用してAWS DynamoDB CRUDの制作。
            </div>
            <div className="notice-title">1.0.2 (05/28)</div>
            <div className="notice-content">
              　-　学生(/students)のページを制作。
              <br />
              　-　AWS DynamoDBでもらった学生のリストを出力。
              <br />
              　-　学生の選択した授業変更。
              <br />
              　-　学生の情報を入力、変更、削除。
              <br />
              　-　学生の情報を整列、検索。
            </div>
            <div className="notice-title">1.0.3 (05/29)</div>
            <div className="notice-content">
              　-　授業(/subjects)のページを制作。
              <br />
              　-　AWS DynamoDBでもらった授業のリストを出力。
              <br />
              　-　授業の担当教師を変更。
              <br />
              　-　授業の情報を入力、変更、削除。
              <br />
              　-　授業の情報を整列、検索。
            </div>
            <div className="notice-title">1.0.4 (05/30)</div>
            <div className="notice-content">
              　-　教師(/teachers)のページを制作。
              <br />
              　-　AWS DynamoDBでもらった教師のリストを出力。
              <br />
              　-　教師の担当の授業を変更。
              <br />
              　-　の情報を入力、変更、削除。
              <br />
              　-　教師の情報を整列、検索。
            </div>
            <div className="notice-title">1.0.5 (05/31)</div>
            <div className="notice-content">
              　-　メーン(/)のページを制作
              <br />
              　-　授業のリストの情報を出力
              <br />
              　-　教師のリ教師の情報を出力
              <br />
              　-　学生数を出力
              <br />
              　-　Notice, Version record, Todo listを入力
            </div>
            <div className="notice-title">1.0.6 (06/01)</div>
            <div className="notice-content">
              　-　学生(/students)のページのデータのバグを修正
              <br />
              　-　授業(/subjects)のページのデータのバグを修正
              <br />
              　-　教師(/teachers)のページのデータのバグを修正
            </div>
          </div>
        </div>
        <div className="main-table">
          <h2>Todo list</h2>
          <div className="notice-box">
            <div className="notice-title">コードを修正</div>
            <div className="notice-content">
              　-　プロトタイプのコードを削除。
              <br />
              　-　データをページング処理。
              <br />
              　-　重複されたコードを削除と整理。
              <br />
              　-　同じ機能をモジュール化。
              <br />
              　-　テストのコンソールを削除。
              <br />
              　-　最後のテスト。
            </div>
          </div>
        </div>
      </>
    );
  };
  const contentKr = () => {
    return (
      <>
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
            <div className="notice-title">4. 제작 기간</div>
            <div className="notice-content"> - 2020/05/26 ~</div>
          </div>
        </div>
        <div className="main-table">
          <h2>Version record</h2>
          <div className="notice-box">
            <div className="notice-title">1.0.0 (05/26)</div>
            <div className="notice-content">
              - ReactJS 앱 AWS Amplify, AWS Appsync, AWS DynamoDB, Github 를
              이용하여 빌드
              <br />- [메인, 학생, 수업, 교사] 페이지 제작
            </div>
            <div className="notice-title">1.0.1 (05/27)</div>
            <div className="notice-content">
              - AWS Appsync(Graphql)을 이용하여 AWS DynamoDB CRUD 제작
            </div>
            <div className="notice-title">1.0.2 (05/28)</div>
            <div className="notice-content">
              - 학생(/students) 페이지 제작
              <br />- AWS DynamoDB에서 받은 학생 리스트 출력
              <br />- 학생이 선택한 수업 변경
              <br />- 학생 정보 입력, 변경, 삭제
              <br />- 학생 정보 정렬, 검색, 조건
            </div>
            <div className="notice-title">1.0.3 (05/29)</div>
            <div className="notice-content">
              - 수업(/subjects) 페이지 제작
              <br />- AWS DynamoDB에서 받은 수업 리스트 출력
              <br />- 수업 담당 교사 변경
              <br />- 수업 정보 입력, 변경, 삭제
              <br />- 수업 정보 정렬, 검색, 조건
            </div>
            <div className="notice-title">1.0.4 (05/30)</div>
            <div className="notice-content">
              - 교사(/teachers) 페이지 제작
              <br />- AWS DynamoDB에서 받은 교사 리스트 출력
              <br />- 교사 담당 수업 변경
              <br />- 교사 정보 입력, 변경, 삭제
              <br />- 교사 정보 정렬, 검색, 조건
            </div>
            <div className="notice-title">1.0.5 (05/31)</div>
            <div className="notice-content">
              - 메인(/) 페이지 제작
              <br />- 수업 리스트 정보 출력
              <br />- 교사 리스트 정보 출력
              <br />- 학생수 출력
              <br />- 공지, 버전 기록, 할일 목록 입력
            </div>
            <div className="notice-title">1.0.6 (06/01)</div>
            <div className="notice-content">
              - 학생(/students) 페이지 데이터 버그 수정
              <br />- 수업(/subjects) 페이지 데이터 버그 수정
              <br />- 교사(/teachers) 페이지 데이터 버그 수정
            </div>
          </div>
        </div>
        <div className="main-table">
          <h2>Todo list</h2>
          <div className="notice-box">
            <div className="notice-title">코드 정리</div>
            <div className="notice-content">
              - 제작 시 작성한 프로토 타입 코드 삭제
              <br />- 데이터 페이징 처리
              <br />- 중복 된 코드 삭제 및 정리
              <br />- 동일 기능 함수화 하여 정리
              <br />- 테스트 콘솔 삭제
              <br />- 최종 테스트
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="main-table-wrap">
      <div className="main-table">
        <h2>The list of subjects</h2>
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
                  {(subject.endApply < newDate && "Started") ||
                    (subject.total <= subject.StudentsInfo.items.length &&
                      "Full") ||
                    (subject.startApply > newDate && "Ready") ||
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
        <h2>The information of teachers</h2>
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
                    (teacher.SubjectInfo.endApply < newDate && "Started") ||
                    (teacher.SubjectInfo.total <=
                      teacher.SubjectInfo.StudentsInfo.items.length &&
                      "Full") ||
                    (teacher.SubjectInfo.endApply >= newDate && "Applying") ||
                    "Started"}
                </div>
              </div>
            );
          })}
      </div>
      <div className="main-table">
        <h2>The information of students</h2>
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
        <h2>The number of items</h2>
        <div className="main-table-student-column">
          <div className="table-header">Students</div>
          <div className="table-header">Subjects</div>
          <div className="table-header">Teachers</div>
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
              [].concat(subjects.listSubjects.items).filter((obj) => {
                return obj.id !== "0";
              }).length
            }
          </div>
          <div className="table-value">
            {
              [].concat(teachers.listTeachers.items).filter((obj) => {
                return obj.id !== "0";
              }).length
            }
          </div>
        </div>
      </div>
      <div className="main-line">
        <div></div>
      </div>
      <div className="lang-btn">
        <div
          className={(selectedLang === "KR" && "lang-btn-selected") || ""}
          onClick={() => {
            setSelectedLang("KR");
          }}
        >
          <div>
            <img src={flagKor} />
          </div>
          <div>KOREAN</div>
        </div>
        <div
          className={(selectedLang === "JP" && "lang-btn-selected") || ""}
          onClick={() => {
            setSelectedLang("JP");
          }}
        >
          <div>
            <img src={flagJpn} />
          </div>
          <div>JAPANESE</div>
        </div>
      </div>
      {(selectedLang === "KR" && contentKr()) || ""}
      {(selectedLang === "JP" && contentJp()) || ""}
    </div>
  );
};

export default Home;
