import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Alert, Button, Form } from "react-bootstrap";

import image from "../assets/trans.png";

import { userLogin } from "../axios/axiosHelper";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../component/CustomInput";

const inputs = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    type: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "*******",
    type: "password",
    required: true,
  },
];
const initialState = {
  name: "",
  password: "",
};

const Login = ({ loggedInUser, setLoggedInUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [resp, setResp] = useState({});
  useEffect(() => {
    loggedInUser?._id && navigate("/dashboard");
  }, [setLoggedInUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await userLogin(formData);
    console.log(result.status)
    setResp({ status: result?.status, message: result?.message });
    if (result?.status === "success") {
      localStorage.setItem("user", JSON.stringify(result.user));

      navigate("/dashboard");
    }
  };

  return (
    <div className="login">
      <Container className="bg-white main m-2 rounded shadow-lg ">
        <Row className="m-2 p-2 box ">
          <Col
            lg={5}
            xs={12}
            className="p-2 d-flex justify-content-center align-items-center"
          >
            <img src={image} alt="" />
          </Col>
          <Col lg={7} xs={12} className="p-2 ">
            <Row className="w-100 d-flex justify-content-center align-items-center h-100 ">
              <Col xs={12} lg={7}>
                <h3>Welcome</h3>
                <p className="text-muted">
                  Please enter your details to continue.
                </p>
                {resp?.message && (
                  <Alert
                    variant={resp?.status === "success" ? "success" : "danger"}
                  >
                    {resp.message}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  {inputs.map((item, i) => {
                    return (
                      <CustomInput
                        key={i}
                        label={item.label}
                        {...item}
                        onChange={handleChange}
                      />
                    );
                  })}
                  <Row>
                    <Col xs={12} lg={5}>
                      <Button className="w-100" type="submit">
                        Login
                      </Button>
                    </Col>
                  </Row>
                </Form>
                <p className="py-3 text-center">
                  Don't have an Account? <a href="/signup">Sign Up</a>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
