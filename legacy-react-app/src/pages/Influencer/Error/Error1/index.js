import React from "react";
import "./error1.css";
import HeaderOTA from "components/Header/HeaderOTA/index";
import HeaderOTAAdmin from "components/Header/HeaderOTAAdmin/index";

const Error1 = () => {
  return (
    <>
      <HeaderOTAAdmin />
      <div class="container">
        {/* <h2 >Connection Error</h2> */}
        <text className="w-[100%] error">
          Please check your internet connectivity.
        </text>

        <a
          href="/legacy/"
          className="border-gray-800 border-[1px] px-3 py-2 rounded-sm hover:bg-gray-300 bg-white"
        >
          Try Again
        </a>
      </div>
    </>
  );
};
export default Error1;
