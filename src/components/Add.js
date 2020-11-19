import React, { useState } from "react";

import "./add.css";

export default function Add() {
  const [datas, setDatas] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [update, setUpdate] = useState("false");
  const [editkey, setEditKey] = useState("");

  const adddata = (e) => {
    e.preventDefault();

    if (name === "" && email === "" && message === "") {
      window.alert("fields are empty!!!! ");
    }  else {
      insertdata();
      
    }
  };

  const insertdata = () => {
    setDatas([
      ...datas,
      {
        id: datas.length,
        names: name,
        emails: email,
        messages: message,
      },
    ]);
    setName("");
    setEmail("");
    setMessage("");
  };

  const nameChange = (e) => {
    setName(e.target.value);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const messageChange = (e) => {
    setMessage(e.target.value);
  };

  const deleteData = (keys) => {
    const alldata = datas;
    alldata.splice(keys, 1);

    setDatas([...alldata]);

    console.log(datas);
  };

  const updateData = (keys) => {
    setUpdate("true");
    const keyid = parseInt(keys.id);
    console.log(keys);
    setName(keys.names);
    setEmail(keys.emails);
    setMessage(keys.messages);
    setEditKey(keyid);
  };

  const Edititems = () => {
    datas.map((d) => {
      if (d.id === editkey) {
        d.names = name;
        d.emails = email;
        d.messages = message;
      }
    });
    setDatas([...datas]);
    setName("");
    setEmail("");
    setMessage("");
    setUpdate("false");
  };

  const Editcancel = () => {
    setName("");
    setEmail("");
    setMessage("");
    setUpdate("false");
  };

  return (
    <div>
      <div className="login-page">
        <div className="form">
          <form className="register-form" autoComplete="off" onSubmit={adddata}>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={nameChange}
            />
            <input
              type="text"
              placeholder="email address"
              value={email}
              onChange={emailChange}
            />
            <textarea
              type="text"
              placeholder="message"
              value={message}
              onChange={messageChange}
            />
            {update === "true" ? (
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => Edititems()}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => Editcancel()}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button type="submit" className="addbtn">
                ADD
              </button>
            )}
          </form>
        </div>

        <div>
          <table className="table-fill">
            {datas.length >= 1 ? (
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Message</th>
                  <th className="text-left">Action</th>
                </tr>
              </thead>
            ) : null}

            <tbody className="table-hover">
              {datas.map((data) => (
                <tr key={data.id}>
                  <td className="text-left">{data.names} </td>
                  <td className="text-left">{data.emails} </td>
                  <td className="text-left">{data.messages}</td>
                  <td className="text-left">
                    <button
                      className="btn btn-outline-primary m-2"
                      variant="outline-primary"
                      onClick={() => updateData(data)}
                    >
                      <img
                        alt=""
                        src="https://img.icons8.com/wired/20/000000/edit.png"
                      />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger "
                      onClick={() => deleteData(data.id)}
                    >
                      <img
                        alt=""
                        src="https://img.icons8.com/ios-filled/20/000000/delete-forever.png"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
