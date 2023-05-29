import React from "react";

const CustomInput = ({ heading, type, placeholder, value, handleChange }) => {
  return (
    <div className="mb-2 text-lg flex flex-col text-teal-200 py-2">
      <label className="  text-white">
        <b>{heading}</b>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className="rounded-3xl border-none  bg-teal-900 bg-opacity-70 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
        required={true}
        onChange={(text) => handleChange(text)}
      />
    </div>
  );
};

export default CustomInput;
