import React from "react";
// import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className="login-form">
          <h3 className="text-center">Login Form</h3>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <button className="login-btn" type="submit">
              Login
            </button>
          </Form.Item>
          <div className="register-link">
            <Link to="/register">Not a user? Register here</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
