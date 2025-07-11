import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import "./Fotter.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* Social Icons */}
        <div className="footer-socials">
          <FaFacebookSquare className="fa-facebook" />
          <FaInstagramSquare className="fa-instagram" />
          <FaLinkedin className="fa-linkedin" />
        </div>

        {/* Brand Name */}
        <div className="footer-brand">© HisabKitab Private Limited</div>

        {/* Privacy & Terms Links */}
        <div className="footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
