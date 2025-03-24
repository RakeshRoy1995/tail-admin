import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Users,
  Building,
  AlertTriangle,
  Bookmark,
} from "lucide-react";
import { motion } from "framer-motion"; // Import framer-motion

const cards = [
  {
    title: "List of possible problem framings",
    icon: <FileText className="w-5 h-5 text-white" />,
    content:
      'Summarize the problem statement from the user data and documents provided. Create multiple different summaries to frame the problem from different view points. Let\'s call these summaries "Problem Framings". List them chronologically like "Problem Framing 1: (A short Title)" and then provide under 200 Words summary. The summaries should elaborate on the need of a new or redesigned institution to tackle the problem. Each framing can have different institutional need mentioned. do not exceed 1000 words on the overall output.',
    footer:
      '##### Remember this output as "List of possible problem framings" for future reference.',
  },
  {
    title: "List of affected people",
    icon: <Users className="w-5 h-5 text-white" />,
    content:
      "based on the given data and problem statement find out who are the affected people or groups for that particular problem. List them chronologically from most affected to the least affected. Give a two to three sentence overview on how each of the group gets affected. Do not exceed 5 groups.",
    footer:
      '##### Remember this output as "List of affected people" for future reference and use',
  },
  {
    title: "List of Institutional Gaps",
    icon: <AlertTriangle className="w-5 h-5 text-white" />,
    content:
      "List the institutional gaps from the problem statement. The gaps can be either the lack of institutions responsible for tackling the problem, or lack of existing models or role within the institution in question. Please list the institutional gaps chronologically in a numbered format. put short descriptions on each gap. Do not exceed 500 words for this analysis.",
    footer:
      '### Remember this output as "list of institutional gaps" for future reference and use.',
  },
  {
    title: "List of Institutions Mapped",
    icon: <Building className="w-5 h-5 text-white" />,
    content:
      "Based on the data given to you previously and on the current problem statement, list the institutions that are relevant or have stakes in the problem statement. List the institutions by their name, mandate, brief description, sector. List them chronologically. do not go beyond 10 institutions. You may group them by type, for example government institutions or NGO or International Development agencies or private sector companies. if there are more than 10 institutions or such groupings, you do not need to list them further, just mention that there are more.",
    footer:
      '##### Remember this output as "List of institutions mapped" for future reference and use.',
  },
];

