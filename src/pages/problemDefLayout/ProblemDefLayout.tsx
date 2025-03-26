import { useState } from "react";
import "../../../public/asset/member/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

import "../../../public/asset/member/css/style.css";
import "../../../public/asset/member/css/responsive.css";
import AIOutputShow from "@/shared/showOutputFormat/AIOutputShow";

const ProblemDefLayout = ({
  output,
  setoutPutQues,
  outPutQues,
  setshowPhaseOutput,
  onSubmitPhaseOutput
}: any) => {
  // Sample Data for the sections

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
    setoutPutQues(output[index]);
  };

  console.log(`output`, output, outPutQues);

  return (
    <div>
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
          href="#"
          onClick={(e) => setshowPhaseOutput(false)}
          data-tooltip="Go Back"
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
          Back to Overview
        </a>
        <div className="phase-sections mt-4">
          <div className="section-list" id="sectionList">
            {output?.map((section: any, index: any) => (
              <div
                key={index}
                className={`section-item ${index === activeSectionIndex ? "active" : ""}`}
                onClick={() => activateSection(index)}
              >
                <div className="section-title">{section[0].block_name}</div>
                <div className="section-count">{section.length} questions</div>
              </div>
            ))}
          </div>
        </div>

        <a
          className="phase-output-btn text-decoration-none mt-4"
          href="#"
          onClick={(e) => onSubmitPhaseOutput()}
        >
          <i className="fas fa-arrow-circle-right" />
          Phase Output Summarize
        </a>
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
              {outPutQues[activeSectionIndex]?.block_name}
            </h1>
          </div>

          <div id="sectionContents">
            <div className="section-content">
              <div className="faq-list">
                {outPutQues.map((faq: any, faqIndex: number) => (
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
                      <p> <AIOutputShow messages={faq.aiReply} /> </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDefLayout;
