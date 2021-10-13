import Instance from "../Helper/axios"; 
import { URLLOCAL } from "../Helper/baseURL";


export async function GetAllFaculty(pageSize, currentPage, search) {
  try {
    const response = await Instance.get(
      URLLOCAL +
        "Faculty/GetFaculty?pageSize=" +
        pageSize +
        "&currentPage=" +
        currentPage +
        "&search=" +
        search
    );
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function SeveFaculty(data) {
  try {   
    const response = await Instance.post(
      URLLOCAL + "Faculty/SaveFaculty",data
    );
    return await response.data;
  } catch (error) {
    // console.log("error",error);
    console.log(error.response.request._response);
  }
}


export async function UpdateFaculty(facultyCode,data) {
  try{
    const response = await Instance.put(
      URLLOCAL + "Faculty/UpdateFaculty?facultyCode=" + facultyCode,data
    );
    return await response.data;
  }catch (error) {
    
    console.log(error.response.request._response);
  }
}

export async function DeleteFaculty(facultyCode) {
  try {
    const response = await Instance.delete(
      URLLOCAL + "Faculty/DeleteFaculty?facultyCode=" + parseInt(facultyCode)
    );
    return await response.data;
  } catch (error) {
    console.log("error", error.message);
  }
}
