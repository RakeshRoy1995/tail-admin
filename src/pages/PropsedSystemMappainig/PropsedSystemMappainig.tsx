import React from "react";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "List of possible problem framings",
    content:
      'Summarize the problem statement from the user data and documents provided. Create multiple different summaries to frame the problem from different view points. Let\'s call these summaries "Problem Framings". List them chronologically like "Problem Framing 1: (A short Title)" and then provide under 200 Words summary. The summaries should elaborate on the need of a new or redesigned institution to tackle the problem. Each framing can have different institutional need mentioned. do not exceed 1000 words on the overall output.',
    footer:
      '##### Remember this output as "List of possible problem framings" for future reference.',
  },
  {
    title: "List of affected people",
    content:
      "based on the given data and problem statement find out who are the affected people or groups for that particular problem. List them chronologically from most affected to the least affected. Give a two to three sentence overview on how each of the group gets affected. Do not exceed 5 groups.",
    footer:
      '##### Remember this output as "List of affected people" for future reference and use',
  },
  {
    title: "List of Institutional Gaps",
    content:
      "List the institutional gaps from the problem statement. The gaps can be either the lack of institutions responsible for tackling the problem, or lack of existing models or role within the institution in question. Please list the institutional gaps chronologically in a numbered format. put short descriptions on each gap. Do not exceed 500 words for this analysis.",
    footer:
      '### Remember this output as "list of institutional gaps" for future reference and use.',
  },
  {
    title: "List of Institutions Mapped",
    content:
      "Based on the data given to you previously and on the current problem statement, list the institutions that are relevant or have stakes in the problem statement. List the institutions by their name, mandate, brief description, sector. List them chronologically. do not go beyond 10 institutions. You may group them by type, for example government institutions or NGO or International Development agencies or private sector companies. if there are more than 10 institutions or such groupings, you do not need to list them further, just mention that there are more.",
    footer:
      '##### Remember this output as "List of institutions mapped" for future reference and use.',
  },
];

const PropsedSystemMappainig = () => {
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          {/* Left column - first card */}
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              overflow: "hidden",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                backgroundColor: "#1a4c32",
                padding: "12px 16px",
                color: "white",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {cards[0].title}
              </h2>
            </div>
            <div
              style={{
                padding: "16px",
                fontSize: "14px",
                color: "#333",
                lineHeight: "1.5",
              }}
            >
              <p>{cards[0].content}</p>
            </div>
            <div
              style={{
                padding: "0 16px 16px",
                fontSize: "12px",
                color: "#666",
                fontStyle: "italic",
              }}
            >
              <p>{cards[0].footer}</p>
            </div>
          </div>

          {/* Middle column - two cards stacked */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Middle column - first card */}
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                overflow: "hidden",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  backgroundColor: "#1a4c32",
                  padding: "12px 16px",
                  color: "white",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {cards[1].title}
                </h2>
              </div>
              <div
                style={{
                  padding: "16px",
                  fontSize: "14px",
                  color: "#333",
                  lineHeight: "1.5",
                }}
              >
                <p>{cards[1].content}</p>
              </div>
              <div
                style={{
                  padding: "0 16px 16px",
                  fontSize: "12px",
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                <p>{cards[1].footer}</p>
              </div>
            </div>

            {/* Middle column - second card */}
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                overflow: "hidden",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  backgroundColor: "#1a4c32",
                  padding: "12px 16px",
                  color: "white",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {cards[2].title}
                </h2>
              </div>
              <div
                style={{
                  padding: "16px",
                  fontSize: "14px",
                  color: "#333",
                  lineHeight: "1.5",
                }}
              >
                <p>{cards[2].content}</p>
              </div>
              <div
                style={{
                  padding: "0 16px 16px",
                  fontSize: "12px",
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                <p>{cards[2].footer}</p>
              </div>
            </div>
          </div>

          {/* Right column - fourth card */}
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              overflow: "hidden",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                backgroundColor: "#1a4c32",
                padding: "12px 16px",
                color: "white",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {cards[3].title}
              </h2>
            </div>
            <div
              style={{
                padding: "16px",
                fontSize: "14px",
                color: "#333",
                lineHeight: "1.5",
              }}
            >
              <p>{cards[3].content}</p>
            </div>
            <div
              style={{
                padding: "0 16px 16px",
                fontSize: "12px",
                color: "#666",
                fontStyle: "italic",
              }}
            >
              <p>{cards[3].footer}</p>
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px",
            display: "flex",
            gap: "20px",
            alignItems: "stretch",
          }}
        >
          {/* System Mapping Card */}
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              overflow: "hidden",
              backgroundColor: "white",
              flex: "1",
            }}
          >
            <div
              style={{
                backgroundColor: "#1a4c32",
                padding: "12px 16px",
                color: "white",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Proposed system mapping
              </h2>
            </div>
            <div
              style={{
                padding: "16px",
                fontSize: "14px",
                color: "#333",
                lineHeight: "1.5",
              }}
            >
              <p>
                Take into account "List of Possible problem framings", "List of
                affected people", "List of Institutions Mapped" and "List of
                Institutional Gaps" that you created based on the problem
                statement and future findings; create a summary report titled
                "Proposed system mapping" that will help in designing a new
                institution or modifying an existing one to tackle the problem.
              </p>

              <p style={{ marginTop: "15px" }}>
                The report should contain the summary of the problem statement,
                the affected people or groups, the institutional gaps and the
                institutional landscape for the problem statement. Then provide
                a set of bullet points on what needs to be tackled by an
                institution or modify the existing institution to tackle the
                problem. Please take into account the TIALA's institutional
                design model and suggest what needs to be addressed in phase 2
                of the model. The summary should contain these items:
              </p>

              <ol style={{ paddingLeft: "20px", marginTop: "15px" }}>
                <li style={{ marginBottom: "10px" }}>
                  Map the landscape of existing institutions, systems, or
                  initiatives relevant to the core problems. Include both direct
                  stakeholders and those that influence the landscape like
                  advocacy organizations, policy-making bodies, and community
                  groups. Analyze their mandates, key tasks, and historical
                  effectiveness. Identify gaps or voids where new institutions,
                  partnerships, or initiatives might be needed.
                </li>
                <li style={{ marginBottom: "10px" }}>
                  Define the initial purpose of the institution or initiative.
                  Take into consideration how it will address the identified
                  core problems and goals in relation to the groups it intends
                  to serve.
                </li>
                <li style={{ marginBottom: "10px" }}>
                  Evaluate the constraints—political, social, operational, or
                  financial—that could affect the creation of a new institution
                  or initiative. Constraints by their potential impact and
                  consider any interdependencies that could exacerbate
                  challenges. At the same time, identify potential allies,
                  resources, and opportunities for collaboration. Identify
                  innovative and collaborative possibilities and leverage points
                  to push the boundaries of imagination while staying grounded
                  in the practical context.
                </li>
                <li style={{ marginBottom: "10px" }}>
                  Identify the key stakeholders who could form the guiding
                  coalition. Specify their potential roles and contributions in
                  overcoming constraints and leveraging opportunities. Clarify
                  who owns the problem being addressed and outline mechanisms
                  for coordination and shared accountability within the
                  coalition.
                </li>
              </ol>

              <p style={{ marginTop: "15px" }}>
                The summary should not be longer than 2000 words.
              </p>
            </div>
          </div>

          {/* Buttons on the right side */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "flex-start",
              width: "120px",
            }}
          >
            <button
              style={{
                backgroundColor: "#264653",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "10px",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              Rework
            </button>

            <button
              style={{
                backgroundColor: "#264653",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              Save output
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropsedSystemMappainig;
