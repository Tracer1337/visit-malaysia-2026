import React from "react";
import Modal from "react-modal";
import ReactDOM from "react-dom";
import crossSvg from "./cross.svg";

const ConfirmDialog = ({ open, setOpen, cancelButtonName, SubmitButtonName, title, description }) => {
  Modal.setAppElement("#root");
  const customStyles = {
    overlay: {
      zIndex: 99999,
      backgroundColor: "rgb(25 25 25 / 45%)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#fff",
      paddingBottom: "8px",
      padding: "18px",
      border: "none",
      borderRadius: "0px",
      width: "100%",
      maxWidth: "500px",
      boxShadow:
        "0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12)",
    },
  };

  const closeModal = () => {
    setOpen(false);
  };



  const handleSubmit = ()=>{

  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Delete Activity"
    >

<div className=" bg-white w-full">
          {/* Modal Header */}
          <div className="w-full flex justify-between mb-[18px]">
            <h1 className="text-lg text-[#000000DE]">
             {title}
            </h1>
            <div className=" flex items-center justify-center w-[30px] h-[30px] cursor-pointer hover:bg-[#e0e0e0] rounded-full">
              <img
                src={crossSvg}
                alt="Cross Icon"
                className="w-5"
                onClick={closeModal}
              />
            </div>
          </div>
          {/* Modal body */}

        <div>
            <p>{description}</p>
        </div>

            {/* Modal footer */}

            <div className=" w-full flex mt-[30px]">
            <div className="w-[50%] ">
            </div>
            <div className="w-[50%] flex justify-end ">
              <button
                className="px-3 pt-1.5 pb-1 ml-1.5 text-sm font-medium text-[#e3165b] uppercase bg-transparent transition-all duration-300 hover:bg-[#e3165b0A]"
                onClick={handleSubmit}
              >
                {cancelButtonName}
              </button>
              <button
                className="px-3 pt-1.5 pb-1 ml-1.5 text-sm font-medium uppercase transition-all duration-300 hover:bg-[#00000009]"
                onClick={closeModal}
              >
                {SubmitButtonName}
              </button>
            </div>
          </div>

          </div>


    </Modal>
  );
};
ReactDOM.render(<ConfirmDialog />, document.getElementById("root"));

export default ConfirmDialog;
