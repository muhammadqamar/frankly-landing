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
                <div
                  className={`${styles.form_reel_container} ${styles.welcome}`}
                >
                  <Image
                    src="/images/cream-logo.png"
                    alt="logo"
                    width="111"
                    height="69"
                  />
                  <h1 className={styles.wlcm}>Reel Banao Reward Kamao</h1>
                  <div className={styles.reel_img_box}>
                    <Image
                      className={styles.reel_img}
                      src="/images/reel-logo2.png"
                      alt="logo"
                      width="23"
                      height="53"
                    />
                    <Image
                      className={styles.reel_img1}
                      src="/images/reel-logo1.png"
                      alt="logo"
                      width="51"
                      height="35"
                    />
                  </div>
                  <div
                    className={`${styles.reel_img_box} ${styles.reel_img_box1}`}
                  >
                    <Image
                      src="/images/reel-logo4.png"
                      alt="logo"
                      width="42"
                      height="42"
                    />
                    <Image
                      className={styles.reel_img3}
                      src="/images/reel-logo3.png"
                      alt="logo"
                      width="52"
                      height="65"
                    />
                  </div>
                  <p className={styles.reel_para}>powered by #FRANKLY</p>
                  <button
                    type="button"
                    onClick={() => setActiveScreen("earn now")}
                    className={styles.reel_started_btn}
                  >
                    Get Started
                    <Image
                      src="/images/reel-arrow.png"
                      alt="arrow logo"
                      width="17"
                      height="18"
                    />
                  </button>
                  <p className={styles.terms_para}>Terms & Conditions Apply</p>
                </div>
              )}
              {activeScreen === "earn now" && (
                <>
                  <div
                    className={`${styles.form_reel_container} ${styles.earn_now}`}
                  >
                    <div className={styles.controls}>
                      <Image
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
                          src="/images/comment-logo.png"
                          alt="comment"
                          width="28"
                          height="28"
                        />
                      </Link>
                    </div>
                    <h2 className={styles.earn_text}>
                      Steps to<span> Earn💰</span>
                    </h2>
                    <div className={styles.reel_content}>
                      <Image
                        src="/images/reel-gradient-logo.png"
                        alt="logo"
                        width="37"
                        height="85"
                      />
                      <div className={styles.text_box}>
                        <p className={styles.earn_sub_text}>
                          <span className={styles.post}>POST</span> a Reel with
                          Dough & Cream
                        </p>
                        <p className={styles.earn_sub_text}>
                          <span className={styles.tag}>TAG</span>#Frankly &
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
                    <div className={styles.images_box}>
                      <Image
                        className={styles.lines_logo}
                        src="/images/reel-lines-logo.png"
                        alt="logo"
                        width="18"
                        height="15"
                      />
                      <Image
                        className={styles.earnd_logo}
                        src="/images/reel-earnd-logo.png"
                        alt="logo"
                        width="375"
                        height="59"
                      />
                    </div>
                    <div className="error">{errorCustom}</div>
                    <button
                      onClick={() => {
                        setActiveScreen("submit reel");
                      }}
                      className={styles.earn_btn}
                    >
                      Start Earning
                      <Image
                        src="/images/top-reel-arrow.png"
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
                    <div className={styles.controls}>
                      <Image
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
                          src="/images/comment-logo.png"
                          alt="comment"
                          width="28"
                          height="28"
                        />
                      </Link>
                    </div>
                    <h2 className={styles.earn_heading}>
                      Submit your Reel link, <span>get Rewarded !</span>
                    </h2>
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
                      <label className={styles.label}>Paste Reel Link</label>
                      <input
                        className={styles.earn_input}
                        type="url"
                        name="reelLink"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.reelLink}
                      />
                      <div className="error">
                        {errors.reelLink && touched.reelLink && errors.reelLink}
                      </div>
                    </div>
                    <div className="error">{errorCustom}</div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveScreen("congrats");
                    }}
                    className={`${styles.earn_btn} ${styles.submit_btn}`}
                  >
                    Submit Reel
                    <Image
                      src="/images/top-reel-arrow.png"
                      alt="arrow logo"
                      width="17"
                      height="18"
                    />
                  </button>
                </>
              )}
              {activeScreen === "congrats" && (
                <div
                  className={`${styles.form_reel_container} ${styles.earn_now}`}
                >
                  <div className={styles.controls}>
                    <Image
                      src="/images/back-arrow.png"
                      alt="back"
                      width="7"
                      height="10"
                      onClick={() => {
                        setActiveScreen("submit reel");
                      }}
                    />
                  </div>
                  <div className={styles.congrats_box}>
                    <Image
                      className={styles.congrats_logo}
                      src="/images/congrats.png"
                      alt="congrats logo"
                      width="62"
                      height="75"
                    />
                    <h2 className={styles.congrats_heading}>
                      Congratulations!
                    </h2>
                    <p className={styles.congrats_para}>
                      You&rsquo;re now on the path to making your purchases pay
                      for themselves. We&rsquo;ll be in touch with you in{" "}
                      <span>72 hours.</span>
                    </p>
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
