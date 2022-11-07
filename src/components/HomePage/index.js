import React from "react";
import Image from "next/image";
import LetsBreakSection from "./LetsBreakSection";
import ClubSection from "./ClubSection";
import { FranklyAbout } from "./FranklyAbout";
import EarnCash from "./EarnCash";

const Index = () => {
  return (
    <>
      <div className="hero_container">
        <div className="hero_main">
          <div className="hero_bx">
            <Image
              src="/images/hero_Img.svg"
              width={1174.24}
              height={450.92}
              objectFit="cover"
              alt="hero logo"
            />
          </div>
        </div>
      </div>
      <div className="reel_paid_bg">
        <div className="reel_paid">
          <h4 className="hero_heading">
            Just Shopped? <br /> Reel It.
            <span className="get-paid-text">Get Paid.</span>
          </h4>
          <Image
            className="smile smile_one"
            src="/images/purple_little_smile.svg"
            width={57.68}
            height={57.68}
            objectFit="cover"
            alt="logo"
          />
          <Image
            className="smile smile_two"
            src="/images/purple_smile.svg"
            width={90.44}
            height={90.44}
            objectFit="cover"
            alt="logo"
          />
          <Image
            className="smile smile_three"
            src="/images/orange_smile.svg"
            width={57.68}
            height={57.68}
            objectFit="cover"
            alt="logo"
          />
        </div>
      </div>

      <EarnCash />

      <LetsBreakSection />
      <ClubSection />
      <FranklyAbout />
      <div className="great_moves">
        <Image
          className="logo"
          src="/images/logo2.svg"
          width={197}
          height={104}
          objectFit="cover"
          alt="logo"
        />
        <h5>CREATE WHAT MOVES YOU</h5>
      </div>
    </>
  );
};

export default Index;
