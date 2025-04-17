import { useTranslation } from "react-i18next";
import ResetButton from "./CancelButton"


const UpdateButton = ({setsingleData, loading , setaddFormShow}:any) => {
      const { t } = useTranslation();
    return (
        <>
            <div className="d-flex justify-content-end gap-1">
                <div><ResetButton setsingleData={setsingleData} setaddFormShow={setaddFormShow} /></div>
                <div className="d-flex justify-content-end ">
                    <button disabled={loading} className="bg-primary font-bold text-sm text-white rounded-lg px-4 py-3 flex justify-content-end items-center gap-1">
                       {t("Update")} {loading ? "...": ""}
                    </button>
                </div>

            </div>
        </>
    )
}

export default UpdateButton