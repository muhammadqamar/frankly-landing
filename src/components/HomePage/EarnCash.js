import React from "react";
import Image from "next/image";

const EarnCash = () => {
  return (
    <>
      <div className="hero_container">
        <div className="earn_main">
          <div className="earn_left">
            <h5 className="earn_subheading">Lorem Ipsum</h5>
            <h4 className="earn_heading">
              Earn <br /> Unlimited Cash
            </h4>
            <h6 className="earn_innersubheading">
              Sky is the limit! Earn on post performance and cash out with PayTm.
            </h6>
          </div>
          <div className="earn_right">
            <Image
              src="/images/earn_cash_logo.png"
              width={546}
              height={503}
              objectFit="cover"
              alt="logo"
            />
          </div>
        </div>
      </div>
      <div className="earn_purchase_bg">
        <div className="earn_purchase">
          <h2 className="earn_purchase_heading">
            MAKE YOUR PURCHASES <br />
            PAY FOR THEMSELVES
          </h2>
          <p className="earn_purchase_para">
            The more your content catches fire, the more you earn.
          </p>
        </div>
      </div>

      <div className="stay_bx_bg">
        <div className="stay_bx">
          <Image
            src="/images/stayPaid_Img.svg"
            width={933.24}
            height={518}
            objectFit="cover"
            alt="logo"
          />
        </div>
      </div>
    </>
  );
};

export default EarnCash;
