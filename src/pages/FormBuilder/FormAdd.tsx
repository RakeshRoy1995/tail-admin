import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import ResetButton from "@/shared/components/ButttonsCollection/CancelButton";
import SaveButton from "@/shared/components/ButttonsCollection/SaveButton";

const FormAdd = () => {
  return (
    <div>
      <Breadcrumb name1={"Forms"} name2={"New Form Setup"} />
      <form action="submit">
        <div className="bg-white rounded-xl shadow-md p-10">

          {/* <div className="mb-10 flex gap-1 lg:gap-2">
            <strong>Weekend ID:</strong> <span>2154UUHNGH</span>
          </div> */}

          <div className="relative">
            <label
              htmlFor="projectName"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
            >
              Form Name
            </label>
            <input
              id="Sector Name"
              type="text"
              placeholder="Write"
              className="border p-4 rounded-md h-14 text-sm w-full "
            />
          </div>

          <div className="flex justify-end gap-4 mt-10">
            <ResetButton />
            <SaveButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormAdd;
