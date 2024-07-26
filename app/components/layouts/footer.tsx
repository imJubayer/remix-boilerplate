import { Link } from "@remix-run/react";

const Footer = () => {
  return (
    <div id="kt_app_footer" className="app-footer">
      <div className="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
        <div className="text-gray-900 order-2 order-md-1">
          <span className="text-muted fw-semibold me-1">2024&copy;</span>
          <Link
            to="/"
            target="_blank"
            className="text-gray-800 text-hover-primary"
          >
            AllinOne
          </Link>
        </div>

        <ul
          className="menu menu-gray-600 menu-hover-primary fw-semibold order-1"
          style={{ display: "flex" }}
        >
          <li className="menu-item">
            <Link to="/about" target="_blank" className="menu-link px-2">
              About
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/contact" target="_blank" className="menu-link px-2">
              Support
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
