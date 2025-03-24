import React from "react";

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-light bg-white border-bottom border-light ">
        <div className="container-fluid">
          <div className="d-flex w-100 justify-content-between align-items-center">
            <a className="navbar-brand" href="#">
              <img
                src="asset/member/images/logo.png"
                alt=""
                className="img-fluid"
                width={120}
              />
            </a>
            <div className=" d-flex align-items-center gap-4">
              <div className="dropdown custom-dropdown ">
                <button
                  className="btn btn-primary dropdown-toggle font-weight-bold"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  GPT 4.0
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      GPT 4.1
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      GPT 4.2
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      GPT 4.3
                    </a>
                  </li>
                </ul>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle font-weight-bold"
                  type="button"
                  id="dropDownProfile"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  My Profile
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropDownProfile"
                >
                  <li className=" my-1">
                    <a className="dropdown-item" href="#">
                      <i className="fa fa-user-circle" aria-hidden="true" />
                      <span className=" ml-2">Profile</span>
                    </a>
                  </li>
                  <li className=" my-1">
                    <a className="dropdown-item" href="#">
                      <i className="fa fa-info-circle" aria-hidden="true" />
                      <span className=" ml-2">Help &amp; Support</span>
                    </a>
                  </li>
                  <li className=" my-1">
                    <a className="dropdown-item" href="#">
                      <i className="fa fa-sign-out" aria-hidden="true" />
                      <span className=" ml-2">Logout</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
