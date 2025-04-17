import { accessPermission } from "@/utils";
import ResetButton from "./CancelButton"
import SendForApprovalButton from "./SendForApprovalButton";
import { useTranslation } from "react-i18next";

const AddButton = ({setsingleData, loading, setaddFormShow}:any) => {
  const data: any = accessPermission();

  const tmpAddBtn = data?.permission?.find(
    (d: any) => d.name == "Create" && d.method == "POST",
  );

  const addButton = tmpAddBtn?.checked == false ? false : true;

  return (
    <>
      {addButton && (
        <div className="d-flex justify-content-end gap-1">
          {/* cancel btn */}
          <ResetButton setsingleData={setsingleData} setaddFormShow={setaddFormShow} />
          {/* add btn */}
          <SendForApprovalButton loading={loading} />
        </div>
      )}
    </>
  );
};

export default AddButton;
