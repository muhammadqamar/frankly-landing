import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Index = ({ props, children }) => {
  return (
    <d>
      <Header />
      <div {...props}>{children}</div>
      <Footer />
    </d>
  );
};

export default Index;
