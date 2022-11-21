import React from "react";
import Image from "next/image";
import Link from "next/link";

const Index = () => {
  const [show, setShow] = React.useState(false);

  const showNav = () => {
    if (show === true) {
      setShow(false);
    } else if (show === false) {
      setShow(true);
    }
  };

  return (
    <>
      <div className="nav_main">
        <Link href="/">
          <Image
            src="/images/frankly_hash.svg"
            width={132}
            height={35.59}
            objectFit="cover"
            alt="frankly logo"
          />
        </Link>
        <div className="links">
          <a className="header_link work_link" href="">
            How it works?
          </a>
          <Link className="header_link faq_link" href="/faq">
            FAQs
          </Link>
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
          <Image src="/images/facebook.svg" width={24} height={24} objectFit="cover" alt="icon" />
        </div>
        <div className="mob-icon" onClick={showNav}>
          {show === false ? (
            <Image
              className="twitter_icon"
              src="/images/mobile-icon.svg"
              width={24}
              height={24}
              objectFit="cover"
              alt="icon"
            />
          ) : (
            <Image
              className="twitter_icon"
              src="/images/close.svg"
              width={24}
              height={24}
              objectFit="cover"
              alt="icon"
            />
          )}
        </div>
      </div>

      {show === true && (
        <div className="mobile-nav">
          <div className="links_mob">
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
          <div className="icon_logo_mob">
            <Image
              className="twitter_icon"
              src="/images/twitter.svg"
              width={24}
              height={24}
              objectFit="cover"
              alt="icon"
            />
            <Image src="/images/facebook.svg" width={24} height={24} objectFit="cover" alt="icon" />
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
