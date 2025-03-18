// import { useState, useEffect } from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import Menu from "./Menu";
// import { permission_for_custom_route } from "@/utils";

// function Layout() {

//   const location = useLocation();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [permission, setpermission] = useState(false);

//   // Toggle sidebar open/close
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   useEffect(() => {
//     const permission_access: any = JSON.parse(
//       localStorage.getItem("permission"),
//     );

//     let found :any = {};

//     permission_access?.data.find((d: any) =>{

//       if (d?.subMenu.length) {

//         d?.subMenu?.find((sub: any) => {
//           if (sub.checked && location.pathname.includes(sub.route)) {
//             found = sub
//           }
//         })
//       } else {
//         if (d.checked && location.pathname.includes(d.route)) {
//           found = d
//         }
//       }

//     }
//     ,
//     );

//     console.log(`found`, found);

//     if (!found.id) {
//       const customFound = permission_for_custom_route(location.pathname)
//       if (customFound) {
//         setpermission(customFound);
//       }
//     }else{
//       setpermission(found?.checked);
//     }
//   }, [location?.key]);

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ${
//           isSidebarOpen
//             ? "w-screen xs:w-screen sm:w-64"
//             : "w-0 sm:w-16"
//         } sm:${isSidebarOpen ? "w-64" : "w-16"} z-50`}
//       >
//         {/* Sidebar Header with Toggle Button */}
//         <div className="flex items-center justify-between p-4 mt-2.5 border-gray-700">
//           <h2
//             className={`text-QuaternaryColor text-lg font-semibold ${
//               isSidebarOpen ? "block" : "hidden xs:hidden sm:block md:hidden lg:hidden xl:hidden"
//             }`}
//           >
//             MENU
//           </h2>
//           <button
//             onClick={toggleSidebar}
//             className="text-QuinaryColor hover:text-QuinaryColor focus:outline-none"
//           >
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M4 7L20 7"
//                 stroke="black"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//               <path
//                 d="M4 12L20 12"
//                 stroke="black"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//               <path
//                 d="M4 17L20 17"
//                 stroke="black"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Sidebar Content */}
//         <div className="flex flex-col h-full overflow-y-auto py-2"> {/* Fix applied here */}
//           <div className="px-0.5">
//             <Menu isSidebarOpen={isSidebarOpen} />
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       {/* Add an overlay for xs if sidebar is open */}
//       {isSidebarOpen && window.innerWidth < 640 && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//       <div
//         className={`flex flex-col w-full ${
//           isSidebarOpen ? "ml-0 sm:ml-64" : "ml-0 sm:ml-16"
//         } transition-all duration-300`}
//       >
//         <div className="container mx-auto p-5">
//           {permission ? (
//             <Outlet />
//           ) : (
//             <p className="text-red-600 text-center">Permission Denied</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Layout;

import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Menu from "./Menu";
import { permission_for_custom_route } from "@/utils";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import axiosInstance from "@/api/axios";
import PhasesForm from "@/pages/Form/PhasesForm";

function LeftSideMenuBar() {
  const [activephase, setactivephase] = useState(0);
  const [activeBlock, setactiveBlock] = useState(0);
  const [nextPhase, setnextPhase] = useState(0);
  const [phases, setphases] = useState([]);
  const [blocks, setblocks] = useState([]);
  const [Ques, setQues] = useState([]);

  // get phases
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/phases"); // Example endpoint
        setphases(response.data);

        if (response.data.length) {
          setactivephase(response.data[0].id);
          setnextPhase(response.data[1].id);
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
        const res = await axiosInstance.get(
          "/phases/getBlockByPhaseId/" + id + "",
        ); // Example endpoint
        setblocks(res.data);
        if (res.data.length) {
          setactiveBlock(res.data[0].id);
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
        const res = await axiosInstance.get(
          "/blocks/getQuestionByBlock/" + id + "",
        ); // Example endpoint
        setQues(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchQuestionByBlock(activeBlock);
  }, [activeBlock]);

  return (
    // <div className="flex">
    //   {/* Sidebar */}
    //   <div
    //     className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ${isSidebarOpen ? "w-screen sm:w-64 md:w-screen lg:w-56" : "w-0 sm:w-0 md:w-0 lg:w-16"
    //       } z-50`}

    //   >
    //     {/* Sidebar Header with Toggle Button */}
    //     <div className="flex items-center justify-between p-4 mt-2.5 border-gray-700">
    //       <h2
    //         className={`text-QuaternaryColor text-lg font-semibold ${isSidebarOpen
    //             ? "block"
    //             : "hidden xs:hidden sm:block md:hidden lg:hidden xl:hidden"
    //           }`}
    //       >
    //         MENU
    //       </h2>
    //       <button
    //         onClick={toggleSidebar}
    //         className="text-QuinaryColor hover:text-QuinaryColor focus:outline-none"
    //       >
    //         <svg
    //           width="20"
    //           height="20"
    //           viewBox="0 0 24 24"
    //           fill="none"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             d="M4 7L20 7"
    //             stroke="black"
    //             strokeWidth="1.5"
    //             strokeLinecap="round"
    //           />
    //           <path
    //             d="M4 12L20 12"
    //             stroke="black"
    //             strokeWidth="1.5"
    //             strokeLinecap="round"
    //           />
    //           <path
    //             d="M4 17L20 17"
    //             stroke="black"
    //             strokeWidth="1.5"
    //             strokeLinecap="round"
    //           />
    //         </svg>
    //       </button>
    //     </div>

    //     {/* Sidebar Content */}
    //     <div className="flex flex-col h-full overflow-y-auto py-2">
    //       {/* Fix applied here */}
    //       <div className="px-0.5">
    //         <Menu isSidebarOpen={isSidebarOpen} />
    //       </div>
    //     </div>
    //   </div>

    //   {/* Main Content Area */}
    //   {/* Add an overlay for screens below the breakpoint */}
    //   {isSidebarOpen && window.innerWidth < breakpoint && (
    //     <div
    //       className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
    //       onClick={toggleSidebar}
    //     ></div>
    //   )}

    //   <div
    //     className={`flex flex-col w-full ${isSidebarOpen ? `ml-0 sm:ml-64` : `ml-0 sm:ml-0 md:ml-0 lg:ml-28`
    //       } transition-all duration-300`}
    //   >
    //     <div className="container p-5">
    //       {/* {permission ? (
    //         <Outlet />
    //       ) : (
    //         <p className="text-red-600 text-center">Permission Denied</p>
    //       )} */}
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>

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
              <Breadcrumb name1="Dashboard" name2="Application" date="Aug 11" />
              <div className="row tab-panel-body">
                <div className="col-lg-3 col-md-3">
                  <div className="left-sidebar-menu">
                    <h3>My account</h3>
                    <div className="menu-bar">
                      <ul>
                        <li>
                          <a href="#">
                            <span className="menu-icon">
                              <img
                                src="asset/assets/img/left-bar-icon1.png"
                                alt=""
                              />
                            </span>
                            Add to Knowledgebase
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span className="menu-icon">
                              <img
                                src="asset/assets/img/left-bar-icon2.png"
                                alt=""
                              />
                            </span>
                            Add new case
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
                                src="asset/assets/img/left-bar-icon4.png"
                                alt=""
                              />
                            </span>
                            Modify prompt
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
                            Archive phase output
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
                            Archive block Output
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
                        <li>
                          <a href="#">
                            <span className="menu-icon">
                              <img
                                src="asset/assets/img/left-bar-icon9.png"
                                alt=""
                              />
                            </span>
                            Logs
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-md-9 right-panel-wrap">
                  <div className="row ">
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img1.png" alt="" />
                          <p>Knowledge Base</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img2.png" alt="" />
                          <p>CASE LIBRARY</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img3.png" alt="" />
                          <p>PHASE OVERVIEW</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img4.png" alt="" />
                          <p>PROMPT LIBRARY</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img5.png" alt="" />
                          <p>PHASE OUTPUTS</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img6.png" alt="" />
                          <p>BLOCK OUTPUTS</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img7.png" alt="" />
                          <p>TASK PROGRESS</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img8.png" alt="" />
                          <p>AI MODEL MGMT</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img9.png" alt="" />
                          <p>DISCONNECT PHASE / BLOCKS</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img10.png" alt="" />
                          <p>SUMMARY OUTPUT</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img11.png" alt="" />
                          <p>SECTORAL TAGS</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img12.png" alt="" />
                          <p>RUN PROJECT</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
              tabIndex={0}
            >
              <Breadcrumb name1="Dashboard" name2="Application" date="Aug 11" />

              <div className="row tab-panel-body">
                <div className="col-lg-3 col-md-3">
                  <div className="left-sidebar-menu">
                    <h3>My account</h3>
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
                <div className="col-lg-9 col-md-9 right-panel-wrap">
                  <div className="row ">
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img13.png" alt="" />
                          <p>Start new project</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img14.png" alt="" />
                          <p>project care</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img15.png" alt="" />
                          <p>project xyz</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img7.png" alt="" />
                          <p>Progress</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img5.png" alt="" />
                          <p>PHASE OUTPUTS</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img6.png" alt="" />
                          <p>BLOCK OUTPUTS</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img9.png" alt="" />
                          <p>DISCONNECT PHASE / BLOCKS</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img8.png" alt="" />
                          <p>AI MODEL MGMT</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img10.png" alt="" />
                          <p>SUMMARY OUTPUT</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img16.png" alt="" />
                          <p>SECTORAL TAGS</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img12.png" alt="" />
                          <p>RUN PROJECT</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
              tabIndex={0}
            >
              <Breadcrumb name1="Dashboard" name2="Application" date="Aug 11" />
              <div className="row tab-panel-body">
                <div className="col-lg-3 col-md-3">
                  <div className="left-sidebar-menu">
                    <h3>My account</h3>
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
                <div className="col-lg-9 col-md-9 right-panel-wrap">
                  <div className="row ">
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img1.png" alt="" />
                          <p>Knowledge Base</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img2.png" alt="" />
                          <p>CASE LIBRARY</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img3.png" alt="" />
                          <p>PHASE OVERVIEW</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-6">
                      <div className="icon-box">
                        <a href="#">
                          <img src="asset/assets/img/img4.png" alt="" />
                          <p>GUIDE PROMPTS</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-other"
              role="tabpanel"
              aria-labelledby="nav-other-tab"
              tabIndex={0}
            >
              <Breadcrumb name1="Dashboard" name2="Application" date="Aug 11" />
              <div className="row tab-panel-body">
                <PhasesForm blocks={blocks} Ques={Ques} activephase={activephase} setactiveBlock={setactiveBlock} activeBlock={activeBlock} nextPhase={nextPhase} phases={phases} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    // <></>
  );
}

export default LeftSideMenuBar;
