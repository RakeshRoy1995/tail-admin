import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const BreadcumbWithButton = ({ name, url, setaddFormShow }: any) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const onclk = ()=> {
    if (setaddFormShow) {
      setaddFormShow(true)
    }

    if (url) {
      navigate(url)
    }


  }

  return (
    <div className="flex sm:flex-col md:flex-row lg:flex-row items-center space-x-4  breadcrumbs w-fit  mb-5">
      {name && (
        <>
          <div className="xxxs:text-xs xxs:text-sm  lg:text-text-sm  xl:text-sm">
            {t("List of")} <span className="   xxxs:text-xs xxs:text-sm  lg:text-text-sm  xl:text-sm font-bold">{name}</span>
          </div>
          {url && (
            <div
              className="w-fit  xxxs:p-1 xxs:p-1 xs:p-2 md:p-3 lg:p-3 xl:p-3 border-2 cursor-pointer rounded-full border-primaryColor text-primaryColor xxxs:text-xs xxs:text-sm  lg:text-text-sm  xl:text-sm font-bold  bg-white text-center"
              onClick={(e:any) => onclk()  }
            >
              + {t("New")} {name}{" "} {t("Setup")}
            </div>
          )}
        </>
      )}
    </div>
  );
};
