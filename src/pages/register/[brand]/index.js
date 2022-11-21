import { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { useRouter } from "next/router";
import Head from "next/head";

const Register = () => {
  const [activeScreen, setActiveScreen] = useState("welcome");
  const [errorCustom, setErrorCustom] = useState("");
  const router = useRouter();
  const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID);
  const formRef = useRef();

  return (
    <>
      <Head>
        <title>Frankly | Register/{router.query.brand} </title>
      </Head>
      <div className="register-form">
        <Formik
          innerRef={formRef}
          initialValues={{ phone: "", reelLink: "", email: "", paytm: "" }}
          enableReinitialize
          validate={(values) => {
            const errors = {};
            if (!values.phone) {
              errors.phone = "Required";
            }
            if (!values.reelLink) {
              errors.reelLink = "Required";
            } else if (
              !/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
                values.reelLink
              )
            ) {
              errors.reelLink = "Invalid URL";
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
            const newDate = new Date();
            const result = await sheet.addRow({
              Phone: "+91" + values.phone,
              Email: values.email,
              ["Reel Link"]: values.reelLink,
              PayTM: values.paytm,
              Brand: router.query.brand,
              Timestamp: newDate.toLocaleString(),
            });

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
                  <div className="well-come-fra">
                    <Image
                      src="/images/logo.svg"
                      alt="Picture of the author"
                      width="280"
                      height="82"
                    />
                  </div>
                  <div className="welcome-img">
                    <Image
                      src="/images/welcome.png"
                      alt="Picture of the author"
                      width="227"
                      height="331"
                    />
                  </div>
                  <div className="india_code">
                    <span>+91</span>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone.replace(/\D/g, "")}
                    />
                  </div>
                  <div className="error">{errorCustom}</div>
                  <div className="btn-cover">
                    <button
                      type="button"
                      onClick={() => {
                        if (values.phone) {
                          setActiveScreen("earn now");
                        } else {
                          setErrorCustom("required");
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
                  <p className="earn-sub-text">
                    with <span style={{ textTransform: "capitalize" }}>{router.query.brand}</span>{" "}
                    and
                  </p>
                  <button className="earn-button">EARN ₹</button>
                  <div className="hand-img">
                    <Image src="/images/hand.svg" alt="hand" width="165" height="292" />
                  </div>
                  <div className="btn-cover">
                    <button
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
                      Your CREATIVITY would be rewarded. Make sure to have fun with your Reel!
                    </li>
                  </ul>

                  <input
                    type="url"
                    name="reelLink"
                    placeholder="Paste Reel Link here"
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
                        if (!errors.reelLink) {
                          setActiveScreen("congrats");
                        }
                      }}
                      className="register-button"
                    >
                      Next
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
    </>
  );
};

export default Register;
