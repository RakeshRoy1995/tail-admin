import React, { useState, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import UserPicture from "../../../assets/loginPageImage/userAvatar.png";
import { get_org_UserGrp, get_role_name, level_name_id } from "@/utils";
import { Link as RouterLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = React.useState("en");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = (event: MouseEvent) => {
    if (
      event.target instanceof HTMLElement &&
      !event.target.closest(".dropdown-menu") &&
      !event.target.closest(".profile-pic")
    ) {
      setDropdownOpen(false);
    }
  };

  const { t, i18n } = useTranslation();

  // Function to change language
  const changeLanguage = (lng) => {
    setCurrentLanguage(lng);
    i18n.changeLanguage(lng);
  };

  const user: any = JSON.parse(localStorage.getItem("customer_login_auth"));

  const switchRole = (row: any) => {
    localStorage.setItem("current_role", JSON.stringify(row));

    setTimeout(() => {
      window.location.href = window.location.origin + "/admin";
    }, 1000);
  };

  const current_role =  null
  const all_role = JSON.parse(localStorage.getItem("all_role"));

  console.log(`get_org_UserGrp`, current_role);

  return (
    <>
      <section>
        <div className="container-fuild">
          <div className="row">
            <nav
              className="navbar navbar-expand-lg bg-secondary text-uppercase"
              id="mainNav"
            >
              <a className="navbar-brand" href="#page-top">
                <img src="asset/assets/img/logo.png" alt="Logo" />
              </a>
              <button
                className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                Menu
                <i className="fas fa-bars"></i>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item mx-0 mx-lg-1">
                    <form className="form-inline my-2 my-lg-0">
                      <i className="fa fa-search" aria-hidden="true"></i>
                      <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                    </form>
                  </li>
                  <li className="nav-item mx-0 mx-lg-1">
                    <a className="nav-link py-3 px-0 px-lg-3" href="#about">
                      <img src="asset/assets/img/Layout-4-blocks.png" alt="" />
                    </a>
                  </li>

                  <li className="nav-item mx-0 mx-lg-1">
                    <a className="nav-link py-3 px-0 px-lg-3" href="#about">
                      <img src="asset/assets/img/Equalizer.png" alt="" />
                    </a>
                  </li>

                  <li className="nav-item mx-0 mx-lg-1">
                    <a className="nav-link py-3 px-0 px-lg-3" href="#about">
                      <img src="asset/assets/img/User.png" alt="" />
                    </a>
                  </li>
                  <li className="nav-item mx-0 mx-lg-1">
                    <a className="nav-link py-3 px-0 px-lg-3" href="#about">
                      <img src="asset/assets/img/Layout-Vertical.png" alt="" />
                    </a>
                  </li>

                  <li
                    className="nav-item mx-0 mx-lg-1"
                    onClick={(e) => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("customer_login_auth");
                      setTimeout(() => {
                        window.location.href =
                          window.location.origin + "/admin";
                      }, 500);
                    }}
                  >
                    <a className="nav-link py-3 px-0 px-lg-3" href="#about">
                      logout
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </section>
      <div className="clearfix"></div>
    </>
  );
};

export default Navbar;
