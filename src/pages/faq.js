import Head from "next/head";
import Layout from "../components/layout";
import FaqPage from "../components/FaqPage";

const Faq = () => {
  return (
    <Layout>
      <Head>
        <title>Frankly | Faq </title>
      </Head>
      <FaqPage />
    </Layout>
  );
};

export default Faq;
