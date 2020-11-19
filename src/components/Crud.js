import React from "react";
import "antd/dist/antd.css";
import { Table, Space } from "antd";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./crud.css";
import TextError from "./TextError";
const { Column } = Table;

function Crud() {
  const [flag, setFlag] = useState("false");
  const [datas, setDatas] = useState([]);
  const [formvalue, setFormValue] = useState({
    name: "",
    email: "",
    message: "",
  });
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };
  const savedValues = {
    id: formvalue.id,
    name: formvalue.name,
    email: formvalue.email,
    message: formvalue.message,
  };

  const onSubmit = (values, { resetForm }) => {
    if (flag === "true") {
      datas.map((item) => {
        if (item.id === values.id) {
          item.name = values.name;
          item.email = values.email;
          item.message = values.message;
        }
      });
    } else {
      setDatas([
        ...datas,
        {
          id: datas.length,
          name: values.name,
          email: values.email,
          message: values.message,
        },
      ]);
    }
    resetForm({ values: "" });

    setFormValue(initialValues);
    setFlag("false");
  };

  const validationSchema = yup.object({
    name: yup.string().required("Required !"),
    email: yup.string().email("Invalid email format !").required("Required !"),
    message: yup.string().required("Required !"),
  });

  const deleteData = (keys) => {
    const alldata = datas;
    alldata.splice(keys, 1);

    setDatas([...alldata]);

    //console.log(datas);
  };

  const updateData = (data) => {
    //console.log(data);
    setFormValue(data);
    setFlag("true");
    //console.log(formvalue);
  };

  const cancelEdit = () => {
    setFormValue(initialValues);
    setFlag("false");
  };

  return (
    <div className="container">
      <div className="row p-3">
        <div className="col-md-4">
          <Formik
            initialValues={savedValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            <Form>
              <div className="form-group">
                <label>Name</label>
                <Field
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                />
                <ErrorMessage name="name" component={TextError} />
              </div>

              <div className="form-group">
                <label>Email</label>
                <Field
                  className="form-control"
                  type="text"
                  id="email"
                  name="email"
                />
                <ErrorMessage name="email" component={TextError} />
              </div>

              <div className="form-group">
                <label>Message</label>
                <Field
                  as="textarea"
                  className="form-control"
                  type="text"
                  id="message"
                  name="message"
                />
                <ErrorMessage name="message" component={TextError} />
              </div>

              {flag === "true" ? (
                <div>
                  <button className="btn btn-primary mr-2" type="submit">
                    Update
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => cancelEdit()}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button className="btn btn-success" type="submit">
                  ADD
                </button>
              )}
            </Form>
          </Formik>
        </div>
        <div className="col-md-8">
          <Table dataSource={datas}>
            <Column title="Name" dataIndex="name" />
            <Column title="Email" dataIndex="email" />
            <Column title="Message" dataIndex="message" />

            <Column
              title="Action"
              render={(text, record) => (
                <Space size="middle">
                  <button
                    className="btn btn-info"
                    type="button"
                    onClick={() => updateData(record)}
                  >
                    Edit{" "}
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => deleteData(record.id)}
                    key={record.id}
                  >
                    Delete
                  </button>
                </Space>
              )}
            />
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Crud;
