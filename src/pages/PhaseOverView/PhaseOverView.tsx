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
    <div className="right-panel-wrap right-phase-wrap">
      {/* Phases Grid */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {data?.map((phase, index) => {
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
              <div className={"phase-box phase-box" + (index + 1)}>
                <h4>{phase.name}</h4>
                <div className="block-wrap">
                  <p> 5 Blocks</p>
                  <p> 21 Topics</p>
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
