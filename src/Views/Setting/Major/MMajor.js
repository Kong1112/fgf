import React, { Component } from "react";
import { Fragment } from "react";
import { SaveMajor, UpdateMajor } from "../../../services/major.service";
import Swal from "sweetalert2";
import { ErrorMessage, Formik } from "formik";

class MMajor extends Component {
  constructor(props) {
    super(props);
    this.state ={
      majorCode:0,
      majorName:"",
      isUsed:"",
    };
  }

  async action(data){
    let res =""
    if (data.majorCode === 0) {
      res = await SaveMajor(data);
    }else{
      res = await UpdateMajor(data.majorCode,data);
    }
    console.log("res" + res.statusCode);
    if (res.statusCode === "003") {
      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
      this.props.history.push("/showMajor");
    } else {
      Swal.fire({
        icon: "warning",
        title: "บันทึกข้อมูลไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  async componentWillMount(){
    console.log("t:"+JSON.stringify(this.props.location.state));
    if(this.props.location.state !==undefined){
      let param = this.props.location.state.value;
      // console.log("param.facultycode:" + param.facultyCode);
      this.setState({
        majorCode:param.majorCode,
        majorName:param.majorName,
        isUsed:param.isUsed,
      });
    }
    else{
      console.log("444");
    }
  }

 

  render() {
    return (
      <Fragment>
        <Formik
          validate={(values) => {
            const errors = {};
            if (!values.majorName) {

              errors.majorName = "จำเป็นต้องระบุข้อมูล";
            }
            if (!values.isUsed) {
              errors.isUsed = "จำเป็นต้องระบุข้อมูล"
            }
            return errors;
          }}
          initialValues={{
            majorCode: this.state.majorCode,
            majorName: this.state.majorName,
            isUsed: this.state.isUsed,
          }}
          onSubmit={(values, { resetFrom }) => {
            console.log("values:" +values);
            this.action(values);
            resetFrom();
            
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="card card-primary">
                    <div className="card-header">
                      <h4>ข้อมูลคณะ</h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group row">
                        <div className="col-md-6">
                          <input
                           type="hidden"
                           name="majorCode"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.majorCode} 
                          />
                          <label>ชื่อคณะ</label>
                          <input
                            className="form-control"
                            type="text"
                            name="majorName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.majorName} />
                          <ErrorMessage
                            name="majorName"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-6">
                          <label>สถานะ</label>
                          <br />
                          <div className="form-check form-check-inline">
                            <input
                              style={{ width: "20px", height: "20px" }}
                              className="form-check-input"
                              type="radio"
                              name="isUsed"
                              id="open"
                              value="1"
                              onChange={handleChange}
                              defaultChecked={values.isUsed === "1"}
                            />
                            <label className="form-check-label" htmlFor="open">
                              เปิดสอน
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              style={{ width: "20px", height: "20px" }}
                              className="form-check-input"
                              type="radio"
                              name="isUsed"
                              id="close"
                              value="0"
                              onChange={handleChange}
                              defaultChecked={values.isUsed === "0"}
                            />
                            <label className="form-check-label" htmlFor="close">
                              ปิดการสอน
                            </label>
                          </div>
                          <ErrorMessage
                            name="isUsed"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">บันทึกข้อมูล</button>{" "}
                        &nbsp;&nbsp;
                        <button className="btn btn-secondary">ล้างข้อมูล</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </form>
          )}
        </Formik>
      </Fragment>

    );
  }
}
export default(MMajor)