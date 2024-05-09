import React, { useEffect, useState } from "react";
import { TopNav } from "../component/TopNav";
import { AuthComp } from "../component/AuthComp";
import {  Col, Container, Row } from "react-bootstrap";
import NewTransForm from "../component/NewTransForm";
import Transaction from "../component/Transaction";
import { fetchTrans } from "../axios/axiosHelper";
import ModalForm from "../component/ModalForm";
import PieChart from "../component/Piechart";


import { BsArrowUpCircleFill } from "react-icons/bs";
import { BsArrowDownCircleFill } from "react-icons/bs";

const Dashboard = ({ loggedInUser }) => {
  

  const [transactions, setTransactions] = useState([]);
  const totalbalance = transactions.reduce((a, b) => {
    return b.type === "income" ? a + Number(b.amount) : a - Number(b.amount);
  }, 0);
  const income = transactions.reduce((a, b) => {
    if (b.type === "income") {
      return a + Number(b.amount);
    } else {
      return a;
    }
  }, 0);
  const expenses = transactions.reduce((a, b) => {
    if (b.type === "expenses") {
      return a + Number(b.amount);
    } else {
      return a;
    }
  }, 0);

  const getUserTransaction = async () => {
    const { status, message, trans } = await fetchTrans();
    status === "error" ? console.log(message) : setTransactions(trans);
  };

  useEffect(() => {
    getUserTransaction();
  }, []);
  return (
    <div className="wrapper">
      <AuthComp loggedInUser={loggedInUser}>
        <TopNav loggedInUser={loggedInUser} />
        <Container className="main p-3 ">
          
          <h4> Welcome back <span className="text-capitalize">{loggedInUser?.name} !</span></h4>

          <Row className="p-2">
            <Col
              xs={12}
              md={7}
              lg={7}
              className="chart shadow-lg rounded p-3  "
            >
              <Row className="m-2 fw-bold ">
                Budget progress all time
              </Row>
              <Row>
                <Col xs={12} lg={5}>
                  <PieChart income={income} expenses={expenses}/>
                  
                </Col>
                <Col xs={12} lg={7} className="d-grid align-items-center mt-4 ">
                  <Row>
                    <Col className="d-flex gap-3 align-items-center">
                      <BsArrowDownCircleFill className="fs-3" color="#936ee3" />

                      <div>
                      <p className=" p-0 m-0 fw-bold">${income}</p>
                        <p className="p-0 m-0">Income</p>
                        
                      </div>
                    </Col>
                    <Col className="d-flex gap-3 align-items-center">
                      <BsArrowUpCircleFill className="fs-3" color="#ffc532" />
                      <div>
                      <p className="p-0 m-0 fw-bold">${expenses}</p>
                        <p className="  p-0 m-0">Expense</p>
                        
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col
              className=" p-2 d-md-block d-none "
              xs={0}
              md={5}
              lg={5}
            >
              <Row className="d-flex justify-content-center ">
                <Col>
                  <NewTransForm getUserTransaction={getUserTransaction} />
                </Col>
              </Row>
            </Col>
          </Row>

          <ModalForm getUserTransaction={getUserTransaction} />
          <Row>
            <Col xs={12} className="shadow-lg mt-3 mb-3 p-3 text-center">
              Available Balance<span className="fw-bold">:${totalbalance}</span>
            </Col>
          </Row>

          

          <Transaction transactions={transactions} getUserTransaction={getUserTransaction} />
        </Container>

        {/* <Footer /> */}
      </AuthComp>
    </div>
  );
};

export default Dashboard;
