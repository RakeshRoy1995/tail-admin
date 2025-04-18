import { useEffect, useRef, useState } from "react";
import "../../../public/asset/member/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

import "../../../public/asset/member/css/style.css";
import "../../../public/asset/member/css/responsive.css";
import AIOutputShow from "@/shared/showOutputFormat/AIOutputShow";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image, // Import Image for the logo
} from "@react-pdf/renderer";
import questionIcon from "../../../public/custome/question_icon.png";
import { Document as WordDocument, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { enablePhaseOutput } from "@/utils";
const ProblemDefLayout = ({
  output,
  setoutPutQues,
  outPutQues,
  setshowPhaseOutput,
  onSubmitPhaseOutput,
}: any) => {
  // Sample Data for the sections

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeFaqs, setActiveFaqs] = useState({});
  const [pdfLink, setPdfLink] = useState<JSX.Element | null>(null);

  // Toggle FAQ active state
  const toggleFaq = (sectionIndex, faqIndex) => {
    console.log("sectionIndex, faqIndex", sectionIndex, faqIndex);
    setActiveFaqs((prevState) => {
      const newState = { ...prevState };
      const sectionKey = `${sectionIndex}-${faqIndex}`;
      newState[sectionKey] = !newState[sectionKey]; // Toggle the specific FAQ
      return newState;
    });
  };

  const activateSection = (index) => {
    console.log("index=====>", index);
    console.log("outPutQues====>", outPutQues);
    setActiveSectionIndex(index);
    setoutPutQues(output[index]);
  };

  // console.log(`output`, output, outPutQues);

  const exportOptions = [
    { icon: "fas fa-file-pdf", label: "Export as PDF" },
    { icon: "fas fa-file-word", label: "Export as Word" },
    { icon: "fas fa-file-alt", label: "Export as Markdown" },
    { icon: "fas fa-print", label: "Print Document" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const styles = StyleSheet.create({
    page: {
      padding: 45,
    },
    header: {
      paddingBottom: 20,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      width: 100,
    },
    phase_name: {
      marginTop: 10,
      fontSize: 16,
      lineHeight: 1.5,
      textAlign: "justify",
      fontWeight: "bold",
    },
    section_block_name: {
      marginTop: 10,
      fontSize: 12,
      lineHeight: 1.5,
      textAlign: "justify",
      fontWeight: "bold",
      color: "#1a472a",
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#1a472a",
    },
    content_title: {
      backgroundColor: "#1a472a",
      marginBottom: 20,
      color: "white",
      padding: 10,
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "left",
    },
    question_style: {
      fontSize: 12,
      lineHeight: 1.5,
      textAlign: "justify",
      marginBottom: 20,
      fontWeight: "bold",
      color: "#1a472a",
    },
    content: {
      fontSize: 12,
      lineHeight: 1.5,
      textAlign: "justify",
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
    pageNumber: {
      position: "absolute",
      bottom: 20,
      right: 43,
      fontSize: 10,
      color: "gray",
    },
  });

  const PDFDocument = ({ blockName, questions }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Logo */}
        <View style={styles.header}>
          <Image style={styles.logo} src="asset/member/images/logo.png" />
          <Text
            style={{
              ...styles.phase_name,
              fontWeight: "bold",
              color: "#1a472a",
            }}
          >
            Phase 01: Problem Definition
          </Text>
          <Text
            style={{
              ...styles.section_block_name,
              fontWeight: "bold",
              color: "#1a472a",
            }}
          >
            {blockName}
          </Text>
        </View>
        {/* Content */}
        <View>
          {/* <View style={styles.content_title}>
            <Text>Problem Scope</Text>
          </View> */}
          {questions.map((faq, index) => (
            <View key={index}>
              {/* <Text style={styles.question_style}>
                <i
                  className="fa fa-question-circle"
                  aria-hidden="true"
                  style={{ marginRight: 5 }}
                ></i>
                ❓ Q{index + 1}: {faq.question}
              </Text> */}
              <View
                key={index}
                style={{
                  flexDirection: "row", // row layout
                  alignItems: "center", // vertical align center
                  marginBottom: 10,
                }}
              >
                <Image
                  src={questionIcon} // or use an imported image
                  style={{
                    width: 12,
                    height: 12,
                    marginRight: 5,
                    marginBottom: 5,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 1.5,
                    fontWeight: "bold",
                    color: "#1a472a",
                    flex: 1,
                  }}
                >
                  Q{index + 1}: {faq.question}
                </Text>
              </View>

              <Text style={styles.content}>
                A: {faq.aiReply || "No answer available"}
              </Text>
            </View>
          ))}
        </View>
        {/* Footer */}
        <Text fixed style={styles.footer}>
          {"\u00A9"} Coinnovator. All rights reserved @
          {new Date().getFullYear()}
        </Text>
        <Text fixed style={styles.pageNumber}>
          Page 1 of 1
        </Text>
      </Page>
    </Document>
  );

  const handleExportWord = () => {
    const blockName = outPutQues[activeSectionIndex]?.block_name || "No Title";
    const questions = outPutQues || [];

    const doc = new WordDocument({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              alignment: "center", // Center align the text
              children: [
                new TextRun({
                  text: `Phase 01: Problem Definition`,
                  bold: true,
                  size: 28,
                  color: "1a472a",
                }),
              ],
            }),
            new Paragraph({
              alignment: "center", // Center align the text
              children: [
                new TextRun({
                  text: blockName,
                  bold: true,
                  size: 24,
                  color: "1a472a",
                }),
              ],
            }),
            ...questions
              .map((faq, index) => [
                new Paragraph({
                  // alignment: "center",
                  children: [
                    new TextRun({
                      text: `Q${index + 1}: ${faq.question}`,
                      bold: true,
                      size: 22,
                      color: "1a472a",
                    }),
                  ],
                }),
                new Paragraph({
                  // alignment: "center",
                  children: [
                    new TextRun({
                      text: `A: ${faq.aiReply || "No answer available"}`,
                      size: 20,
                    }),
                  ],
                }),
              ])
              .flat(),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${blockName.replace(/\s/g, "_")}.docx`);
    });
  };
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

        {/* <a
          className="phase-output-btn text-decoration-none mt-4"
          href="#"
          onClick={(e) => onSubmitPhaseOutput()}
        >
          <i className="fas fa-arrow-circle-right" />
          Phase Output Summarize
        </a> */}
      </div>

      <div className="__question-and-answer phase__description position-relative __margin-left bg-light min-vh-100">
        <div className="toggle_sidebar align-items-center justify-content-between px-3 w-100">
          <div className="toggle_left_sidebar">
            <i className="fa fa-bars fs-3" aria-hidden="true"></i>
          </div>
        </div>

        <div className="phase-content">
          {/* <div className="phase-header d-flex justify-content-between align-items-center">
            <h1 className="phase-title">
              {outPutQues[activeSectionIndex]?.block_name}
            </h1>
            <button
              className="phase-output-btn text-decoration-none "
              type="button"
              onClick={(e) => onSubmitPhaseOutput()}
              disabled={!enablePhaseOutput()}
              title={
                enablePhaseOutput() ? "" : "Please give answer to all questions"
              }
            >
              <i className="fas fa-arrow-circle-right" />
              Phase Output Summarize
            </a>
          </div> */}
          <div className="phase-header ">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="phase-title">Problem Definition</h1>
              <button
                className="phase-output-btn text-decoration-none "
                type="button"
                onClick={(e) => onSubmitPhaseOutput()}
                disabled={!enablePhaseOutput()}
                title={
                  enablePhaseOutput()
                    ? ""
                    : "Please give answer to all questions"
                }
              ></button>
            </div>
            <p className="phase-description">
              In this phase, we focus on understanding and clearly defining the
              problem space through systematic analysis and stakeholder input.
            </p>
          </div>

          <div id="sectionContents">
            <div className="section-header">
              <h2 className="section-title" style={{ fontSize: "1.25rem" }}>
                {outPutQues[activeSectionIndex]?.block_name}
              </h2>
              <p className="section-description">
                Define the boundaries and scope of the problem we are trying to
                solve.
              </p>
            </div>
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
                      <p>
                        {" "}
                        <AIOutputShow messages={faq.aiReply} />{" "}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="export-actions" ref={menuRef}>
        {/* Export Menu */}
        <div className={`export-menu ${menuOpen ? "active" : ""}`}>
          {/* <PDFDownloadLink
            document={
              <PDFDocument
                blockName={
                  outPutQues[activeSectionIndex]?.block_name || "No Title"
                }
                questions={outPutQues || []}
              />
            }
            fileName={`${
              outPutQues[activeSectionIndex]?.block_name?.replace(/\s/g, "_") ||
              "Document"
            }.pdf`}
            className="export-btn"
            style={{ textDecoration: "none" }}
          >
            {({ loading }) => (
              <>
                <i className="fas fa-file-pdf"></i>{" "}
                {loading ? "Generating PDF..." : "Export as PDF"}
              </>
            )}
          </PDFDownloadLink> */}
          <PDFDownloadLink
            document={
              <PDFDocument
                blockName={
                  outPutQues[activeSectionIndex]?.block_name || "No Title"
                }
                questions={outPutQues || []}
              />
            }
            fileName={`${
              outPutQues[activeSectionIndex]?.block_name?.replace(/\s/g, "_") ||
              "Document"
            }.pdf`}
            className="export-btn"
            style={{ textDecoration: "none" }}
          >
            <span>
              <i className="fas fa-file-pdf"></i> Export as PDF
            </span>
          </PDFDownloadLink>

          <button
            className="export-btn"
            // onClick={handleExportWord}
          >
            <i className="fas fa-file-word"></i> Export as Word
          </button>
          <button className="export-btn">
            <i className="fas fa-file-alt"></i> Export as Markdown
          </button>

          <button className="export-btn">
            <i className="fas fa-print"></i> Print Document
          </button>
        </div>

        {/* Main Export Button */}
        <button
          className={`main-export-btn  ${menuOpen ? "active" : ""}`}
          data-tooltip="Export Options"
          onClick={toggleMenu}
        >
          <i className="fas fa-download"></i>
        </button>

        {/* Render PDF Download Link */}
        {pdfLink && <div className="mt-3">{pdfLink}</div>}
      </div>
    </div>
  );
};

export default ProblemDefLayout;
