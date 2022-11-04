import { useState } from 'react';
import { Formik } from 'formik';
import Link from 'next/link';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { useRouter } from 'next/router'


const Register = () => {
  const [activeScreen, setActiveScreen] = useState('welcome');
  const router = useRouter()
  const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID);

  return (
    <div className="register-form">
      <Formik
        initialValues={{ phone: '', reelLink: '', email: '', paytm: '' }}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (!values.phone) {
            errors.phone = 'Required';
          }
          if (!values.reelLink) {
            errors.reelLink = 'Required';
          }
          if (!values.paytm) {
            errors.paytm = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await doc.useServiceAccountAuth({
            client_email: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(
              /\\n/g,
              '\n'
            ),
          });
          await doc.loadInfo();
          const sheet = doc.sheetsByIndex[0];
          const result = await sheet.addRow({
            Phone: values.phone,
            Email: values.email,
            ['Reel Link']: values.reelLink,
            ['PayTM/UPI ID']: values.paytm,
            Brand: router.query.brand,
          });
          console.log();
          if(result._rowNumber) {
            setActiveScreen('done')
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            {activeScreen === 'welcome' && (
              <div className="form-register-container welcome">
                <h1>Welcome</h1>

                <img src="/images/logo.svg" alt="" />
                <img src="/images/welcome.svg" alt="" className="welcome-img" />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                <div className="error">
                  {errors.phone && touched.phone && errors.phone}
                </div>
                <div className="btn-cover">
                <button
                  type="submit"
                  onClick={() => {
                    if (values.phone) {
                      setActiveScreen('earn now');
                    }
                  }}
                  className="register-button"
                >
                  Start earning
                </button>
                </div>
              </div>
            )}
            {activeScreen === 'earn now' && (
              <div className="form-register-container">
                <div className="controls">
                  <img
                    src="/images/back.svg"
                    alt="back"
                    onClick={() => {
                      setActiveScreen('welcome');
                    }}
                  />
                  <Link href="/">
                    <img src="/images/home.svg" alt="home" />
                  </Link>
                </div>

                <h1>
                  Post a Reel about your <span>expereince</span>{' '}
                </h1>
                <p>with {router.query.brand} and</p>
                <button>EARN ₹</button>
                <img src="/images/hand.svg" alt="" />
                <div className="btn-cover">
                <button
                  type="submit"
                  onClick={() => {
                    setActiveScreen('reel');
                  }}
                  className="register-button"
                >
                  Earn Now
                </button>
                </div>
              </div>
            )}
            {activeScreen === 'reel' && (
              <div className="form-register-container">
                <div className="controls">
                  <img
                    src="/images/back.svg"
                    alt="back"
                    onClick={() => {
                      setActiveScreen('earn now');
                    }}
                  />
                  <Link href="/">
                    <img src="/images/home.svg" alt="home" />
                  </Link>
                </div>
                <div className="title-flex">
                  <img src="/images/hash.svg" alt="" />
                  <h1>Post Guideines</h1>
                </div>

                <ul>
                  <li>
                    Tag @XXX and add our hashtag #Frankly to your caption.
                  </li>
                  Show love to XXXX by making it the highlight of your reel.
                  <li>Your CREATIVITY would be rewarded.</li>
                  <li>Most importantly, Have fun with your Reels!</li>
                </ul>

                <input
                  type="url"
                  name="reelLink"
                  placeholder="Reel Link"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.reelLink}
                />
                <div className="error">
                  {errors.reelLink && touched.reelLink && errors.reelLink}
                </div>
                <div className="btn-cover">
                <button
                  type="button"
                  onClick={() => {
                    if (values.reelLink) {
                      setActiveScreen('congrats');
                    }
                  }}
                  className="register-button"
                >
                  Submit Reel
                </button>
                </div>
              </div>
            )}

            {activeScreen === 'congrats' && (
              <div className="form-register-container">
                <div className="controls">
                  <img
                    src="/images/back.svg"
                    alt="back"
                    onClick={() => {
                      setActiveScreen('reel');
                    }}
                  />
                  <Link href="/">
                    <img src="/images/home.svg" alt="home" />
                  </Link>
                </div>

                <img src="/images/logo2.svg" alt="logo" />
                <h1>Congratulations!</h1>
                <h2>
                  You’re on the path to make your purchases pay for themselves!
                </h2>
                <h3>Enter your email address and phone number below.</h3>

                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <div className="error">
                  {errors.email && touched.email && errors.email}
                </div>
                <input
                  type="text"
                  name="paytm"
                  placeholder="PayTm/UPI ID"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.paytm}
                />
                <div className="error">
                  {errors.paytm && touched.paytm && errors.paytm}
                </div>
                <div className="btn-cover">
                <button disabled={isSubmitting} type="submit" className="register-button">
                  {isSubmitting ? 'Submitting ...' : 'Done'}
                </button>
                </div>
              </div>
            )}

            {activeScreen === 'done' && (
              <div className="form-register-container">
                <div className="controls">
                  <img
                    src="/images/back.svg"
                    alt="back"
                    onClick={() => {
                      setActiveScreen('congrats');
                    }}
                  />
                  <Link href="/">
                    <img src="/images/home.svg" alt="home" />
                  </Link>
                </div>

                <h1>YAY! You’re all set!</h1>

                <h3>
                  We’ll reach out to you via email to get you paid after 72
                </h3>
                <h3>hours after the reel was posted.</h3>
                <img src="/images/done.svg" alt="" />
              </div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
