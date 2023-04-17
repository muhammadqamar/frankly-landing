import { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "./styles.module.scss";
import Marquee from "react-fast-marquee";
import InfoModal from "./infoModal";
import Slider from "react-slick";
const Register = () => {
  const [activeScreen, setActiveScreen] = useState("welcome");
  const [errorCustom, setErrorCustom] = useState("");
  const [modalShow, setModalShow] = useState(false);
  // const [paytm, setPaytm] = useState(false);
  // const [upiId, setUpiId] = useState(false);
  const router = useRouter();
  const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID);
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  if(!router.query?.brand) {
    return

  }

  return (
    <>
      <Head>
        <title>Frankly | Register</title>
      </Head>
      {loading ? (
        <div
          className={
            (activeScreen === "welcome" && `${styles.reel_form} reel_form `) ||
            (activeScreen === "congrats" && `${styles.reel_form} ${styles.earn_reel_form} ${styles.congrats_form} reel_form`) ||
            `${styles.reel_form} ${styles.earn_reel_form} reel_form`
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
              // email: "",
              paytm: "",
            }}
            enableReinitialize
            validate={(values) => {
              const errors = {};
              if (!values.phone) {
                errors.phone = "Required";
              } else if (values.phone.length !== 10) {
                errors.phone = "invalid phone number";
              }
              if (!values.name && router.query.brand!=='warmee') {
                errors.name = "Required";
              }
              if (!values.reelLink) {
                errors.reelLink = "Required";
              } else if (
                !/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
                  values.reelLink,
                )
              ) {
                errors.reelLink = "Invalid URL";
              }
              if (!values.paytm && router.query.brand ==='warmee') {
                errors.paytm = "Required";
              }
              // if (!values.email) {
              //   errors.email = "Required";
              // } else if (
              //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              // ) {
              //   errors.email = "Invalid email address";
              // }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await doc.useServiceAccountAuth({
                client_email: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
              });
              await doc.loadInfo();
              const sheet = doc.sheetsByIndex[0];
              const newDate = new Date();
              const result = await sheet.addRow({
                Name: values.name,
                Phone: "+91 " + values.phone,
                // Email: values.email,
                ["Reel Link"]: values.reelLink,
                ["UPI ID"]: values.paytm ,
                Brand: router.query.brand,
                Timestamp: newDate.toLocaleString(),
              });
              if (result._rowNumber) {
                setActiveScreen("congrats");
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
              <form onSubmit={handleSubmit} style={{width:"100%"}} >
                {activeScreen === "welcome" && (
                  <>
                    {router.query.brand === "warmee" ? (
                       <>
                       {/* <div className={styles.video_brightness} /> */}

                        <div className={styles.main_warmee}>

                          <div className={`${styles.form_reel_container} ${styles.welcome} ${styles.warmee_welcome}`}>
                            <div>
                              <Image src="/images/warmee-logo.png" alt="logo" width="222" height="156" className={`${styles.imgtoplogo} ${styles.imgwarmeetoplogo}`} />
                              <h1 className={`${styles.wlcm} ${styles.warmee_wlcm}`}>Just Shopped?Reel it, Get Paid.</h1>
                            </div>

                            <Image className={`${styles.reel_img} ${styles.warmee_reel_img}`} src="/images/doodle_warmee_logo2.svg" alt="logo" width="23" height="53" />
                            <Image className={`${styles.reel_img1} ${styles.warmee_reel_img1}`} src="/images/doodle_warmee_logo1.svg" alt="logo" width="51" height="35" />

                            <Image className={`${styles.reel_img4} ${styles.warmee_reel_img4}`} src="/images/doodle_warmee_logo3.svg" alt="logo" width="52" height="65" />

                            <div style={{ paddingTop: "63%", width: "100%" }}>
                              <p className={styles.reel_para}>powered by #FRANKLY</p>
                              <button type="button" onClick={() => setActiveScreen("earn now")} className={styles.reel_started_btn}>
                                Get Started
                                <Image src="/images/btn-arrow.svg" alt="arrow logo" width="17" height="18" />
                              </button>
                              <p className={styles.terms_para}>Terms & Conditions Apply</p>
                            </div>
                          </div>
                        </div>

                      </>
                    ) : (
                      <>
                        {/* <div className={styles.video_brightness} /> */}
                        <video autoPlay muted playsInline loop className={styles.myVideo}>
                          <source src="/D&C3.mp4" type="video/mp4" />
                        </video>
                        <div className={styles.main_welcome}>
                          <div className={`${styles.form_reel_container} ${styles.welcome}`}>
                            <div>
                              <Image src="/images/cream-logo.png" alt="logo" width="111" height="69" className={styles.imgtoplogo} />
                              <h1 className={styles.wlcm}>Reel Banao Reward Kamao</h1>
                            </div>

                            <Image className={styles.reel_img} src="/images/doodle-logo2.svg" alt="logo" width="23" height="53" />
                            <Image className={styles.reel_img1} src="/images/doodle-logo1.svg" alt="logo" width="51" height="35" />

                            <Image src="/images/star-doodle-logo.svg" alt="logo" width="42" height="42" className={styles.reel_img3} />
                            <Image className={styles.reel_img4} src="/images/doodle-logo3.svg" alt="logo" width="52" height="65" />

                            <div style={{ paddingTop: "280px" }}>
                              <p className={styles.reel_para}>powered by #FRANKLY</p>
                              <button type="button" onClick={() => setActiveScreen("earn now")} className={styles.reel_started_btn}>
                                Get Started
                                <Image src="/images/btn-arrow.svg" alt="arrow logo" width="17" height="18" />
                              </button>
                              <p className={styles.terms_para}>Terms & Conditions Apply</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                {activeScreen === "earn now" && (
                  <>
                    {router.query.brand === "warmee" ? (
                      <div className={`${styles.form_reel_container} ${styles.earn_now_label}`}>
                        <div className={`${styles.controls_box} ${styles.earn_control_box} ${styles.warm_earn_control_box}`}>
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
                          <Link
                            href="https://wa.me/8800581181?text=Hey%20there%2C%20I%27d%20like%20to%20ask%20something%20about%20earning%20by%20posting%20Insta%20Reels"
                            target="_blank"
                          >
                            <Image src="/images/comment-logo.svg" alt="comment" width="28" height="28" />
                          </Link>
                        </div>
                        <>
                          <h2 className={`${styles.wlcm} ${styles.earn_text}`}>
                            Steps to<span> Earn💰</span>
                          </h2>
                          <div className={styles.reel_content}>
                            <Image src="/images/reel-gradient-logo.svg" alt="logo" width="37" height="85" />
                            <div className={styles.text_box}>
                              <p className={`${styles.earn_sub_text} ${styles.warmee_earn_sub_text}`}>
                                <span className={styles.post}>POST</span> a Reel on your experience with Warmee
                              </p>
                              <p className={`${styles.earn_sub_text} ${styles.warmee_earn_sub_text}`}>
                                <span className={styles.tag}>TAG</span> #Frankly & @warmee.in
                              </p>
                              <p className={`${styles.earn_sub_text} ${styles.warmee_earn_sub_text}`}>
                                <span className={styles.earn}>EARN</span> cash with your Reel on every purchase
                              </p>
                            </div>
                          </div>
                        </>
                        <div className={styles.images_box}>
                          <Image className={styles.lines_logo} src="/images/blue-lines-logo.svg" alt="logo" width="18" height="15" />
                          <div className={styles.line_moving}>
                            <Marquee speed={50} gradient={false}>
                              Reel it, Get Paid!&nbsp;🤑&nbsp;Reel it, Get Paid!&nbsp;🛍️&nbsp;Reel it, Get Paid!&nbsp;🤩&nbsp;
                            </Marquee>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setActiveScreen("earning potential");
                          }}
                          className={`${styles.reel_started_btn} ${styles.earn_btn}`}
                        >
                          Next
                          <Image src="/images/reel-btn-arrow.svg" alt="arrow logo" width="17" height="18" />
                        </button>
                      </div>
                    ) : (
                      <div className={`${styles.form_reel_container} ${styles.earn_now_label}`}>
                        <div className={`${styles.controls_box} ${styles.earn_control_box}`}>
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
                          <Link
                            href="https://wa.me/8800581181?text=Hey%20there%2C%20I%27d%20like%20to%20ask%20something%20about%20earning%20by%20posting%20Insta%20Reels"
                            target="_blank"
                          >
                            <Image src="/images/comment-logo.svg" alt="comment" width="28" height="28" />
                          </Link>
                        </div>
                        <>
                          <h2 className={`${styles.wlcm} ${styles.earn_text}`}>
                            Steps to<span> Earn💰</span>
                          </h2>
                          <div className={styles.reel_content}>
                            <Image src="/images/reel-gradient-logo.svg" alt="logo" width="37" height="85" />
                            <div className={styles.text_box}>
                              <p className={styles.earn_sub_text}>
                                <span className={styles.post}>POST</span> a Reel with Dough & Cream
                              </p>
                              <p className={styles.earn_sub_text}>
                                <span className={styles.tag}>TAG</span> #Frankly & @Dough&Cream <br />
                                in caption
                              </p>
                              <p className={styles.earn_sub_text}>
                                <span className={styles.earn}>EARN</span> Dough & Cream Cash <br />
                                Vouchers for your creativity
                              </p>
                            </div>
                          </div>
                        </>
                        <div className={styles.images_box}>
                          <Image className={styles.lines_logo} src="/images/blue-lines-logo.svg" alt="logo" width="18" height="15" />
                          <div className={styles.line_moving}>
                            <Marquee speed={50} gradient={false}>
                              <Image src="/images/voucher-star-logo.svg" alt="logo" width="26" height="26" />
                              &nbsp;Rajeev earned Rs. 400 Voucher&nbsp;
                              <Image src="/images/voucher-star-logo.svg" alt="logo" width="26" height="26" />
                              &nbsp;Neha earned Rs. 300 Voucher&nbsp;
                              <Image src="/images/voucher-star-logo.svg" alt="logo" width="26" height="26" />
                              &nbsp;Vishal earned a Free Drink!
                            </Marquee>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setActiveScreen("submit reel");
                          }}
                          className={`${styles.reel_started_btn} ${styles.earn_btn}`}
                        >
                          Start Earning
                          <Image src="/images/reel-btn-arrow.svg" alt="arrow logo" width="17" height="18" />
                        </button>
                      </div>
                    )}
                  </>
                )}

                {activeScreen === "earning potential" && (
                  <div className={`${styles.form_reel_container} ${styles.earn_now_label} ${styles.warmee_earn_container}`}>
                    <div className={`${styles.controls_box} ${styles.earn_control_box} ${styles.warm_earn_control_box}`}>
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
                      <Link
                        href="https://wa.me/8800581181?text=Hey%20there%2C%20I%27d%20like%20to%20ask%20something%20about%20earning%20by%20posting%20Insta%20Reels"
                        target="_blank"
                      >
                        <Image src="/images/comment-logo.svg" alt="comment" width="28" height="28" />
                      </Link>
                    </div>
                    <h2 className={`${styles.wlcm} ${styles.earn_text} ${styles.warmee_earn_text}`}>Reel It, Get Paid!</h2>
                    <p className={styles.warmee_reel_para}>
                      Earn unlimited Cash back with Warmee.
                      <br />
                      <span className={styles.warmee_reel_span}>
                        Starting at INR 500 for every 1000 views + more <br />
                        for creative content!
                      </span>
                    </p>
                    {/* Slider */}
                    <div className={styles.earn_slider_box}>
                      <Slider {...settings}>
                        {/* card 1 */}
                        <div className={styles.earn_inner_slider_box}>
                          <div className={styles.earning_title_box}>
                            <p className={styles.earning_title}>Earning Potential</p>
                          </div>
                          <p className={styles.earning_amount}>₹1000</p>
                          <img className={styles.earning_img} src="/images/selfieDoodle1.png" alt="logo" />
                          <div className={styles.eye_box}>
                            <img src="/images/earn_eye.svg" alt="logo" />
                            <p className={styles.eye_para}>1k - 3k Views</p>
                          </div>
                        </div>
                        {/* card 2 */}
                        <div className={styles.earn_inner_slider_box}>
                          <div className={styles.earning_title_box}>
                            <p className={styles.earning_title}>Earning Potential</p>
                          </div>
                          <p className={styles.earning_amount}>₹3800</p>
                          <img className={styles.earning_img} src="/images/selfieDoodle1.png" alt="logo" />
                          <div className={styles.eye_box}>
                            <img src="/images/earn_eye.svg" alt="logo" />
                            <p className={styles.eye_para}>5k - 10k Views</p>
                          </div>
                        </div>
                        {/* card 3 */}
                        <div className={styles.earn_inner_slider_box}>
                          <div className={styles.earning_title_box}>
                            <p className={styles.earning_title}>Earning Potential</p>
                          </div>
                          <p className={styles.earning_amount}>₹5500</p>
                          <img className={styles.earning_img} src="/images/selfieDoodle1.png" alt="logo" />
                          <div className={styles.eye_box}>
                            <img src="/images/earn_eye.svg" alt="logo" />
                            <p className={styles.eye_para}>12k - 15k Views</p>
                          </div>
                        </div>
                      </Slider>
                    </div>

                    <button
                      onClick={() => {
                        setActiveScreen("rules earn");
                      }}
                      className={`${styles.reel_started_btn} ${styles.earn_btn}`}
                    >
                      Next
                      <Image src="/images/reel-btn-arrow.svg" alt="arrow logo" width="17" height="18" />
                    </button>
                  </div>
                )}

                {/* Warmee rules Screen */}
                {activeScreen === "rules earn" && (
                  <div className={`${styles.form_reel_container} ${styles.earn_now_label} ${styles.warm_earn_now_label}`}>
                    <div className={`${styles.controls_box} ${styles.earn_control_box} ${styles.warm_earn_control_box}`}>
                      <Image
                        className={styles.control_img}
                        src="/images/back-arrow.png"
                        alt="back"
                        width="7"
                        height="10"
                        onClick={() => {
                          setActiveScreen("earning potential");
                        }}
                      />
                      <Link
                        href="https://wa.me/8800581181?text=Hey%20there%2C%20I%27d%20like%20to%20ask%20something%20about%20earning%20by%20posting%20Insta%20Reels"
                        target="_blank"
                      >
                        <Image src="/images/comment-logo.svg" alt="comment" width="28" height="28" />
                      </Link>
                    </div>
                    <h2 className={`${styles.wlcm} ${styles.earn_text} ${styles.warmee_rules_earn_text}`}>
                      Rules to <span> Earn💰</span>
                    </h2>
                    <div className={styles.rules_earn_content}>
                      <div className={styles.rules_tag_box}>
                        <img src="/images/tag-people.svg" alt="logo" />
                        <p className={styles.rules_para}>
                          Tag @warmee.in & add #frankly
                          <br /> to your caption
                        </p>
                      </div>
                      <img className={styles.share_reels_img} src="/images/wbg1.png" alt="logo" />
                    </div>
                    <div className={`${styles.rules_earn_content} ${styles.rules_product_content}`}>
                      {/* Product focus */}
                      <div className={`${styles.rules_tag_box} ${styles.info_tag_box}`}>
                        <img src="/images/focus-logo.svg" alt="logo" />
                        <p className={styles.rules_para}>
                          Product must be the focus of
                          <br /> your video.
                        </p>
                      </div>
                      {/* No profanity */}
                      <div className={`${styles.rules_tag_box} ${styles.info_tag_box}`}>
                        <img src="/images/profanity.svg" alt="logo" />
                        <p className={styles.rules_para}>No profanity.</p>
                      </div>
                      {/* Tag Brand */}
                      <div className={`${styles.rules_tag_box} ${styles.info_tag_box}`}>
                        <img src="/images/tag-brand.svg" alt="logo" />
                        <p className={styles.rules_para}>No tagging other brands</p>
                      </div>
                      {/* Promoting codes */}
                      <div className={styles.rules_tag_box}>
                        <img src="/images/promot-code.svg" alt="logo" />
                        <p className={styles.rules_para}>No promoting referral codes</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveScreen("submit reel");
                      }}
                      className={`${styles.reel_started_btn} ${styles.earn_btn}`}
                    >
                      Start Earning
                      <Image src="/images/reel-btn-arrow.svg" alt="arrow logo" width="17" height="18" />
                    </button>
                  </div>
                )}

                {activeScreen === "submit reel" && (
                  <>
                    {router.query.brand === "warmee" ? (
                      <div className={`${styles.form_reel_container} ${styles.earn_now}`}>
                        <div className={`${styles.controls_box} ${styles.warmee_earn_control_box}`}>
                          <Image
                            className={styles.control_img}
                            src="/images/back-arrow.png"
                            alt="back"
                            width="7"
                            height="10"
                            onClick={() => {
                              setActiveScreen("rules earn");
                            }}
                          />
                          <Link
                            href="https://wa.me/8800581181?text=Hey%20there%2C%20I%27d%20like%20to%20ask%20something%20about%20earning%20by%20posting%20Insta%20Reels"
                            target="_blank"
                          >
                            <Image src="/images/comment-logo.svg" alt="comment" width="28" height="28" />
                          </Link>
                        </div>
                        <div className={styles.warmee_main_box}>
                          <h2 className={`${styles.wlcm} ${styles.earn_heading}`}>
                            Submit your Reel link, <span>get Rewarded !</span>
                          </h2>
                          <div className={`${styles.padder} ${styles.warmee_padder}`}>
                            <div className={styles.earn_input_box}>
                              <label className={styles.label}>Phone number</label>
                              <div style={{ position: "relative" }}>
                                <span className={styles.earn_input_span}>+91</span>
                                <input
                                  className={styles.earn_input}
                                  type="text"
                                  name="phone"
                                  style={{ paddingLeft: "50px" }}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.phone?.replace(/\D/g, "")}
                                />
                                <div className="error">{errors.phone && touched.phone && errors.phone}</div>
                              </div>
                            </div>
                            <div className={styles.earn_input_box}>
                              <label className={styles.label}>My UPI ID</label>
                              <input className={styles.earn_input} type="text" name="paytm" onChange={handleChange} onBlur={handleBlur} value={values.paytm} />
                              <div className="error">{errors.paytm && touched.paytm && errors.paytm}</div>
                            </div>
                            <div className={styles.earn_input_box}>
                              <label className={styles.label}>
                                Paste Reel Link
                                <Image onClick={() => setModalShow(true)} className={styles.info_img} src="/images/info.svg" alt="info" width="20" height="20" />
                              </label>
                              <input className={styles.earn_input} type="url" name="reelLink" onChange={handleChange} onBlur={handleBlur} value={values.reelLink} />
                              <div className="error">{errors.reelLink && touched.reelLink && errors.reelLink}</div>
                              <InfoModal show={modalShow} onHide={() => setModalShow(false)} />
                            </div>
                            <div className="error">{errorCustom}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (isSubmitting) {
                              setActiveScreen("congrats");
                            } else {
                              setErrorCustom("");
                            }
                          }}
                          disabled={isSubmitting}
                          type="submit"
                          className={`${styles.reel_started_btn} ${styles.earn_btn}`}
                        >
                          {isSubmitting ? "Submitting ..." : "Submit Reel"}
                          <Image src="/images/reel-btn-arrow.svg" alt="arrow logo" width="17" height="18" />
                        </button>
                      </div>
                    ) : (
                      <div className={`${styles.form_reel_container} ${styles.earn_now}`}>
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
                          <Link
                            href="https://wa.me/8800581181?text=Hey%20there%2C%20I%27d%20like%20to%20ask%20something%20about%20earning%20by%20posting%20Insta%20Reels"
                            target="_blank"
                          >
                            <Image src="/images/comment-logo.svg" alt="comment" width="28" height="28" />
                          </Link>
                        </div>
                        <div>
                          <h2 className={`${styles.wlcm} ${styles.earn_heading}`}>
                            Submit your Reel link, <span>get Rewarded !</span>
                          </h2>
                          <div className={styles.padder}>
                            <div className={styles.earn_input_box}>
                              <label className={styles.label}>Full Name</label>
                              <input className={styles.earn_input} type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
                              <div className="error">{errors.name && touched.name && errors.name}</div>
                            </div>
                            <div className={styles.earn_input_box}>
                              <label className={styles.label}>Phone number</label>
                              <div style={{ position: "relative" }}>
                                <span className={styles.earn_input_span}>+91</span>
                                <input
                                  className={styles.earn_input}
                                  type="text"
                                  name="phone"
                                  style={{ paddingLeft: "50px" }}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.phone?.replace(/\D/g, "")}
                                />
                                <div className="error">{errors.phone && touched.phone && errors.phone}</div>
                              </div>
                            </div>
                            <div className={styles.earn_input_box}>
                              <label className={styles.label}>
                                Paste Reel Link
                                <Image onClick={() => setModalShow(true)} className={styles.info_img} src="/images/info.svg" alt="info" width="20" height="20" />
                              </label>
                              <input className={styles.earn_input} type="url" name="reelLink" onChange={handleChange} onBlur={handleBlur} value={values.reelLink} />
                              <div className="error">{errors.reelLink && touched.reelLink && errors.reelLink}</div>
                              <InfoModal show={modalShow} onHide={() => setModalShow(false)} />
                            </div>
                            <div className="error">{errorCustom}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (isSubmitting) {
                              setActiveScreen("congrats");
                            } else {
                              setErrorCustom("");
                            }
                          }}
                          disabled={isSubmitting}
                          type="submit"
                          className={`${styles.reel_started_btn} ${styles.earn_btn}`}
                        >
                          {isSubmitting ? "Submitting ..." : "Submit Reel"}
                          <Image src="/images/reel-btn-arrow.svg" alt="arrow logo" width="17" height="18" />
                        </button>
                      </div>
                    )}
                  </>
                )}

                {activeScreen === "congrats" && (
                  <>
                    {router.query.brand === "warmee" ? (
                      <div className={`${styles.form_reel_container} ${styles.earn_now}`}>
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
                            <img className={styles.congrats_logo} src="/images/reel-congrts.png" alt="congrats logo" />
                            <h2 className={styles.congrats_heading}>Congratulations!</h2>
                            <p className={styles.congrats_para}>
                              You&rsquo;re now on the path to making your purchases pay for themselves. We&rsquo;ll be in touch with you in <span>72 hours.</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={`${styles.form_reel_container} ${styles.earn_now}`}>
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
                            <img className={styles.congrats_logo} src="/images/reel-congrts.png" alt="congrats logo" />
                            <h2 className={styles.congrats_heading}>Congratulations!</h2>
                            <p className={styles.congrats_para}>
                              You&rsquo;re now on the path to making your purchases pay for themselves. We&rsquo;ll be in touch with you in <span>72 hours.</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </form>
            )}
          </Formik>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Register;
