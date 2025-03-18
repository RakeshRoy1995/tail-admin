import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import useFetch from "@/hooks/useFetch";
import DropDownIcon from "@/shared/DropDownIcon/DropDownIcon";
import { ReportGenerate } from "@/shared/components/ButttonsCollection/ReportGenerate";
import TrainingReportPDF from "./TrainingReportPDF";
import { get_all_data } from "@/api/Reqest";
import { PO_Branch_id } from "@/utils";
import * as XLSX from "xlsx";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const POReport = () => {
    const {
        setsingleData,
        singleData,
        fetchDataCommon,
        common_data,
        error
    } = useFetch(``);
    const [selectedValue, setSelectedValue] = useState("");
    const [FromselectedDate, setFromSelectedDate] = useState(null);
    const [ToselectedDate, setToSelectedDate] = useState(null);
    const { t } = useTranslation();
    const [project, setProject] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [po, setPo] = useState([]);
    const [selectedPo, setSelectedPo] = useState(PO_Branch_id()?.partnerOrganizationId || "");
    const [branch, setBranch] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(PO_Branch_id()?.branchId || "");
    const [reportType, setReportType] = useState([]);
    const [yearError, setYearError] = useState(""); // Changed to handle global error.
    const currentYear = new Date().getFullYear();
    const [selectedReportType, setSelectedReportType] = useState("");
    const [fromYear, setFromYear] = useState(currentYear);
    const [toYear, setToYear] = useState(currentYear + 1);
    const [selectedTarget, setSelectedTarget] = useState("");

    const CustomCalendarContainer = ({ children }: { children: React.ReactNode }) => {
        return <div className="custom-datepicker-container z-50">{children}</div>;
    };

    // Validate Year Inputs
    const validateYears = (fromYear: number, toYear: number) => {
        if (fromYear > toYear) {
            setYearError("From Year cannot be greater than To Year.");
        } else {
            setYearError("");
        }
    };

    // Handle year change
    const handleYearChange = (type: 'from' | 'to', value: number) => {
        const fromYearValue = type === 'from' ? value : fromYear;
        const toYearValue = type === 'to' ? value : toYear;

        // Update state
        if (type === 'from') {
            setFromYear(value);
        } else {
            setToYear(value);
        }

        // Validate on each change
        validateYears(fromYearValue, toYearValue);
    };

    // const handleSubmit = async (e: any) => {
    //     e.preventDefault();

    //     const formData = new FormData(e.target);
    //     let obj: any = {};
    //     for (const [key, value] of formData) {
    //         obj[key] = value;
    //     }
    //     console.log(`obj`, obj);

    //     const page_list = `${API_URL}/target-achievement`;
    //     const method = "GET";

    //     const options = {
    //         method,
    //         params: obj,
    //         headers: {
    //             "content-type": "application/json",
    //             Authorization: `Bearer ${token}`,
    //         },
    //     };

    //     fetchDataCommon(page_list, options);
    // };


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        let obj: any = {};
        for (const [key, value] of formData) {
            obj[key] = value;
        }
        // console.log(`obj`, obj);
        // Dynamically assign getPOTarget or getBranchTarget
        if (obj.targetSelection === "PO_Target") {
            obj.getPOTarget = true;
            delete obj.getBranchTarget;
        } else if (obj.targetSelection === "Branch_Target") {
            obj.getBranchTarget = true;
            delete obj.getPOTarget;
        }
        delete obj.targetSelection;

        // console.log("Final Payload:", obj);
        const page_list = `${API_URL}/target-achievement`;
        const method = "GET";

        const options = {
            method,
            params: obj,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        fetchDataCommon(page_list, options);
    };



    const handleDownloadExcel = () => {

        if (dataForReport && dataForReport.length) {
            const worksheet = XLSX.utils.json_to_sheet(dataForReport);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
            XLSX.writeFile(workbook, "report.xlsx");
        } else {
            Swal.fire({
                icon: "warning",
                text: "No data available to download",
                confirmButtonText: "Close",
            });
        }
    };

    useEffect(() => {
        if (common_data) {
            //show success message
            Swal.fire({
                icon: "success",
                text: "Success",
                confirmButtonText: "Close",
            });
        }
        if (error) {
            //show error message
            Swal.fire({
                icon: "error",
                text: error?.data?.message ? error?.data?.message : error,
                confirmButtonText: "Close",
            });
        }
    }, [error?.data?.timestamp, common_data, error]);

    //partner organization
    useEffect(() => {
        const fetchPO = async () => {
            try {
                const apiEndPoint = "partner-organization?currentPage=1&pageSize=50000";
                const { data }: any = await get_all_data(apiEndPoint);

                setPo(data?.content);
            } catch (error) {
                console.error("Fetch project data error:", error.message);
            }
        };
        fetchPO();
    }, []);

    // po wise projct
    useEffect(() => {
        if (selectedPo) {
            const fetchProject = async () => {
                try {
                    const response = await fetch(`${API_URL}/project-partner-organizations/project/by/po/${selectedPo}`, {
                        headers: {
                            "content-type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error("Error fetching projects.");
                    }
                    const data = await response.json();
                    setProject(data);
                } catch (error) {
                    console.error("Fetch project data error:", error.message);
                }
            };
            fetchProject();
        } else {
            setProject([]);
        }
    }, [selectedPo]);

    // project wise brach
    useEffect(() => {
        if (selectedPo) {
            const fetchBranch = async () => {
                try {
                    const response = await fetch(`${API_URL}/branch/by/po/${selectedPo}`, {
                        headers: {
                            "content-type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error("Error fetching branches.");
                    }
                    const data = await response.json();
                    setBranch(data);
                } catch (error) {
                    console.error("Fetch branch data error:", error.message);
                }
            };
            fetchBranch();
        } else {
            setBranch([]);
        }
    }, [selectedPo]);

    // fetch report type
    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                const response = await fetch(`${API_URL}/report-format`, {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error("Error fetching projects.");
                const data = await response.json();
                setReportType(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchLanguage();
    }, []);

    const dataForReport = common_data?.data;

    const BranchInfo = JSON.parse(localStorage.getItem("current_role") || "{}");
    const isBranchAdmin = BranchInfo?.name === "Branch Admin";

    return (
        <>
            <h1 className="text-xl font-bold mb-4">PO Report</h1>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5">
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
                    {/* <div className="flex flex-col relative w-full">
                        <label htmlFor="batch" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                            {t("Show Target For")}<span className="required_field">*</span>
                        </label>
                        <select
                            value={selectedValue}
                            onChange={(e) => setSelectedValue(e.target.value)}
                            name="target"
                            className="border p-4 rounded appearance-none h-14"
                        >
                            <option value="">{t("Select")}</option>
                            <option value="PO">{t("PO")}</option>
                            <option value="Branch">{t("Branch")}</option>
                        </select>
                        <DropDownIcon />
                    </div> */}
                    {/* Target Type */}
                    <div className="flex flex-col relative w-full">
                        <label htmlFor="targetSelection" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                            {t("Target Type")}<span className="required_field">*</span>
                        </label>

                        <select
                            name="targetSelection"
                            className="border p-4 rounded appearance-none h-14"
                            value={selectedTarget}
                            onChange={(e) => setSelectedTarget(e.target.value)}
                            required
                        >
                            <option value="">{t("Select")}</option>
                            {isBranchAdmin ? (
                                <option value="Branch_Target">{t("Branch Target")}</option>
                            ) : (
                                <>
                                    <option value="PO_Target">{t("PO Target")}</option>
                                    <option value="Branch_Target">{t("Branch Target")}</option>
                                </>
                            )}
                        </select>

                        <DropDownIcon />
                    </div>

                    {/* Partner Organization */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                            {t("Partner Organization")}
                        </label>
                        <select
                            name='partnerOrganizationId'
                            value={selectedPo}
                            onChange={(e) => setSelectedPo(e.target.value)}
                            className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                        >
                            <option value="">{t("Select")}</option>
                            {po?.map((pos) => (
                                <option key={pos?.partnerId} value={pos?.partnerId}>
                                    {pos?.name || pos?.nameBn}
                                </option>
                            ))}
                        </select>
                        <DropDownIcon />
                    </div>

                    {/* Project */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                            {t("Project")}
                        </label>
                        <select
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                            name='projectId'
                            className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                        >
                            <option value="">{t("Select")}</option>
                            {project?.map((proj) => (
                                <option key={proj?.projectId} value={proj?.projectId}>
                                    {proj?.name}
                                </option>
                            ))}
                        </select>
                        <DropDownIcon />
                    </div>

                    {/* Branch */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                            {t("Branch")}
                        </label>
                        <select
                            value={selectedBranch}
                            onChange={(e) => setSelectedBranch(e.target.value)}
                            name='branchId'
                            className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                        >
                            <option value="">{t("Select")}</option>
                            {branch?.map((bran) => (
                                <option key={bran?.id} value={bran?.id}>
                                    {bran?.name}
                                </option>
                            ))}
                        </select>
                        <DropDownIcon />
                    </div>

                    {/* From Year */}
                    <div className="">
                        <label htmlFor="batch" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">{t("From Year")}<span className="required_field">*</span></label>
                        <input
                            type="number"
                            min={currentYear}
                            name="fromYear"
                            className="w-full border p-3.5 rounded"
                            onChange={(e) => handleYearChange('from', parseInt(e.target.value))}
                            required
                        />
                        {yearError && <div className="text-red-500 text-sm">{yearError}</div>}
                    </div>

                    {/* To Year */}
                    <div className="">
                        <label htmlFor="batch" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">{t("To Year")}<span className="required_field">*</span></label>
                        <input
                            type="number"
                            min={currentYear + 1}
                            name="toYear"
                            className="w-full border p-3.5 rounded"
                            onChange={(e) => handleYearChange('to', parseInt(e.target.value))}
                            required
                        />
                    </div>

                    {/* Report Type */}
                    <div className="flex flex-col relative w-full ">
                        <label htmlFor="batch" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                            {t("Report Type")}<span className="required_field">*</span>
                        </label>
                        <select
                            value={selectedReportType}
                            onChange={(e) => setSelectedReportType(e.target.value)}
                            name="reportType"
                            className="border p-4 rounded appearance-none h-14"
                        >
                            <option value="">{t("Select")}</option>
                            {reportType?.map((lang) => (
                                <option key={lang?.participantId} value={lang?.participantId}>
                                    {lang}
                                </option>
                            ))}
                        </select>
                        <DropDownIcon />
                    </div>

                    {/* <div className="flex flex-col relative w-full ">
                        <label htmlFor="batch" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                            {t("PO Target")}<span className="required_field">*</span>
                        </label>
                        <select
                            name="getPOTarget"
                            className="border p-4 rounded appearance-none h-14"
                        >
                            <option value="">{t("Select")}</option>
                            <option value="true">{t("Yes")}</option>
                        </select>
                        <DropDownIcon />
                    </div>

                    <div className="flex flex-col relative w-full ">
                        <label htmlFor="batch" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                            {t("Branch Target")}<span className="required_field">*</span>
                        </label>
                        <select
                            name="getBranchTarget"
                            className="border p-4 rounded appearance-none h-14"
                        >
                            <option value="">{t("Select")}</option>
                            <option value="true">{t("Yes")}</option>
                        </select>
                        <DropDownIcon />
                    </div> */}


                </div>

                <div className="my-5 rounded-2xl">
                    <ReportGenerate btn_type={"submit"} />
                </div>
                <div className="flex flex-row justify-start gap-2 items-center ">
                    {selectedReportType === "PDF" && common_data?.data && (
                        <div className="">
                            <TrainingReportPDF
                                dataForReport={dataForReport}
                                fromYear={fromYear}
                                toYear={toYear}
                                selectedTarget={selectedTarget}
                            />
                        </div>
                    )
                    }
                    {selectedReportType === "Excel" && common_data?.data && (
                        <div className="mt-5">
                            <button
                                type="button"
                                onClick={handleDownloadExcel}
                                className="bg-blue-500 text-white py-1 px-2.5 rounded hover:bg-blue-600 "
                            >
                                {t("Download Excel")}
                            </button>
                        </div>
                    )}
                </div>


            </form>
        </>
    );
};

export default POReport;
