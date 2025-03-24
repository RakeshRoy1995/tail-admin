import { useState } from "react";
import "../../../public/asset/member/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

import "../../../public/asset/member/css/style.css";
import "../../../public/asset/member/css/responsive.css";

const ProblemDefLayout = () => {
  // Sample Data for the sections
  const phasesAll = [
    "Problem Definition",
    "Research & Analysis",
    "User Interviews",
    "Data Synthesis",
    "Solution Ideation",
    "Design Exploration",
    "Prototyping",
    "User Testing",
    "Implementation",
    "Launch & Monitor",
  ];

  const sections = [
    {
      id: "problem-scope",
      title: "Problem Scope",
      count: "5 questions",
      description:
        "Define the boundaries and scope of the problem we are trying to solve.",
      faqs: [
        {
          question: "What is the core problem we are trying to solve?",
          answer:
            "The core problem should be clearly articulated and understood by all stakeholders.",
        },
        {
          question: "Who are the key stakeholders affected by this problem?",
          answer:
            "Identify all parties who are directly or indirectly impacted by the problem.",
        },
        {
          question: "What are the current limitations and constraints?",
          answer:
            "Document technical, business, and user constraints that might impact the solution.",
        },
      ],
    },
    {
      id: "success-criteria",
      title: "Success Criteria",
      count: "4 questions",
      description:
        "Establish clear metrics and criteria for measuring success.",
      faqs: [
        {
          question: "How will we measure success?",
          answer:
            "Define specific, measurable metrics that will indicate success.",
        },
        {
          question: "What are the key performance indicators (KPIs)?",
          answer:
            "Identify the most important metrics to track progress and success.",
        },
      ],
    },
    {
      id: "assumptions",
      title: "Assumptions & Risks",
      count: "6 questions",
      description: "Document key assumptions and potential risks.",
      faqs: [
        {
          question: "What are our key assumptions?",
          answer:
            "List all assumptions made about users, technology, business context, and market conditions.",
        },
        {
          question: "What are the potential risks?",
          answer: "Identify technical, business, and user-related risks.",
        },
      ],
    },
  ];

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeFaqs, setActiveFaqs] = useState({});

  // Toggle FAQ active state
  const toggleFaq = (sectionIndex, faqIndex) => {
    setActiveFaqs((prevState) => {
      const newState = { ...prevState };
      const sectionKey = `${sectionIndex}-${faqIndex}`;
      newState[sectionKey] = !newState[sectionKey]; // Toggle the specific FAQ
      return newState;
    });
  };

  const activateSection = (index) => {
    setActiveSectionIndex(index);
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-light bg-white border-bottom border-light">
          <div className="container-fluid">
            <div className="d-flex w-100 justify-content-between align-items-center">
              <a className="navbar-brand" href="#">
                <img
                  src="../../../public/asset/member/images/logo.png"
                  alt="Logo"
                  className="img-fluid"
                  width="120"
                />
              </a>
              <div className="d-flex align-items-center gap-4">
                <div className="dropdown custom-dropdown">
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
                    <li className="my-1">
                      <a className="dropdown-item" href="#">
                        <i className="fa fa-user-circle" aria-hidden="true"></i>
                        <span className="ml-2">Profile</span>
                      </a>
                    </li>
                    <li className="my-1">
                      <a className="dropdown-item" href="#">
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                        <span className="ml-2">Help & Support</span>
                      </a>
                    </li>
                    <li className="my-1">
                      <a className="dropdown-item" href="#">
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                        <span className="ml-2">Logout</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="__left-sidebar border-end __height-full">
          <button
            className="close_left_sidebar btn btn-danger mb-3"
            type="button"
          >
            <i className="fa fa-times" aria-hidden="true"></i>
            close
          </button>
          <a
            className="back-button text-decoration-none"
            href="/"
            data-tooltip="Go Back"
          >
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
            Back to Overview
          </a>
          <div className="phase-sections mt-4">
            <div className="section-list" id="sectionList">
              {sections?.map((section, index) => (
                <div
                  key={section.id}
                  className={`section-item ${index === activeSectionIndex ? "active" : ""}`}
                  onClick={() => activateSection(index)}
                >
                  <div className="section-title">{section.title}</div>
                  <div className="section-count">{section.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="__question-and-answer phase__description position-relative __margin-left bg-light min-vh-100">
          <div className="toggle_sidebar align-items-center justify-content-between px-3 w-100">
            <div className="toggle_left_sidebar">
              <i className="fa fa-bars fs-3" aria-hidden="true"></i>
            </div>
          </div>

          <div className="phase-content">
            <div className="phase-header">
              <h1 className="phase-title">
                {sections[activeSectionIndex].title}
              </h1>
              <p className="phase-description">
                {sections[activeSectionIndex].description}
              </p>
            </div>

            <div id="sectionContents">
              <div className="section-content">
                <div className="section-header">
                  <h2 className="section-title">
                    {sections[activeSectionIndex].title}
                  </h2>
                  <p className="section-description">
                    {sections[activeSectionIndex].description}
                  </p>
                </div>
                <div className="faq-list">
                  {sections[activeSectionIndex].faqs.map((faq, faqIndex) => (
                    <div
                      className={`faq-item ${
                        activeFaqs[`${activeSectionIndex}-${faqIndex}`]
                          ? "active"
                          : ""
                      }`}
                      key={faqIndex}
                      onClick={() => toggleFaq(activeSectionIndex, faqIndex)}
                    >
                      <div className="faq-question">
                        <span className="question-text">{faq.question}</span>
                        <i
                          className={`toggle-icon ${
                            activeFaqs[`${activeSectionIndex}-${faqIndex}`]
                              ? "ri-arrow-up-s-line"
                              : "ri-arrow-down-s-line"
                          }`}
                        ></i>
                      </div>
                      <div
                        className={`faq-answer ${
                          activeFaqs[`${activeSectionIndex}-${faqIndex}`]
                            ? "active"
                            : ""
                        }`}
                      >
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProblemDefLayout;
