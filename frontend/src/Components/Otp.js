import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Otp({ setState }) {
  const [otp, setOtp] = useState();
  const navigation = useNavigate();
  async function handleSubmit() {
    try {
      const res = await fetch("http://localhost:4000/api/v1/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "fail") {
        window.alert(data.message);
      }
      if (data.status === "success") {
        navigation("/homepage");
      }
      // setState(false);
    } catch (e) {}
  }
  async function handleSubmit1() {
    let email = localStorage.getItem("email");
    try {
      const res = await fetch("http://localhost:4000/api/v1/sendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          // localStorage.getItem("email"),
          // password,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.status === "fail") {
        // setState(true);
        window.alert(data.message);
      } else {
        window.alert("otp resend successfully");
        // setState(true);

        // navigation("/homepage");
        // handleSubmit();
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
          boxSizing: "border-box",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          padding: "40px",
          gap: "20px",
          background: "linear-gradient(45deg, #2193b0, #6dd5ed)",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#333" }}>Enter OTP</h1>
        <div>
          <label style={{ display: "block", color: "#333" }}>Enter OTP</label>
          <br />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            style={{
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              width: "300px",
            }}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
        </div>
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
        <p style={{ color: "#333", textAlign: "center" }}>
          Didn't receive the OTP?{" "}
          {/* <a href="#" style={{ color: "#007bff" }}>//
            Resend
          </a> */}
          <button
            onClick={handleSubmit1}
            style={{
              color: "#007bff",
              border: "none",
              background: "none",
              fontSize: "20px",
            }}
          >
            resend
          </button>
        </p>
      </div>
    </div>
  );
}
