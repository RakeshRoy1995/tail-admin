import { useEffect, useState } from "react";
import {
  getCityCorpData,
} from "@/api/Reqest";
import { useTranslation } from "react-i18next";

export default function Location({ singleData }: any) {
  const [divisions, setDivisions] = useState<any>([]);
  const [districts, setdistricts] = useState<any>([]);
  const [upazila, setupazila] = useState<any>([]);
  const [union, setunion] = useState<any>([]);
  const [cityCorp, setCityCorp] = useState<any>([]);
  const [error, setError] = useState<any | null>(null);
  const [selectedType, setSelectedType] = useState("Upazila");
  const { t } = useTranslation();
  useEffect(() => {
    const allDivision = JSON.parse(localStorage.getItem("division_list"));
    setDivisions(allDivision);
    getDistrict(singleData?.location?.divisionId    )
    getUpazilla(singleData?.location?.districtId    )
    getUnion(singleData?.location?.upazilaId    )
  }, [singleData?.location]);

  const getDistrict = (divisionId: any) => {
    const allDivision = JSON.parse(localStorage.getItem("district_list"));
    const all_district = allDivision?.filter(
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
    // getUnionData(upazilaId)
    //   .then((data) => {
    //     setunion(data); // Store the fetched data in state
    //   })
    //   .catch((err) => {
    //     setError("Error fetching data");
    //     console.error(err);
    //   });
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
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {/* Division */}
      <div className="relative">
      <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
        {t("Division")}<span className="required_field">*</span>
      </label>
      <select
        required
        className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
        name="location.divisionId"
        onChange={(e) => {
        // setSelectedDivision(e.target.value);
        getDistrict(e.target.value);
        }}
      >
        <option value={""}>{t("Select")}</option>
        {divisions?.map((division) => (
        <option key={division?.id} value={division?.id} selected={division?.id == singleData?.location?.divisionId }>
          {division?.name || division?.nameBn}
        </option>
        ))}
      </select>
      </div>

      {/* District */}
      <div className="relative">
      <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
        {t("District")}<span className="required_field">*</span>
      </label>
      <select
        required
        className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
        id="districtId"
        name="location.districtId"
        onChange={(e) => {
        // setSelectedDistrict(e.target.value);
        getUpazilla(e.target.value);
        getCityCorp(e.target.value);
        }}
      >
        <option value={""}>{t("Select")}</option>
        {districts?.map((district) => (
        <option key={district?.id} value={district?.id} selected={district?.id == singleData?.location?.districtId }>
          {district?.name || district?.nameBn}
        </option>
        ))}
      </select>
      </div>

      {/* Upazila/City Corporation Selection */}
      <div className="relative">
      <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
        {t("Type")}<span className="required_field">*</span>
      </label>
      <select
        required
        className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
        value={selectedType}
        onChange={handleTypeChange}
      >
        <option value="">{t("Select")}</option>
        <option value="Upazila">{t("Upazila")}</option>
        <option value="City Corporation">{t("City Corporation")}</option>
      </select>
      </div>

      {/* Conditionally Render Fields Based on Selection */}
      {selectedType === "Upazila" ? (
      <>
        {/* Upazila */}
        <div className="relative">
        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
          {t("Upazila")}<span className="required_field">*</span>
        </label>
        <select
          required
          className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
          name="location.upazilaId"
          onChange={(e) => getUnion(e.target.value)}
        >
          <option value={""}>{t("Select")}</option>
          {upazila?.map((upazila) => (
          <option key={upazila?.id} value={upazila?.id} selected={upazila?.id == singleData?.location?.upazilaId }>
            {upazila?.name || upazila?.nameBn}
          </option>
          ))}
        </select>
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
          defaultValue={singleData?.location?.address}
          name="location.address"
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
          name="location.cityCorporationId"
          // onChange={(e) => getUnion(e.target.value)}
        >
          <option value={""}>{t("Select City Corporation")}</option>
          {cityCorp?.map((cityCorp) => (
          <option key={cityCorp?.id} value={cityCorp?.id}>
            {cityCorp?.name || cityCorp?.nameBn}
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
          name="location.postCode"
          defaultValue={singleData?.location?.postCode}
          className="rounded-md h-14 text-sm mt-1 block w-full p-5 border border-gray-300 shadow-sm appearance-none"
        />
        </div>

        {/* Ward No. */}
        <div className="relative">
        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
          {t("Ward No.")}
        </label>
        <input
          id="wardId"
          type="text"
          placeholder={t("Ward")}
          name="location.wardId"
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
          placeholder={t("Address here")}
          name="location.address"
          defaultValue={singleData?.location?.address}
          className="rounded-md h-14 text-sm mt-1 block w-full p-5 border border-gray-300 shadow-sm appearance-none"
        />
        </div>
      </>
      )}
    </div>
  );
}
