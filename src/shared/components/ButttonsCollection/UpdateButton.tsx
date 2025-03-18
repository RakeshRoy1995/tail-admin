import { useTranslation } from "react-i18next";
import ResetButton from "./CancelButton"


const UpdateButton = ({setsingleData, loading , setaddFormShow}:any) => {
      const { t } = useTranslation();
    return (
        <>
            <div className="flex justify-end gap-5">
                <div><ResetButton setsingleData={setsingleData} setaddFormShow={setaddFormShow} /></div>
                <div className="flex justify-end mt-5">
                    <button disabled={loading} className="bg-primaryColor font-bold text-sm text-white rounded-lg px-4 py-3 flex justify-center items-center gap-1">
                       {t("Update")} {loading ? "...": ""}
                    </button>
                </div>

            </div>
        </>
    )
}

export default UpdateButton