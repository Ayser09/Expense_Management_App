import { Link } from "react-router-dom";

const Footer = () => {
  const gradientColors = ["#A06CD5", "#E2CFEA"];
  const gradient = `linear-gradient(to right, ${gradientColors.join(", ")})`;

  return (
    <div
      className="footer"
      style={{
        background: gradient, // Set the background to the gradient
        padding: "20px",
        textAlign: "center",
        color: "white",
      }}
    >
      <h1 className="text-center">All Right Reserved &copy; Expense Mgmt</h1>
      <p className="text-center mt-3">
        <Link to="/about" style={{ color: "white" }}>
          About
        </Link>{" "}
        |{" "}
        <Link to="/contact" style={{ color: "white" }}>
          Contact
        </Link>{" "}
        |{" "}
        <Link to="/policy" style={{ color: "white" }}>
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
