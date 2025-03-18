import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { FaRProject } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import { GrCompliance } from "react-icons/gr";
import { Card } from './DashboardCards/Card';
import { Table } from './DashboardTable/Table';
import { ClassSchedule } from './DashboardCalendar/ClassSchedule';

import { FiTarget } from "react-icons/fi";
import { SiCodementor } from "react-icons/si";
import { IoPeople } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");
const Dashboard = () => {
  const { t } = useTranslation();
  const [PoCount, setPoCount] = useState(null);
  const [ProjectCount, setProjectCount] = useState(null);
  // Bar Chart Data
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Income',
        data: [40000, 42000, 45000, 47000, 49000, 52000, 50000, 45000, 60000, 75000, 80000, 85000],
        backgroundColor: '#7770ff',
        borderRadius: 5,
      },
      {
        label: 'Expense',
        data: [15000, 16000, 17000, 18000, 19000, 20000, 20000, 25000, 30000, 23000, 28000, 32000],
        backgroundColor: '#111111',
        borderRadius: 5,
      },
    ],
  };

  const barOptions = {
    responsive: true,

    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieData = {
    labels: ['UI/UX', 'Branding', 'Illustration', 'Web Dev'],
    datasets: [
      {
        data: [52, 20, 15, 13],
        backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#EF4444'],
        hoverBackgroundColor: ['#4F46E5', '#059669', '#D97706', '#DC2626'],
      },
    ],
  };

  const pieOptions: any = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio for custom sizing
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  // cards data
  const cardsData = [
    { icon: <FaRProject size={24} />, value: ProjectCount || "Loading...", label: t("Project"), change: "2.1%", changeType: "increase" },
    { icon: <CgOrganisation size={24} />, value: PoCount || "Loading...", label: t("Partner Organization"), change: "2.1%", changeType: "increase" },
    { icon: <GrCompliance size={24} />, value: "50", label: t("Complete Outreach"), change: "2.1%", changeType: "increase" },
    { icon: <FiTarget size={24} />, value: "149", label: t("Ongoing Outreach"), change: "0.47%", changeType: "decrease" },
    { icon: <IoPeople size={24} />, value: "89", label: t("Participant"), change: "2.1%", changeType: "increase" },
    { icon: <SiCodementor size={24} />, value: "72", label: t("Trainer"), change: "0.647%", changeType: "decrease" },
  ];
  // members data
  const membersData = [
    {
      name: "Sabina",
      project: "RAISE",
      po: "BEDO",
      company: "Mobile Phone Servicing",
    },
    {
      name: "Jasmine",
      project: "RAISE",
      po: "Karsa Foundation",
      company: "Carpentry",
    },
    {
      name: "Latif",
      project: "RAISE",
      po: "Ad-Din Welfare Center",
      company: "Digital Marketing",
    },
    {
      name: "Nasima",
      company: "Care Giving",
      project: "RAISE",
      po: "Ahead Social Organization (ASO)",
    },
    {
      name: "Kamrul",
      company: "Digital Marketing",
      project: "RAISE",
      po: "BASA Foundation",
    },
  ];



  useEffect(() => {
    const fetchPoCount = async () => {
      try {
        const response = await fetch(`${API_URL}/partner-organization/count`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error fetching projects.");
        const data = await response.json();
        setPoCount(data);
        console.log("PoCount", PoCount)
      } catch (error) {
        console.error(error);
      }
    };
    fetchPoCount();
  }, []);

  useEffect(() => {
    const fetchProjectCount = async () => {
      try {
        const response = await fetch(`${API_URL}/project/project-count`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error fetching projects.");
        const data = await response.json();
        setProjectCount(data);
        console.log("PoCount", ProjectCount)
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjectCount();
  }, []);

  return (
    <>

      <div className="min-h-screen  p-5">
        {/* <h1 className="text-3xl font-bold underline">Welcome to PKSF</h1> */}
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-6 gap-5  xs:w-full md:w-full lg:w-full xl:w-full">
          {cardsData?.map((card, index) => (
            <Card
              key={index}
              icon={card.icon}
              value={card.value}
              label={card.label}
            />
          ))}
        </div>

        {/* <div className="flex xs:flex-wrap sm:flex-wrap md:flex-wrap lg:flex-wrap xl:flex-nowrap  xs:ml-6 lg:ml-0 md:ml-0 xl:ml-0  xs:p-0 lg:p-6 md:p-6 xl:p-6 gap-10 xs:w-2/3 md:w-full lg:w-full xl:w-full">

          <div className="xs:w-[300px] md:w-[400px] lg:w-full xl:w-full p-6 mt-5  rounded-lg shadow-lg flex md:flex-col lg:flex-col xl:flex-row items-center justify-center gap-6 bg-white">

            <div className=" border-gray-200 bg-white">
              <div className="mb-4 text-lg font-semibold text-gray-800 text-center">
                Total Participants by Gender
              </div>
              <PieChart />
            </div>
          </div>


          <div className="w-full p-6 mt-5  rounded-lg shadow-lg flex md:flex-col lg:flex-col xl:flex-row items-center justify-center gap-6 bg-white">

            <div className=" bg-gray-50">
              <div className="mb-4 text-lg font-semibold text-gray-800 text-center">
                Outreach by Year
              </div>
              <Chart />
            </div>
          </div>
        </div> */}

        <div className="flex xxxs:flex-wrap xxs:flex-wrap xs:flex-wrap sm:flex-wrap md:flex-wrap lg:flex-wrap xl:flex-nowrap  xs:ml-0 lg:ml-0 md:ml-0 xl:ml-0 mt-5 xs:p-0 lg:p-0 md:p-0 xl:p-0 gap-2 xs:w-full md:w-full lg:w-full xl:w-full items-stretch">
          {/* Bar Chart */}
          <div className="bg-white shadow-md rounded-lg p-4 xxxs:w-full xxs:w-full  xs:w-full sm:w-full md:full lg:w-full xl:w-full ">
            <div className="flex xs:flex-col md:flex-row lg:flex-row xl:flex-row  justify-between items-center">
              <h3 className="font-semibold text-gray-700 text-lg">{t("Cash flow")}</h3>
              <div className="flex items-center space-x-2">
                <button className="text-sm bg-slate-50 text-gray-600 px-3 py-2 rounded-md drop-shadow-md">{t("Last 6 Months")}</button>
                <button className='shadow-md rounded-md border-2 border-gray-500-800 p-1.5'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-gray-400"
                  >
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="19" cy="12" r="2" />
                  </svg>

                </button>
              </div>
            </div>
            <div className="mt-4 w-full">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white shadow-md rounded-lg p-4 w-full xxxs:w-full xxs:w-full  xs:w-full sm:w-full md:full lg:w-full ">
            <div className="flex xs:flex-col md:flex-row lg:flex-row xl:flex-row  justify-between items-center ">
              <h3 className="font-semibold text-gray-700 text-lg">{t("Training")}</h3>
              <div className="flex items-center space-x-2">
                <button className="text-sm bg-slate-50 text-gray-600 px-3 py-2 rounded-md drop-shadow-md">{t("Last 6 Months")}</button>
                <button className='shadow-md rounded-md border-2 border-gray-500-800 p-1.5'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-gray-400"
                  >
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="19" cy="12" r="2" />
                  </svg>

                </button>
              </div>
            </div>

            <div className="mt-4   flex justify-center items-center w-full  sm:w-[400px] md:w-[280px] lg:w-[600px] xl:w-[500px]
                    h-72 mx-auto">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </div>



        <div className="flex justify-between mt-4 gap-5  " >
          {/* <QuickMenuCard /> */}
          <Table data={membersData} />

        </div>
        <ClassSchedule />
      </div>
    </>
  )
}

export default Dashboard