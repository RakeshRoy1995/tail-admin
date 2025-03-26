import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import {
  FileText,
  Users,
  Building,
  AlertTriangle,
  Bookmark,
  RotateCcw,
  Copyright,
} from "lucide-react";
import { motion } from "framer-motion"; // Import framer-motion
import { getUserDetails } from "@/utils";
import { submitAISummery, submitFormData } from "@/api/Reqest";
import AIOutputShow from "@/shared/showOutputFormat/AIOutputShow";
import {
  Font,
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image, // Import Image from @react-pdf/renderer
} from "@react-pdf/renderer";

const cards = [
  {
    title: "List of possible problem framings",
    icon: <FileText className="w-5 h-5 text-white" />,
    content:
      'Summarize the problem statement from the user data and documents provided. Create multiple different summaries to frame the problem from different view points. Let\'s call these summaries "Problem Framings". List them chronologically like "Problem Framing 1: (A short Title)" and then provide under 200 Words summary. The summaries should elaborate on the need of a new or redesigned institution to tackle the problem. Each framing can have different institutional need mentioned. do not exceed 1000 words on the overall output.',
    footer:
      'Remember this output as "List of possible problem framings" for future reference.',
  },
  {
    title: "List of affected people",
    icon: <Users className="w-5 h-5 text-white" />,
    content:
      "based on the given data and problem statement find out who are the affected people or groups for that particular problem. List them chronologically from most affected to the least affected. Give a two to three sentence overview on how each of the group gets affected. Do not exceed 5 groups.",
    footer:
      'Remember this output as "List of affected people" for future reference and use',
  },
  {
    title: "List of Institutional Gaps",
    icon: <AlertTriangle className="w-5 h-5 text-white" />,
    content:
      "List the institutional gaps from the problem statement. The gaps can be either the lack of institutions responsible for tackling the problem, or lack of existing models or role within the institution in question. Please list the institutional gaps chronologically in a numbered format. put short descriptions on each gap. Do not exceed 500 words for this analysis.",
    footer:
      'Remember this output as "list of institutional gaps" for future reference and use.',
  },
  {
    title: "List of Institutions Mapped",
    icon: <Building className="w-5 h-5 text-white" />,
    content:
      "Based on the data given to you previously and on the current problem statement, list the institutions that are relevant or have stakes in the problem statement. List the institutions by their name, mandate, brief description, sector. List them chronologically. do not go beyond 10 institutions. You may group them by type, for example government institutions or NGO or International Development agencies or private sector companies. if there are more than 10 institutions or such groupings, you do not need to list them further, just mention that there are more.",
    footer:
      'Remember this output as "List of institutions mapped" for future reference and use.',
  },
  {
    title: "List of Institutions Mapped",
    icon: <Building className="w-5 h-5 text-white" />,
    content:
      "Based on the data given to you previously and on the current problem statement, list the institutions that are relevant or have stakes in the problem statement. List the institutions by their name, mandate, brief description, sector. List them chronologically. do not go beyond 10 institutions. You may group them by type, for example government institutions or NGO or International Development agencies or private sector companies. if there are more than 10 institutions or such groupings, you do not need to list them further, just mention that there are more.",
    footer:
      'Remember this output as "List of institutions mapped" for future reference and use.',
  },
];

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf",
});
const styles = StyleSheet.create({
  page: {
    padding: 45,
  },

  common_header_for_all_page: {
    paddingBottom: 20, // Space for A4 size header
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  content_title: {
    backgroundColor: "#1a472a",
    color: "white",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  logo: {
    width: 100,
  },
  content: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: "justify",
  },
  phaseNamestyle: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: "justify",
    fontWeight: "bold",
    color: "#1a472a",
  },
  block: {
    marginBottom: 20,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "gray",
  },
});

const PDFDocument = ({ cards, output, activephase, phaseName }) => (
  <Document>
    {cards.map((card, index) => (
      <Page key={index} size="A4" style={styles.page}>
        {/* Common Page Header For all pages */}
        <View fixed style={styles.common_header_for_all_page}>
          <Image
            style={styles.logo}
            src="asset/member/images/logo.png" // Replace with the actual path to your logo
          />
          <Text
            style={{
              ...styles.phaseNamestyle,
              fontWeight: 900,
              color: "green",
            }}
          >
            Phase {""}
            {activephase}: {phaseName}
            {""}
          </Text>
        </View>
        {/*Content  Title */}
        <View style={styles.block}>
          <View style={styles.content_title}>
            <Text>{card.title}</Text>
          </View>
          <Text style={styles.content}>
            {output[index]?.output || card.content || "No content available"}
          </Text>
        </View>
        {/* Footer */}
        <Text fixed style={styles.footer}>
          <Copyright size={10} />©{"\u00A9"}
          {new Date().getFullYear()} Coinnovator. All rights reserved.
        </Text>
      </Page>
    ))}
  </Document>
);

