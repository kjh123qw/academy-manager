import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/students">STUDENTS</Link>
        </li>
        <li>
          <Link to="/subjects">SUBJECTS</Link>
        </li>
        <li>
          <Link to="/teachers">TEACHERS</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
