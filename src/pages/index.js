import Head from "next/head";
import Layout from "../components/layout";
import HomePage from "../components/HomePage/index.js";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Frankly | Home </title>
      </Head>
      <HomePage />
    </Layout>
  );
}
