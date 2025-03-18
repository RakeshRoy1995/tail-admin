import { useEffect, useState } from "react";
import cardImage from "../../../assets/main page/demopic.png";
import { Modal, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { submitFormData } from "@/api/Reqest";
import useFetch from "@/hooks/useFetch";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { calculateAge, customeMaxLength } from "@/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropDownIcon from "@/shared/DropDownIcon/DropDownIcon";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const OutreachCardsApply = () => {
  const { id } = useParams();
  const { error, common_data, fetchDataCommon, setcommon_Data, singleData } =
    useFetch(`${API_URL}/call-for-application`);

  const [open, setOpen] = useState(false);
  const [criteria, setcriteria] = useState([]);
  const [Component, setComponent] = useState([]);
  const [PO, setPO] = useState([]);
  const [DOB, setDOB] = useState(null);
  const [data, setdata] = useState<any>({});
  const [projectName, setprojectName] = useState("");
  const [banchName, setbanchName] = useState("");
  const [PO_name, setPO_name] = useState<any>("");
  const [age, setage] = useState<any>("");
  // component wise eligibility
  const [cweligibility, setCweligibility] = useState<any>([]);
  const [selectedComponent, setselectedComponent] = useState("")
  const navigate = useNavigate();

  const [_project, set_project] = useState([]);
  const [Branch, setBranch] = useState([]);
  const [checkObj, setcheckObj] = useState<any>({});
  const [checkCiteria, setcheckCiteria] = useState<any>({});

  const getOutreachProgramme = async (id: any) => {
    // project Organization
    const page_list = `${API_URL}/availableOutreachProgram/getDetails/${id}`;
    const { data }: any = await submitFormData(page_list, {});
    setdata(data);

    const page_list_project = `${API_URL}/project?currentPage=1&pageSize=5000`;
    const page_list_project_data: any = await submitFormData(
      page_list_project,
      {},
    );

    const _project = page_list_project_data?.data?.content;
    set_project(_project);

    const projectName = _project?.find(
      (d: any) => d?.projectId == data?.projectId,
    );


    const page_list_branch = `${API_URL}/branch?currentPage=1&pageSize=10000`;
    const branch_data: any = await submitFormData(page_list_branch, {});

    const Branch = branch_data?.data?.content;
    setBranch(Branch);

    const branchName = Branch.find((d: any) => d?.id == data?.branchId);

    const page_list_PO = `${API_URL}/partner-organization?currentPage=1&pageSize=1000`;
    const PO_data: any = await submitFormData(page_list_PO, {});

    const PO = PO_data?.data?.content;
    setBranch(PO);

    const POname = PO?.find(
      (d: any) => d?.partnerId == data?.partnerOrganizationId,
    );
    setprojectName(projectName?.name);
    setbanchName(branchName?.name);
    setPO_name(POname?.nameBn);
  };

  // Function to handle closing modal
  const handleClose = () => setOpen(false);

  const SelectprojectId = data?.projectId

  const fetchComponent = async (id) => {
    // partner Organization
    const page_list = `${API_URL}/project/component/by/project/${id}`;
    console.log(page_list)
    const { data }: any = await submitFormData(page_list, {});
    setComponent(data);
  };

  //fetch  compoent wise eligibility id
  useEffect(() => {
    const fetchCWEligibility = async () => {
      if (selectedComponent) {
        try {
          console.log(selectedComponent)
          const response = await fetch(`${API_URL}/component-eligibility/getByComponentId/${selectedComponent}`, {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          // Check if the response is OK
          if (!response.ok) {
            throw new Error("Error fetching projects.");
          }
          const data = await response.json();
          console.log(data)
          const selectedEligibility = data?.eligibility?.filter(item => item?.isSelected);
          console.log(selectedEligibility)
          setCweligibility(selectedEligibility)

        } catch (error) {
          console.error("Fetch cweligibility error:", error.message);
        }
      } else {
        setComponent([])
      }
    };
    fetchCWEligibility();
  }, [selectedComponent]);


  // fetch po
  const fetchPO = async () => {
    // partner Organization
    const page_list = `${API_URL}/partner-organization?currentPage=1&pageSize=1000&recordStatus=A`;
    const { data }: any = await submitFormData(page_list, {});
    setPO(data?.content);
  };

  useEffect(() => {
    getOutreachProgramme(id);
    fetchComponent(SelectprojectId);
    fetchPO();
  }, [SelectprojectId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};
    for (const [key, value] of formData) {
      console.log(key, ":", value);
      obj = { ...obj, [key]: value };
    }
    const arr = Object.values(obj);
    const critariaAyy = cweligibility?.map((data: any) => {
      let obj = {};


      if (arr.includes(data?.eligibilityName)) {
        obj = {
          criteriaName: data?.eligibilityName,
          isCriteriaTrue: true,
        };

        return obj;
      } else {
        obj = {
          criteriaName: data?.eligibilityName,
          isCriteriaTrue: false,
        };

        return obj;
      }
    });


    console.log("ggg", cweligibility);


    obj.cfpCriteria = critariaAyy;
    obj.isApplicantExists = false;
    obj.location = {
      divisionId: "1",
      districtId: "1",
      upazilaId: "1",
      pourasabhaId: "1",
      unionId: "9",
      villageId: "3",
      wardId: "2",
    };

    // obj.location = {};

    const page_list = `${API_URL}/application-submission`;
    const method = "POST";

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

  const applicantsExist = async () => {
    // partner Organization
    const page_list = `${API_URL}/partner-organization?currentPage=1&pageSize=1000&recordStatus=A`;
    const { data }: any = await submitFormData(page_list, {});
    setPO(data?.content);
  };

  useEffect(() => {
    if (common_data) {
      //show success message
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonText: "বন্ধ করুন",
      });
      setcommon_Data(null);
      navigate("/");


      //   fetchData();
    }

    if (error) {
      //show error message
      Swal.fire({
        icon: "error",
        text: error?.data?.message,
        confirmButtonText: "বন্ধ করুন",
      });
    }
  }, [error?.data?.timestamp, common_data, error]);

  useEffect(() => {
    if (checkObj?.cfpDateOfBirth) {
      const age = calculateAge(checkObj?.cfpDateOfBirth);
      setage(age);
    }
  }, [checkObj, checkCiteria]);

  return (
    <div className="flex items-stretch gap-5 m-10 ">
      {/* card */}
      <div className=" w-1/2 rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200 p-6">
        {/* Image */}
        <img
          className="w-full rounded-lg"
          src={cardImage}
          alt="Training group"
        />

        {/* Content */}
        <div className="text-xs font-normal m-4">
          <div className="leading-loose">
            <p>
              {" "}
              <b>Outreach Name:</b> {data?.outreachProgramName}{" "}
            </p>
            <p>
              {" "}
              <b>Outreach Code:</b> {data?.outreachProgramCode}
            </p>
            <p>
              {" "}
              <b>Project:</b> {projectName || ""}
            </p>
            <p>
              {" "}
              <b>Partner Organization:</b> {PO_name || ""}
            </p>
            <p>
              {" "}
              <b>Branch:</b> {banchName || ""}
            </p>
            <p>
              {" "}
              <b>Venue:</b> {data?.venue || ""}
            </p>
            <p>
              {" "}
              <b>From Date:</b> {data?.fromDate}{" "}
            </p>
            <p>
              {" "}
              <b>To Date:</b> {data?.toDate}
            </p>
            <p>
              <b>Training: </b>
              {data?.trainingName?.length > 0 ? (
                data.trainingName.map((training: string, index: number) => (
                  <span key={index}>{training}{index < data.trainingName.length - 1 ? ', ' : ''}</span>
                ))
              ) : (
                "No training available"
              )}
            </p>

            {/* <p>
              {" "}
              <b>Eligibility Criteria:</b>{" "}
            </p>
            {data?.eligibilityCriteria?.map((el: any, key: number) => (
              <p key={key}>
                {key + 1}. {el?.eligibilityQuestion}
              </p>
            ))} */}
          </div>
        </div>
        {/* Button to open modal */}
      </div>

      <form
        action="submit"
        className="p-4 space-y-6 shadow-lg rounded-xl bg-white w-full"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="callForApplicationId" value={"0"} />
        <div className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div className="flex flex-col relative">
            <label
              htmlFor="cfpFirstName"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              First Name<span className="required_field">*</span>
            </label>
            <input
              required
              maxLength={50}
              name="cfpFirstName"
              id="cfpFirstName"
              defaultValue={singleData?.cfpFirstName}
              type="text"
              placeholder="First Name here"
              className="border p-4 rounded h-14"
            />
          </div>
          {/* Last Name */}
          <div className="flex flex-col relative">
            <label
              htmlFor="cfpLastName"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Last Name<span className="required_field">*</span>
            </label>
            <input
              required
              maxLength={50}
              name="cfpLastName"
              id="cfpLastName"
              defaultValue={singleData?.cfpLastName}
              type="text"
              placeholder="Last Name here"
              className="border p-4 rounded h-14"
            />
          </div>
          {/*NID  */}
          <div className="flex flex-col relative">
            <label
              htmlFor="cfpNid"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              NID<span className="required_field">*</span>
            </label>
            <input
              required

              onInput={(e) => {
                customeMaxLength(e, 17);
              }}
              name="cfpNid"
              id="cfpNid"
              onChange={(e) =>
                setcheckObj({ ...checkObj, [e.target.name]: e.target.value })
              }
              defaultValue={singleData?.cfpNid}
              type="number"
              placeholder="Nid here"
              className="border p-4 rounded h-14"
            />
          </div>

          {/* dob */}
          <div className="flex flex-col relative w-full">
            <label className="z-10 text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">Date of Birth<span className="required_field">*</span>
            </label>
            <DatePicker
              name="cfpDateOfBirth"
              // selected={DOB}
              selected={checkObj?.cfpDateOfBirth ? new Date(checkObj?.cfpDateOfBirth) : null}
              onChange={(date: any) => {
                // setDOB(date);
                setcheckObj({ ...checkObj, cfpDateOfBirth: date })
              }}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              className="w-full border p-4 rounded h-14 text-lg relative "
              required
              onKeyDown={(e) => e.preventDefault()}
            />
          </div>
          {/* gender */}
          <div className="flex flex-col justify-between relative">
            <label
              htmlFor="cfpGender"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Gender<span className="required_field">*</span>
            </label>
            <div>
              <select
                required
                name="cfpGender"
                id="cfpGender"
                value={singleData?.cfpGender}
                className="w-full border p-4 rounded appearance-none h-14"
              >
                <option value="">Select</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="THIRD">Other</option>
              </select>
            </div>
            <DropDownIcon />
          </div>
          {/* age */}
          <div className="flex flex-col relative">
            <label
              htmlFor="cfpAge"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Age<span className="required_field">*</span>
            </label>
            <input
              required
              maxLength={50}
              name="cfpAge"
              id="cfpAge"
              value={age}
              type="text"
              placeholder="Age"
              className="border p-4 rounded h-14"
            />
          </div>
          {/* Father's Name */}
          <div className="flex flex-col relative">
            <label
              htmlFor="FatherName"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Father's Name<span className="required_field">*</span>
            </label>
            <input
              required
              maxLength={50}
              name="cfpFatherName"
              id="FatherName"
              defaultValue={singleData?.cfpFatherName}
              type="text"
              placeholder="Write Father Name here"
              className="border p-4 rounded h-14"
            />
          </div>
          {/* Mobile No. */}
          <div className="flex flex-col relative">
            <label
              htmlFor="cfpMobileNo"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Mobile No.<span className="required_field">*</span>
            </label>
            <input
              required
              maxLength={11}
              name="cfpMobileNo"
              id="cfpMobileNo"
              onChange={(e) =>
                setcheckObj({ ...checkObj, [e.target.name]: e.target.value })
              }
              onInput={(e) => {
                customeMaxLength(e, 13);
              }}
              defaultValue={singleData?.cfpMobileNo}
              type="tel"
              placeholder="Mobile no here"
              className="border p-4 rounded h-14"
            />
          </div>
          {/* Academic Qualification */}
          <div className="flex flex-col justify-between relative">
            <label
              htmlFor="cfpQualification"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Academic Qualification<span className="required_field">*</span>
            </label>
            <div>
              <select
                required
                name="cfpQualification"
                id="cfpQualification"
                value={singleData?.cfpQualification}
                className="w-full border p-4 rounded appearance-none h-14"
              >
                <option value="">Select</option>
                <option value="Uneducated">Uneducated</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 8">Class 8</option>
                <option value="SSC">SSC</option>
                <option value="HSC">HSC</option>
                <option value="Honours">Honours</option>
                <option value="Bachelor">BACHELOR</option>
                <option value="Masters">MASTERS</option>

                <option value="PhD">PhD</option>
              </select>
              <DropDownIcon />
            </div>
          </div>
          {/* Component */}
          <div className="flex flex-col justify-between relative">
            <label
              htmlFor="cfpComponentId"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Component<span className="required_field">*</span>
            </label>
            <div>
              <select
                required
                name="cfpComponentId"
                id="cfpComponentId"
                // value={singleData?.cfpComponentId}
                className="w-full border p-4 rounded appearance-none h-14"
                value={selectedComponent}
                onChange={(e) => setselectedComponent(e.target.value)}
              >
                <option value="">Select</option>
                {Component?.map((cmd: any) => (
                  <option key={cmd?.componentId} value={cmd?.componentId}>{cmd?.componentName}</option>
                ))}
              </select>
              <DropDownIcon />
            </div>
          </div>

          <input type="hidden" name="cfpProjectId" value={data?.projectId} />
          <input
            type="hidden"
            name="cfpPartnerOrganizationId"
            value={data?.partnerOrganizationId}
          />
          <input type="hidden" name="cfpBranchId" value={data?.branchId} />
          <input
            type="hidden"
            name="cfpOutreachProgramId"
            value={data?.outreachProgramId}
          />
          <input type="hidden" name="cfpRecStatus" value={"A"} />
        </div>
        <div className="mt-5  border-2 border-gray-100 p-2 rounded-xl">
          <label className="space-y-6">Eligibility Criteria: </label>
          {cweligibility?.map((c_data: any) => (
            <>
              <div className=" ">
                <p className="space-y-1">{c_data?.eligibilityName}</p>
                <div className="flex ">
                  <label className="flex items-center">
                    <input
                      onClick={(e: any) =>
                        setcheckCiteria({
                          ...checkCiteria,
                          [e.target.name]: e.target.checked,
                        })
                      }
                      value={c_data?.eligibilityName}
                      name={c_data?.eligibilityName}
                      id="mcpHasRelevantCertification"
                      type="checkbox"
                      className="mr-2 " // Use a custom class
                    />
                    Yes
                  </label>
                </div>

              </div>
            </>
          ))}
        </div>
        {cweligibility?.length == Object.values(checkCiteria)?.length && (
          <div className="flex justify-end">
            <button className="text-sm  font-bold bg-primaryColor text-white  rounded-full px-6 py-3">
              Apply
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default OutreachCardsApply;
