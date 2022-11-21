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
        <div className=" icon_logo header_btns">
          <div className="_let-break-btn-box">
            <button className="same-btn unique_btn">
              {" "}
              <Link href="">Submit Reel</Link>
            </button>
          </div>
          <div className="btn_bx">
            <div className="_let-break-btn-box">
              <button className="same-btn unique_btn">
                <Link href="https://w5jl1zzzi5r.typeform.com/to/H5whuaGA">I’m a brand</Link>
              </button>
            </div>
          </div>
          <Link href="https://www.instagram.com/franklyapp/">
            <Image
              src="/images/instagram.svg"
              width={35}
              height={35}
              objectFit="cover"
              alt="icon"
            />
          </Link>
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
          <div className=" icon_logo header_btns header_mob_btns">
            <div className="_let-break-btn-box">
              <button className="same-btn unique_btn">Submit Reel</button>
            </div>
            <div className="btn_bx">
              <div className="_let-break-btn-box">
                <button className="same-btn unique_btn">
                  <Link href="https://w5jl1zzzi5r.typeform.com/to/H5whuaGA">I’m a brand</Link>
                </button>
              </div>
            </div>
            <Link href="https://www.instagram.com/franklyapp/">
              <Image
                src="/images/instagram.svg"
                width={35}
                height={35}
                objectFit="cover"
                alt="icon"
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
