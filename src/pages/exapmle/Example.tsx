import React from "react";
// import { ArrowDown, ArrowUp, CheckCircle, MoreHorizontal } from "lucide-react";

import {
  ArrowDown,
  ArrowUp,
  MoreHorizontal,
  CheckCircle,
  Check,
  ChevronDown,
  Diamond,
  Mail,
  CreditCard,
  FileText,
  Lock,
  User,
  UserCircle,
} from "lucide-react";

// import {
//   Check,
//   ChevronDown,
//   Diamond,
//   Mail,
//   CreditCard,
//   FileText,
//   Lock,
//   User,
//   UserCircle,
// } from "lucide-react";
import profileImage from "../../../assets/icons/Profile.svg";

const Example = () => {
  return (
    <>
      <div className="d-flex min-vh-100 flex-column align-items-center justify-content-center p-5 bg-light">
        <div className="container max-w-4xl bg-white rounded shadow-lg border overflow-hidden">
          <div className="p-4">
            <div className="row g-4">
              {/* Profile Image and Status */}
              <div className="col-md-auto position-relative text-center">
                <img
                  src={profileImage}
                  alt="Profile"
                  width={150}
                  height={150}
                  className="rounded-circle object-fit-cover border border-3 border-primary"
                />
                <div
                  className="position-absolute bottom-0 start-50 translate-middle p-1 bg-success border border-white rounded-circle"
                  style={{ width: "12px", height: "12px" }}
                ></div>
              </div>

              {/* Profile Info */}
              <div className="col-md">
                <div className="d-flex justify-content-between align-items-start flex-wrap">
                  <div>
                    <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-1">
                      Max Smith
                      <CheckCircle size={18} color="#3B82F6" fill="#3B82F6" />
                    </h2>
                    <div className="text-muted small d-flex flex-wrap gap-3">
                      <span>👤 Developer</span>
                      <span>📍 SF, Bay Area</span>
                      <span>✉️ max@kt.com</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                    <button className="btn btn-outline-secondary btn-sm">
                      Follow
                    </button>
                    <button className="btn btn-primary btn-sm">Hire Me</button>
                    <button className="btn btn-link p-1">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </div>

                {/* Stats and Progress */}
                <div className="row mt-4 align-items-center">
                  <div className="col-3">
                    <div className="border rounded p-3 text-success text-center">
                      <div className="d-flex align-items-center justify-content-center mb-1 gap-1">
                        <ArrowUp size={16} />
                        <strong className="fs-5">$4500</strong>
                      </div>
                      <div className="text-muted small">Earnings</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="border rounded p-3 text-danger text-center">
                      <div className="d-flex align-items-center justify-content-center mb-1 gap-1">
                        <ArrowDown size={16} />
                        <strong className="fs-5">75</strong>
                      </div>
                      <div className="text-muted small">Projects</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="border rounded p-3 text-success text-center">
                      <div className="d-flex align-items-center justify-content-center mb-1 gap-1">
                        <ArrowUp size={16} />
                        <strong className="fs-5">60%</strong>
                      </div>
                      <div className="text-muted small">Success Rate</div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="border rounded p-3 text-center">
                      <span className="text-muted small">
                        Profile Completion
                      </span>
                      <div className="progress mt-2" style={{ height: "8px" }}>
                        <div
                          className="progress-bar bg-success"
                          style={{ width: "50%" }}
                        ></div>
                      </div>
                      <strong className="d-block mt-1">50%</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mt-4">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bs-toggle="tab"
                  href="#overview"
                >
                  Overview
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#projects">
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#campaigns">
                  Campaigns
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#documents">
                  Documents
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#connections"
                >
                  Connections
                </a>
              </li>
            </ul>

            {/* Tab Content (Optional Stub) */}
            <div className="tab-content pt-3">
              <div className="tab-pane fade show active" id="overview">
                {/* Your overview content */}
                <p>Overview content goes here...</p>
              </div>
              <div className="tab-pane fade" id="projects">
                <p>Projects content goes here...</p>
              </div>
              <div className="tab-pane fade" id="campaigns">
                <p>Campaigns content goes here...</p>
              </div>
              <div className="tab-pane fade" id="documents">
                <p>Documents content goes here...</p>
              </div>
              <div className="tab-pane fade" id="connections">
                <p>Connections content goes here...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex min-vh-100 bg-light p-4 gap-4">
        {/* Left Sidebar */}
        <div
          className="bg-white border rounded shadow-sm"
          style={{ width: "260px" }}
        >
          <div className="text-center border-bottom p-4">
            <div className="position-relative mb-3">
              <img
                src={profileImage}
                alt="Profile"
                width="80"
                height="80"
                className="rounded-circle object-fit-cover"
              />
              <div
                className="position-absolute top-0 end-0 bg-teal rounded-circle text-white d-flex align-items-center justify-content-center"
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#20c997",
                }}
              >
                ✓
              </div>
            </div>
            <h5 className="mb-0">James Jones</h5>
            <small className="text-muted d-block">Application</small>
            <small className="text-muted d-block">Developer</small>
            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-primary btn-sm w-50">Chat</button>
              <button className="btn btn-success btn-sm w-50">Follow</button>
            </div>
          </div>

          <div className="border-bottom p-4 small text-muted">
            <div className="d-flex justify-content-between mb-2">
              <span>Email:</span>
              <span className="text-dark">matt@lifestudios.com</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Phone:</span>
              <span className="text-dark">44(76)34254578</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Location:</span>
              <span className="text-dark">Melbourne</span>
            </div>
          </div>

          <nav className="p-2">
            {[
              { icon: <Diamond size={16} />, text: "Profile Overview" },
              { icon: <UserCircle size={16} />, text: "Personal Information" },
              {
                icon: <User size={16} className="text-teal" />,
                text: "Account Information",
                active: true,
              },
              {
                icon: <Lock size={16} />,
                text: "Change Password",
                badge: { text: "5", className: "bg-danger text-white" },
              },
              { icon: <Mail size={16} />, text: "Email settings" },
              { icon: <CreditCard size={16} />, text: "Saved Credit Cards" },
              {
                icon: <FileText size={16} />,
                text: "Tax Information",
                badge: {
                  text: "new",
                  className:
                    "bg-primary text-white px-2 py-0 rounded-pill small",
                },
              },
              { icon: <FileText size={16} />, text: "Statements" },
            ].map(({ icon, text, badge, active }, i) => (
              <a
                href="#"
                key={i}
                className={`d-flex align-items-center justify-content-between text-decoration-none p-2 rounded ${active ? "bg-light text-teal" : "text-dark"}`}
              >
                <div className="d-flex align-items-center">
                  <span className="me-2">{icon}</span>
                  {text}
                </div>
                {badge && (
                  <span className={`badge ${badge.className}`}>
                    {badge.text}
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-fill bg-white border rounded shadow-sm">
          <div className="d-flex justify-content-between align-items-center border-bottom p-4">
            <div>
              <h5 className="mb-1">Account Information</h5>
              <small className="text-muted">Change your account settings</small>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-success">Save Changes</button>
              <button className="btn btn-outline-secondary">Cancel</button>
            </div>
          </div>

          <div className="p-4">
            <h6 className="mb-4">Account:</h6>

            {/* Username */}
            <div className="row mb-4 align-items-center">
              <label className="col-sm-3">Username</label>
              <div className="col-sm-9 position-relative">
                <input
                  type="text"
                  defaultValue="nick84"
                  className="form-control bg-light"
                />
                <Check
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    color: "#20c997",
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="row mb-4 align-items-center">
              <label className="col-sm-3">Email Address</label>
              <div className="col-sm-9">
                <div className="input-group">
                  <span className="input-group-text bg-light border-light text-muted">
                    @
                  </span>
                  <input
                    type="email"
                    className="form-control bg-light"
                    defaultValue="nick.watson@loop.com"
                  />
                </div>
                <small className="text-muted d-block mt-1">
                  Email will not be publicly displayed.{" "}
                  <a href="#" className="text-primary">
                    Learn more
                  </a>
                  .
                </small>
              </div>
            </div>

            {/* Language */}
            <div className="row mb-4 align-items-center">
              <label className="col-sm-3">Language</label>
              <div className="col-sm-9 position-relative">
                <select className="form-select bg-light">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
                <ChevronDown
                  size={16}
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#6c757d",
                  }}
                />
              </div>
            </div>

            {/* Time Zone */}
            <div className="row mb-4 align-items-center">
              <label className="col-sm-3">Time Zone</label>
              <div className="col-sm-9 position-relative">
                <select className="form-select bg-light">
                  <option>(GMT-11:00) International Date Line West</option>
                  <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                  <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                  <option>(GMT+00:00) UTC</option>
                  <option>(GMT+01:00) Central European Time</option>
                </select>
                <ChevronDown
                  size={16}
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#6c757d",
                  }}
                />
              </div>
            </div>

            {/* Communication */}
            <div className="row mb-4 align-items-center">
              <label className="col-sm-3">Communication</label>
              <div className="col-sm-9 d-flex gap-4">
                {["Email", "SMS", "Push"].map((method, index) => (
                  <div
                    className="form-check d-flex align-items-center gap-2"
                    key={index}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultChecked={index !== 2}
                    />
                    <label className="form-check-label">{method}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Example;
