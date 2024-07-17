import React from "react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Otp from "../Components/Otp";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setmail] = useState("");
  const [state, setState] = useState(false);

  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  //   const navigate = useNavigate();
  async function handlesubmit() {
    try {
      const res = await fetch("https://bootcamp-wine.vercel.app/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.status === "fail") {
        // setState(true);
        window.alert(data.message);
      } else {
        // setState(true);
        sessionStorage.setItem("token", data.token);
        // console.log(localStorage.getItem("token"));
        navigate("/");
      }

      //   if (data.status === "failure" && data.statusCode === 400) {
      //     return window.alert("please enter all fields");
      //   } else if (data.userExists === true && data.statusCode === 200) {
      //     console.log(data, "data");
      //     localStorage.setItem("user", data.data.user._id);
      //     // setuser(localStorage.getItem("user"));
      //     navigate("/home");
      //   } else {
      //     window.alert("user not exists");
      //   }
    } catch (e) {}
  }
  return (
    <>
      {state && <Otp setState={setState}></Otp>}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        }}
      >
        <div
          style={{
            width: "400px",
            height: "400px",
            boxSizing: "border-box",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            // justifyContent: "center",
            padding: "40px",
            gap: "20px",
            background: "linear-gradient(45deg, #2193b0, #6dd5ed)",
            borderRadius: "8px",
          }}
        >
          <h1 style={{ textAlign: "center" }}> login</h1>
          <div>
            {" "}
            <label style={{ display: "block", color: "darkblue" }}>
              enter email
            </label>
            <br />
            <input
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                width: "300px",
              }}
              type="email"
              placeholder="mail"
              value={email}
              onChange={(e) => {
                setmail(e.target.value);
              }}
            ></input>
          </div>

          <div>
            <label style={{ display: "block" }}>enter your password</label>
            <input
              type="text"
              placeholder="password"
              value={password}
              style={{ display: "block", width: "100%" }}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            ></input>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={handlesubmit}
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#007bff",
                color: "white",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              submit
            </button>
            <button
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#007bff",
                color: "white",
                cursor: "pointer",
              }}
            >
              signup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
