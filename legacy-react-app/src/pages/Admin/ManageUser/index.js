import React from "react";
import { useState } from "react";
import { Text, Img, Line, Button, Row, Column, Input } from "components";
import { useNavigate } from "react-router-dom";
import SidebarManageUser from "components/SidebarManageUser/index";
import HeaderOTAAdmin from "components/Header/HeaderOTAAdmin/index";
import LoginPage from "components/Login/index";
import SignupPage from "components/SignUp/index";

const ManageUserPage = () => {
  const navigate = useNavigate();

  function handleNavigate1() {
    navigate("/manage-user");
  }

  function handleNavigate2() {
    navigate("/manage-user");
  }

  const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [isPopup2Open, setIsPopup2Open] = useState(false);

  const openPopup1 = () => {
    setIsPopup1Open(true);
  };

  const openPopup2 = () => {
    setIsPopup2Open(true);
  };

  const closePopup1 = () => {
    setIsPopup1Open(false);
  };

  const closePopup2 = () => {
    setIsPopup2Open(false);
  };

  return (
    <>
      <div className="w-full font-montserrat">
      <HeaderOTAAdmin openPopup1={openPopup1} className="fixed invisible lg:visible" />
        <LoginPage isOpen={isPopup1Open} openPopup2={openPopup2} closePopup1={closePopup1} />
        <SignupPage isOpen={isPopup2Open} closePopup2={closePopup2} />        <div className="">

          <div className="flex flex-row">
            <div className="">
              <SidebarManageUser />
            </div>
            <div className="px-2 w-full mt-[0px] mx-auto lg:px-[14px] 2xl:px-[100px]">
              <text className="font-bold text-[40px]">
                Manage User
              </text>
              <Column className="bg-gray_100 h-fit font-ptsans items-center justify-start mx-[auto] w-[100%]">
        <Column className="justify-start gap-6 w-[80%]">
          <Text className="font-bold pt-2 mt-[10px]" variant="h3">
            Manage User Account
          </Text>

          <Row className="w-[100%] h-fit">
            <Column className="justify-start rounded-radius4 shadow h-50 bg-[#F1F1F1] w-[25%]">
              <label
                for="years"
                class="mb-2 ml-4 mt-2 text-[18px] font-bold text-gray-900 dark:text-[#FFFFFF]"
              >
                Domain
              </label>
              <select
                id="domain"
                multiple={true}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] w-full"
              >
                <option>Global</option>
                <option>~ UNIQUEHOLIDAY</option>
                <option>~ RAINBOWHOLIDAY</option>
                <option>~ GREATHOLIDAY</option>
                <option></option>
                <option></option>
                <option></option>
              </select>

              <Row className="form-check font-ptsans text-[14px] items-start m-[10px] rounded-radius4 w-[100%]">
                <input
                  class="form-check-input appearance-none h-3.5 w-3.5 border border-gray_501 border-solid rounded-sm bg-[#FFFFFF] checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value=""
                  id="Air conditioning"
                />
                <label for="Air conditioning" className="cursor-pointer">
                  Include children
                </label>
              </Row>

              <Text className="font-regular text-[12px]"></Text>
            </Column>

            <Column className="justify-start rounded-radius4 shadow  ml-4 p-4 h-50 right-40 top-50 bg-[#FAFAFA] w-[75%]">
              <Row className="justify-start ml-10 p-4 h-20 right-40 top-50 w-[90%]">
                <Text className="font-bold pt-2 text-[20px] justify-center w-[40%]">
                  Login ID
                </Text>
                <Input
                  id="rolename"
                  type="text"
                  className="font-normal not-italic p-[0] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] lg:text-[9px] placeholder:required text-slate_700 w-[60%]"
                  wrapClassName="h-fit 2xl:mb-[323px] 2xl:mt-[5px] 3xl:mb-[387px] 3xl:mt-[6px] lg:mb-[229px] lg:mt-[3px] w-[100%] xl:mb-[287px] xl:mt-[4px]"
                  variant="OutlineGray503"
                  shape="RoundedBorder3"
                  size="sm"
                ></Input>
              </Row>

              <Row className="justify-start ml-10 p-4 h-20 right-40 top-50 w-[90%]">
                <Text className="font-bold pt-2 text-[20px] justify-center w-[40%]">
                  Name
                </Text>
                <Input
                  id="rolename"
                  type="text"
                  className="font-normal not-italic p-[0] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] lg:text-[9px] placeholder:required text-slate_700 w-[60%]"
                  wrapClassName="h-fit 2xl:mb-[323px] 2xl:mt-[5px] 3xl:mb-[387px] 3xl:mt-[6px] lg:mb-[229px] lg:mt-[3px] w-[100%] xl:mb-[287px] xl:mt-[4px]"
                  variant="OutlineGray503"
                  shape="RoundedBorder3"
                  size="sm"
                ></Input>
              </Row>

              <Row className="justify-start ml-10 p-4 h-20 right-40 top-50 w-[90%]">
                <Text className="font-bold pt-2 text-[20px] justify-center w-[40%]">
                  Email
                </Text>
                <Input
                  id="rolename"
                  type="text"
                  className="font-normal not-italic p-[0] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] lg:text-[9px] placeholder:required text-slate_700 w-[60%]"
                  wrapClassName="h-fit 2xl:mb-[323px] 2xl:mt-[5px] 3xl:mb-[387px] 3xl:mt-[6px] lg:mb-[229px] lg:mt-[3px] w-[100%] xl:mb-[287px] xl:mt-[4px]"
                  variant="OutlineGray503"
                  shape="RoundedBorder3"
                  size="sm"
                ></Input>
              </Row>

              <Row className="justify-start ml-10 p-4 h-20 right-40 top-50 w-[90%]">
                <Text className="font-bold pt-2 text-[20px] justify-center w-[40%]">
                  Status
                </Text>
                <select
                  id="status"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#FFFFFF] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>- Please Select -</option>
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                  <option value="3">Locked</option>
                </select>
              </Row>

              <Row className="justify-end ml-5 h-15 w-[90%]">
                <Button
                  className="justify-end items-center border-none bg-sky-700 common-pointer font-bold lg:text-[8px] xl:text-[10px] 2xl:text-[16px] 3xl:text-[26px] text-[#FFFFFF] w-[15%]"
                  onClick={handleNavigate1}
                >
                  SEARCH
                </Button>
              </Row>

              <Row className="justify-start ml-10 h-10 top-15 w-[100%]">
                <Text
                  className="common-pointer ml-4 justify-start font-regular lg:text-[10px] xl:text-[15px] 2xl:text-[16px] 3xl:text-[26px] text-[#0071C2] w-[20%]"
                  onClick={handleNavigate2}
                >
                  Add New User
                </Text>
              </Row>
            </Column>
          </Row>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-[100%]">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 bg-[#F1F1F1] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Login ID
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-[#FAFAFA] border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-[#FFFFFF]"
                  >
                    ABDUL HALIM HAFIZ BIN ISMAIL
                  </th>
                  <td class="px-6 py-4">abhalim</td>
                  <td class="px-6 py-4">halimismail@uniqueholiday.com</td>
                  <td class="px-6 py-4">Active</td>
                  <td class="px-6 py-4">
                    <a
                      href="manage-user-2"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr class="border-b bg-[#F1F1F1] dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-[#FFFFFF]"
                  >
                    ABDUL HAFIZ BIN HALIM
                  </th>
                  <td class="px-6 py-4">abhafiz</td>
                  <td class="px-6 py-4">abdulhafiz@greatholiday.com</td>
                  <td class="px-6 py-4">Active</td>
                  <td class="px-6 py-4">
                    <a
                      href="manage-user-2"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr class="bg-[#FAFAFA] border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-[#FFFFFF]"
                  >
                    SITI RASYIDAH BINTI ALI
                  </th>
                  <td class="px-6 py-4">rasyali</td>
                  <td class="px-6 py-4">ctrasy77@rainbowholiday.com</td>
                  <td class="px-6 py-4">Active</td>
                  <td class="px-6 py-4">
                    <a
                      href="manage-user-2"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr class="border-b bg-[#F1F1F1] dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-[#FFFFFF]"
                  >
                    HALIM BIN HAFIZ
                  </th>
                  <td class="px-6 py-4">halhafiz</td>
                  <td class="px-6 py-4">hhafiz65@greatholiday.com</td>
                  <td class="px-6 py-4">Active</td>
                  <td class="px-6 py-4">
                    <a
                      href="manage-user-2"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Row></Row>
        </Column>
      </Column>
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default ManageUserPage;
