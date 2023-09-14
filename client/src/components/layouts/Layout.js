import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  const headerStyle = {
    background: `linear-gradient(90deg,#7f00ff, #00ff8f )`, // Gradient colors
  };
  return (
    <>
      <Header />
      <div style={headerStyle} className="content">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
