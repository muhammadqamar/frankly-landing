import React from "react";
import Image from "next/image";

const Index = () => {
  return (
    <div className="footer">
      <div className="footer_main">
        <div className="footer_frankly_logo">
          <div className="footer-logo">
            <Image
              src="/images/footer_frankly_logo.svg"
              width={324}
              height={87.37}
              objectFit="cover"
              alt="frankly logo"
            />
            <h3 className="footer_subheading">
              Frankly is a platform that lets customers earn unlimited cash back for views generated
              on social.
            </h3>
          </div>
          <div className=" footer_btns">
            <div className="btn_bx">
              <button className="btn">Submit Reel</button>
            </div>
            <div className="btn_bx">
              <button className="btn btn_brand">I’m a brand</button>
            </div>
          </div>
        </div>
        <div className="content_bx">
          <Image
            className="insta_star"
            src="/images/insta_star.svg"
            width={72.86}
            height={71.68}
            objectFit="cover"
            alt="logo"
          />
          <Image
            className="insta_twitter"
            src="/images/footer_twitter.svg"
            width={64.89}
            height={61.21}
            objectFit="cover"
            alt="logo"
          />
        </div>
        <div className="footer_links">
          <div className="footer_link_bx">
            <a className="footer_link" href="">
              Terms of Use
            </a>
            <a className="footer_link" href="">
              Privacy Policy
            </a>
            <a className="footer_link" href="">
              Contact
            </a>
          </div>
          <p className="footer_emailPara">hello@frankly.co.in</p>
        </div>
        <div className="horizontal_line"></div>
        <p className="footer_para">2022. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Index;
