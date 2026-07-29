import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} <strong>HealthCare+</strong>. Tous droits
        réservés.
      </p>

      <p className="footer-version">
        Version 1.0.0
      </p>
    </footer>
  );
};

export default Footer;