import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Menu from "./Menu";
import { permission_for_custom_route } from "@/utils";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import axiosInstance from "@/api/axios";
import PhasesForm from "@/pages/Form/PhasesForm";
import { motion } from "framer-motion";
import MemberAdmin from "@/pages/member/admin/MemberAdmin";
import Navbar from "@/pages/Navbar/Navbar";
import QuickLinks from "./QuickLinks";

const current_role = JSON.parse(localStorage.getItem("current_role"));

function LeftSideMenuBar() {
  const location = useLocation();
  const [expend, setexpend] = useState(false);
  const [activephase, setactivephase] = useState(0);
  const [activeBlock, setactiveBlock] = useState(0);
  const [activeQuestion, setactiveQuestion] = useState(0);
  const [nextPhase, setnextPhase] = useState(0);
  const [phases, setphases] = useState([]);
  const [blocks, setblocks] = useState([]);
  const [Allblocks, setallblocks] = useState([]);
  const [AllQues, setAllQues] = useState([]);
  const [Ques, setQues] = useState([]);

  const parentAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const childHoverAnimation = {
    whileHover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  // get phases
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`1`, 1);
        const response = await axiosInstance.get("/phases"); // Example endpoint

        if (response.data.length) {
          setphases(response.data);
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

  const { id } = useParams();
  const expandeRoute = [
    {
      id: 1,
      title: "/add-phase",
    },
    {
      id: 2,
      title: "/phase/"+id,
      hasParam : true,
    },
  ];

  useEffect(() => {
    // Trigger on every route change
    const handleRouteChange = () => {
      const pathname = window.location.pathname;
      const currentRouteGroup = expandeRoute.find((group) =>
        group.title.includes(pathname),
      );
      setexpend(currentRouteGroup?.id ? true : false);
    };
    handleRouteChange();
  }, [location]);

  console.log(`expend`, expend);

  return (
    <>
      {current_role?.roleId == 5 ? (
        <div className="row tab-panel-body">
          <MemberAdmin />
        </div>
      ) : (
        <>
          <div className="admin-panel">
            <section className="admin-body">
              <div className="container-fuild">
                <div className="row">
                  <nav className="tab-wrap">
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        className="nav-link active"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        Workspace
                      </button>
                      <button
                        className="nav-link"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                      >
                        My Projects
                      </button>
                      <button
                        className="nav-link"
                        id="nav-contact-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-contact"
                        type="button"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                      >
                        Global Tools
                      </button>
                      <button
                        className="nav-link"
                        id="nav-contact-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-contact"
                        type="button"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                      >
                        Knowledge bases
                      </button>
                      <button
                        className="nav-link"
                        id="nav-other-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-other"
                        type="button"
                        role="tab"
                        aria-controls="nav-other"
                        aria-selected="false"
                      >
                        Others
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                      tabIndex={0}
                    >
                      <Breadcrumb
                        name1="Dashboard"
                        name2={ location.pathname }
                        date={new Date().toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      />
                      <div className="row tab-panel-body">
                        {!expend && <QuickLinks />}

                        <motion.div
                          className={expend ? "col-12" : "col-lg-9 col-md-9"}
                          variants={parentAnimation}
                          initial="hidden"
                          animate="visible"
                        >
                          <Outlet />
                        </motion.div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                      tabIndex={0}
                    >
                      <Breadcrumb
                        name1="Dashboard"
                        name2="Application"
                        date={new Date().toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      />

                      <div className="row tab-panel-body">
                        <div className="col-lg-3 col-md-3">
                          <div className="left-sidebar-menu">
                            <h3>QUICK ACTIONS</h3>
                            <div className="menu-bar">
                              <ul>
                                <li>
                                  <a href="#">
                                    <span className="menu-icon">
                                      <img
                                        src="asset/assets/img/left-bar-icon2.png"
                                        alt=""
                                      />
                                    </span>
                                    Start new Project
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <span className="menu-icon">
                                      <img
                                        src="asset/assets/img/left-bar-icon3.png"
                                        alt=""
                                      />
                                    </span>
                                    Modify existing case
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <span className="menu-icon">
                                      <img
                                        src="asset/assets/img/left-bar-icon1.png"
                                        alt=""
                                      />
                                    </span>
                                    Connect Knowledge base
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <span className="menu-icon">
                                      <img
                                        src="asset/assets/img/left-bar-icon5.png"
                                        alt=""
                                      />
                                    </span>
                                    Connect existing case to project
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <span className="menu-icon">
                                      <img
                                        src="asset/assets/img/left-bar-icon6.png"
                                        alt=""
                                      />
                                    </span>
                                    Modify sectoral tag
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <span className="menu-icon">
                                      <img
                                        src="asset/assets/img/left-bar-icon7.png"
                                        alt=""
                                      />
                                    </span>
                                    Disconnect phase
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <span className="menu-icon">
                                      <img
                                        src="asset/assets/img/left-bar-icon8.png"
                                        alt=""
                                      />
                                    </span>
                                    Disconnect blocks
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <motion.div
                          className="col-lg-9 col-md-9 right-panel-wrap"
                          variants={parentAnimation}
                          initial="hidden"
                          animate="visible"
                        >
                          <div className="row ">
                            <motion.div
                              className="col-md-3 col-sm-3 col-6"
                              {...childHoverAnimation}
                            >
                              <div className="icon-box">
                                <a href="#">
                                  <img
                                    src="asset/assets/img/img13.png"
                                    alt=""
                                  />
                                  <p>Start new project</p>
                                </a>
                              </div>
                            </motion.div>
                            <motion.div
                              className="col-md-3 col-sm-3 col-6"
                              {...childHoverAnimation}
                            >
                              <div className="icon-box">
                                <a href="#">
                                  <img
                                    src="asset/assets/img/img14.png"
                                    alt=""
                                  />
                                  <p>project care</p>
                                </a>
                              </div>
                            </motion.div>
                            <motion.div
                              className="col-md-3 col-sm-3 col-6"
                              {...childHoverAnimation}
                            >
                              <div className="icon-box">
                                <a href="#">
                                  <img
                                    src="asset/assets/img/img15.png"
                                    alt=""
                                  />
                                  <p>project xyz</p>
                                </a>
                              </div>
                            </motion.div>
                            <motion.div
                              className="col-md-3 col-sm-3 col-6"
                              {...childHoverAnimation}
                            >
                              <div className="icon-box">
                                <a href="#">
                                  <img src="asset/assets/img/img7.png" alt="" />
                                  <p>Progress</p>
                                </a>
                              </div>
                            </motion.div>
                          </div>
                          <div className="row ">
                            <motion.div
                              className="col-md-3 col-sm-3 col-6"
                              {...childHoverAnimation}
                            >
                              <div className="icon-box">
                                <a href="#">
                                  <img src="asset/assets/img/img5.png" alt="" />
                                  <p>PHASE OUTPUTS</p>
                                </a>
                              </div>
                            </motion.div>
                            <motion.div
                              className="col-md-3 col-sm-3 col-6"
                              {...childHoverAnimation}
                            >
                              <div className="icon-box">
                                <a href="#">
                                  <img src="asset/assets/img/img6.png" alt="" />
                                  <p>BLOCK OUTPUTS</p>
                                </a>
                              </div>
                            </motion.div>
                            <motion.div
                              className="col-md-3 col-sm-3 col-6"
                              {...childHoverAnimation}
                            >
                              <div className="icon-box">
                                <a href="#">
                                  <img src="asset/assets/img/img9.png" alt="" />
                                  <p>DISCONNECT PHASE / BLOCKS</p>
                                </a>
                              </div>
                            </motion.div>
                            <motion.div
                              className="col-md-3 col-sm-3 col-6"
                              {...childHoverAnimation}
                            >
                              <div className="icon-box">
                                <Link to="/ai-model-mgmt">
                                  <img src="asset/assets/img/img8.png" alt="" />
                                  <p>AI MODEL MGMT</p>
                                </Link>
                              </div>
                            </motion.div>
                          </div>
                          <div className="row ">
                            <motion.div
                              className="col-md-3 col-sm-3 col-6"
                              {...childHoverAnimation}
                            >
                              <div className="icon-box">
                                <a href="#">
                                  <img
                                    src="asset/assets/img/img10.png"
                                    alt=""
                                  />
                                  <p>SUMMARY OUTPUT</p>
                                </a>
                              </div>
                            </motion.div>
                            <motion.div
                              className="col-md-3 col-sm-3 col-6"
                              {...childHoverAnimation}
                            >
                              <div className="icon-box">
                                <a href="#">
                                  <img
                                    src="asset/assets/img/img16.png"
                                    alt=""
                                  />
                                  <p>SECTORAL TAGS</p>
                                </a>
                              </div>
                            </motion.div>
                            <motion.div
                              className="col-md-3 col-sm-3 col-6"
                              {...childHoverAnimation}
                            >
                              <div className="icon-box">
                                <a href="#">
                                  <img
                                    src="asset/assets/img/img12.png"
                                    alt=""
                                  />
                                  <p>RUN PROJECT</p>
                                </a>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-contact"
                      role="tabpanel"
                      aria-labelledby="nav-contact-tab"
                      tabIndex={0}
                    >
                      <Breadcrumb
                        name1="Dashboard"
                        name2="Application"
                        date={new Date().toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      />
                      <div className="row tab-panel-body">
                        <div className="col-lg-3 col-md-3">
                          <div className="left-sidebar-menu">
                            <h3>QUICK ACTIONS</h3>
                            <div className="menu-bar">
                              <ul>
                                <li>
                                  <a href="#">
                                    <span className="menu-icon">
                                      <img
                                        src="asset/assets/img/left-bar-icon2.png"
                                        alt=""
                                      />
                                    </span>
                                    Start new Project
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <span className="menu-icon">
                                      <img
                                        src="asset/assets/img/left-bar-icon3.png"
                                        alt=""
                                      />
                                    </span>
                                    Modify existing case
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <span className="menu-icon">
                                      <img
                                        src="asset/assets/img/left-bar-icon1.png"
                                        alt=""
                                      />
                                    </span>
                                    Connect Knowledge base
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <span className="menu-icon">
                                      <img
                                        src="asset/assets/img/left-bar-icon5.png"
                                        alt=""
                                      />
                                    </span>
                                    Connect existing case to project
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <span className="menu-icon">
                                      <img
                                        src="asset/assets/img/left-bar-icon6.png"
                                        alt=""
                                      />
                                    </span>
                                    Modify sectoral tag
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          className="col-lg-9 col-md-9 right-panel-wrap"
                          variants={parentAnimation}
                          initial="hidden"
                          animate="visible"
                        >
                          <div className="row ">
                            <motion.div
                              className="col-md-3 col-sm-3 col-6"
                              {...childHoverAnimation}
                            >
                              <div className="icon-box">
                                <a href="#">
                                  <img src="asset/assets/img/img1.png" alt="" />
                                  <p>Knowledge Base</p>
                                </a>
                              </div>
                            </motion.div>
                            <motion.div
                              className="col-md-3 col-sm-3 col-6"
                              {...childHoverAnimation}
                            >
                              <div className="icon-box">
                                <a href="#">
                                  <img src="asset/assets/img/img2.png" alt="" />
                                  <p>CASE LIBRARY</p>
                                </a>
                              </div>
                            </motion.div>

                            <motion.div
                              className="col-md-3 col-sm-3 col-6"
                              {...childHoverAnimation}
                            >
                              <div className="icon-box">
                                <a href="#">
                                  <img src="asset/assets/img/img3.png" alt="" />
                                  <p>PHASE OVERVIEW</p>
                                </a>
                              </div>
                            </motion.div>

                            <motion.div
                              className="col-md-3 col-sm-3 col-6"
                              {...childHoverAnimation}
                            >
                              <div className="icon-box">
                                <Link to="/guide-prompts">
                                  <img src="asset/assets/img/img4.png" alt="" />
                                  <p>GUIDE PROMPTS</p>
                                </Link>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-other"
                      role="tabpanel"
                      aria-labelledby="nav-other-tab"
                      tabIndex={0}
                    ></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>

    // <></>
  );
}

export default LeftSideMenuBar;
