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
import { Modal, Box, Typography } from "@mui/material";
import { modelCss } from "@/utils";
import profileImage from "../../../assets/icons/Profile.svg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";
import { get_all_data, submitFormData } from "@/api/Reqest";
import DataTable from "../exapmle/Pagination";
import UpdatePhase from "./UpdatePhase";
import UpdateBlock from "./UpdateBlock";
import useFetch from "@/hooks/useFetch";
import UpdateQuestion from "./UpdateQuestion";
import PhaseOutputDetails from "./PhaseOutputDetails";
import PhaseSummeryOutput from "./PhaseSummeryOutput";
import UpdatePrompt from "./UpdatePrompt";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

export default function PhaseDetails() {
  const { deleteData, deleteMsg } = useFetch(`${API_URL}`);

  const { id } = useParams();
  const [phase, setphase] = useState(null);
  const [open, setOpen] = useState(false);
  const [blockUpdateModal, setblockUpdateModal] = useState(false);
  const [blockAddModal, setblockAddModal] = useState(false);

  const [openQuestion, setOpenQuestion] = useState(false);
  const [questionUpdateModal, setquestionUpdateModal] = useState(false);
  const [questionAddModal, setquestionAddModal] = useState(false);

  const [openPrompt, setopenPrompt] = useState(false);
  const [openPromptModal, setopenPromptModal] = useState(false);
  const [promptAddModal, setpromptAddModal] = useState(false);
  const [showPromts, setshowPromts] = useState(false);


  const [aiModal, setaiModal] = useState(false);
  const [openAiModal, setopenAiModal] = useState(false);
  const [addAiModal, setaddAiModal] = useState(false);
  const [showAiModal, setshowAiModal] = useState(false);


  const [blocks, setblocks] = useState([]);
  const [question, setquestion] = useState([]);
  const [col, setcol] = useState([]);
  const [showQuestion, setshowQuestion] = useState(false);
  const [showBlock, setshowBlock] = useState(false);
  const [selectedType, setselectedType] = useState("update-phase");
  const [singleBlock, setsingleBlock] = useState(null);
  const [showUpdatePhase, setshowUpdatePhase] = useState(true);
  const [showPhaseOutput, setshowPhaseOutput] = useState(false);
  const [showPhaseSummery, setshowPhaseSummery] = useState(false);

  const [userChat, setuserChat] = useState([]);
  const [allUsersList, setAllUsersList] = useState([]);
  const [SummeryOutput, setSummeryOutput] = useState<any>([]);

  // Function to handle closing modal
  const handleClose = () => {
    setOpen(false);
    setblockUpdateModal(false);
    setquestionUpdateModal(false);
    setpromptAddModal(false);
    setopenPromptModal(false);
    setOpenQuestion(false);
    setaddAiModal(false);

  };

  useEffect(() => {
    if (deleteMsg) {
      fetchData("block");
    }
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
      setselectedType(type);
      setshowBlock(false);
      setshowQuestion(false);
      setshowUpdatePhase(false);
      setblockAddModal(false);
      setquestionAddModal(false);
      setshowPhaseOutput(false);
      setshowPhaseSummery(false);
      setshowPromts(false);
      setpromptAddModal(false);
      setshowAiModal(false)
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
      if (type == "add-block") {
        setblockAddModal(true);
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
        setcol([
          { name: "question_id", label: "ID" },
          { name: "question_question", label: "Question" },
          { name: "blockName", label: "Block" },
          { name: "status", label: "Status" },
        ]);
      }
      if (type == "add-question") {
        setquestionAddModal(true);
      }
      if (type === "update-phase") {
        setshowUpdatePhase(true);
      }

      if (type === "phase-output" || type === "phase-summery") {
        if (type === "phase-output") {
          setshowPhaseOutput(true);
        } else {
          setshowPhaseSummery(true);
        }
        const page_list = `${API_URL}/phases/get-phase-output-by-phaseid`;
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
        setuserChat(data);
        if (data.length) {
          const getAllUsersURL = "users/all-members";
          const { data: allUsersList }: any =
            await get_all_data(getAllUsersURL);
          setAllUsersList(allUsersList);

          if (allUsersList.length && question.length == 0) {
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
        }
        // setcol([
        //   { name: "id", label: "ID" },
        //   { name: "name", label: "Name" },
        //   { name: "status", label: "Status" },
        // ]);
      }

      if (type == "phase prompt") {
        setshowPromts(true);

        const page_list = `${API_URL}/phase-prompt/findByPhaseId`;
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
          { name: "question", label: "question" },
          { name: "prompt", label: "prompt" },
          { name: "sort", label: "sort" },
          { name: "status", label: "Status" },
        ]);
      }

      if (type == "add prompt") {
        setpromptAddModal(true);
      }
      if (type == "ai-modal") {
        setshowAiModal(true);
        const page_list = `${API_URL}/ai-model`;
        const method = "get";

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
          { name: "code", label: "code" },
          { name: "sort", label: "sort" },
          { name: "status", label: "Status" },
        ]);

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

    const page_list = `${API_URL}/blocks${singleBlock?.id ? `/${singleBlock?.id}` : ""}`;
    const method = singleBlock?.id ? "PUT" : "POST";

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
      setsingleBlock(null);
    } catch (error) {
      toast.error("Phase Updated Failed!");
    }
  };

  const UpdateQueshandleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};
    for (const [key, value] of formData) {
      obj = { ...obj, [key]: value };
    }

    const page_list = `${API_URL}/question${singleBlock?.question_id ? `/${singleBlock?.question_id}` : ""}`;
    const method = singleBlock?.question_id ? "Patch" : "POST";

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
      toast.success("Question Updated!");
      fetchData("question");
      setquestionUpdateModal(false);
      setsingleBlock(null);
    } catch (error) {
      toast.error("Question Updated Failed!");
    }
  };

  const UpdatePrompthandleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};
    for (const [key, value] of formData) {
      obj = { ...obj, [key]: value };
    }

    const page_list = `${API_URL}/phase-prompt${singleBlock?.id ? `/${singleBlock?.id}` : ""}`;
    const method = singleBlock?.id ? "Patch" : "POST";

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
      toast.success("Prompt Add/Updated!");
      fetchData("phase prompt");
      setpromptAddModal(false);
      setopenPromptModal(false);
      setsingleBlock(null);
    } catch (error) {
      toast.error("Prompt Add/Updated Failed!");
    }
  };

  // blocks operation
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

  // question operation
  const quesOperation = async (data: any, type = "view") => {
    try {
      if (type == "view") {
        setsingleBlock(data);
        setOpenQuestion(true);
      }

      if (type == "update") {
        setsingleBlock(data);
        setquestionUpdateModal(true);
      }

      if (type == "delete") {
        const page_list = `${API_URL}/question/${data.question_id}`;
        await deleteData(page_list);
      }

      //   const response = await axiosInstance.get(`/phases/${id}`);
      //   setphase(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Prompt operation
  const promptOperation = async (data: any, type = "view") => {
    try {
      if (type == "view") {
        setsingleBlock(data);
        setopenPrompt(true);
      }

      if (type == "update") {
        setsingleBlock(data);
        setopenPromptModal(true);
      }

      if (type == "delete") {
        const page_list = `${API_URL}/phase-prompt/${data.id}`;
        await deleteData(page_list);
      }

      //   const response = await axiosInstance.get(`/phases/${id}`);
      //   setphase(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // question operation
  const AiOperation = async (data: any, type = "view") => {
    try {
      if (type == "view") {
        setsingleBlock(data);
        setOpenQuestion(true);
      }

      if (type == "update") {
        setsingleBlock(data);
        setquestionUpdateModal(true);
      }

      if (type == "delete") {
        const page_list = `${API_URL}/question/${data.question_id}`;
        await deleteData(page_list);
      }

      //   const response = await axiosInstance.get(`/phases/${id}`);
      //   setphase(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getSummeryPhaseOutput = async (userId: any) => {
    console.log(`userId`, userId);
    setSummeryOutput([]);
    try {
      const page_list = `${API_URL}/summary-output-phase/phase-userId/${id}/${userId}`;
      const method = "get";

      const options = {
        method,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await submitFormData(page_list, options);
      setSummeryOutput(data);
    } catch (error) {
      // seterror("Something Went Wrong");
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

        <nav className="p-2">
          {[
            {
              icon: <FileText size={16} />,
              text: "Update Phase",
              type: "update-phase",
            },
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
              type: "add-block",
            },
            {
              icon: <CreditCard size={16} />,
              text: "Add Question",
              badge: { text: "5", className: "bg-danger" },
              type: "add-question",
            },
            // { icon: <Mail size={16} />, text: "Email settings" },
            {
              icon: <CreditCard size={16} />,
              text: "Phase Output",
              type: "phase-output",
            },

            {
              icon: <CreditCard size={16} />,
              text: "Phase Summery",
              type: "phase-summery",
            },

            {
              icon: <CreditCard size={16} />,
              text: "Phase Prompt",
              type: "phase prompt",
            },

            {
              icon: <CreditCard size={16} />,
              text: "Add Prompt",
              type: "add prompt",
            },

            {
              icon: <CreditCard size={16} />,
              text: "AI Model",
              type: "ai-modal",
            },

            // {
            //   icon: <FileText size={16} />,
            //   text: "Tax Information",
            //   badge: {
            //     text: "new",
            //     className: "bg-primary text-white px-2 py-0 rounded-pill small",
            //   },
            // },
          ].map(({ icon, text, badge, type }, i) => (
            <a
              href="#"
              key={i}
              onClick={() => fetchData(type.toLowerCase())}
              className={`d-flex align-items-center justify-content-between text-decoration-none p-2 rounded ${type == selectedType ? "bg-light text-teal" : "text-dark"}`}
            >
              <div className="d-flex align-items-center">
                <span className="me-2">{icon}</span>
                {text}
              </div>
              {badge && (
                <span
                  className={`badge ${type == selectedType ? "text-white" : ""}`}
                >
                  {badge.text}
                </span>
              )}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}

      <div className="flex-fill">
        {showBlock && (
          <DataTable
            col={col}
            allData={blocks}
            operation={view}
            label={selectedType}
          />
        )}
        {showQuestion && (
          <DataTable
            col={col}
            allData={question}
            operation={quesOperation}
            label={selectedType}
          />
        )}
        {showUpdatePhase && phase?.id && (
          <UpdatePhase data={phase} handleSubmit={UpdatePhasehandleSubmit} />
        )}

        {blockAddModal && (
          <UpdateBlock
            data={singleBlock}
            handleSubmit={UpdateBlockhandleSubmit}
          />
        )}

        {questionAddModal && (
          <UpdateQuestion
            data={singleBlock}
            handleSubmit={UpdateQueshandleSubmit}
          />
        )}

        {showPhaseOutput && (
          <PhaseOutputDetails
            blocks={blocks}
            question={question}
            allUsersList={allUsersList}
            userChat={userChat}
          />
        )}

        {showPhaseSummery && (
          <PhaseSummeryOutput
            phaseId={id}
            question={question}
            allUsersList={allUsersList}
            userChat={userChat}
            getSummeryPhaseOutput={getSummeryPhaseOutput}
            output={SummeryOutput}
          />
        )}

        {showPromts && (
          <DataTable
            col={col}
            allData={blocks}
            operation={promptOperation}
            label={ selectedType}
          />
        )}

        {promptAddModal && (
          <UpdatePrompt
            data={null}
            handleSubmit={UpdatePrompthandleSubmit}
          />
        )}

{showAiModal && (
          <DataTable
            col={col}
            allData={blocks}
            operation={view}
            label={selectedType}
          />
        )}
      </div>

      {/* Block show */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={modelCss}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Block Information
          </Typography>

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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Block
          </Typography>

          {blockUpdateModal && singleBlock?.id && (
            <UpdateBlock
              data={singleBlock}
              handleSubmit={UpdateBlockhandleSubmit}
            />
          )}

          {/* Close button */}
        </Box>
      </Modal>

      {/* Question show */}
      <Modal
        open={openQuestion}
        onClose={handleClose}
        aria-labelledby="modal-title"
      >
        <Box sx={modelCss}>
          {/* Modal content */}

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Show Question
          </Typography>

          <div className="row g-4">
            <div className="col-md-12 col-lg-12">
              <div className="card">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      <div>
                        <h5 className="mb-0">
                          {singleBlock?.question_question}
                        </h5>
                      </div>
                    </div>
                    <button className="btn btn-sm text-muted">
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                  </div>

                  <p className="text-muted small mb-4">
                    {singleBlock?.blockName}
                  </p>

                  <div className="row mb-3">
                    <div className="col">
                      <small className="text-muted">Sort</small>
                      <div>
                        <span className="badge bg-primary-subtle text-primary">
                          {singleBlock?.question_sort}
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
                    <small className="text-muted">Phase</small>
                    <p className="text-muted small mb-4">{phase?.name}</p>
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

      {/* Question Update */}
      <Modal
        open={questionUpdateModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
      >
        <Box sx={modelCss}>
          {/* Modal content */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Question
          </Typography>

          {questionUpdateModal && singleBlock?.question_id && (
            <UpdateQuestion
              data={singleBlock}
              handleSubmit={UpdateQueshandleSubmit}
            />
          )}

          {/* Close button */}
        </Box>
      </Modal>

      {/* Prompt show */}
      <Modal
        open={openPrompt}
        onClose={handleClose}
        aria-labelledby="modal-title"
      >
        <Box sx={modelCss}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Prompt Information
          </Typography>

          {/* Modal content */}

          <div className="row g-4">
            <div className="col-md-12 col-lg-12">
              <div className="card">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      <div>
                        <h5 className="mb-0">{singleBlock?.question}</h5>
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

      {/* Prompt Update */}
      <Modal
        open={openPromptModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
      >
        <Box sx={modelCss}>
          {/* Modal content */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Prompt
          </Typography>

          {openPromptModal && singleBlock?.id && (
            <UpdatePrompt
              data={singleBlock}
              handleSubmit={UpdatePrompthandleSubmit}
            />
          )}

          {/* Close button */}
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
}
