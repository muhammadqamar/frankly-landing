import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Index = ({ props, children }) => {
  return (
    <div>
      <Header />
      <div {...props}>{children}</div>
      <Footer />
    </div>
  );
};

export default Index;
