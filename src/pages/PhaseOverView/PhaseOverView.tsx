import React, { useEffect, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import useFetch from "@/hooks/useFetch";
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

  const {
    data,
    loading,
    error,
    fetchData,
    deleteData,
    deleteMsg,
    common_data,
    fetchDataCommon,
    setcommon_Data,
    fetchSingleDataCommonByID,
    setsingleData,
    singleData,
    addFormShow,
    setaddFormShow,
  } = useFetch(`${API_URL}/phases`);

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

  const openModal = (phase) => {
    setSelectedPhase(phase);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPhase(null);
  };

  console.log("data", data);
  console.log("selected", selectedPhase);

  const fetchInitData = async () => {
    fetchData();
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  return (
    <div className="container">
      {/* Phases Grid */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {data?.map((phase, index) => {
          const cardStyle = card_css[index % card_css.length]; // Dynamically select card_css based on index
          return (
            <motion.div
              className="col"
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
             
            >
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  backgroundColor: cardStyle.color, // Use dynamic card_css color
                  borderRadius: "12px",
                  minHeight: "300px",
                  cursor: "pointer", // Add cursor pointer
                }}
              >
                <div className="card-body p-4">
                  <h5
                    className="card-title mb-4 text-center"
                    style={{ color: cardStyle.textColor }} // Use dynamic card_css textColor
                  >
                    {phase.name}
                  </h5>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="text-center">
                      <p
                        className="mb-0 fw-bold"
                        style={{
                          fontSize: "1.2rem",
                          color: cardStyle.textColor, // Use dynamic card_css textColor
                        }}
                      >
                        {index + 4}
                      </p>
                      <small style={{ color: "#666" }}>Blocks</small>
                    </div>
                    <div
                      style={{
                        width: "1px",
                        height: "40px",
                        backgroundColor: "#ccc",
                      }}
                    ></div>
                    <div className="text-center">
                      <p
                        className="mb-0 fw-bold"
                        style={{
                          fontSize: "1.2rem",
                          color: cardStyle.textColor, // Use dynamic card_css textColor
                        }}
                      >
                        {index + 10}
                      </p>
                      <small style={{ color: "#666" }}>Topics</small>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <div style={{ fontSize: "2rem", opacity: 0.6 }}>
                      <span role="img" aria-label="illustration">
                        {cardStyle.illustration}{" "}
                        {/* Use dynamic card_css illustration */}
                      </span>
                    </div>
                  </div>
                  {/* Add View Details Button */}
                  <div className="text-center mt-4">
                    <button
                      className="btn btn-primary"
                      onClick={() => openModal(phase)} // Open modal on button click
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Add New Phase Card */}
        <motion.div
          className="col"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true }}
        >
          <div
            className="card h-100 border-0 shadow-lg bg-white"
            style={{
              borderRadius: "16px",
              minHeight: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="card-body p-4 d-flex flex-column align-items-center justify-content-center">
              <h5
                className="card-title mb-4 text-center"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                Add New Phase
              </h5>
              <div className="text-center mt-3">
                <div
                  className="text-success"
                  style={{
                    fontSize: "5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link to="/add-phase">
                    <BsPlusCircleFill />
                  </Link>
                </div>
              </div>
            </div>
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