const PropsedSystemMappainig = ({
  allPhasePromts,
  questionAnswer,
  activephase,
  phaseName,
}) => {

  console.log(`allPhasePromts`, allPhasePromts);
  const [submit, setsubmit] = useState<any>(false);
  const [error, seterror] = useState<any>("");
  const [output, setoutput] = useState<any>([]);
  const [payloadArr, setpayloadArr] = useState<any>([]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardBodyStyle = {
    overflowY: "auto",
    maxHeight: "300px", // Adjust height as needed
    paddingRight: "10px",
  };
  const cardBodyStyleCard1andCard3 = {
    overflowY: "auto",
    maxHeight: "600px", // Adjust height as needed
    paddingRight: "10px",
  };

  const customScrollbarStyle = {
    scrollbarWidth: "thin",
    scrollbarColor: "#6c757d #f8f9fa", // Custom scrollbar colors
  };

  const getPhaseOutput = async (id = null) => {
    seterror("");
    setsubmit(true);
    setoutput([]);
    try {
      const user_details = getUserDetails();

      const page_list = `${API_URL}/summary-output-phase/phase-userId/${id}/${user_details?.id}`;
      const method = "get";

      const options = {
        method,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await submitFormData(page_list, options);
      setoutput(data);
    } catch (error) {
      // seterror("Something Went Wrong");
    }
    setsubmit(false);
  };

  useEffect(() => {
    getPhaseOutput(activephase);
  }, [activephase]);

  const onSubmit = async () => {
    seterror("");
    setoutput([]);
    setsubmit(true);
    try {
      const user_details = getUserDetails();

      const payloadArr = [];

      const reply = questionAnswer.map((d: any) => d.aiReply);
      const result = [reply.join("\n\n")];

      console.log(`resuggggglt`, result, allPhasePromts);

      for (let index = 0; index < allPhasePromts.length; index++) {
        const element = allPhasePromts[index];
        const array = [element.prompt, result];

        console.log(`cdcsdvv`, array, array.join("\n\n") );
        const { data } = await submitAISummery(array.join("\n\n"));

        const obj = {
          output: data.summary,
          phasepromptId: element.id,
          userId: user_details?.id,
          phaseId: element.phaseId,
        };

        payloadArr.push(obj);
      }

      console.log(`result`, payloadArr);
      setpayloadArr(payloadArr);
      setoutput(payloadArr);

      localStorage.setItem("phaseOutputSummery", JSON.stringify(payloadArr));

      // for (let index = 0; index < payloadArr.length; index++) {
      //   const element = payloadArr[index];

      //   const page_list = `${API_URL}/summary-output-phase`;
      //   const method = "post";

      //   const options = {
      //     method,
      //     data: element,
      //     headers: {
      //       "content-type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   };

      //   await submitFormData(page_list, options);
      // }
      console.log(`allPhasePromts`, allPhasePromts, result);
      // const response = await submitAISummery("");
    } catch (error) {
      seterror("Something Went Wrong");
    }
    setsubmit(false);
  };

  const onSaveSummerySubmit = async () => {
    seterror("");
    setsubmit(true);
    try {
      for (let index = 0; index < payloadArr.length; index++) {
        const element = payloadArr[index];

        const page_list = `${API_URL}/summary-output-phase`;
        const method = "post";

        const options = {
          method,
          data: element,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        await submitFormData(page_list, options);
      }
      // const response = await submitAISummery("");
    } catch (error) {
      seterror("Something Went Wrong");
    }
    setsubmit(false);
  };

  console.log(`outpddddddddddut`, output, allPhasePromts, payloadArr);
  console.log(`cards`, cards);
  console.log(`phaseName`, phaseName);
  console.log(`activephase`, activephase);
  return (
    <>
      <div className="pt-5">
        <div className="container mt-4">
          <button
            className="btn btn-outline-secondary mb-3"
            style={{
              borderRadius: "50px",
              padding: "10px 20px",
              fontSize: "0.9rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => (window.location.href = "/admin")}
          >
            ← Back
          </button>
          <div
            style={{
              color: "rgba(15, 42, 29, 0.8)",
              fontSize: "1rem",
              lineHeight: "1.6",
            }}
          >
            Phase {""}
            {activephase}: {phaseName}
            {""} Output
          </div>
          <h1
            className="text-primary fw-bold display-6"
            style={{
              color: "#1a4c32",
              fontSize: "1.75rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Proposed System Mapping
          </h1>
        </div>

        <div className="container mt-5 h-100">
          <p className="text-center text-danger">{error}</p>
          <div className="row g-4 h-100">
            {/* Left column - first card */}
            <div className="col-md-4 d-flex">
              <motion.div
                className="card shadow-lg rounded-4 flex-grow-1"
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
                <div
                  className="card-body"
                  style={{
                    overflowY: "auto",
                    maxHeight: "600px", // Adjust height as needed
                    paddingRight: "10px",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#6c757d #f8f9fa",
                  }}
                >
                  <p className="text-muted">
                    {output.length > 0 && (
                      <AIOutputShow messages={output[0].output} />
                    )}
                  </p>
                  <small className="text-secondary fst-italic">
                    {cards[0].footer}
                  </small>
                </div>
              </motion.div>
            </div>

            {/* Middle column - two stacked cards */}
            <div className="col-md-5 d-flex flex-column gap-4">
              <motion.div
                className="card shadow-lg rounded-4 flex-grow-1"
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
                <div
                  className="card-body"
                  style={{
                    overflowY: "auto",
                    maxHeight: "300px", // Adjust height as needed
                    paddingRight: "10px",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#6c757d #f8f9fa",
                  }}
                >
                  <p className="text-muted">
                    {output.length > 0 && (
                      <AIOutputShow messages={output[1]?.output} />
                    )}
                  </p>
                  <small className="text-secondary fst-italic">
                    {cards[0].footer}
                  </small>
                </div>
              </motion.div>

              <motion.div
                className="card shadow-lg rounded-4 flex-grow-1"
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
                <div
                  className="card-body"
                  style={{
                    overflowY: "auto",
                    maxHeight: "300px", // Adjust height as needed
                    paddingRight: "10px",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#6c757d #f8f9fa",
                  }}
                >
                  <p className="text-muted">
                    {output.length > 0 && (
                      <AIOutputShow messages={output[2]?.output} />
                    )}{" "}
                  </p>
                  <small className="text-secondary fst-italic">
                    {cards[0].footer}
                  </small>
                </div>
              </motion.div>
            </div>

            {/* Right column - fourth card */}
            <div className="col-md-3 d-flex">
              <motion.div
                className="card shadow-lg rounded-4 flex-grow-1"
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
                <div
                  className="card-body"
                  style={{
                    overflowY: "auto",
                    maxHeight: "600px", // Adjust height as needed
                    paddingRight: "10px",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#6c757d #f8f9fa",
                  }}
                >
                  <p className="text-muted">
                    {output.length > 0 && (
                      <AIOutputShow messages={output[3]?.output} />
                    )}{" "}
                  </p>
                  <small className="text-secondary fst-italic">
                    {cards[3].footer}
                  </small>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container my-5 h-100">
          <div className="row g-4 h-100">
            {/* Left column - first card */}
            <div className="col-md-9 d-flex">
              <motion.div
                className="card shadow-lg rounded-4 flex-grow-1"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "rgba(240, 240, 240, 0.5)", // Slight color overlay
                  transition: { duration: 0.3 },
                }}
              >
                <div
                  className="card-header bg-success text-white d-flex align-items-center"
                  style={{ backgroundColor: "#1a472a" }}
                >
                  <div
                    className="p-2 bg-dark rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 40, height: 40 }}
                  >
                    {cards[0].icon}
                  </div>

                  <h5 className="ms-3 mb-0">Proposed system mapping</h5>
                </div>
                {/* Content */}
                <div
                  className="card-body"
                  style={{
                    overflowY: "auto",
                    maxHeight: "300px", // Adjust height as needed
                    paddingRight: "10px",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#6c757d #f8f9fa",
                  }}
                >
                  {output.length > 0 && (
                    <AIOutputShow messages={output[4]?.output} />
                  )}
                </div>
              </motion.div>
            </div>

            <div className="col-md-3 d-flex flex-column gap-2">
              <motion.button
                // disabled={submit}
                type="button"
                className="btn btn-secondary w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={(e) => onSubmit()}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(200, 200, 200, 0.8)",
                  transition: { duration: 0.3 },
                }}
              >
                <RotateCcw size={16} />
                <span>Regenerate {submit && "..."}</span>
              </motion.button>

              <motion.button
                disabled={submit}
                type="button"
                onClick={(e) => onSaveSummerySubmit()}
                className="btn text-white d-flex align-items-center justify-content-center gap-2"
                style={{ backgroundColor: "#1a472a", fontSize: "0.9rem" }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(26, 71, 42, 0.8)",
                  transition: { duration: 0.3 },
                }}
              >
                <Bookmark size={16} />
                <span>Save output {submit && "..."} </span>
              </motion.button>

              <motion.div
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "rgba(240, 240, 240, 0.5)", // Slight color overlay
                  transition: { duration: 0.3 },
                }}
              >
                <PDFDownloadLink
                  document={
                    <PDFDocument
                      cards={cards}
                      output={output}
                      phaseName={phaseName}
                      activephase={activephase}
                    />
                  }
                  fileName={`${phaseName.replace(/\s/g, "")}.pdf`}
                  className="btn d-flex align-items-center justify-content-center gap-2"
                  style={{
                    backgroundColor: "#004085", // Different color for Generate PDF button
                    color: "white",
                    textDecoration: "none",
                    padding: "5px",
                    borderRadius: "5px",
                    fontSize: "0.9rem",
                  }}
                >
                  {({ loading }) =>
                    loading ? (
                      "Generating PDF..."
                    ) : (
                      <>
                        <FileText size={16} />
                        <span>Generate PDF</span>
                      </>
                    )
                  }
                </PDFDownloadLink>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropsedSystemMappainig;
