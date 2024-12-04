import * as Yup from "yup"





export const activitySchema = Yup.object({
    
    title: Yup.string().trim().required("Required"),
    location: Yup.string().trim().required("Required"),
    start: Yup.string().trim().required("Required"),
    //end: Yup.string().trim().required("Required"),
    //day: Yup.string().trim().required("Required"),
    //period: Yup.string().trim().required("Required")
   





});
 
export const changeDateSchema = Yup.object({
    
    start: Yup.string().trim().required("Required"),   
    day : Yup.number().min(1).max(60).required("Required")


});
 

