import React from "react";

export default class Profile extends React.Component {
  render() {
    return (
      <div>
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card card-primary">
            <div className="card-header">
              <h4>ข้อมูลส่วนตัว</h4>
            </div>
            <div className="card-body">
              <div className="form-group row">
                <div className="col-md-2">
                  <label>รหัสนักเรียน</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-3">
                  <label>คำนำหน้าชื่อ</label>
                  <select className="form-control">
                    <option>-- กรุณาเลือก --</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label>ชื่อ</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-3">
                  <label>นามสกุล</label>
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-2">
                  <label>วันเดือนปีเกิด</label>
                  <select className="form-control">
                    <option>-- วันที่ --</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <select
                    className="form-control"
                    style={{ marginTop: "30px" }}
                  >
                    <option>-- เดือน --</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <select
                    className="form-control"
                    style={{ marginTop: "30px" }}
                  >
                    <option>-- ปี พ.ศ. --</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label>เบอร์โทรศัพท์</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-3">
                  <label>อีเมล</label>
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ค้นหาที่อยู่"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-3">
                  <label>บ้านเลขที่</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-3">
                  <label>ตำบล</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-2">
                  <label>อำเภอ</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-2">
                  <label>จังหวัด</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-2">
                  <label>รหัสไปรษณีย์</label>
                  <input type="text" className="form-control" />
                </div>
              </div>

              <hr />
              <h5>ข้อมูลผู้ใช้งาน</h5>
              <div className="form-group row">
                <div className="col-md-4">
                  <label>ชื่อผู้ใช้งาน</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-4">
                  <label>รหัสผ่าน</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                  />
                </div>
                <div className="col-md-4">
                  <label>ยืนยันรหัสผ่าน</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 text-center">
                  <button class="btn btn-primary">บันทึก</button> &nbsp; &nbsp;
                  <button class="btn btn-secondary">ล้างข้อมูล</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
