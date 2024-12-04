import React, { useState } from "react";

const LabledInput = ({
  lable,
  type,
  name,
  value,
  onChange,
  isComment,
  isSideBarActivity,
  isError,
  isDay,
  isPeriod,
  days
}) => {
  const [isFocused, setIsFocused] = useState(false);
  let formattedDate = "";

  if (type === "datetime-local") {
    console.log(value);

    const dateToParse = value.includes("+")
      ? value.substring(0, value.indexOf("+"))
      : value;

    // const date = new Date(dateToParse);
    // const day = String(date.getDate()).padStart(2, "0");
    // const month = String(date.getMonth() + 1).padStart(2, "0");
    // const year = date.getFullYear();

    // formattedDate = `${year}-${month}-${day}`;

    formattedDate = dateToParse;
  }
  const options = Array.from(["morning activity", "afternoon activity", "evening activity"]);
  
  return (
    <div
      className={`flex flex-col ${isComment ? "w-full" : "sm:w-1/2 w-full"}`}
    >
      <label
        className={`text-[13px] text-[RGBA(0, 0, 0, 0.87)] relative top-1 ${
          isFocused ? "text-[#e3165b]" : "sm:text-[RGBA(0, 0, 0, 0.87)] text-black"
         
        }  ${isError ? "text-red_802": ""}`}
      >
        {lable}
      </label>

      {isComment ? (
        <textarea
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="border-b-[#050505a8] border-t-0 border-x-0 focus:border-[#e3165b] focus:border-b-[2px] py-1 px-0 text-[13px] text-[#000] sm:mt-0 mt-1 sm:bg-transparent bg-[#f5f5f5] sm:h-auto h-5"          onChange={onChange}
          name={name}
          value={value}
          type={type}
          rows="1"
          cols="50"
        />
      ) : isPeriod ? (
        <select  onChange={onChange}  name={name} value={value} className="border-b-[#050505a8] border-t-0 border-x-0 focus:border-[#e3165b] focus:border-b-[2px] py-1 px-0 text-[13px] text-[#000] sm:mt-0 mt-1 sm:bg-transparent bg-[#f5f5f5] sm:h-auto h-5">
            {options.map((period)=> {
             return <option key = {period} selected={period ==value} value={period}>{`${period}`}</option>
            })}
        </select>
      ): isDay ? (
        <input
        onChange={onChange}
        value={type === "text" ? value : formattedDate}
        name={name}
        type={type}
        readOnly={isDay}
        className={`border-t-0 border-x-0  border-b-0 py-1 px-0 sm:h-[30px] h-5  text-[13px] text-[#000] opacity-80 placeholder:text-[13px] placeholder:text-[#000] sm:mt-0 mt-1 sm:bg-transparent bg-[#f5f5f5] ${isError ? "border border-red-800":""}`}         
        onFocus={() => setIsFocused(false)}
        onBlur={() => setIsFocused(false)}
      />
      ):(
        <input
          onChange={onChange}
          value={type === "text"? value : formattedDate}
          name={name}
          type={type}          
          className={`sm:border-b-[#050505a8] border-[#5C5C5F] border-b-[0.5px] border-t-0 border-x-0 focus:border-[#e3165b]  py-1 px-0 sm:h-[30px] h-5 sm:border-b focus:border-b-[2px] text-[13px] text-[#000] opacity-80 placeholder:text-[13px] placeholder:text-[#000] sm:mt-0 mt-1 sm:bg-transparent bg-[#f5f5f5] ${isError ? "border border-red-800":""}`}         
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}
    </div>
  );
};
export default LabledInput;
