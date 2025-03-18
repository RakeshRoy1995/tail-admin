import { get_all_data } from "@/api/Reqest";
import { useTranslation } from "react-i18next";

const SearchBtn = ({ params, apiEndPoint, setsearchData, btn_type }: any) => {

  const search_api = async (apiEndPoint, params: any) => {
    setsearchData([])
    const response_ministry_List: any = await get_all_data(apiEndPoint, params);
    const ministry_List_Array = response_ministry_List?.data;
    setsearchData(ministry_List_Array);
  };
  const { t } = useTranslation();
  return (
    <div className="flex justify-end">
      <button
        type={btn_type || "button"}
        onClick={(e: any) => search_api(apiEndPoint, params)}
        className="text-secondaryColor font-bold text-sm bg-NonaryColor  flex justify-center items-center gap-1 px-4 py-3  rounded-full shadow-lg"
      >
        {t("Search")}
      </button>
    </div>
  );
};

export default SearchBtn;
