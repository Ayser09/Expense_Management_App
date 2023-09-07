import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layouts/Layout";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect = () => {};
  return (
    <>
      <Layout></Layout>
    </>
  );
};

export default Register;
