import React, { useEffect, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import useFetch from "@/hooks/useFetch";
import axiosInstance from "@/api/axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const card_css = [
  {
    color: "#ffede6",
    textColor: "#3366cc",
    illustration: "🗺️",
  },
  {
    color: "#fff8e6",
    textColor: "#b38600",
    illustration: "🧭",
  },
  {
    color: "#ffede6",
    textColor: "#cc5500",
    illustration: "🏗️",
  },
  {
    color: "#f8e6ff",
    textColor: "#8c1aff",
    illustration: "🌱",
  },
  {
    color: "#e6ffe6",
    textColor: "#1a8c1a",
    illustration: "📚",
  },
];

const PhasesDashboard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [phaseData, setphases] = useState([]);
  const [allBlock, setallblocks] = useState([]);
  const [allQues, setAllQues] = useState([]);
  const [phaseQuestionCount, setphaseQuestionCount] = useState({});

  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPhase(null);
  };

  // get phases
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/phases"); // Example endpoint

        if (response.data.length) {
          setphases(response.data);

          const res_block = await axiosInstance.get("/blocks"); // Example endpoint
          if (res_block.data.length) {
            setallblocks(res_block.data);
          }

          const res_ques = await axiosInstance.get("/question"); // Example endpoint
          setAllQues(res_ques.data);

          // Step 1: Build a mapping from blockId to phaseId
          const blockIdToPhaseId = {};
          res_block.data.forEach((block) => {
            blockIdToPhaseId[block.id] = block.phaseId;
          });

          // Step 2: Count questions per phase
          const phaseQuestionCount = {};
          res_ques.data.forEach((question) => {
            const phaseId = blockIdToPhaseId[question.blockId];
            if (phaseId) {
              phaseQuestionCount[phaseId] =
                (phaseQuestionCount[phaseId] || 0) + 1;
            }
          });
          setphaseQuestionCount(phaseQuestionCount);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleClick = (id: any) => {
    navigate("/phase/" + id); // replace with your path
  };

  return (
    <div className="right-panel-wrap right-phase-wrap">
      {/* Phases Grid */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {phaseData?.map((phase, index) => {
          const cardStyle = card_css[index % card_css.length]; // Dynamically select card_css based on index
          return (
            <motion.div
              className="col-md-4 col-sm-6 col-12"
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <div
                style={{ cursor: "pointer" }}
                className={"phase-box phase-box" + (index + 1)}
                onClick={() => handleClick(phase.id)}
              >
                <h4>{phase.name}</h4>
                <div className="block-wrap">
                  <p>
                    {" "}
                    {
                      allBlock.filter((d: any) => d.phaseId == phase.id).length
                    }{" "}
                    Blocks
                  </p>
                  <p> {phaseQuestionCount[phase.id]} Topics</p>
                </div>
                <a href="#">
                  <img src="asset/assets/img/phase1.png" alt="" />
                </a>
              </div>
            </motion.div>
          );
        })}

        {/* Add New Phase Card */}
        <motion.div
          className="col-md-4 col-sm-6 col-12"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true }}
        >
          <div className="phase-box phase-box6">
            <h4>Add New Phase</h4>
            <Link to="/add-phase">
              <img src="asset/assets/img/add-phase.png" alt="" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Modal for showing description */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Phase Description"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark background with opacity
            transition: "opacity 0.3s ease-in-out", // Smooth transition for overlay
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            padding: "20px",
            borderRadius: "12px",
            transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out", // Smooth animation for modal
            opacity: modalIsOpen ? 1 : 0, // Fade-in effect
          },
        }}
      >
        {selectedPhase && (
          <div>
            <h2>{selectedPhase.name}</h2>
            <p>{selectedPhase.discription}</p>
            <button onClick={closeModal} className="btn btn-secondary mt-3">
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PhasesDashboard;
