import React from 'react';
import Image from 'next/image';
const ClubSection = () => {
  return (
    <section>
      <div className="main_container _club-section-div">
        <div className='_club-detail'>
          <div>
            <Image
              src="/images/club_01.svg"
              width={656}
              height={301}
              objectFit="cover"
              alt="logo"
            />
          </div>
          <div className='detail-div'>
            <h2>not in the K’s Club?</h2>
            <p>
              F**k follower count. We help you get paid to show brand love & vet
              post creativity and quality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubSection;