const PropsedSystemMappainig = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div>
        <div className="w-100 py-3 px-4">
          <div className="d-flex align-items-center gap-3">
            <a href="/" className="text-decoration-none">
              <div className="d-flex flex-column align-items-center">
                <img
                  src="/public/asset/assets/img/logo-coinnovator301209.jpg"
                  alt="CO-INNOVATOR Logo"
                  width={80}
                  height={50}
                  className="mb-1"
                />
                <span className="text-muted text-success fw-medium small">
                  CO-INNOVATOR
                </span>
              </div>
            </a>
            <div>
              <div className="text-success fw-medium">Phase 1 output</div>
              <h1 className="text-primary fw-bold display-6">
                Proposed System Mapping
              </h1>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row g-4">
            {/* Left column - first card */}
            <div className="col-md-4">
              <motion.div
                className="card shadow-lg rounded-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "rgba(240, 240, 240, 0.5)", // Slight color overlay
                  transition: { duration: 0.3 },
                }}
              >
                <div className="card-header bg-success text-white d-flex align-items-center">
                  <div
                    className="p-2 bg-dark rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 40, height: 40 }}
                  >
                    {cards[0].icon}
                  </div>
                  <h5 className="ms-3 mb-0">{cards[0].title}</h5>
                </div>
                <div className="card-body">
                  <p className="text-muted">{cards[0].content}</p>
                  <small className="text-secondary fst-italic">
                    {cards[0].footer}
                  </small>
                </div>
              </motion.div>
            </div>

            {/* Middle column - two stacked cards */}
            <div className="col-md-4 d-flex flex-column gap-4">
              {cards.slice(1, 3).map((card, index) => (
                <motion.div
                  key={index}
                  className="card shadow-lg rounded-4"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    scale: 1.03,
                    backgroundColor: "rgba(240, 240, 240, 0.5)", // Slight color overlay
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="card-header bg-success text-white d-flex align-items-center">
                    <div
                      className="p-2 bg-dark rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: 40, height: 40 }}
                    >
                      {card.icon}
                    </div>
                    <h5 className="ms-3 mb-0">{card.title}</h5>
                  </div>
                  <div className="card-body">
                    <p className="text-muted">{card.content}</p>
                    <small className="text-secondary fst-italic">
                      {card.footer}
                    </small>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right column - fourth card */}
            <div className="col-md-4">
              <motion.div
                className="card shadow-lg rounded-4"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "rgba(240, 240, 240, 0.5)", // Slight color overlay
                  transition: { duration: 0.3 },
                }}
              >
                <div className="card-header bg-success text-white d-flex align-items-center">
                  <div
                    className="p-2 bg-dark rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 40, height: 40 }}
                  >
                    {cards[3].icon}
                  </div>
                  <h5 className="ms-3 mb-0">{cards[3].title}</h5>
                </div>
                <div className="card-body">
                  <p className="text-muted">{cards[3].content}</p>
                  <small className="text-secondary fst-italic">
                    {cards[3].footer}
                  </small>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container my-5">
          <motion.div
            className="d-flex gap-5 align-items-start"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Card */}
            <motion.div
              className="card shadow-lg flex-grow-1 rounded-4"
              whileHover={{
                scale: 1.03,
                backgroundColor: "rgba(240, 240, 240, 0.5)", // Slight color overlay
                transition: { duration: 0.3 },
              }}
            >
              {/* Header */}
              <div
                className="card-header text-white"
                style={{ backgroundColor: "#1a472a" }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#2d7a5d",
                    }}
                  >
                    <FileText size={20} color="white" />
                  </div>
                  <h5 className="m-0">Proposed system mapping</h5>
                </div>
              </div>

              {/* Content */}
              <div className="card-body">
                <p>
                  Take into account "List of Possible problem framings", "List
                  of affected people", "List of Institutions Mapped" and "List
                  of Institutional Gaps" that you created based on the problem
                  statement and future findings; create a summary report titled
                  "Proposed system mapping" that will help in designing a new
                  institution or modifying an existing one to tackle the
                  problem.
                </p>
                <p>
                  The report should contain the summary of the problem
                  statement, the affected people or groups, the institutional
                  gaps and the institutional landscape for the problem
                  statement. Then provide a set of bullet points on what needs
                  to be tackled by an institution or modify the existing
                  institution to tackle the problem. Please take into account
                  the TIALA's institutional design model and suggest what needs
                  to be addressed in phase 2 of the model. The summary should
                  contain these items:
                </p>
                <ol className="ps-3">
                  <li>
                    Map the landscape of existing institutions, systems, or
                    initiatives relevant to the core problems. Include both
                    direct stakeholders and those that influence the landscape
                    like advocacy organizations, policy-making bodies, and
                    community groups.
                  </li>
                  <li>
                    Define the initial purpose of the institution or initiative.
                    Take into consideration how it will address the identified
                    core problems and goals in relation to the groups it intends
                    to serve.
                  </li>
                  <li>
                    Evaluate the constraints—political, social, operational, or
                    financial—that could affect the creation of a new
                    institution or initiative.
                  </li>
                  <li>
                    Identify the key stakeholders who could form the guiding
                    coalition. Specify their potential roles and contributions
                    in overcoming constraints and leveraging opportunities.
                  </li>
                </ol>
                <p className="fst-italic">
                  The summary should not be longer than 2000 words.
                </p>
              </div>
            </motion.div>

            {/* Buttons on the same row */}
            <div className="d-flex flex-column gap-2">
              <motion.button
              className="btn btn-secondary w-100"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(200, 200, 200, 0.8)", // Slight color overlay
                transition: { duration: 0.3 },
              }}
              >
              Rework
              </motion.button>

              <motion.button
              className="btn text-white d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: "#1a472a" }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(26, 71, 42, 0.8)", // Slight color overlay
                transition: { duration: 0.3 },
              }}
              >
              <Bookmark size={16} />
              <span>Save output Saved</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PropsedSystemMappainig;
