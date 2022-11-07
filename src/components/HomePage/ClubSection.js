import React from "react";
import Image from "next/image";
const ClubSection = () => {
  return (
    <div div className="club_bg">
      <div className=" _club-section-div">
        <div className="club-hash-img">
          <Image
            src="/images/club_hash.svg"
            width={340}
            height={326}
            objectFit="cover"
            alt="logo"
          />
        </div>
        <div className="_club-detail">
          <div className="club-detail-img">
            <Image
              src="/images/club_01.svg"
              width={656}
              height={301}
              objectFit="cover"
              alt="logo"
            />
          </div>
          <div className="detail-div">
            <h2>not in the K’s Club?</h2>
            <p>
              F**k follower count. We help you get paid to show brand love & vet post creativity and
              quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubSection;
