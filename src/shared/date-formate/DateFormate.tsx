// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { formatDate_2 } from "@/utils";

// export default function DateFormate({
//   name,
//   singleData,
//   setsingleData,
//   required,
//   label,
//   minDate,
//   maxDate
// }: any) {
//   const [FromselectedDate, setFromSelectedDate] = useState(null);

//   return (
//     <DatePicker
//       title={label || ""}
//       name={name}
//       required={required}
//       maxDate={maxDate || null}
//       minDate={minDate || null}
//       selected={
//         singleData?.[name]
//           ? new Date(formatDate_2(singleData?.[name]))
//           : FromselectedDate
//       }
//       onChange={(date: any) => {
//         setFromSelectedDate(date);
//         setsingleData({ ...singleData, [name]: date });
//       }}
//       dateFormat="dd/MM/yyyy"
//       placeholderText="DD/MM/YYYY"
//       showYearDropdown
//       showMonthDropdown
//       dropdownMode="select"
//       className="w-full border p-4 rounded h-14 text-lg relative"
//     />
//   );
// }

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate_2 } from "@/utils";

export default function DateFormate({
  name,
  singleData,
  setsingleData,
  required,
  label,
  minDate,
  maxDate
}: any) {
  const [FromselectedDate, setFromSelectedDate] = useState(null);
  const CustomCalendarContainer = ({ children }: { children: React.ReactNode }) => {
    return <div className="custom-datepicker-container z-50">{children}</div>;
  };
  return (
    <DatePicker
      title={label || ""}
      name={name}
      required={required}
      maxDate={maxDate || null}
      minDate={minDate || null}
      selected={
        singleData?.[name]
          ? new Date(formatDate_2(singleData?.[name]))
          : FromselectedDate
      }
      onChange={(date: any) => {
        setFromSelectedDate(date);
        setsingleData({ ...singleData, [name]: date });
      }}
      dateFormat="dd/MM/yyyy"
      placeholderText="DD/MM/YYYY"
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
      className="w-full border p-4 rounded h-14 text-lg relative"
      onKeyDown={(e) => e.preventDefault()}
      popperContainer={CustomCalendarContainer}
    />
  );
}
