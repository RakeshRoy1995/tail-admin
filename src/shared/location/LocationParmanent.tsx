import { useEffect, useState } from "react";
import { getCityCorpData, getUnionData } from "@/api/Reqest";
import { useTranslation } from "react-i18next";

export default function LocationParmanent({ singleData, setsingleData }: any) {
  const [divisions, setDivisions] = useState<any>([]);
  const [districts, setdistricts] = useState<any>([]);
  const [upazila, setupazila] = useState<any>([]);
  const [union, setunion] = useState<any>([]);
  const [cityCorp, setCityCorp] = useState<any>([]);
  const [error, setError] = useState<any | null>(null);
  const [selectedType, setSelectedType] = useState("Upazila");
    const { t } = useTranslation();
  const divisionId =
    singleData?.parmanent_divisionId ||
    singleData?.location?.divisionId ||
    singleData?.personal_info?.permanentAddress?.divisionId ||
    singleData?.permanentAddress?.divisionId;

  const districtId =
    singleData?.parmanent_districtId ||
    singleData?.location?.districtId ||
    singleData?.personal_info?.permanentAddress?.districtId ||
    singleData?.permanentAddress?.districtId;

  const upazilaId =
    singleData?.parmanent_upazilaId ||
    singleData?.location?.upazilaId ||
    singleData?.personal_info?.permanentAddress?.upazilaId ||
    singleData?.permanentAddress?.upazilaId;

  const villageName =
    singleData?.parmanent_villageName ||
    singleData?.location?.villageName ||
    singleData?.personal_info?.permanentAddress?.villageName ||
    singleData?.permanentAddress?.villageName;

  const cityCorporationId =
    singleData?.parmanent_cityCorporationId ||
    singleData?.location?.cityCorporationId ||
    singleData?.personal_info?.permanentAddress?.cityCorporationId ||
    singleData?.permanentAddress?.cityCorporationId;

  const postCode =
    singleData?.parmanent_postCode ||
    singleData?.location?.postCode ||
    singleData?.personal_info?.permanentAddress?.postCode ||
    singleData?.permanentAddress?.postCode;

  const address =
    singleData?.parmanent_address ||
    singleData?.location?.address ||
    singleData?.personal_info?.permanentAddress?.address ||
    singleData?.permanentAddress?.address;

  const wardName =
    singleData?.parmanent_wardName ||
    singleData?.location?.wardName ||
    singleData?.personal_info?.permanentAddress?.wardName ||
    singleData?.permanentAddress?.wardName;
  useEffect(() => {
    const allDivision = JSON.parse(localStorage.getItem("division_list"));

    setDivisions(allDivision);
    getDistrict(divisionId);
    getUpazilla(districtId);

    if (divisionId) {
      const objLoc = {
        ["parmanent_divisionId"]: divisionId,
        ["parmanent_districtId"]: districtId,
        ["parmanent_upazilaId"]: upazilaId,
        ["parmanent_villageName"]: villageName,
        ["parmanent_cityCorporationId"]: cityCorporationId,
        ["parmanent_postCode"]: postCode,
        ["parmanent_address"]: address,
        ["parmanent_wardName"]: wardName,
      };

      const final_obj = {
        ...singleData,
        ...objLoc,
      };
      setsingleData({ ...final_obj });
    }
  }, [divisionId]);

  const getDistrict = (divisionId: any) => {
    const allDivision = JSON.parse(localStorage.getItem("district_list"));
    const all_district = allDivision.filter(
      (d: any) => d.divisionId == divisionId,
    );
    setdistricts(all_district);
  };

  const getUpazilla = (districtId: any) => {
    const allDivision = JSON.parse(localStorage.getItem("upazila_list"));
    const all_district = allDivision.filter(
      (d: any) => d.districtId == districtId,
    );
    setupazila(all_district);
  };

  const getUnion = (upazilaId: any) => {
    // setUpazillaId(selectedDistrict);
    getUnionData(upazilaId)
      .then((data) => {
        setunion(data); // Store the fetched data in state
      })
      .catch((err) => {
        setError("Error fetching data");
        console.error(err);
      });
  };

  const getCityCorp = (districtId: any) => {
    // setUpazillaId(selectedDistrict);
    getCityCorpData(districtId)
      .then((data) => {
        setCityCorp(data); // Store the fetched data in state
      })
      .catch((err) => {
        setError("Error fetching data");
        console.error(err);
      });
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-5">
      {/* Division */}
      <div className="relative">
      <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
        {t("Division")}
      </label>
      <select
        required
        className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
        name="parmanent_divisionId"
        value={divisionId}
        onChange={(e) => {
        setsingleData({ ...singleData, [e.target.name]: e.target.value });
        // setSelectedDivision(e.target.value);
        getDistrict(e.target.value);
        }}
      >
        <option value={""}>{t("Select")}</option>
        {divisions?.map((division) => (
        <option key={division?.id} value={division?.id}>
          {division?.name}
        </option>
        ))}
      </select>
      </div>

      {/* District */}
      <div className="relative">
      <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
        {t("District")}
      </label>
      <select
        required
        className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
        id="districtId"
        name="parmanent_districtId"
        value={districtId}
        onChange={(e) => {
        setsingleData({ ...singleData, [e.target.name]: e.target.value });
        getUpazilla(e.target.value);
        getCityCorp(e.target.value);
        }}
      >
        <option value={""}>{t("Select")}</option>
        {districts?.map((district) => (
        <option key={district?.id} value={district?.id}>
          {district?.name}
        </option>
        ))}
      </select>
      </div>

      {/* Upazila/City Corporation Selection */}
      <div className="relative">
      <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
        {t("Type")}
      </label>
      <select
        required
        className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
        // value={selectedType}
        onChange={handleTypeChange}
      >
        <option value="">{t("Select")}</option>
        <option
        value="Upazila"
        selected={selectedType == "Upazila" || upazilaId}
        >
        {t("Upazila")}
        </option>
        <option
        value="City Corporation"
        selected={selectedType == "City Corporation" || cityCorporationId}
        >
        {t("City Corporation")}
        </option>
      </select>
      </div>

      {/* Conditionally Render Fields Based on Selection */}
      {selectedType === "Upazila" || upazilaId ? (
      <>
        {/* Upazila */}
        <div className="relative">
        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
          {t("Upazila")}
        </label>
        <select
          required
          className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
          name="parmanent_upazilaId"
          value={upazilaId}
          onChange={(e) => {
          setsingleData({
            ...singleData,
            [e.target.name]: e.target.value,
          });
          getUnion(e.target.value);
          }}
        >
          <option value={""}>{t("Select")}</option>
          {upazila?.map((upazila) => (
          <option key={upazila?.id} value={upazila?.id}>
            {upazila?.name}
          </option>
          ))}
        </select>
        </div>

        {/* postCode */}
        <div className="relative">
        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
          {t("Post Code")}
        </label>

        <input
          id="postCode"
          type="text"
          placeholder={t("postal Code")}
          name="parmanent_postCode"
          value={postCode}
          onChange={(e) => {
          setsingleData({
            ...singleData,
            [e.target.name]: e.target.value,
          });
          }}
          className="rounded-md h-14 text-sm mt-1 block w-full p-5 border border-gray-300 shadow-sm appearance-none"
        />
        </div>

        {/* Address */}
        <div className="relative">
        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
          {t("Address")}
        </label>

        <input
          id="address"
          type="text"
          placeholder={t("Write Address here")}
          defaultValue={address}
          onChange={(e) => {
          setsingleData({
            ...singleData,
            [e.target.name]: e.target.value,
          });
          }}
          name="parmanent_address"
          className="rounded-md h-14 text-sm mt-1 block w-full p-5 border border-gray-300 shadow-sm appearance-none"
        />
        </div>
      </>
      ) : (
      <>
        {/* City Corporation */}
        <div className="relative">
        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
          {t("City Corporation")}
        </label>
        <select
          className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
          name="parmanent_cityCorporationId"
          value={cityCorporationId}
          onChange={(e) => {
          setsingleData({
            ...singleData,
            [e.target.name]: e.target.value,
          });
          }}
        >
          <option value={""}>{t("Select City Corporation")}</option>
          {cityCorp?.map((cityCorp) => (
          <option key={cityCorp?.id} value={cityCorp?.id}>
            {cityCorp?.name}
          </option>
          ))}
        </select>
        </div>

        {/* postCode */}
        <div className="relative">
        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
          {t("Post Code")}
        </label>

        <input
          id="postCode"
          type="text"
          placeholder={t("postal Code")}
          name="parmanent_postCode"
          value={postCode}
          onChange={(e) => {
          setsingleData({
            ...singleData,
            [e.target.name]: e.target.value,
          });
          }}
          className="rounded-md h-14 text-sm mt-1 block w-full p-5 border border-gray-300 shadow-sm appearance-none"
        />
        </div>

        {/* Ward No. */}
        <div className="relative">
        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
          {t("Ward No.")}
        </label>
        <input
          id="wardName"
          type="text"
          value={wardName}
          onChange={(e) => {
          setsingleData({
            ...singleData,
            [e.target.name]: e.target.value,
          });
          }}
          placeholder={t("Ward")}
          name="parmanent_wardName"
          className="rounded-md h-14 text-sm mt-1 block w-full p-5 border border-gray-300 shadow-sm appearance-none"
        />
        </div>
        {/* Address */}
        <div className="relative">
        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
          {t("Address")}
        </label>

        <input
          id="address"
          type="text"
          placeholder={t("Write Address here")}
          name="parmanent_address"
          value={address}
          onChange={(e) => {
          setsingleData({
            ...singleData,
            [e.target.name]: e.target.value,
          });
          }}
          className="rounded-md h-14 text-sm mt-1 block w-full p-5 border border-gray-300 shadow-sm appearance-none"
        />
        </div>
      </>
      )}
    </div>
  );
}
