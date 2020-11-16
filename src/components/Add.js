import React, { useState } from "react";

import "./add.css";

export default function Add() {
  const [datas, setDatas] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [update, setUpdate] = useState("false");
  
  

  const adddata = (e) => {
    e.preventDefault();
    
    if (name === "" && email === "" && message === "") {
      window.alert("fields are empty!!!! ");
    } else {
      setDatas([
        ...datas,
        {
          id: datas.length,
          names: name,
          emails: email,
          messages: message,
        },
      ]);
    }

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
    const allitems = datas.filter((data, index) => index === keys);
    console.log(allitems);
    
    
  };

  return (
    <div>
      <div class="login-page">
        <div class="form">
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
            <button type="submit">ADD</button>
          </form>
        </div>

        <div>
          <table className="table-fill">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Email</th>
                <th className="text-left">Message</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>

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
                      onClick={() => updateData(data.id)}
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
