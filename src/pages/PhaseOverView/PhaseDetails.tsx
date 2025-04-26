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
import profileImage from "../../../assets/icons/Profile.svg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";
import { submitFormData } from "@/api/Reqest";
import Pagination from "@/shared/Table/Pagination";
import Table from "../exapmle/Table";
import DataTable from "../exapmle/Pagination";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

export default function PhaseDetails() {
  const { id } = useParams();
  const [phase, setphase] = useState(null);
  const [blocks, setblocks] = useState([]);
  const [question, setquestion] = useState([]);
  const [col, setcol] = useState([]);

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
      if (type === "block") {
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
        setblocks(data)
        setcol([
          { name: "id", label: "ID" },
          { name: "name", label: "Name" },
          { name: "status", label: "Status" },
        ])
        
      }
      if (type === "question") {
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
        setquestion(data)

      }
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
            // {
            //   icon: <User size={16} className="text-teal" />,
            //   text: "Account Information",
            //   active: true,
            // },
            // {
            //   icon: <Lock size={16} />,
            //   text: "Change Password",
            //   badge: { text: "5", className: "bg-danger text-white" },
            // },
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
            // { icon: <FileText size={16} />, text: "Statements" },
          ].map(({ icon, text, badge, active , type }, i) => (
            <a
              href="#"
              key={i}
              onClick={() => fetchData(type.toLowerCase())}
              className={`d-flex align-items-center justify-content-between text-decoration-none p-2 rounded ${active ? "bg-light text-teal" : "text-dark"}`}
            >
              <div className="d-flex align-items-center" >
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
      <DataTable col={col} allData={blocks}/>
      </div>
    </div>
  );
}
