import React from "react";
import Image from "next/image";

const LetsBreakSection = () => {
  return (
    <section>
      <div className="main_container">
        <div className="_let-break-div">
          {/* Heading */}
          <div className="_let-break-heading">
            <h2>Let’s break it down!</h2>
          </div>
          {/* Card */}
          <div className="_let-break-cards-detail">
            {/* One */}
            <div className="card-detail">
              <Image
                src="/images/break_01.svg"
                width={342}
                height={308}
                objectFit="cover"
                alt="logo"
              />
              <h3>Hop onboard! </h3>
              <p>Enter your Phone Number</p>
            </div>
            {/* Two */}
            <div className="card-detail">
              <Image
                src="/images/break_02.svg"
                width={342}
                height={308}
                objectFit="cover"
                alt="logo"
              />
              <h3>Create Content </h3>
              <p>{`"Submit Reels"... instead of "Post Reels"`}</p>
            </div>
            {/* Three */}
            <div className="card-detail">
              <Image
                src="/images/break_03.svg"
                width={342}
                height={308}
                objectFit="cover"
                alt="logo"
              />
              <h3>Earn & Enjoy</h3>
              <p>Boom! Earn on post performance & cash out</p>
            </div>
          </div>
          {/*Button  */}
          <div className="_let-break-btn">
            <div className="_let-break-btn-box">
              <button className="same-btn btn_brand">START EARNING</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LetsBreakSection;
