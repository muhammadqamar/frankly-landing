import { useState } from "react";
import { Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { useRouter } from "next/router";

const Register = () => {
  const [activeScreen, setActiveScreen] = useState("welcome");
  const router = useRouter();
  const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID);

  return (
    <div className="register-form">
      <Formik
        initialValues={{ phone: "", reelLink: "", email: "", paytm: "" }}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (!values.phone) {
            errors.phone = "Required";
          }
          if (!values.reelLink) {
            errors.reelLink = "Required";
          }
          if (!values.paytm) {
            errors.paytm = "Required";
          }
          if (!values.email) {
            errors.email = "Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await doc.useServiceAccountAuth({
            client_email: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          });
          await doc.loadInfo();
          const sheet = doc.sheetsByIndex[0];
          const result = await sheet.addRow({
            Phone: values.phone,
            Email: values.email,
            ["Reel Link"]: values.reelLink,
            PayTM: values.paytm,
            Brand: router.query.brand,
          });
          console.log();
          if (result._rowNumber) {
            setActiveScreen("done");
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
            {activeScreen === "welcome" && (
              <div className="form-register-container welcome">
                <h1>Welcome to</h1>
                <Image src="/images/logo.svg" alt="Picture of the author" width="280" height="82" />
                <div className="welcome-img">
                  <Image
                    src="/images/welcome.png"
                    alt="Picture of the author"
                    width="227"
                    height="331"
                  />
                </div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                <div className="error">{errors.phone && touched.phone && errors.phone}</div>
                <div className="btn-cover">
                  <button
                    type="submit"
                    onClick={() => {
                      if (values.phone) {
                        setActiveScreen("earn now");
                      }
                    }}
                    className="register-button"
                  >
                    Start earning
                  </button>
                </div>
              </div>
            )}
            {activeScreen === "earn now" && (
              <div className="form-register-container earn-section">
                <div className="controls">
                  <Image
                    src="/images/back.svg"
                    alt="back"
                    width="10"
                    height="19"
                    onClick={() => {
                      setActiveScreen("welcome");
                    }}
                  />
                  <Link href="/">
                    <Image src="/images/home.svg" alt="home" width="23" height="23" />
                  </Link>
                </div>

                <h2 className="earn-text">
                  Post a Reel about <br /> your <span>expereince</span>
                </h2>
                <p className="earn-sub-text">with {router.query.brand} and</p>
                <button className="earn-button">EARN ₹</button>
                <div className="hand-img">
                  <Image src="/images/hand.svg" alt="hand" width="165" height="292" />
                </div>
                <div className="btn-cover">
                  <button
                    type="submit"
                    onClick={() => {
                      setActiveScreen("reel");
                    }}
                    className="register-button"
                  >
                    Earn Now
                  </button>
                </div>
              </div>
            )}
            {activeScreen === "reel" && (
              <div className="form-register-container post-guideines">
                <div className="controls">
                  <Image
                    src="/images/back.svg"
                    alt="back"
                    width="10"
                    height="19"
                    onClick={() => {
                      setActiveScreen("earn now");
                    }}
                  />

                  <Link href="/">
                    <Image src="/images/home.svg" alt="home" width="23" height="23" />
                  </Link>
                </div>
                <div className="title-flex">
                  <Image src="/images/hash.svg" alt="hash" width="36" height="44" />
                  <h2 className="post-title">Post Guideines</h2>
                </div>

                <ul>
                  <li>Tag @XXX and add our hashtag #Frankly to your caption.</li>
                  <li> Show love to XXXX by making it the highlight of your reel.</li>
                  <li>
                    Your CREATIVITY would be rewarded. Most importantly, Have fun with your Reels!
                  </li>
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
                        setActiveScreen("congrats");
                      }
                    }}
                    className="register-button"
                  >
                    Submit Reel
                  </button>
                </div>
              </div>
            )}

            {activeScreen === "congrats" && (
              <div className="form-register-container congratulations ">
                <div className="controls">
                  <Image
                    src="/images/back.svg"
                    alt="back"
                    width="10"
                    height="19"
                    onClick={() => {
                      setActiveScreen("reel");
                    }}
                  />
                  <Link href="/">
                    <Image src="/images/home.svg" alt="home" width="23" height="23" />
                  </Link>
                </div>
                <div className="frankly-logo">
                  <Image src="/images/logo2.svg" alt="home" width="196" height="104" />
                </div>
                <h2 className="congratulations-heading">Congratulations!</h2>
                <h3 className="sub-heading">
                  You’re on the path to make your purchases pay for themselves!
                </h3>
                <h3 className="sub-heading-two">
                  Enter your email address and phone number below.
                </h3>

                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <div className="error">{errors.email && touched.email && errors.email}</div>
                <input
                  type="text"
                  name="paytm"
                  placeholder="PayTm/UPI ID"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.paytm}
                />
                <div className="error">{errors.paytm && touched.paytm && errors.paytm}</div>
                <div className="btn-cover">
                  <button disabled={isSubmitting} type="submit" className="register-button">
                    {isSubmitting ? "Submitting ..." : "Done"}
                  </button>
                </div>
              </div>
            )}

            {activeScreen === "done" && (
              <div className="form-register-container  posted">
                <div className="controls">
                  <Image
                    src="/images/back.svg"
                    alt="back"
                    width="10"
                    height="19"
                    onClick={() => {
                      setActiveScreen("congrats");
                    }}
                  />
                  <Link href="/">
                    <Image src="/images/home.svg" alt="home" width="23" height="23" />
                  </Link>
                </div>

                <h2 className="posted-main-heading">YAY! You’re all set!</h2>

                <h3 className="post-sub-heading">
                  We’ll reach out to you via email to get you paid after 72
                </h3>
                <h3 className="post-sub-two-heading">hours after the reel was posted.</h3>
                <div className="post-img">
                  <Image src="/images/done.svg" alt="home" width="304" height="327" />
                </div>
              </div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
