import { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "./styles.module.scss";

const Register = () => {
  const [activeScreen, setActiveScreen] = useState("welcome");
  const [errorCustom, setErrorCustom] = useState("");
  const [paytm, setPaytm] = useState(false);
  const [upiId, setUpiId] = useState(false);
  const router = useRouter();
  const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID);
  const formRef = useRef();

  return (
    <>
      <Head>
        <title>Frankly | Register/{router.query.brand} </title>
      </Head>
      <div
        className={
          (activeScreen === "welcome" && `${styles.reel_form}`) ||
          (activeScreen === "congrats" &&
            `${styles.reel_form} ${styles.earn_reel_form} ${styles.congrats_form}`) ||
          `${styles.reel_form} ${styles.earn_reel_form}`
        }
      >
        {/*<div className="chat_icon">
          <Image src="/images/chat-icon.svg" alt="Picture of the author" width="38" height="38" />
  </div>*/}
        <Formik
          innerRef={formRef}
          initialValues={{
            name: "",
            phone: "",
            reelLink: "",
            email: "",
            paytm: "",
          }}
          enableReinitialize
          validate={(values) => {
            const errors = {};
            if (!values.phone) {
              errors.phone = "Required";
            }
            if (!values.name) {
              errors.name = "Required";
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
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await doc.useServiceAccountAuth({
              client_email:
                process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL,
              private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(
                /\\n/g,
                "\n"
              ),
            });
            await doc.loadInfo();
            const sheet = doc.sheetsByIndex[0];
            const newDate = new Date();
            const result = await sheet.addRow({
              Name: values.name,
              Phone: values.phone,
              Email: values.email,
              ["Reel Link"]: values.reelLink,
              ["PayTM/UPI ID"]: values.paytm,
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
                <>
                  <video autoPlay muted playsInline className={styles.myVideo}>
                    <source src="/video.mp4" type="video/mp4" />
                  </video>
                  <div
                    className={`${styles.form_reel_container} ${styles.welcome}`}
                  >
                    <div>
                      <Image
                        src="/images/dough-cream-logo.svg"
                        alt="logo"
                        width="111"
                        height="69"
                        className={styles.imgtoplogo}
                      />

                      <h1 className={styles.wlcm}>Reel Banao Reward Kamao</h1>
                    </div>

                    <Image
                      className={styles.reel_img}
                      src="/images/doodle-logo2.svg"
                      alt="logo"
                      width="23"
                      height="53"
                    />
                    <Image
                      className={styles.reel_img1}
                      src="/images/doodle-logo1.svg"
                      alt="logo"
                      width="51"
                      height="35"
                    />

                    <Image
                      src="/images/star-doodle-logo.svg"
                      alt="logo"
                      width="42"
                      height="42"
                      className={styles.reel_img3}
                    />
                    <Image
                      className={styles.reel_img4}
                      src="/images/doodle-logo3.svg"
                      alt="logo"
                      width="52"
                      height="65"
                    />

                    <div>
                      <p className={styles.reel_para}>powered by #FRANKLY</p>
                      <button
                        type="button"
                        onClick={() => setActiveScreen("earn now")}
                        className={styles.reel_started_btn}
                      >
                        Get Started
                        <Image
                          src="/images/btn-arrow.svg"
                          alt="arrow logo"
                          width="17"
                          height="18"
                        />
                      </button>
                      <p className={styles.terms_para}>
                        Terms & Conditions Apply
                      </p>
                    </div>
                  </div>
                </>
              )}
              {activeScreen === "earn now" && (
                <>
                  <div
                    className={`${styles.form_reel_container} ${styles.earn_now}`}
                  >
                    <div className={styles.controls_box}>
                      <Image
                        className={styles.control_img}
                        src="/images/back-arrow.png"
                        alt="back"
                        width="7"
                        height="10"
                        onClick={() => {
                          setActiveScreen("welcome");
                        }}
                      />
                      <Link href="/">
                        <Image
                          src="/images/comment-logo.svg"
                          alt="comment"
                          width="28"
                          height="28"
                        />
                      </Link>
                    </div>
                    <>
                      <h2 className={styles.earn_text}>
                        Steps to<span> Earn💰</span>
                      </h2>
                      <div className={styles.reel_content}>
                        <Image
                          src="/images/reel-gradient-logo.svg"
                          alt="logo"
                          width="37"
                          height="85"
                        />
                        <div className={styles.text_box}>
                          <p className={styles.earn_sub_text}>
                            <span className={styles.post}>POST</span> a Reel
                            with Dough & Cream
                          </p>
                          <p className={styles.earn_sub_text}>
                            <span className={styles.tag}>TAG</span> #Frankly &
                            @Dough&Cream <br />
                            in caption
                          </p>
                          <p className={styles.earn_sub_text}>
                            <span className={styles.earn}>EARN</span> Dough &
                            Cream Cash <br />
                            Vouchers for your creativity
                          </p>
                        </div>
                      </div>
                    </>
                    <div className={styles.images_box}>
                      <Image
                        className={styles.lines_logo}
                        src="/images/blue-lines-logo.svg"
                        alt="logo"
                        width="18"
                        height="15"
                      />
                      <img
                        className={styles.earnd_logo}
                        src="/images/reel-earnd-logo1.png"
                        alt="logo"
                      />
                    </div>

                    <button
                      onClick={() => {
                        setActiveScreen("submit reel");
                      }}
                      className={styles.earn_btn}
                    >
                      Start Earning
                      <Image
                        src="/images/reel-btn-arrow.svg"
                        alt="arrow logo"
                        width="17"
                        height="18"
                      />
                    </button>
                  </div>
                </>
              )}
              {activeScreen === "submit reel" && (
                <>
                  <div
                    className={`${styles.form_reel_container} ${styles.earn_now}`}
                  >
                    <div className={styles.controls_box}>
                      <Image
                        className={styles.control_img}
                        src="/images/back-arrow.png"
                        alt="back"
                        width="7"
                        height="10"
                        onClick={() => {
                          setActiveScreen("earn now");
                        }}
                      />
                      <Link href="/">
                        <Image
                          src="/images/comment-logo.svg"
                          alt="comment"
                          width="28"
                          height="28"
                        />
                      </Link>
                    </div>
                    <div>
                      <h2 className={styles.earn_heading}>
                        Submit your Reel link, <span>get Rewarded !</span>
                      </h2>
                      <div className={styles.padder}>
                        <div className={styles.earn_input_box}>
                          <label className={styles.label}>Full Name</label>
                          <input
                            className={styles.earn_input}
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                          />
                          <div className="error">
                            {errors.name && touched.name && errors.name}
                          </div>
                        </div>
                        <div className={styles.earn_input_box}>
                          <label className={styles.label}>Phone number</label>
                          <>
                            <input
                              className={styles.earn_input}
                              type="text"
                              name="phone"
                              placeholder="+91"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.phone.replace(/\D/g, "")}
                            />
                            <div className="error">
                              {errors.phone && touched.phone && errors.phone}
                            </div>
                          </>
                        </div>
                        <div className={styles.earn_input_box}>
                          <label className={styles.label}>
                            Paste Reel Link
                          </label>
                          <input
                            className={styles.earn_input}
                            type="url"
                            name="reelLink"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.reelLink}
                          />
                          <div className="error">
                            {errors.reelLink &&
                              touched.reelLink &&
                              errors.reelLink}
                          </div>
                        </div>
                        <div className="error">{errorCustom}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveScreen("congrats");
                      }}
                      className={`${styles.earn_btn} ${styles.submit_btn}`}
                    >
                      Submit Reel
                      <Image
                        src="/images/reel-btn-arrow.svg"
                        alt="arrow logo"
                        width="17"
                        height="18"
                      />
                    </button>
                  </div>
                </>
              )}
              {activeScreen === "congrats" && (
                <div
                  className={`${styles.form_reel_container} ${styles.earn_now}`}
                >
                  <div className={styles.congrats_box}>
                    <div className={styles.controls_welcome}>
                      <Image
                        src="/images/left-back-arrow.svg"
                        alt="back"
                        width="7"
                        height="10"
                        onClick={() => {
                          setActiveScreen("submit reel");
                        }}
                      />
                    </div>
                    <div className={styles.congrats_container}>
                      <Image
                        className={styles.congrats_logo}
                        src="/images/reel-congrats-logo.svg"
                        alt="congrats logo"
                        width="62"
                        height="75"
                      />
                      <h2 className={styles.congrats_heading}>
                        Congratulations!
                      </h2>
                      <p className={styles.congrats_para}>
                        You&rsquo;re now on the path to making your purchases
                        pay for themselves. We&rsquo;ll be in touch with you in{" "}
                        <span>72 hours.</span>
                      </p>
                    </div>
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
