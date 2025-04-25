import { useTranslation } from "react-i18next";

const CancelButton = ({ setsingleData, setaddFormShow }: any) => {
  const { t } = useTranslation();

  const formReset = () => {
    const form: any = document.querySelector("form");
    if (form) {
      form.reset();
    }

    if (setsingleData) {
      setsingleData(null);
    }

    if (setaddFormShow) {
      setaddFormShow(false);
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={(e: any) => formReset()}
        className="btn btn-danger fw-bold btn-sm px-4 py-2"
      >
        {t("cancel")}
      </button>
    </div>
  );
};

export default CancelButton;
