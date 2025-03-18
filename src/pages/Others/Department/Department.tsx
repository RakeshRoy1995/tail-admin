import useFetch from "@/hooks/useFetch"
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb"
import AddButton from "@/shared/components/ButttonsCollection/AddButton"
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton"
import ActionButton from "@/shared/Table/ActionButton"
import Table from "@/shared/Table/Table"
import { col_value } from "@/shared/Table/utils"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { motion } from "framer-motion";
import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton"
import DropDownIcon from "@/shared/DropDownIcon/DropDownIcon"
import { useTranslation } from "react-i18next"
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const Department = () => {
    const { t } = useTranslation();
    const [render, setrender] = useState(true);
    const {
        data,
        loading,
        error,
        fetchData,
        deleteData,
        deleteMsg,
        common_data,
        fetchDataCommon,
        setcommon_Data,
        fetchSingleDataCommonByID,
        setsingleData,
        singleData,
        addFormShow,
        setaddFormShow,
    } = useFetch(`${API_URL}/department?currentPage=1&pageSize=500000`);



    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        let obj: any = {};
        for (const [key, value] of formData) {
            console.log(key, ":", value);
            obj = { ...obj, [key]: value };
        }

        let page_list = `${API_URL}/department`;
        let method = "POST";

        if (singleData?.deptId) {
            page_list = `${API_URL}/department/${singleData?.deptId}`;
            method = 'PUT'
        }
        const options = {
            method,
            data: obj,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        fetchDataCommon(page_list, options);
    };

    const fetchDataByID = async (id: any, type = "") => {
        setrender(false)
        // const form: any = document.querySelector("form");
        // form.reset();
        if (type == "edit") {
            const page_list = `${API_URL}/department/${id}`;
            const options = {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            fetchSingleDataCommonByID(page_list, options);
            setrender(true)
        }
        if (type == "delete") {
            const page_list = `${API_URL}/department/${id}`;
            deleteData(page_list);
        }
        setrender(true);
        setaddFormShow(true);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const fetchInitData = async () => {
        fetchData();
    };

    useEffect(() => {
        fetchInitData();
    }, []);

    useEffect(() => {
        if (common_data) {
            setaddFormShow(false);
            Swal.fire({
                icon: "success",
                text: "Success",
                confirmButtonText: "Close",
            });

            setcommon_Data(null);
            fetchData();
            setsingleData(null)
            const form: any = document.querySelector("form");
            form.reset();
        }

        if (error) {
            //show error message
            Swal.fire({
                icon: "error",
                text: error?.data?.message,
                confirmButtonText: "Close",
            });
        }
    }, [error?.data?.timestamp, common_data, error]);

    useEffect(() => {
        if (deleteMsg) {
            //show success message
            Swal.fire({
                icon: "success",
                text: "Delete Success",
                confirmButtonText: "Close",
            });
            setcommon_Data(null);
            fetchData();
        }
    }, [deleteMsg]);

    const column = [
        {
            name: t("Department Code"),
            selector: (row: any) => row.deptCode,
            sortable: true,

        },
        {
            name: t("Department Name"),
            selector: (row: any) => row.deptName,
            sortable: true,

        },
        {
            name: t("Status"),
            selector: (row: any) => row.deptRecStatus,
            cell: (row: any) => <>{col_value(row.deptRecStatus)}</>,
            conditionalCellStyles: [
                {
                    when: row => row.deptRecStatus == "A",
                    style: row => ({ color: "green" }),
                },

                {
                    when: row => row.deptRecStatus !== "A",
                    style: row => ({ color: "red" }),
                },
            ],
            sortable: true,
        },

        {
            name: t("action"),

            cell: (row: any) => <>{ActionButton(fetchDataByID, row.deptId)}</>,
        },
    ];

    const getheaderColor = (status: string) => {
        return status === "Active" ? "text-green-500" : "text-red-500";
    };

    return (
        <>


            {addFormShow ? (
                <Breadcrumb name1={t("Department")} name2={t("Department Setup")} />
            ) : (
                <BreadcumbWithButton
                    name={t("Department")}
                    url={"#"}
                    setaddFormShow={setaddFormShow}
                />
            )}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {addFormShow && (
                    <form action="submit" onSubmit={handleSubmit}>
                        <input type="hidden" name="deptId" value={singleData?.deptId} />
                        <div className="bg-white rounded-xl shadow-md p-10">

                            {/* <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-5 relative">
                    </div> */}

                            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-5">

                                {/* deptName */}
                                <div className="flex flex-col relative mb-5">
                                    <label
                                        htmlFor="projectName"
                                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                                    >
                                        {t("Department Name")}<span className="required_field">*</span>
                                    </label>
                                    <input
                                        required
                                        id="assessmentTypeName"
                                        name="deptName"
                                        type="text"
                                        placeholder={t("Write Department Name here")}
                                        className="border p-4 rounded-md h-14 text-sm w-full "
                                        defaultValue={singleData?.deptName}
                                        maxLength={50}
                                    />
                                </div>

                                {/* deptCode */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                                        {t("Department Code")}<span className="required_field">*</span>
                                    </label>
                                    {/* <select
                                    name="deptCode"
                                    className="w-full border p-4 rounded  h-14 appearance-none"
                                >
                                    <option value="">N/A</option>
                                    {assessmentType?.map(option => (
                                        <option key={option} value={option} selected={singleData?.deptCode === option}>
                                            {option}
                                        </option>
                                    ))}
                                </select> */}
                                    <input
                                        required
                                        id="deptCode"
                                        name="deptCode"
                                        type="text"
                                        placeholder={t("Write Department Code here")}
                                        className="border p-4 rounded-md h-14 text-sm w-full "
                                        defaultValue={singleData?.deptCode}
                                        maxLength={50}
                                    />
                                </div>

                                {/* Status */}
                                <div className="flex flex-col justify-between relative">
                                    <label htmlFor="status" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">{t("Status")}<span className="required_field">*</span></label>
                                    <div>
                                        <select required
                                            name="deptRecStatus"
                                            id="status"
                                            className="w-full border p-4 rounded appearance-none h-14"
                                        >
                                            <option value="" disabled>Select</option>
                                            <option value="A" selected={singleData?.deptRecStatus == "A"}>{t("Active")} </option>
                                            <option value="I" selected={singleData?.deptRecStatus == "I"}>{t("Inactive")}</option>
                                        </select>
                                    </div>
                                    <DropDownIcon/>
                                </div>

                            </div>

                            <div className="flex justify-end gap-4 mt-10">
                                {singleData ? <UpdateButton setsingleData={setsingleData} loading={loading} setaddFormShow={setaddFormShow}/> : <AddButton setsingleData={setsingleData} loading={loading} setaddFormShow={setaddFormShow}/>}
                            </div>
                        </div>
                    </form>
                )}
                <div className="bg-white rounded-xl shadow-md p-10 mt-5">
                    <Table rows={data?.content || []} column={column} getheaderColor={getheaderColor} />
                </div>
            </motion.div>

        </>
    )
}

export default Department