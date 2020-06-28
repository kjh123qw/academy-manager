import React from "react";
import { withRouter, Link } from "react-router-dom";

import "./Header.css";

const Header = (props) => {
  // console.log(props.location.pathname);
  return (
    <>
      <header>
        <Link to="/">
          <div
            className={
              (props.location.pathname === "/" && "main-header-selected") ||
              "main-header"
            }
          >
            ACADEMY MANAGER
          </div>
        </Link>
      </header>
      <nav>
        <ul>
          <li>
            <Link
              to="/students"
              className={
                (props.location.pathname === "/students" && "nav-selected") ||
                ""
              }
            >
              STUDENTS
            </Link>
          </li>
          <li>
            <Link
              to="/subjects"
              className={
                (props.location.pathname === "/subjects" && "nav-selected") ||
                ""
              }
            >
              SUBJECTS
            </Link>
          </li>
          <li>
            <Link
              to="/teachers"
              className={
                (props.location.pathname === "/teachers" && "nav-selected") ||
                ""
              }
            >
              TEACHERS
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default withRouter(Header);
