import React from "react";
import {
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillYoutube,
  AiFillInstagram,
} from "react-icons/ai";

import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div id="footer-wrap">
        <div className="footer-top">
          <div className="about-us">
            <h3>ABOUT US</h3>
            <p>
              It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with
              desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
          </div>
          <div className="contact-us">
            <h3>CONTACT US</h3>
            <p>
              02466, 7, Gosanja-ro 56-gil, Dongdaemun-gu, Seoul, Republic of
              Korea
            </p>
            <p>+82 10-7381-0416</p>
            <p>kjh123qwa&#64;gmail.com</p>
          </div>
          <div className="follow-us">
            <h3>FOLLOW US</h3>
            <AiFillFacebook />
            &nbsp;&nbsp;
            <AiFillTwitterCircle />
            &nbsp;&nbsp;
            <AiFillYoutube />
            &nbsp;&nbsp;
            <AiFillInstagram />
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copyright">
            <span>&copy; 2020 KIM JEONGHO. All rights reserved.</span>
          </div>
          <div className="footer-gnb">Privacy Policy Terms of Service</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
