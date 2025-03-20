import { submitAI, submitFormData } from "@/api/Reqest";
import useFetch from "@/hooks/useFetch";
import Table from "@/shared/Table/Table";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getUserDetails, groupBy } from "@/utils";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
  setactivephase,
}: any) {
  const [data, setdata] = useState<any>({});
  const [AiResponse, setAiResponse] = useState<any>([]);
  const [render, setrender] = useState<any>(true);
  const [submit, setsubmit] = useState<any>(false);
  const [error, seterror] = useState<any>("");
  const [output, setoutput] = useState<any>([]);
  const [showMode, setshowMode] = useState<any>("");
  const [outPutQues, setoutPutQues] = useState<any>([]);
  const [textareaShow, settextareaShow] = useState<any>(false);

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
        saved: true,
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
      settextareaShow(false);
      setdata(null);
      setactiveQuestion(0)
    } catch (error: any) {
      seterror(error?.response?.data?.message || "Something Went Wrong");
    }
    setsubmit(false);
  };

  const getBlockOutput = async (blockId: any) => {
    setoutput([]);
    seterror("");
    setsubmit(true);
    setshowMode("block");
    try {
      const user_details = getUserDetails();

      const selectedBlock = Allblocks.find((d) => d.id == blockId);

      const txt = "Block : " + selectedBlock.name;
      setshowMode(txt);

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
      setoutput(Object.values(groupBy(data, "blockId")));
    } catch (error) {
      seterror("Something Went Wrong");
    }
    setsubmit(false);
  };

  const getPhaseOutput = async () => {
    seterror("");
    setsubmit(true);
    setoutput([]);
    try {
      const user_details = getUserDetails();

      setshowMode("Phase : " + phaseName);

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
      const res = data.filter((d: any) => d.phaseId == activephase);

      if (res.length) {
        setoutput(Object.values(groupBy(res, "blockId")));
      }
      setrender(!render);
    } catch (error) {
      seterror("Something Went Wrong");
    }
    setsubmit(false);
  };

  // useEffect(() => {
  //   console.log(`2`, 2);
  //   getPhaseOutput();
  // }, [phases[0]?.id]);

  console.log(`AiResponse`, output, outPutQues);
  return (
    <>
      <section className="admin-body mapping-body">
        <div className="container-fuild mapping-wrap">
          <div className="row mapping-wrap-row">
            <div className="text-danger text-center">{error}</div>
            <div className="col-md-9 mapping-wrapper">
              <div className="row ">
                <h1>{phaseName}</h1>

                {Allblocks.map((d: any) => (
                  <>
                    {d.phaseId == activephase && (
                      <>
                        <div className="row left-block">
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
                              {AllQues?.map((qd: any) => (
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
                                            settextareaShow(true);
                                            setactiveQuestion(qd.id);
                                          }}
                                          style={{ cursor: "pointer" }}
                                        >
                                          {qd.question}{" "}
                                        </h3>
                                      </div>
                                      <form>
                                        <div
                                          className="form-group"
                                          style={{ backgroundColor: "#fff" }}
                                        >
                                          {activeQuestion == qd.id && (
                                            <div className="textarea-container">
                                              {AiResponse.map((ai_d: any) => (
                                                <div
                                                  className="container"
                                                  style={{ paddingTop: "10px" }}
                                                >
                                                  {ai_d.question_id ==
                                                    qd.id && (
                                                    <>
                                                      <div
                                                        style={{
                                                          fontSize: "12px",
                                                          display: "flex",
                                                          alignItems: "center",
                                                          backgroundColor:
                                                            "#f1f1f1",
                                                          padding: "10px",
                                                          borderRadius: "8px",
                                                          marginBottom: "8px",
                                                        }}
                                                      >
                                                        <img
                                                          src="asset/assets/img/User.png"
                                                          alt=""
                                                          style={{
                                                            width: "24px",
                                                            height: "24px",
                                                            marginRight: "8px",
                                                          }}
                                                        />
                                                        {ai_d.yourMessage}
                                                      </div>
                                                      <div
                                                        style={{
                                                          fontSize: "12px",
                                                          display: "flex",
                                                          alignItems: "center",
                                                          backgroundColor:
                                                            "#f1f1f1",
                                                          padding: "10px",
                                                          borderRadius: "8px",
                                                          marginBottom: "8px",
                                                        }}
                                                      >
                                                        <img
                                                          src="asset/assets/img/img1.png"
                                                          alt=""
                                                          style={{
                                                            width: "24px",
                                                            height: "24px",
                                                            marginRight: "8px",
                                                          }}
                                                        />
                                                        <div
                                                          dangerouslySetInnerHTML={{
                                                            __html:
                                                              ai_d.aiReply,
                                                          }}
                                                        />
                                                        {(ai_d.saved ||
                                                          ai_d.saved ==
                                                            false) && (
                                                          <button
                                                            type="button"
                                                            disabled={submit}
                                                            onClick={(e) =>
                                                              onSubmitAnswer(
                                                                ai_d,
                                                              )
                                                            }
                                                            style={{
                                                              marginLeft:
                                                                "auto",
                                                              backgroundColor:
                                                                "#007bff",
                                                              color: "#fff",
                                                              border: "none",
                                                              borderRadius:
                                                                "4px",
                                                              padding:
                                                                "5px 10px",
                                                              cursor: "pointer",
                                                            }}
                                                          >
                                                            <i
                                                              className="fa fa-save"
                                                              aria-hidden="true"
                                                            />{" "}
                                                            Save
                                                          </button>
                                                        )}
                                                      </div>
                                                      <hr />
                                                    </>
                                                  )}
                                                </div>
                                              ))}
                                              {textareaShow && (
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
                                                defaultValue={data?.message}
                                              />
                                            )}

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

                                              {data?.message && (
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
                    onClick={() => getPhaseOutput()}
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
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            {showMode}
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
                            <div className="row ">
                              <div className="col-4 card text-left">
                                {output.map((out_data: any) => (
                                  <div
                                    className="card-header"
                                    style={{ textAlign: "left" }}
                                    id="headingOne"
                                    onClick={(e) => setoutPutQues(out_data)}
                                  >
                                    <h5 className="mb-0">
                                      {out_data[0].block_name}
                                    </h5>
                                  </div>
                                ))}
                              </div>
                              <div className="col-8">
                                <div>
                                  {outPutQues.map((d: any, k: number) => (
                                    <>
                                      {k == 0 ? (
                                        <Accordion defaultExpanded>
                                          <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                          >
                                            <Typography component="span">
                                              {d.question}
                                            </Typography>
                                          </AccordionSummary>
                                          <AccordionDetails>
                                            <div
                                              className="card-body"
                                              style={{ textAlign: "left" }}
                                              dangerouslySetInnerHTML={{
                                                __html: d?.aiReply,
                                              }}
                                            ></div>
                                          </AccordionDetails>
                                        </Accordion>
                                      ) : (
                                        <Accordion>
                                          <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                          >
                                            <Typography component="span">
                                              {d.question}
                                            </Typography>
                                          </AccordionSummary>
                                          <AccordionDetails>
                                            <div
                                              className="card-body"
                                              dangerouslySetInnerHTML={{
                                                __html: d?.aiReply,
                                              }}
                                            ></div>
                                          </AccordionDetails>
                                        </Accordion>
                                      )}
                                    </>
                                  ))}
                                </div>
                              </div>
                            </div>
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
              <img
                src="asset/assets/img/l-img5.png"
                style={{ cursor: "pointer" }}
                alt=""
                onClick={(e) => setactivephase(1)}
              />
              <img
                src="asset/assets/img/l-img2.png"
                style={{ cursor: "pointer" }}
                alt=""
                onClick={(e) => setactivephase(2)}
              />
              <img
                src="asset/assets/img/l-img4.png"
                style={{ cursor: "pointer" }}
                alt=""
                onClick={(e) => setactivephase(3)}
              />
              <img src="asset/assets/img/l-img3.png" alt="" />
              <img src="asset/assets/img/l-img5.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
