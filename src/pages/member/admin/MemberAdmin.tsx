import Header from "@/shared/member-dashboard/Header";
import React, { useEffect, useState } from "react";
import ProfileSection from "./ProfileSection";
import SidebarMember from "./SidebarMember";
import QuesAnswer from "./QuesAnswer";
import Rightbar from "./Rightbar";
import Navigation from "./Navigation";

import {
  getUserDetails,
  groupBy,
  phasepromptdata,
  statusOfQuestion,
} from "@/utils";

import Swal from "sweetalert2";
// import AiResponseForm from "./AiResponseForm";
import { submitAI, submitFormData } from "@/api/Reqest";
import axiosInstance from "@/api/axios";
import PropsedSystemMappainig from "@/pages/PropsedSystemMappainig/PropsedSystemMappainig";
import ProblemDefLayout from "@/pages/problemDefLayout/ProblemDefLayout";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

export default function MemberAdmin() {
  const [data, setdata] = useState<any>({});
  const [AiResponse, setAiResponse] = useState<any>([]);
  const [render, setrender] = useState<any>(true);
  const [submit, setsubmit] = useState<any>(false);
  const [error, seterror] = useState<any>("");
  const [output, setoutput] = useState<any>([]);
  const [questionAnswer, setquestionAnswer] = useState<any>([]);
  const [showMode, setshowMode] = useState<any>("");
  const [outPutQues, setoutPutQues] = useState<any>([]);
  const [textareaShow, settextareaShow] = useState<any>(false);
  const [showSavedQuestion, setshowSavedQuestion] = useState<any>(false);
  const [showPhaseOutput, setshowPhaseOutput] = useState<any>(false);
  const [showPhaseOutputSummery, setshowPhaseOutputSummery] =
    useState<any>(false);

  const [activephase, setactivephase] = useState(0);
  const [activeBlock, setactiveBlock] = useState(0);
  const [activeQuestion, setactiveQuestion] = useState(0);
  const [nextPhase, setnextPhase] = useState(0);
  const [yourMessage, setyourMessage] = useState("");
  const [phases, setphases] = useState([]);
  const [blocks, setblocks] = useState([]);
  const [Allblocks, setallblocks] = useState([]);
  const [allPhasePromts, setallPhasePromts] = useState([]);
  const [AllQues, setAllQues] = useState([]);
  const [Ques, setQues] = useState([]);

  // get phases
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/phases"); // Example endpoint

        if (response.data.length) {
          setphases(response.data);
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
            localStorage.setItem("questions", JSON.stringify(res_ques.data));
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
        localStorage.setItem("block", JSON.stringify(result));
        setblocks(result);
        if (result.length) {
          setactiveBlock(result[0].id);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchBlockByPhase(activephase);
  }, [activephase, Allblocks.length]);

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
    setsubmit(true);
    try {
      setdata({
        ...data,
        ["message"]: "",
      });

      setyourMessage(data?.message);

      const user_details = getUserDetails();

      const response = await submitAI(data.message);
      const obj = {
        userId: user_details.id,
        question_id: data?.question_id,
        yourMessage: data.message,
        aiReply: response.data?.response,
        conversetion_id: response.data?.conversation_id,
        status: 1,
      };
      setyourMessage("");

      AiResponse.push(obj);
      console.log(`AiResponse`, AiResponse);
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
      getPhaseOutput();
    } catch (error: any) {
      seterror(error?.response?.data?.message || "Something Went Wrong");
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
        localStorage.setItem("question_output", JSON.stringify(res));
      }
      setrender(!render);
    } catch (error) {
      // seterror("Something Went Wrong");
    }
    setsubmit(false);
  };

  const getPhasePrompt = async (id: any) => {
    seterror("");
    setallPhasePromts([]);
    try {
      // const page_list = `${API_URL}/user-ai-chat/userId/${user_details?.id}/blockId/null?phaseId=${phaseId}`;

      const page_list = `${API_URL}/phase-prompt/prompt/${id}`;
      const method = "get";

      const options = {
        method,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await submitFormData(page_list, options);

      if (data.length) {
        setallPhasePromts(data);
      } else {
        setallPhasePromts(phasepromptdata);
      }
    } catch (error) {
      // seterror("Something Went Wrong");
    }
    setsubmit(false);
  };

  useEffect(() => {
    if (phases.length > 0) {
      getPhasePrompt(phases[0].id);
      getPhaseOutput(phases[0].id);
    }
  }, [phases]);

  const onSubmitPhaseOutput = async () => {
    try {
      setshowPhaseOutputSummery(true);

      const questionAnswer = [];
      for (let i = 0; i < output.length; i++) {
        const element = output[i];

        for (let j = 0; j < element.length; j++) {
          const el = element[j];

          if (el.phaseId == activephase) {
            questionAnswer.push(el);
          }
        }
      }

      setquestionAnswer(questionAnswer);
    } catch (error: any) {
      seterror(error?.response?.data?.message || "Something Went Wrong");
    }
  };

  useEffect(() => {
    setoutPutQues(output[0]);
  }, [output]);

  return (
    <>
      <Header />

      <>
        {AllQues.length > 0 && (
          <>
            {!showPhaseOutputSummery ? (
              <main>
                {showPhaseOutput ? (
                  <ProblemDefLayout
                    output={output}
                    setoutPutQues={setoutPutQues}
                    outPutQues={outPutQues}
                    setshowPhaseOutput={setshowPhaseOutput}
                    onSubmitPhaseOutput={onSubmitPhaseOutput}
                  />
                ) : (
                  <>
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
                      <ProfileSection
                        phases={phases}
                        activephase={activephase}
                        AllQues={AllQues}
                        Allblocks={Allblocks}
                      />
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
                        setAiResponse={setAiResponse}
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
                      setshowPhaseOutput={setshowPhaseOutput}
                      onSubmitPhaseOutput={onSubmitPhaseOutput}
                      activephase={activephase}
                      yourMessage={yourMessage}
                    />
                    {/*Right Sidebar with sections and question*/}
                    <Rightbar
                      setshowSavedQuestion={setshowSavedQuestion}
                      onSubmitPhaseOutput={onSubmitPhaseOutput}
                    />
                    {/* Phase Navigation */}

                    {phases.length > 0 && (
                      <Navigation
                        activephase={activephase}
                        phases={phases}
                        setactivephase={setactivephase}
                      />
                    )}
                  </>
                )}
              </main>
            ) : (
              <main>
                <PropsedSystemMappainig
                  questionAnswer={questionAnswer}
                  allPhasePromts={allPhasePromts}
                  activephase={activephase}
                  phaseName={phaseName}
                  showPhaseOutputSummery={showPhaseOutputSummery}
                  setshowPhaseOutputSummery={setshowPhaseOutputSummery}
                />
              </main>
            )}
          </>
        )}
      </>
    </>
  );
}
