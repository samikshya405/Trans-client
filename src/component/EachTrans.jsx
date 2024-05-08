import React from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { GiReceiveMoney } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const EachTrans = ({ setidToDelete, idToDelete, ...item }) => {
  const handleCheckedBox = (e) => {
    const { name, checked } = e.target;
    console.log(idToDelete);
    if (checked) {
      setidToDelete([...idToDelete, name]);
    } else {
      setidToDelete(idToDelete.filter((id) => id != item._id));
    }
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center  shadow-lg rounded p-2 mb-2 bordered gap-3"
      style={{
        background: idToDelete?.includes(item._id) ? "#B4A6AB" : "white",
        color: idToDelete?.includes(item._id) ? "white" : "inherit",
      }}
    >
      <div className=" d-flex align-items-center gap-3">
        <Form.Check name={item._id} checked={idToDelete.includes(item._id)} onChange={handleCheckedBox} />
        <div
          className="circle shadow-lg"
          style={{
            background: item.type === "income" ? "green" : "rgb(202, 51, 51)",
          }}
        >
          {item.type === "income" ? (
            <GiReceiveMoney color="white" />
          ) : (
            <FaMoneyBillTrendUp fontSize={"40px"} color="white" />
          )}
        </div>
        <p className="fw-bold transaction-title text-capitalize ">{item.title}</p>
      </div>
      <div className="flex-item">
        <Row>
          <Col lg={6} xs={12} md={6}>
            {item.type === "income" ? (
              <p className="text-success price">+${item.amount}</p>
            ) : (
              <p className="text-danger price">-${item.amount}</p>
            )}
          </Col>
          <Col lg={6} xs={12} md={6}>
            <p className="text-muted date">{item.date.slice(0, 10)}</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EachTrans;
