import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Alert, Button, Form } from "react-bootstrap";

import image from "../assets/trans.png";
import {CustomInput} from "../component/CustomInput";
import { MdError } from "react-icons/md";
import { postNewUser } from "../axios/axiosHelper";

const inputs = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    type: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "893478",
    type: "number",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "*******",
    type: "password",
    required: true,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "******",
    type: "password",
    required: true,
  },
];
const initialState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};
const SignUp = () => {
  const [formData, setformData] = useState(initialState);
  const [error, setError] = useState(false);
  const [resp, setResp] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResp({})
    if(name==="password" || "confirmPassword"){
        setError(false)
    }
    setformData({ ...formData, [name]: value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = formData;
    if (rest.password !== confirmPassword) {
      setError(true);
      return;
    }
    const data = await postNewUser(rest);
    setResp(data);
    data.status === "success" && setformData(initialState);

   
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
            <img src={image} alt="finance" />
          </Col>
          <Col lg={7} xs={12} className="p-2 ">
            <Row className="w-100 d-flex justify-content-center align-items-center h-100 ">
              <Col xs={12} lg={7}>
                <h3>Get Started</h3>
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
                        value={formData[item.name]}
                      />
                    );
                  })}
                  {error && (
                    <Form.Text className=" text-danger ">
                      <MdError /> Please make sure your password match
                    </Form.Text>
                  )}
                  <Row>
                    <Col xs={12} lg={5}>
                      <Button className="w-100 my-2" type="submit">
                        Sign Up
                      </Button>
                    </Col>
                  </Row>
                </Form>
                <p className="py-3 text-center">
                  Already have an Account? <a href="/">Log in</a>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
