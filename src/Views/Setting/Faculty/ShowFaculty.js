import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { DeleteFaculty, GetAllFaculty } from "../../../services/faculty.services";
import Pagination from "@material-ui/lab/Pagination";
import Swal from "sweetalert2";


export default function ShowFaculty() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [page, setpage] = useState({
    lastPage:1,
    totalRow:0,
    currentPage:0,
  });

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(fetchData, [pageNo, pageSize, search]);

  async function fetchData(){
    const res = await GetAllFaculty(pageSize, pageNo, search);
    if (res.statusCode == "002") {
      let paging = res.pagin;
      if (paging.totalRow > 0) {
        setData(res.data);
        setpage({
          currentPage:paging.currentPage,
          lastPage:paging.totlaPage,
          totalRow:paging.totalRow,
        });
      }else {
      }
    }
  }

  const searchData = (e) => {
    e.preventDefault();
    setData([]);
    fetchData();
  };

  const clearData = (e) => {
    e.preventDefault();
    setData([]);
    setSearch("");
    setPageNo(1);
    setPageSize(10);
    fetchData();
  };

  const deleteData = async function (e, prmFacultyCode, prmFacultyName) {
    e.preventDefault();
    const sweetConfirm = await new Swal({
      className: "bg-modal-red",
      icon: "question",
      iconColor: "red",
      //dangerMode: true,
      text: "คุณต้องการลบข้อมูลคณะ" + prmFacultyName + "ใช่หรือไม่?",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      }
    });

    if (sweetConfirm) {
      const result = await DeleteFaculty(prmFacultyCode);
      if (result.statusCode === "002") {
        new Swal({
          title: "สำเร็จ!",
          text: "",
          icon: "success",
          showConfirmButton: false,
          button: "ปิด",
          timer: 1500,
        });
        fetchData();
      }
    }
  };

  
  const handleChangePage = (e, newPage) => {
    e.preventDefault();
    setPageNo(newPage);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card card-primary">
            <div className="card-header">
              <h4>ข้อมูลคณะ</h4>
            </div>
            <div className="card-body">
            <div className="row">
                <div className="row col-md-12">
                  <div className="col-md-4">
                    <div className="form-group">
                      <div className="input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="ค้นหาชื่อคณะ"
                          aria-label=""
                          value={search}
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={(e) => {
                              searchData(e);
                            }}
                          >
                            <i class="fas fa-search"></i>
                          </button>&nbsp;
                          <button
                            type="reset"
                            className="btn btn-secondary"
                            onClick={(e) => {
                              clearData(e);
                            }}
                          >
                             <i class="fas fa-ban"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 text-right">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        history.push("/ffaculty");
                      }}
                    >
                      <i class="fas fa-users"></i>{" "}
                      เพิ่มใหม่
                    </button>
                  </div>
                </div>
              </div>
              {/* <div>
                <button className="btn btn-primary" 
                onClick={(e) => {
                  history.push("/FFaculty")
                }}>เพิ่มข้อมูล</button>
              </div> */}
              {/** สำหรับแสดงรายการข้อมูล */}
              <div className="form-group row">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>รหัสคณะ</th>
                      <th>ชื่อคณะ</th>
                      <th>สถานะ</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((value, index) => (
                      <tr key={value.facultyCode}>
                        <td>
                          {(page.currentPage - 1) * pageSize + (index + 1)}
                        </td>
                        <td>{value.facultyCode}</td>
                        <td>{value.facultyName}</td>
                        <td>{value.isUsed == 1 ? "ใช้งาน" : "ไม่ใช้งาน"}</td>
                        <td>
                          {" "}
                          <button className="btn btn-warning"
                          onClick={(e) => {
                            history.push("/ffaculty",{value: value});
                          }}
                          >
                            <i class="fas fa-wrench"></i>
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-danger"
                            onClick={(e) => {
                              deleteData(
                                e,
                                value.facultyCode,
                                value.facultyName
                              );
                              return false;
                            }}
                          >
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  ทั้งหมด <strong>({page.totalRow})</strong> รายการ
                </div>
                <Pagination
                  count={parseInt(page.lastPage)}
                  page={pageNo}
                  color="primary"
                  size="small"
                  defaultPage={6}
                  siblingCount={1}
                  onChange={handleChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
