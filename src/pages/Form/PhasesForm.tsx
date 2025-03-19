import React from "react";

export default function PhasesForm({
  blocks,
  Ques,
  activephase,
  activeBlock,
  nextPhase,
  phases,
  setactiveBlock,
}: any) {
  console.log(
    `cccccccc`,
    phases,
    activephase,
    blocks,
    Ques,
    activeBlock,
    nextPhase,
  );

  const phaseName = phases.find((d: any) => d.id == activephase)?.name || "";
  return (
    <>
      <section className="admin-body mapping-body">
        <div className="container-fuild mapping-wrap">
          <div className="row mapping-wrap-row">
            <div className="col-md-9 mapping-wrapper">
              <div className="row left-block">
                <h1>{phaseName}</h1>

                {blocks.map((d: any) => (
                  <>
                    <div className="col-md-4">
                      <div className="frame-img">
                        <img src="asset/assets/img/frame.png" alt="" />
                      </div>
                      <h2>{d.name}:</h2>
                    </div>
                    <div className="col-md-8">
                      <div className="content-wrapper">
                        <div className="box-prompt">
                          <div className="title-wrap">
                            <h5>Complete</h5>
                            <h3>What problems are you trying to solve? </h3>
                          </div>
                          <form>
                            <div className="form-group">
                              <div className="textarea-container">
                                <textarea
                                  className="form-control"
                                  rows={5}
                                  placeholder="How can I help you?"
                                  defaultValue={""}
                                />
                                {/* File Upload Icon (Paperclip) */}
                                <label
                                  htmlFor="file-upload"
                                  className="file-upload-icon fas fa-paperclip"
                                />
                                {/* Voice Icon (Microphone) */}
                                <i className="voice-icon fas fa-microphone" />
                                {/* Hidden File Input */}
                                <input
                                  type="file"
                                  id="file-upload"
                                  className="file-input"
                                />
                                {/* Submit Button */}
                                <button type="submit" className="submit-btn">
                                  <i
                                    className="fa fa-paper-plane"
                                    aria-hidden="true"
                                  />{" "}
                                  Submit
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="title-wrap red-dot">
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
                        </div>
                        <div className="title-wrap red-dot Waiting">
                          <h5>Waiting for answer</h5>
                          <h3>
                            How contested is the purpose you’re dealing with?{" "}
                          </h3>
                        </div>
                        <div className="title-wrap red-dot Waiting last-title-wrap">
                          <h5>Waiting for answer</h5>
                          <h3>
                            Is there societal appetite to solve this problem?
                          </h3>
                        </div>
                      </div>
                    </div>
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
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Next Phase
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
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Itaque, labore, consectetur iure dolore illo
                          architecto quos expedita. Sed, similique dolore velit
                          sequi enim molestiae pariatur, laboriosam ut
                          repellendus iste eius? Lorem, ipsum dolor sit amet
                          consectetur adipisicing elit. Itaque, labore,
                          consectetur iure dolore illo architecto quos expedita.
                          Sed, similique dolore velit sequi enim molestiae
                          pariatur, laboriosam ut repellendus iste eius? Lorem,
                          ipsum dolor sit amet consectetur adipisicing elit.
                          Itaque, labore, consectetur iure dolore illo
                          architecto quos expedita. Sed, similique dolore velit
                          sequi enim molestiae pariatur, laboriosam ut
                          repellendus iste eius? Lorem, ipsum dolor sit amet
                          consectetur adipisicing elit. Itaque, labore,
                          consectetur iure dolore illo architecto quos expedita.
                          Sed, similique dolore velit sequi enim molestiae
                          pariatur, laboriosam ut repellendus iste eius?
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
              <img src="asset/assets/img/l-img5.png" alt="" />
              <img src="asset/assets/img/l-img2.png" alt="" />
              <img src="asset/assets/img/l-img4.png" alt="" />
              <img src="asset/assets/img/l-img3.png" alt="" />
              <img src="asset/assets/img/l-img5.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>

    // <section className="admin-body mapping-body">
    //   <div className="container-fuild mapping-wrap">
    //     <div className="row mapping-wrap-row">
    //       <div className="col-md-9 mapping-wrapper">
    //         <div className="row left-block">
    //           <h1>{phaseName}</h1>
    //           {blocks.map((d: any) => (
    //             <>
    //               <div className="col-md-4">
    //                 <div
    //                   className="frame-img"
    //                   onClick={(e: any) => setactiveBlock(d.id)}
    //                 >
    //                   <img src="asset/assets/img/frame.png" alt="" />
    //                 </div>

    //                 <h4
    //                   className="text-center"
    //                   onClick={(e: any) => setactiveBlock(d.id)}
    //                 >
    //                   {d.name}
    //                 </h4>
    //               </div>
    //               <div className="col-md-8">
    //                 <div className="content-wrapper">
    //                   {Ques.map((qd: any, k: number) => (
    //                     <>
    //                       {k == 0 ? (
    //                         <>
    //                           <div className="title-wrap">
    //                             <h5>Complete</h5>
    //                             <h3>{qd.question} </h3>
    //                           </div>
    //                           <form>
    //                             <div className="form-group">
    //                               <div className="textarea-container">
    //                                 <textarea
    //                                   className="form-control"
    //                                   rows={5}
    //                                   placeholder="How can I help you?"
    //                                   defaultValue={""}
    //                                 />
    //                                 <label
    //                                   htmlFor="file-upload"
    //                                   className="file-upload-icon fas fa-paperclip"
    //                                 />
    //                                 <i className="voice-icon fas fa-microphone" />
    //                                 <input
    //                                   type="file"
    //                                   id="file-upload"
    //                                   className="file-input"
    //                                 />
    //                                 <button
    //                                   type="submit"
    //                                   className="submit-btn"
    //                                 >
    //                                   <i
    //                                     className="fa fa-paper-plane"
    //                                     aria-hidden="true"
    //                                   />{" "}
    //                                   Submit
    //                                 </button>
    //                               </div>
    //                             </div>
    //                           </form>
    //                         </>
    //                       ) : (
    //                         <>
    //                           <div className="title-wrap red-dot">
    //                             <h5>Anwaring</h5>
    //                             <h3>{qd.question}</h3>
    //                           </div>
    //                         </>
    //                       )}
    //                     </>
    //                   ))}

    //                   {/* <div className="title-wrap red-dot">
    //                     <h5>Anwaring</h5>
    //                     <h3>
    //                       Who is mostly affected/impacted by the problem?{" "}
    //                     </h3>
    //                   </div>
    //                   <div className="title-wrap red-dot">
    //                     <h5>Waiting for answer</h5>
    //                     <h3>Who owns the problem you are trying to solve?</h3>
    //                   </div>
    //                   <div className="title-wrap red-dot">
    //                     <h5>Waiting for answer</h5>
    //                     <h3>
    //                       How contested is the purpose you’re dealing with?
    //                     </h3>
    //                   </div>
    //                   <div className="title-wrap red-dot">
    //                     <h5>Waiting for answer</h5>
    //                     <h3>
    //                       Is there societal appetite to solve this problem?
    //                     </h3>
    //                   </div> */}
    //                 </div>
    //               </div>
    //             </>
    //           ))}
    //         </div>
    //       </div>
    //       <div className="col-md-3">
    //         <div className="mapping-sidebar">
    //           <div className="top-widget com-widget">
    //             <img src="asset/assets/img/ai-bar.png" alt="" />
    //           </div>
    //           <div className="middle-widget com-widget">
    //             <img src="asset/assets/img/middle-widget.png" alt="" />
    //           </div>
    //           <div className="bottom-widget com-widget">
    //             <img src="asset/assets/img/bottom-widget.png" alt="" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
