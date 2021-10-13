import Instance from "../Helper/axios";
//import axios from "axios";

import { URLLOCAL } from "../Helper/baseURL";

export async function GetAllMajor(pageSize, currentPage, search) {
  try {
    const response = await Instance.get(
      URLLOCAL +
        "Major/GetMajor?pageSize=" +
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

export async function SaveMajor(data) {
  try {   
    const response = await Instance.post(
      URLLOCAL + "Major/SaveMajor",data
    );
    return await response.data;
  } catch (error) {
    console.log(error.response.request._response);
  }
}


export async function UpdateMajor(majorCode,data) {
  try{
    const response = await Instance.put(
      URLLOCAL + "Major/UpdateMajor?majorCode=" + majorCode,data
    );
    return await response.data;
  }catch (error) {
    
    console.log(error.response.request._response);
  }
}

export async function DeleteMajor(majorCode) {
  try {
    const response = await Instance.delete(
      URLLOCAL + "Major/DeleteMajor?majorCode=" + parseInt(majorCode)
    );
    return await response.data;
  } catch (error) {
    console.log("error", error.message);
  }
}
