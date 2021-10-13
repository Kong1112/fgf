import Instance from "../Helper/axios"; 
import { URLLOCAL } from "../Helper/baseURL";

export async function GetAllTeachers(pageSize,currentPage) {
  try {
    const response = await Instance.get(
        URLLOCAL + "Teachers/GetTeacher?pageSize=" +
        pageSize +
        "&currentPage=" +
        currentPage
    );
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}