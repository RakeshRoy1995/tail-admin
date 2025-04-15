import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const AI_model = localStorage.getItem("all_aiModel")
    ? JSON.parse(localStorage.getItem("all_aiModel") || "")
    : [];

  const modelSelect = (value: any) => {
    localStorage.setItem("AI_model", value);
    setName(value);
  };

  const modelName = name || localStorage.getItem("AI_model");

  return (
    <header>
      <nav className="navbar navbar-light bg-white border-bottom border-light fixed">
        <div className="container-fluid">
          <div className="d-flex w-100 justify-content-between align-items-center">
            <a className="navbar-brand" href="#">
              <img
                style={{ paddingLeft: "1.5rem" }}
                src="asset/member/images/logo.png"
                alt=""
                className="img-fluid"
                width={170}
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
                  {modelName || "Select AI Model"}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {AI_model.map((model: any) => (
                    <>
                      {model.status == 1 && (
                        <li
                          onClick={(e) => {
                            modelSelect(model.name);
                          }}
                          key={model.id}
                        >
                          <a className="dropdown-item" href="#">
                            {model.name}
                          </a>
                        </li>
                      )}
                    </>
                  ))}
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
                  <li className="my-1">
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <i className="fa fa-user-circle" aria-hidden="true" />
                      <span className="ml-2 ms-2">Profile</span>
                    </a>
                  </li>
                  <li className="my-1">
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <i className="fa fa-info-circle" aria-hidden="true" />
                      <span className="ml-2 ms-2">Help &amp; Support</span>
                    </a>
                  </li>
                  <li className="my-1">
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                      onClick={handleLogout}
                    >
                      <i className="fa fa-sign-out" aria-hidden="true" />
                      <span className="ml-2 ms-2">Logout</span>
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
