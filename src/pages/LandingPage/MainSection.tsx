import useFetch from "@/hooks/useFetch";
import { motion } from "framer-motion";
import LandingPageImage from "../../../assets/main page/landingpgpic.png";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import OutreachCards from "./OutreachCards";
import Footer from "./Footer";
import "aos/dist/aos.css";
import AOS from "aos";
import { submitFormData } from "@/api/Reqest";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const MainSection = () => {
  const [outreach, setOutreach] = useState([]);
  const [_project, set_project] = useState([]);
  const [Branch, setBranch] = useState([]);
  const [PO, setPO] = useState([]);

  const fetchProject = async () => {
    // project Organization
    const page_list = `${API_URL}/project?currentPage=1&pageSize=5000`;
    const { data }: any = await submitFormData(page_list, {});
    set_project(data?.content);
  };

  const fetchBranch = async () => {
    // partner Organization
    const page_list = `${API_URL}/branch?currentPage=1&pageSize=10000`;
    const { data }: any = await submitFormData(page_list, {});
    setBranch(data?.content);
  };

  const POFetch = async () => {
    // partner Organization
    const page_list = `${API_URL}/partner-organization?currentPage=1&pageSize=1000`;
    const { data }: any = await submitFormData(page_list, {});
    setPO(data?.content);
  };

  useEffect(() => {
    fetchProject();
    fetchBranch();
    POFetch();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const page_list = `${API_URL}/availableOutreachProgram`;
        const response = await fetch(page_list, {
          headers: {
            "content-type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOutreach(data?.content);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 3000, // Default duration
    });
  }, []);

  return (
    <div className="relative">
   
        <div className="relative flex flex-col md:flex-row lg:flex-row xl:flex-row items-center justify-between bg-primaryColor text-white p-6 md:p-5 xl:p-20 h-min font-sans">

          <div className="text-left md:w-1/2 lg:w-1/2 xl:w-1/2">
            <h1 className="xs:text-2xl md:text-2xl lg:text-4xl xl:text-4xl font-bold ml-2 ">
              Find Your Desired Trainings <br /> To Grow Up Your Goals
            </h1>
            <p className="font-medium my-5 xs:text-base md:text-base lg:text-lg xl:text-xl px-2">
              Our platform is designed to streamline your training processes,
              making it easier than ever to empower your workforce with the
              skills they need. Whether you’re managing employee development,
              tracking progress, or planning future training sessions, our
              intuitive tools and resources are here to support your success.
              Dive in and discover how we can help you create a more
              knowledgeable and efficient team.
            </p>

            <div className="relative xs:w-full md:w-1/2 lg:w-2/3 xl:w-full">
              <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-4 pl-12 border-2 border-gray-300 rounded-full text-black focus:outline-none "
              />
            </div>
          </div>

          <div className="xl:w-1/2 flex justify-center relative z-10 mt-10">
            <img
              src={LandingPageImage} // Replace with your image path
              alt="Building"
              className="w-full h-full md:max-w-sm rounded-lg "
            />
            <div className="border-2 border-white xxxs:w-[270px] xxs:w-[320px] xs:w-[370px] sm:w-[340px] md:w-[380px] lg:w-[380px] xl:w-[380px] xxxs:h-[300px]  xxs:h-[350px] xs:h-[390px] sm:h-[390px] md:h-[390px] lg:h-[390px] xl:h-[390px] rounded-3xl absolute -mr-10 -mt-4"></div>
          </div>

          <div className="custom-shape-divider-bottom-1726984966 w-full h-auto">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-auto"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              />
            </svg>
          </div>
        </div>


      <div className="container mx-auto w-[1200px] mt-10 p-5">
        <div className="flex justify-between items-center">
          <h2 className="font-sans xs:text-base md:text-sm lg:text-lg xl:text-3xl font-bold">
            Ongoing Outreach Program
          </h2>
          <button className="block w-[150px] text-center font-bold text-sm xs:p-1 md:p-3 lg:p-3 xl:p-3 text-white rounded-full font-sans bg-primaryColor">
            Explore More
          </button>
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-5 ">
            {outreach?.map((data: any) => (
              <OutreachCards outReachData={data} outreachProgramId={data?.outreachProgramId} PO={PO} _project={_project} Branch={Branch} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
