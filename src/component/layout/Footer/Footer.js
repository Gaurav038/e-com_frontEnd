import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority We also deliver amazing offers, such as Instant Discounts</p>

        <p>Copyrights 2023 &copy; Gaurav Singh</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.linkedin.com/in/gaurav-singh-b2277a1a5/">Instagram</a>
        <a href="https://www.linkedin.com/in/gaurav-singh-b2277a1a5/">Linkdin</a>
        <a href="https://www.linkedin.com/in/gaurav-singh-b2277a1a5/">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;