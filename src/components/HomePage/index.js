import React from "react";
import Image from "next/image";
import LetsBreakSection from "./LetsBreakSection";
import ClubSection from "./ClubSection";
import { FranklyAbout } from "./FranklyAbout";

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
      <div className="reel_paid">
        <h4 className="hero_heading">Just Shopped? Reel It. Get Paid.</h4>
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
    <LetsBreakSection/>
    <ClubSection/>
    <FranklyAbout/>
    </>
     
  );
};

export default Index;
