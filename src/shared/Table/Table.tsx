import { accessPermission } from "@/utils";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { ExpandTable } from "./ExpandTable";

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Search..."
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />

    <div className="flex justify-end ">
      <button
        type="button"
        onClick={onClear}
        className="text-secondaryColor font-bold text-sm bg-NonaryColor  flex justify-center items-center gap-1 px-4 py-2  shadow-lg"
      >
        X
      </button>
    </div>
  </>
);

const Table = ({
  rows,
  column,
  selectableRows,
  setSelectedRows,
  selectedRowIndexName,
  setselectedRowIndexName,
  pagination,
}: any) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = rows.filter(
    (item: any) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const col = column.map((data: any) => {
    const obj = {
      ...data,
      ["headerClassName"]:
        "border text-sm font-normal border-gray-200 w-16 text-center p-3 uppercase",
    };
    return obj;
  });

  const handleChange = ({ selectedRows }: any) => {
    setSelectedRows(selectedRows);
    if (setselectedRowIndexName) {
      setselectedRowIndexName("");
    }
  };

  const data: any = accessPermission();

  const tmpAddBtn = data?.permission?.find(
    (d: any) => d.name == "ViewAll" && d.method == "GET",
  );

  const viewAllButton = tmpAddBtn?.checked == false ? false : true;
  //expander

  const ExpandedComponent = ({ data }) => <ExpandTable data={data} />;

  return (
    <>
      {viewAllButton ? (
        <div className="overflow-x-auto">
          {selectedRowIndexName ? (
            <DataTable
              // expandableRows={true}
              expandableRowsComponent={ExpandedComponent}
              // expandOnRowClicked={expandOnRowClicked}
              // expandOnRowDoubleClicked={expandOnRowDoubleClicked}
              // expandableRowsHideExpander={expandableRowsHideExpander}

              pagination={pagination == false ? false : true}
              columns={col}
              data={rows}
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              subHeader
              // subHeaderComponent={subHeaderComponentMemo}
              selectableRows={selectableRows ? true : false}
              onSelectedRowsChange={handleChange}
              selectableRowSelected={(row: any) =>
                selectableRows.length > 0 &&
                selectableRows.find(
                  (d) => d[selectedRowIndexName] == row[selectedRowIndexName],
                )
              }
            />
          ) : (
            <DataTable
              pagination={pagination == false ? false : true}
              // expandableRows={true}
              expandableRowsComponent={ExpandedComponent}
              // expandOnRowClicked={expandOnRowClicked}
              // expandOnRowDoubleClicked={expandOnRowDoubleClicked}
              // expandableRowsHideExpander={expandableRowsHideExpander}

              columns={col}
              data={rows}
              selectableRows={selectableRows ? true : false}
              onSelectedRowsChange={handleChange}
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              subHeader
              // subHeaderComponent={subHeaderComponentMemo}
            />
          )}
        </div>
      ) : "No Access to view All data"}
    </>
  );
};

export default Table;
