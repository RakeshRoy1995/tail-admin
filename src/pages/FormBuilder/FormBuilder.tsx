

import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import Table from "@/shared/Table/Table";


const FormBuilder = () => {

  function createData(slNo, formName, status) {
    return { slNo, formName, status };
  }
  const rows = [
    createData(1, 'Sample Form Name',  'Active'),
    createData(2, 'Sample Form Name',  'Inactive'),
    createData(3, 'Sample Form Name & Saturday', 'Active'),

  ];


  const column = [
    {
      name: 'Sl.No',
      value: 'slNo'
    },

    {
      name: 'Form Name',
      value: 'formName'
    },


    {
      name: 'Status',
      value: 'status',
    },
    {
      name: 'action',
      value: 'id',
    }
  ];


  const getheaderColor = (status: string) => {
    return status === "Active" ? "text-green-500" : "text-red-500";
  };

  return (
    <>
      <BreadcumbWithButton name={"Forms"} url={"/form-add"} />
      <Table rows={rows} getheaderColor={getheaderColor} column={column} />
    </>
  );
};

export default FormBuilder;
