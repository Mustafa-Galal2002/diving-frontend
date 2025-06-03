const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer>
        <div className="footer-background">
          <img
            src="/assets/da00331fa56515d69b4ebcbdbc355aeb414694ad (1).jpg"
            alt=""
          />
        </div>{" "}
        {/* Add this div */}
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/assets/Frame 88 (2).svg" alt="" />
            <p>Plunge</p>
          </div>
          <div className="footer-i">
            <div className="social">
              <img src="/assets/Facebook.svg" alt="" />
              <img src="/assets/Instagram.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Plunge - All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
