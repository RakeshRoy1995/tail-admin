import React from "react";

const Dropdown = ({ label, options, selectedOptions, setSelectedOptions }) => {
  const handleSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else if (option === "All") {
      setSelectedOptions(["All"]);
    } else {
      setSelectedOptions((prev) =>
        prev.includes("All") ? [option] : [...prev, option]
      );
    }
  };

  return (
    <div className="relative w-64">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="border border-gray-300 rounded-md p-2">
        {options.map((option) => (
          <label key={option} className="block">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => handleSelect(option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;