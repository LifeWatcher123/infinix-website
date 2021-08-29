import React from "react";
import "./footers.css";

import "bootstrap-icons/font/bootstrap-icons.css";

export const Footer = (props) => {
  return (
    <div className="bg-primary-mix-black-90 py-5">
      <footer
        className="
            container
          d-flex
          flex-wrap
          justify-content-between
          align-items-center
          border-top
        "
      >
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          >
            <i className="bi bi-bootstrap-fill" width="30" height="24" />
          </a>
          <span className="text-muted">&copy; 2021 Company, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-muted" href="#">
              <i className="bi bi-twitter" width="24" height="24" />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <i className="bi bi-instagram" width="24" height="24" />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <i className="bi bi-facebook" width="24" height="24" />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
