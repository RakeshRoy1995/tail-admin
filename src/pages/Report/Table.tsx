// File: components/Table.js
import React from "react";

const Table = ({ headers, data, keyMapping }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-2 px-4 border-b text-left font-medium text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {headers.map((header, index) => (
                  <td
                    key={index}
                    className="py-2 px-4 border-b text-gray-600"
                  >
                    {row[keyMapping[header]] || "-"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="py-2 px-4 text-center text-gray-600"
              >
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
