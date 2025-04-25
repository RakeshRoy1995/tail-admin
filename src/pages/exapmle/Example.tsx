import React from "react";
import { ArrowDown, ArrowUp, CheckCircle, MoreHorizontal } from "lucide-react";

const Example = () => {
  return (
    <main className="d-flex min-vh-100 flex-column align-items-center justify-content-center p-5 bg-light">
      <div className="container max-w-4xl bg-white rounded shadow-lg border overflow-hidden">
        <div className="p-4">
          <div className="row g-4">
            {/* Profile Image and Status */}
            <div className="col-md-auto position-relative text-center">
              <img
                src="/placeholder.svg?height=150&width=150"
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
                    <span className="text-muted small">Profile Completion</span>
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
              <a className="nav-link" data-bs-toggle="tab" href="#connections">
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
    </main>
  );
};

export default Example;
