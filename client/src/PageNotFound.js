import React from "react";

const PageNotFound = () => {
  const headerGradient = "linear-gradient(to right, #A06CD5, #6247AA)";
  return (
    <div style={{ textAlign: "center", headerGradient, marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The requested page could not be found.</p>
    </div>
  );
};

export default PageNotFound;
