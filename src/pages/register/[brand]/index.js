import { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { useRouter } from "next/router";
import Head from "next/head";

const earnCard = [
  {
    price: "₹3,000",
    views: "5k - 10k",
  },
  {
    price: "₹5,000",
    views: "15k - 18k",
  },
  {
    price: "₹10,000",
    views: "45k - 50k",
  },
  {
    price: "₹25,000",
    views: "130k - 150k ",
  },
];

const Register = () => {
  const [activeScreen, setActiveScreen] = useState("welcome");
  const [errorCustom, setErrorCustom] = useState("");
  const [paytm, setPaytm] = useState(false);
  const [upiId, setUpiId] = useState(false);
  const router = useRouter();
  const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID);
  const formRef = useRef();

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Head>
        <title>Frankly | Register/{router.query.brand} </title>
      </Head>
      <div className="register-form">
        {/*<div className="chat_icon">
          <Image src="/images/chat-icon.svg" alt="Picture of the author" width="38" height="38" />
  </div>*/}
        <Formik
          innerRef={formRef}
          initialValues={{ name: "", phone: "", reelLink: "", email: "", paytm: "" }}
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
                      width="189"
                      height="277"
                    />
                  </div>
                  <h2 className="welcome-heading-two">
                    Post a Reel about <br /> your <span> experience</span>
                  </h2>
                  <p className="welcome-text-bottom">with Dough and Cream & EARN!</p>

                  <div className="btn-cover">
                    <button
                      type="button"
                      onClick={() => setActiveScreen("earn now")}
                      className="register-button"
                    >
                      Get Started
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
                    Reel It, <span> Get Paid!</span>
                  </h2>

                  <p className="earn-sub-text">
                    Earn Unlimited cash. <br />
                    Get direct payment through UPI.
                  </p>
                  <Slider {...settings}>
                    {earnCard.map((item, index) => (
                      <div key={index} className="earning-potential-box">
                        <div className="e-p-heading">
                          <p className="e-p-text">Earning Potential</p>
                        </div>
                        <h1 className="e-p-price">{item.price}</h1>
                        <div className="hand-img">
                          <Image src="/images/hand.svg" alt="hand" width="156" height="275" />
                        </div>
                        <div className="e-p-view-box">
                          <Image src="/images/views.svg" alt="hand" width="12" height="12" />
                          <p className="views-number">{item.views} Views</p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                  <div className="india_code earn-input">
                    <input
                      type="text"
                      name="name"
                      placeholder="What’s your Name?"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  </div>
                  <div className="error">{errorCustom}</div>
                  <div className="btn-cover">
                    <button
                      onClick={() => {
                        if (values.name) {
                          setActiveScreen("reel");
                        } else {
                          setErrorCustom("required");
                        }
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
                    <li>
                      <Image src="/images/hashtag.svg" alt="home" width="24" height="24" />
                      <p>
                        PayTM/UPI ID Post with <strong>#Frankly & @Dough&Cream</strong> and submit
                        your reel link.
                      </p>
                    </li>
                    <li>
                      <Image src="/images/tag-2.svg" alt="home" width="24" height="24" />
                      <p>
                        Your newly purchased item should be <br /> the highlight of your reel.
                      </p>
                    </li>
                    <li>
                      <Image src="/images/video-play.svg" alt="home" width="24" height="24" />
                      <p> Make sure your account is Public.</p>
                    </li>
                    <li>
                      <Image src="/images/medal-star.svg" alt="home" width="24" height="24" />
                      <p>
                        Your creativity would be rewarded.
                        <br /> Make sure to have fun with your Reel!
                      </p>
                    </li>
                    <li>
                      <Image src="/images/like-shapes.svg" alt="home" width="24" height="24" />
                      <p>
                        Good vibes only: Your videos must <br /> follow Instagram’s Community <br />
                        Guidelines and general policies.
                      </p>
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
                  <h2 className="congratulations-heading">Almost there</h2>
                  <h3 className="sub-heading">
                    You’re on the path to make your <br /> purchases pay for themselves!
                  </h3>
                  <h3 className="sub-heading-two">
                    Enter your email address and <br /> payment details below.
                  </h3>

                  <div className="payment-box">
                    <div
                      onClick={() => {
                        if (!values.phone) {
                          setUpiId(false);
                        } else {
                          setUpiId(true), setPaytm(false);
                        }
                      }}
                      className={upiId ? `p-b-img bg-color` : `p-b-img`}
                    >
                      <Image src="/images/bhim-upl.svg" alt="home" width="100" height="49" />
                    </div>
                    <div className="devider" />
                    <div
                      onClick={() => {
                        if (!values.phone) {
                          setPaytm(false);
                        } else {
                          setPaytm(true), setUpiId(false);
                        }
                      }}
                      className={paytm ? `p-b-img bg-color` : `p-b-img`}
                    >
                      <Image src="/images/paytm.svg" alt="home" width="100" height="31" />
                    </div>
                  </div>

                  {paytm === true || upiId === true ? (
                    <>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <div className="error">{errors.email && touched.email && errors.email}</div>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone.replace(/\D/g, "")}
                      />
                      <div className="error">{errors.phone && touched.phone && errors.phone}</div>
                    </>
                  )}
                  {paytm === true || upiId === true ? (
                    <>
                      <input
                        className="upi-input"
                        type="text"
                        name="paytm"
                        placeholder={
                          (paytm === true && "Enter your PayTm Number") ||
                          (upiId === true && "Enter your UPI ID") ||
                          "Select a payment method above"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.paytm}
                      />

                      <div className="error">{errors.paytm && touched.paytm && errors.paytm}</div>
                    </>
                  ) : (
                    <>
                      <div className="select-input-box">
                        <p className="text">Select a payment method above</p>
                      </div>
                    </>
                  )}
                  <div className="btn-cover">
                    <button disabled={isSubmitting} type="submit" className="register-button">
                      {isSubmitting ? "Submitting ..." : "Submit Reel"}
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

                  <h2 className="posted-main-heading">Congratulations!</h2>

                  <h3 className="post-sub-heading">
                    We’ll reach out to you via Message to get <br /> you paid after 72 hours since
                    the reel was <br /> posted.
                  </h3>
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
