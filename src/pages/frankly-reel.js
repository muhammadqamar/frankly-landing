import Head from "next/head";
import Layout from "../components/layout";
import FranklyReelPage from "../components/FranklyReelPage";

const FranklyReel = () => {
  return (
    <Layout>
      <Head>
        <title>Frankly | Reel </title>
      </Head>
      <FranklyReelPage />
    </Layout>
  );
};

export default FranklyReel;
