import React from "react";
import { Row,Img } from "components/index";
import Icon from '@mdi/react'
import { mdiEarth } from '@mdi/js';
import { SelectPaymentMethod } from "components/SelectPaymentMethod/index";

  const PaymentMethod= ()=> {
 
 
     return(
         <>
       
       <Row className="items-center w-[50%]">
                      <button class="flex border-[1.5px] border-gray_700_33 border-r-0 h-9 bg-gray_100 items-center justify-center px-4 border-r">
                      <Icon path={mdiEarth}
                        title="Bag"
                        size={0.8}
                        color="black"
                        />
                      </button>
                      <SelectPaymentMethod 
                       className="px-4 w-[100%] h-9 text-[13px] focus:ring-blue-500 focus:border-blue-500 border-slate-300"
                        placeholderClassName="text-bluegray_400"
                        placeholder="Payments Methods"
                        isSearchable={true}
                        isMulti={true}
                        shape="RoundedBorder2"
                        size="sm"
                        variant="OutlineGray700">
                       </SelectPaymentMethod>
                    </Row> 
         </>
     )
 }
 
 export default PaymentMethod;