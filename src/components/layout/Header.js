import React from "react";
import Image from "next/image";

const Index = () => {
  return (
    <div className="nav_main">
      <Image
        src="/images/frankly_hash.svg"
        width={132}
        height={35.59}
        objectFit="cover"
        alt="frankly logo"
      />
      <div className="links">
        <a className="header_link work_link" href="">
          How it works?
        </a>
        <a className="header_link faq_link" href="">
          FAQs
        </a>
        <a className="header_link" href="">
          Say hi
        </a>
      </div>
      <div className="icon_logo">
        <Image
          className="twitter_icon"
          src="/images/twitter.svg"
          width={24}
          height={24}
          objectFit="cover"
          alt="icon"
        />
        <Image
          src="/images/facebook.svg"
          width={24}
          height={24}
          objectFit="cover"
          alt="icon"
        />
      </div>
    </div>
  );
};

export default Index;
