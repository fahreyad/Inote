import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const HOST = "http://localhost:5000";
  const navigate = useNavigate();
  const [credensial, setCredensial] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setCredensial({ ...credensial, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await fetch(`${HOST}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credensial.email,
        password: credensial.password,
      }),
    });
    const json = await result.json();
    if (json.success) {
      localStorage.setItem("token", json.token);
      navigate("/");
    } else {
      alert("Please provide valid credensial");
    }
    console.log(json);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
