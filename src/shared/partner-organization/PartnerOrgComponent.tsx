import React from "react";

export default function PartnerOrgComponent({
  name,
  singleData,
  setsingleData,
  value,
  func,
}: any) {
  const authToken = localStorage.getItem("customer_login_auth") || "";

  const token: any = authToken ? JSON.parse(authToken) : "";

  const org_level_ = localStorage.getItem("org_level") || "";

  const org_level: any = authToken ? JSON.parse(org_level_) : [];

  const organizationType = token.user?.organizationType;

  const layer =
    organizationType == "PMU"
      ? 3
      : organizationType == "PO"
        ? 2
        : organizationType == "BRANCH"
          ? 1
          : 3;

  return (
    <select
      name={name}
      value={value}
      className="border w-full p-4 rounded-md h-14 text-sm appearance-none"
      onChange={(e) => {
        if (func) {
          func(e);
        } else {
          setsingleData({
            ...singleData,
            [e.target.name]: e.target.value,
          });
        }
      }}
    >
      {org_level.map((org: any) => (
        <> 
        {layer > 2 && org.orgLevelId == 1 && <option value={org?.orgLevelId}>{org?.orgLevelName}</option>}
        {layer > 1 && org.orgLevelId == 2 && <option value={org?.orgLevelId}>{org?.orgLevelName}</option>}
        {layer > 0 && org.orgLevelId == 4 && <option value={org?.orgLevelId}>{org?.orgLevelName}</option>}
        </>
      ))}

      {/* {layer > 2 && <option value={"PMU"}>PMU</option>}
      {layer > 1 && <option value={"PO"}>PO</option>}
      {layer > 0 && <option value={"BRANCH"}>BRANCH</option>} */}
      {/* {layer > 2 && <option value={"TRAINER"}>TRAINER</option>}
      {layer > 2 && <option value={"TRAINEE"}>TRAINEE</option>} */}
    </select>
  );
}
