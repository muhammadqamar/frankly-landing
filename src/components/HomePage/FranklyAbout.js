import React from "react";
import Image from "next/image";

export const FranklyAbout = () => {
  return (
    <div className="frank_bg">
      <div className="_frank-div">
        <div className="fink-detail">
          <h2>Hi, we’re Frankly</h2>
          <p>
            We believe everyone has the power to produce great content and create and impact. At
            Frankly our aim is to connect Brands that are looking to reward their loyal shoppers for
            posting Reels about stuff they genuinely bought and love, regardless of how many
            followers they have. Time to get you Paid to do what you love the most. Be Frank and
            Creative and Earn with Frankly.
          </p>
        </div>
        <div className="fink-img">
          <Image src="/images/fran_01.svg" width={556} height={701} objectFit="cover" alt="logo" />
        </div>
      </div>
    </div>
  );
};
