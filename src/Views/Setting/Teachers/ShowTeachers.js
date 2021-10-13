import { Pagination } from "@material-ui/lab";
import React, { Fragment, useState, useEffect } from "react";
import { GetAllTeachers } from "../../../services/teachers.services";

export default function ShowTeachers() {
  const [data, setData] = useState([]);
  const [page, setpage] = useState({
    lastPage:1,
    totalRow:0,
    currentPage:0,
  });

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(fetchData,[pageNo,pageSize]);
  async function fetchData(){
    const res = await GetAllTeachers(pageSize,pageNo);
    if (res.statusCode == "002") {
      setData(res.data);
      let paging = res.pagin;
      setpage({
        currentPage:paging.currentPage,
        lastPage:paging.totalPage,
        totalRow:paging.totalRow,
      });
    }
  }

  const handleChangePage = (e, newPage) => {
    e.preventDefault();
    setPageNo(newPage);
    console.log("page="+newPage)
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card card-primary">
            <div className="card-header">
              <h4>ข้อมูลอาจารย์ผู้สอน</h4>
            </div>
            <div className="card-body">
              {/** สำหรับแสดงรายการข้อมูล */}
              <div className="form-group row">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>รหัสอาจารย์</th>
                      <th>ชื่ออาจารย์</th>
                      <th>นามสกุล</th>
                      <th>เพิ่มเติม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((value, index) => (
                      <tr key={value.teacherCode}>
                        <td>
                          {(page.currentPage - 1) * pageSize + (index + 1)}
                          </td>
                        <td>{value.teacherCode}</td>
                        <td>{value.name}</td>
                        <td>{value.lastname}</td>
                        <td>
                          {" "}
                          <button className="btn btn-success">
                            แก้ไข
                          </button>{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between">
                <div>จำนวนทั้งหมด({page.totalRow})รายการ</div>
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
