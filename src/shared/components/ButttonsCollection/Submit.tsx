import { useTranslation } from "react-i18next";

const Submit = () => {
    const { t } = useTranslation();
    return (
        <div className="flex justify-end items-end mt-5">

            <button className="bg-primaryColor font-bold text-sm text-white rounded-lg px-5 py-3 flex justify-center items-center gap-2 ">
                {t("Submit")}
            </button>
        </div>
    )
}

export default Submit