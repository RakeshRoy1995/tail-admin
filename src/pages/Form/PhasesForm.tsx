import { submitAI, submitFormData } from "@/api/Reqest";
import useFetch from "@/hooks/useFetch";
import Table from "@/shared/Table/Table";
import { getUserDetails } from "@/utils";
import React, { useState } from "react";
import Swal from "sweetalert2";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

export default function PhasesForm({
  blocks,
  Ques,
  activephase,
  activeBlock,
  nextPhase,
  phases,
  setactiveBlock,
  AllQues,
  activeQuestion,
  setactiveQuestion,
  Allblocks,
  setactivephase
}: any) {
  const [data, setdata] = useState<any>({});
  const [AiResponse, setAiResponse] = useState<any>([]);
  const [render, setrender] = useState<any>(true);
  const [submit, setsubmit] = useState<any>(false);
  const [error, seterror] = useState<any>("");
  const [output, setoutput] = useState<any>([]);

  const phaseName = phases.find((d: any) => d.id == activephase)?.name || "";

  const onSubmit = async () => {
    seterror("");
    setsubmit(true);
    try {
      const user_details = getUserDetails();
      const response = await submitAI(data.message);

      const obj = {
        userId: user_details.id,
        question_id: data?.question_id,
        yourMessage: data.message,
        aiReply: response.data?.response,
        saved: false,
      };

      AiResponse.push(obj);
      setAiResponse(AiResponse);
      localStorage.setItem("ai_question_answer", JSON.stringify(AiResponse));
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

      const options = {
        method,
        data,
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
    } catch (error: any) {
      seterror(error?.response?.data?.message || "Something Went Wrong");
    }
    setsubmit(false);
  };

  const getBlockOutput = async (blockId: any) => {
    seterror("");
    setsubmit(true);
    try {
      const user_details = getUserDetails();

      const page_list = `${API_URL}/user-ai-chat/userId/${user_details?.id}/blockId/${blockId}`;
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
      seterror("Something Went Wrong");
    }
    setsubmit(false);
  };

  const getPhaseOutput = async () => {
    seterror("");
    setsubmit(true);
    try {
      const user_details = getUserDetails();

      const page_list = `${API_URL}/user-ai-chat/userId/${user_details?.id}/phaseId/${activephase}`;
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
      seterror("Something Went Wrong");
    }
    setsubmit(false);
  };

  const column = [
    {
      name: "Question",
      selector: (row: any) => row.question,
      sortable: true,
    },
    {
      name: "Your Message",
      selector: (row: any) => row.yourMessage,
      sortable: true,
    },
    {
      name: "AI Reply",
      selector: (row: any) => row.aiReply,
      sortable: true,
    },

    {
      name: "Block",
      selector: (row: any) => row.block_name,
      sortable: true,
    },
  ];

  console.log(`AiResponse`, AiResponse);
  return (
    <>
      <section className="admin-body mapping-body">
        <div className="container-fuild mapping-wrap">
          <div className="row mapping-wrap-row">
            <div className="text-danger text-center">{error}</div>
            <div className="col-md-9 mapping-wrapper">
              <div className="row left-block">
                <h1>{phaseName}</h1>

                {Allblocks.map((d: any) => (
                  <>
                    {d.phaseId == activephase && (
                      <>
                        <div
                          className="col-md-4"
                          onClick={(e) => setactiveBlock(d.id)}
                        >
                          <div className="frame-img">
                            <img src="asset/assets/img/frame.png" alt="" />
                          </div>
                          <h2>{d.name} :</h2>
                        </div>
                        <div className="col-md-8">
                          <div className="content-wrapper">
                            {AllQues.map((qd: any) => (
                              <>
                                {qd.blockId == d.id && (
                                  <div className="box-prompt">
                                    <div className="title-wrap">
                                      <h5>Complete</h5>
                                      <h3
                                        onClick={(e) => {
                                          setdata({
                                            ...data,
                                            ["question_id"]: qd.id,
                                          });
                                          setactiveQuestion(qd.id);
                                        }}
                                        style={{ cursor: "pointer" }}
                                      >
                                        {qd.question}{" "}
                                      </h3>
                                    </div>
                                    <form>
                                      <div className="form-group">
                                        {activeQuestion == qd.id && (
                                          <div className="textarea-container">
                                            {AiResponse.map((ai_d: any) => (
                                              <div className="container">
                                                {ai_d.question_id == qd.id && (
                                                  <>
                                                    <li>
                                                      You : {ai_d.yourMessage}
                                                    </li>
                                                    <li>
                                                      AI : {ai_d.aiReply}{" "}
                                                      {(!ai_d.saved ||
                                                        ai_d.saved ==
                                                          false) && (
                                                        <button
                                                          type="button"
                                                          disabled={submit}
                                                          onClick={(e) =>
                                                            onSubmitAnswer(ai_d)
                                                          }
                                                          // className="submit-btn"
                                                        >
                                                          <i
                                                            className="fa fa-save"
                                                            aria-hidden="true"
                                                          />{" "}
                                                          {/* Save  */}
                                                        </button>
                                                      )}
                                                    </li>
                                                    <hr />
                                                  </>
                                                )}
                                              </div>
                                            ))}
                                            <textarea
                                              className="form-control"
                                              rows={5}
                                              onChange={(e) =>
                                                setdata({
                                                  ...data,
                                                  ["message"]: e.target.value,
                                                })
                                              }
                                              placeholder="How can I help you?"
                                              defaultValue={""}
                                            />
                                            {/* File Upload Icon (Paperclip) */}
                                            {/* <label
                                          htmlFor="file-upload"
                                          className="file-upload-icon fas fa-paperclip"
                                        /> */}
                                            {/* Voice Icon (Microphone) */}
                                            {/* <i className="voice-icon fas fa-microphone" /> */}
                                            {/* Hidden File Input */}
                                            {/* <input
                                          type="file"
                                          id="file-upload"
                                          className="file-input"
                                        /> */}
                                            {/* Submit Button */}

                                            {data.message && (
                                              <button
                                                type="button"
                                                disabled={submit}
                                                onClick={(e) => onSubmit()}
                                                className="submit-btn"
                                              >
                                                <i
                                                  className="fa fa-paper-plane"
                                                  aria-hidden="true"
                                                />{" "}
                                                Submit {submit && "..."}
                                              </button>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </form>
                                  </div>
                                )}
                              </>
                            ))}
                            {/* <div className="title-wrap red-dot">
                          <h5>Anwaring</h5>
                          <h3>
                            Who is mostly affected/impacted by the problem?{" "}
                          </h3>
                        </div>
                        <div className="title-wrap red-dot Waiting">
                          <h5>Waiting for answer</h5>
                          <h3>
                            Who owns the problem you are trying to solve?{" "}
                          </h3>
                        </div> */}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12 modal-wrap">
                            <button
                              type="button"
                              onClick={(e: any) => getBlockOutput(d.id)}
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              See Output
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ))}
              </div>

              <div className="row">
                <div className="col-md-12 modal-wrap">
                  <button type="button" className="btn btn-secondary">
                    Discard
                  </button>
                  <button
                    type="button"
                    onClick={()=>getPhaseOutput()}
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    See Phase Output
                  </button>
                  {/* Modal Structure */}
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Modal Title
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className="modal-body">
                          {submit && "loading..."}

                          <div className="bg-white rounded-xl shadow-md p-10 mt-5">
                            <Table
                              rows={output || []}
                              column={column}
                              getheaderColor={() => {}}
                            />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" className="btn btn-primary">
                            + OK
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <div className="col-md-3">
              <div className="mapping-sidebar">
                <div className="top-widget com-widget">
                  <img src="asset/assets/img/ai-bar.png" alt="" />
                </div>
                <div className="middle-widget com-widget">
                  <img src="asset/assets/img/middle-widget.png" alt="" />
                </div>
                <div className="bottom-widget com-widget">
                  <img src="asset/assets/img/bottom-widget.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="section-three mapping-three">
        <div className="container">
          <div className="row">
            <div className="image-wrap">
              <img src="asset/assets/img/l-img5.png" style={{cursor:"pointer"}} alt="" onClick={(e)=>setactivephase(1)} />
              <img src="asset/assets/img/l-img2.png" style={{cursor:"pointer"}} alt="" onClick={(e)=>setactivephase(2)} />
              <img src="asset/assets/img/l-img4.png" style={{cursor:"pointer"}} alt="" onClick={(e)=>setactivephase(3)} />
              <img src="asset/assets/img/l-img3.png" alt="" />
              <img src="asset/assets/img/l-img5.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
