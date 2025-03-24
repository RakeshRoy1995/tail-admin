import Header from "@/shared/member-dashboard/Header";
import React, { useEffect, useState } from "react";
import ProfileSection from "./ProfileSection";
import SidebarMember from "./SidebarMember";
import QuesAnswer from "./QuesAnswer";
import Rightbar from "./Rightbar";
import Navigation from "./Navigation";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  getPreviousQuestion,
  getUserDetails,
  groupBy,
  statusOfQuestion,
} from "@/utils";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

import Swal from "sweetalert2";
// import AiResponseForm from "./AiResponseForm";
import { submitAI, submitFormData } from "@/api/Reqest";
import axiosInstance from "@/api/axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

export default function MemberAdmin() {
  const [data, setdata] = useState<any>({});
  const [AiResponse, setAiResponse] = useState<any>([]);
  const [render, setrender] = useState<any>(true);
  const [submit, setsubmit] = useState<any>(false);
  const [error, seterror] = useState<any>("");
  const [output, setoutput] = useState<any>([]);
  const [showMode, setshowMode] = useState<any>("");
  const [outPutQues, setoutPutQues] = useState<any>([]);
  const [textareaShow, settextareaShow] = useState<any>(false);
  const [showSavedQuestion, setshowSavedQuestion] = useState<any>(false);

  const [activephase, setactivephase] = useState(0);
  const [activeBlock, setactiveBlock] = useState(0);
  const [activeQuestion, setactiveQuestion] = useState(0);
  const [nextPhase, setnextPhase] = useState(0);
  const [phases, setphases] = useState([]);
  const [blocks, setblocks] = useState([]);
  const [Allblocks, setallblocks] = useState([]);
  const [AllQues, setAllQues] = useState([]);
  const [Ques, setQues] = useState([]);

  console.log(`phases phases`, phases);

  // get phases
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`1`, 1);
        const response = await axiosInstance.get("/phases"); // Example endpoint

        if (response.data.length) {
          setphases(response.data);
          //   getPhaseOutput(response.data[0].id)
          console.log(`response.data[0].id`, response.data);
          setactivephase(response.data[0].id);
          setnextPhase(response.data[1].id);

          const res_block = await axiosInstance.get("/blocks"); // Example endpoint
          let blockId = 0;
          if (res_block.data.length) {
            setallblocks(res_block.data);

            const result = res_block.data.filter(
              (d: any) => d.phaseId == response.data[0].id,
            );
            setblocks(result);
            if (result.length) {
              blockId = result[0].id;
              setactiveBlock(blockId);
            }
          }

          const res_ques = await axiosInstance.get("/question"); // Example endpoint
          setAllQues(res_ques.data);

          if (res_ques.data) {
            const resQues = AllQues.filter((d: any) => d.blockId == blockId);
            if (resQues.length) {
              setQues(resQues);
              setactiveQuestion(resQues[0].id);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // get block by phase
  useEffect(() => {
    const fetchBlockByPhase = async (id: any) => {
      try {
        const result = Allblocks.filter((d: any) => d.phaseId == id);
        console.log(`result`, Allblocks, id, result);
        setblocks(result);
        if (result.length) {
          setactiveBlock(result[0].id);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchBlockByPhase(activephase);
  }, [activephase]);

  // get question by block
  useEffect(() => {
    const fetchQuestionByBlock = async (id: any) => {
      try {
        setQues([]);
        const result = AllQues.filter((d: any) => d.blockId == id);
        if (result.length) {
          setQues(result);
          setactiveQuestion(result[0].id);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchQuestionByBlock(activeBlock);
  }, [activeBlock]);

  const phaseName = phases?.find((d: any) => d.id == activephase)?.name || "";

  const onSubmit = async () => {
    seterror("");
    console.log(`1`, 1);
    setsubmit(true);
    try {
      const user_details = getUserDetails();
      const response = await submitAI(data.message);

      const obj = {
        userId: user_details.id,
        question_id: data?.question_id,
        yourMessage: data.message,
        aiReply: response.data?.response,
        conversetion_id: "test",
        status: 1,
      };

      AiResponse.push(obj);
      console.log(`AiResponse`,AiResponse );
      setAiResponse(AiResponse);
      localStorage.setItem("ai_question_answer", JSON.stringify(AiResponse));
      setdata({ ...data, message: null });
      setrender(!render);
    } catch (error) {
      seterror("Something Went Wrong");
    }
    setsubmit(false);
  };

  const onSubmitAnswer = async (data: any) => {
    setsubmit(true);
    try {
      const page_list = `${API_URL}/user-ai-chat`;
      const method = "POST";

      delete data["yourMessage"];

      const options = {
        method,
        data: data,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await submitFormData(page_list, options);
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonText: "Close",
      });
      settextareaShow(false);
      setdata(null);
      setactiveQuestion(0);
      // getPhaseOutput();
    } catch (error: any) {
      seterror(error?.response?.data?.message || "Something Went Wrong");
    }
    setsubmit(false);
  };

  const getBlockOutput = async (blockId: any) => {
    setoutput([]);
    setoutPutQues([]);
    seterror("");
    setsubmit(true);
    setshowMode("block");
    try {
      const user_details = getUserDetails();

      const selectedBlock = Allblocks.find((d) => d.id == blockId);

      const txt = "Block : " + selectedBlock.name;
      setshowMode(txt);

      const page_list = `${API_URL}/user-ai-chat/userId/${user_details?.id}/blockId/${blockId}`;
      const method = "put";

      const options = {
        method,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await submitFormData(page_list, options);
      setoutput(Object.values(groupBy(data, "blockId")));
    } catch (error) {
      seterror("Something Went Wrong");
    }
    setsubmit(false);
  };

  const getPhaseOutput = async (id = null) => {
    seterror("");
    setsubmit(true);
    setoutput([]);
    setoutPutQues([]);
    try {
      const phaseId = activephase || id;
      const user_details = getUserDetails();

      setshowMode("Phase : " + phaseName);

      // const page_list = `${API_URL}/user-ai-chat/userId/${user_details?.id}/blockId/null?phaseId=${phaseId}`;

      const page_list = `${API_URL}/user-ai-chat/userId-phaseId/${user_details?.id}/${phaseId}`;
      const method = "post";

      const options = {
        method,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await submitFormData(page_list, options);
      const res = data.filter((d: any) => d.phaseId == activephase);

      if (res.length) {
        setoutput(Object.values(groupBy(res, "blockId")));
      }
      setrender(!render);
    } catch (error) {
      // seterror("Something Went Wrong");
    }
    setsubmit(false);
  };

  useEffect(() => {
    getPhaseOutput(phases);
  }, [phases]);

  console.log(`activephase`, output);

  return (
    <>
      <Header />
      <main>
        {/*Left Sidebar with sections and question*/}
        <div className="__left-sidebar border-end __height-half ">
          {/* Close left sidebar */}
          <button
            className="close_left_sidebar btn btn-danger mb-3"
            type="button"
          >
            <i className="fa fa-times" aria-hidden="true" />
            close
          </button>
          {/* Profile Section */}
          <ProfileSection />
          {/* sidebar Section */}
          <SidebarMember
            Allblocks={Allblocks}
            activeBlock={activeBlock}
            setactiveBlock={setactiveBlock}
            activephase={activephase}
            AllQues={AllQues}
            setdata={setdata}
            settextareaShow={settextareaShow}
            setactiveQuestion={setactiveQuestion}
            data={data}
            output={output}
            
          />
        </div>
        {/*Question and answer section*/}

        <QuesAnswer
          data={data}
          AllQues={AllQues}
          AiResponse={AiResponse}
          setdata={setdata}
          submit={submit}
          onSubmit={onSubmit}
          onSubmitAnswer={onSubmitAnswer}
          activeQuestion={activeQuestion}
          showSavedQuestion={showSavedQuestion}
          setshowSavedQuestion={setshowSavedQuestion}
          output={output}
        />
        {/*Right Sidebar with sections and question*/}
        <Rightbar setshowSavedQuestion={setshowSavedQuestion} />
        {/* Phase Navigation */}

        {phases.length > 0 && (
          <Navigation
            activephase={activephase}
            phases={phases}
            setactivephase={setactivephase}
          />
        )}
      </main>
    </>
  );
}
