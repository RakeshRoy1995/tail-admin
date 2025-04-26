import {
  ArrowDown,
  ArrowUp,
  MoreHorizontal,
  CheckCircle,
  Check,
  ChevronDown,
  Diamond,
  Mail,
  CreditCard,
  FileText,
  Lock,
  User,
  UserCircle,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Box } from "@mui/material";
import { modelCss } from "@/utils";
import profileImage from "../../../assets/icons/Profile.svg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";
import { submitFormData } from "@/api/Reqest";
import DataTable from "../exapmle/Pagination";
import UpdatePhase from "./UpdatePhase";
import cardImage from "../../../assets/main page/demopic.png";
import UpdateBlock from "./UpdateBlock";
import useFetch from "@/hooks/useFetch";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

export default function PhaseDetails() {
  const { deleteData , deleteMsg , setdeleteMsg } = useFetch(`${API_URL}`);

  const { id } = useParams();
  const [phase, setphase] = useState(null);
  const [open, setOpen] = useState(false);
  const [blockUpdateModal, setblockUpdateModal] = useState(false);
  const [blocks, setblocks] = useState([]);
  const [question, setquestion] = useState([]);
  const [col, setcol] = useState([]);
  const [showQuestion, setshowQuestion] = useState(false);
  const [showBlock, setshowBlock] = useState(false);
  const [singleBlock, setsingleBlock] = useState(null);
  const [showUpdatePhase, setshowUpdatePhase] = useState(true);

  // Function to handle opening modal
  const handleOpen = (id: any) => {
    setOpen(true);
  };
  // Function to handle closing modal
  const handleClose = () => {
    setOpen(false);
    setblockUpdateModal(false);
  };

  useEffect(() => {
    fetchData("block");
  }, [deleteMsg]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/phases/${id}`);
        setphase(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const fetchData = async (type: any) => {
    try {
      setshowBlock(false);
      setshowQuestion(false);
      setshowUpdatePhase(false);
      if (type === "block") {
        setshowBlock(true);
        const page_list = `${API_URL}/phases/get-block-by-phaseid`;
        const method = "POST";

        const options = {
          method,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            phase_id: id,
          },
        };

        const { data } = await submitFormData(page_list, options);
        setblocks(data);
        setcol([
          { name: "id", label: "ID" },
          { name: "name", label: "Name" },
          { name: "status", label: "Status" },
        ]);
      }
      if (type === "question") {
        setshowQuestion(true);
        const page_list = `${API_URL}/phases/get-question-by-phaseid`;
        const method = "POST";

        const options = {
          method,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            phase_id: id,
          },
        };

        const { data } = await submitFormData(page_list, options);
        setquestion(data);
      }
      if (type === "update-phase") {
        setshowUpdatePhase(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const UpdatePhasehandleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};
    for (const [key, value] of formData) {
      obj = { ...obj, [key]: value };
    }

    const page_list = `${API_URL}/phases/${id}`;
    const method = "PUT";

    const options = {
      method,
      data: obj,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await submitFormData(page_list, options);
      toast.success("Phase Updated!");
    } catch (error) {
      toast.error("Phase Updated Failed!");
    }

    // fetchDataCommon(page_list, options);
  };

  const UpdateBlockhandleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};
    for (const [key, value] of formData) {
      obj = { ...obj, [key]: value };
    }

    const page_list = `${API_URL}/blocks/${singleBlock?.id}`;
    const method = "PUT";

    const options = {
      method,
      data: obj,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await submitFormData(page_list, options);
      toast.success("Block Updated!");
      fetchData("block");
      setblockUpdateModal(false);
    } catch (error) {
      toast.error("Phase Updated Failed!");
    }
  };

  const view = async (data: any, type = "view") => {
    try {
      if (type == "view") {
        setsingleBlock(data);
        setOpen(true);
      }

      if (type == "update") {
        setsingleBlock(data);
        setblockUpdateModal(true);
      }

      if (type == "delete") {
        const page_list = `${API_URL}/blocks/${data.id}`;
        await deleteData(page_list);
      }

      //   const response = await axiosInstance.get(`/phases/${id}`);
      //   setphase(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light gap-4">
      {/* Left Sidebar */}
      <div
        className="bg-white border rounded shadow-sm"
        style={{ width: "260px" }}
      >
        <div className="text-center border-bottom p-4">
          <div className="position-relative mb-3">
            <img
              src={profileImage}
              alt="Profile"
              width="80"
              height="80"
              className="rounded-circle object-fit-cover"
            />
            <div
              className="position-absolute top-0 end-0 bg-teal rounded-circle text-white d-flex align-items-center justify-content-center"
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#20c997",
              }}
            >
              ✓
            </div>
          </div>
          <h5 className="mb-0">{phase?.name}</h5>
          <small className="text-muted d-block">Phase {phase?.id} </small>
          {/* <small className="text-muted d-block">{phase.id} </small> */}
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-primary btn-sm w-50">Chat</button>
            <button className="btn btn-success btn-sm w-50">Follow</button>
          </div>
        </div>

        {/* <div className="border-bottom p-4 small text-muted">
          <div className="d-flex justify-content-between mb-2">
            <span>Email:</span>
            <span className="text-dark">matt@lifestudios.com</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Phone:</span>
            <span className="text-dark">44(76)34254578</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Location:</span>
            <span className="text-dark">Melbourne</span>
          </div>
        </div> */}

        <nav className="p-2">
          {[
            {
              icon: <Diamond size={16} />,
              text: "Block Overview",
              type: "block",
            },
            {
              icon: <UserCircle size={16} />,
              text: "Question Information",
              type: "question",
            },
            {
              icon: <User size={16} className="text-teal" />,
              text: "Add Block",
              active: true,
            },
            {
              icon: <CreditCard size={16} />,
              text: "Add Question",
              badge: { text: "5", className: "bg-danger text-white" },
            },
            // { icon: <Mail size={16} />, text: "Email settings" },
            // { icon: <CreditCard size={16} />, text: "Saved Credit Cards" },
            // {
            //   icon: <FileText size={16} />,
            //   text: "Tax Information",
            //   badge: {
            //     text: "new",
            //     className: "bg-primary text-white px-2 py-0 rounded-pill small",
            //   },
            // },
            {
              icon: <FileText size={16} />,
              text: "Update Phase",
              type: "update-phase",
            },
          ].map(({ icon, text, badge, active, type }, i) => (
            <a
              href="#"
              key={i}
              onClick={() => fetchData(type.toLowerCase())}
              className={`d-flex align-items-center justify-content-between text-decoration-none p-2 rounded ${active ? "bg-light text-teal" : "text-dark"}`}
            >
              <div className="d-flex align-items-center">
                <span className="me-2">{icon}</span>
                {text}
              </div>
              {badge && (
                <span className={`badge ${badge.className}`}>{badge.text}</span>
              )}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}

      <div className="flex-fill bg-white border rounded shadow-sm">
        {showBlock && <DataTable col={col} allData={blocks} view={view} />}
        {showQuestion && <DataTable col={col} allData={question} view={view} />}
        {showUpdatePhase && phase?.id && (
          <UpdatePhase data={phase} handleSubmit={UpdatePhasehandleSubmit} />
        )}
      </div>

      {/* Block show */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={modelCss}>
          {/* Modal content */}

          <div className="row g-4">
            <div className="col-md-12 col-lg-12">
              <div className="card">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      <div>
                        <h5 className="mb-0">{singleBlock?.name}</h5>
                      </div>
                    </div>
                    <button className="btn btn-sm text-muted">
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                  </div>

                  <p className="text-muted small mb-4">
                    {singleBlock?.discription}
                  </p>

                  <div className="row mb-3">
                    <div className="col">
                      <small className="text-muted">Sort</small>
                      <div>
                        <span className="badge bg-primary-subtle text-primary">
                          {singleBlock?.sort}
                        </span>
                      </div>
                    </div>
                    <div className="col">
                      <small className="text-muted">Status</small>
                      <div>
                        <span
                          className={
                            singleBlock?.status
                              ? "badge bg-danger-subtle text-success"
                              : "badge bg-danger-subtle text-danger"
                          }
                        >
                          {singleBlock?.status ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <small className="text-muted">Prompt</small>
                    <p className="text-muted small mb-4">
                      {singleBlock?.prompt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4 gap-5">
            <button
              onClick={handleClose}
              type="button"
              className="floating-btn save_btn btn btn-primary"
            >
              Close
            </button>
          </div>

          {/* Close button */}
        </Box>
      </Modal>

      {/* Block Update */}
      <Modal
        open={blockUpdateModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
      >
        <Box sx={modelCss}>
          {/* Modal content */}

          {blockUpdateModal && singleBlock?.id && (
            <UpdateBlock
              data={singleBlock}
              handleSubmit={UpdateBlockhandleSubmit}
            />
          )}

          {/* Close button */}
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
}
