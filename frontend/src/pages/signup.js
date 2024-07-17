// import react from "react";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setconfromPassword] = useState("");
  const navigation = useNavigate();
  async function handlesubmit() {
    try {
      const response = await fetch("https://bootcamp-wine.vercel.app/api/v1/users", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, conformPassword }),
      });

      const result = await response.json();
      console.log("Success:", result);
      if (result.statusCode === 200) {
        navigation("/login");
      } else {
        window.alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert(error);
    }
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
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          padding: "40px",
          borderRadius: "8px",
          background: "linear-gradient(45deg, #2193b0, #6dd5ed)",
        }}
      >
        <h1
          style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
        >
          signup
        </h1>
        <label style={{ marginBottom: "5px", color: "darkblue" }}>
          enter name
        </label>
        <input
          type="text"
          placeholder="enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <label style={{ marginBottom: "5px", color: "darkblue" }}>
          enter email
        </label>
        <input
          type="email"
          placeholder="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <label style={{ marginBottom: "5px", color: "darkblue" }}>
          enter your password
        </label>
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <label style={{ marginBottom: "5px", color: "darkblue" }}>
          conform password
        </label>
        <input
          type="text"
          onChange={(e) => {
            setconfromPassword(e.target.value);
          }}
          style={{
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <br></br>
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
            Submit
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
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
