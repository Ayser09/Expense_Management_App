import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import axios from "axios";
import Button from "react-bootstrap/Button";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  useEffect = () => {};
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);
    try {
      const { data: res } = await axios.post(
        `http://localhost:8080/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        localStorage.setItem("token", res.data);
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Layout>
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button
              variant="outline-warning"
              onClick={() => {
                navigate("/forgot-password");
              }}
              style={{ marginLeft: "150px", marginRight: "auto" }}
            >
              Forgot Password
            </Button>
          </Form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
