import React, { useEffect, useState } from "react";
import EachTrans from "./EachTrans";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { GiSevenPointedStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteTrans } from "../axios/axiosHelper";

const btns = ["All", "Income", "Expenses"];

const Transaction = ({ transactions,getUserTransaction }) => {
  const [button, setButton] = useState("All");
  const [list, setlist] = useState([]);
  const [idToDelete, setidToDelete] = useState([])
  const income = transactions.filter((item) => item.type === "income");
  const expenses = transactions.filter((item) => item.type === "expenses");

  const handleBtnClick = (item) => {
    setButton(item);
    if (item === "Income") {
      setlist(income);
    } else if (item === 'Expenses') {
      setlist(expenses);
    } else {
      setlist([...transactions]);
    }
  };
  const handleDelete=async()=>{
    const res= await deleteTrans(idToDelete)
    setidToDelete([])
    getUserTransaction()
  }
  useEffect(() => {
    setlist([...transactions]);
  }, [transactions]);
  return (
    <>
    <Row>
        <Col xs={12} md={8} lg={8}>
        <div className="py-4 d-flex justify-content-between">
        <ButtonGroup aria-label="Basic example" className="shadow-lg ">
          {btns.map((item, i) => {
            return (
              <Button
                key={i}
                style={{
                  background: item === button ? "var(--btn)" : "white",
                  color: item === button ? "white" : "black",
                  fontWeight: "bold",
                  border: "none",
                }}
                onClick={() => handleBtnClick(item)}
              >
                {item}
              </Button>
            );
          })}
        </ButtonGroup>
        {
            idToDelete.length>0 && <RiDeleteBin6Line color="red" className="fs-4" role="button" onClick={handleDelete}/>
        }
        
      </div>

        </Col>
    </Row>
    
      
      <Row>
        <Col xs={12} md={8} lg={8}>
          {list?.map((item,i) => {
            return <EachTrans key={i} setidToDelete={setidToDelete} idToDelete={idToDelete} {...item}  />;
          })}
        </Col>
        <Col xs={12} md={4} lg={4} className="">
          <div className="bg-white shadow-lg p-3">
            <p className="fw-bold">Budget Rules</p>
            <p>
              <GiSevenPointedStar /> The art is not in making money, but in
              keeping it.
            </p>
            <p>
              <GiSevenPointedStar /> It's not your salary that makes you rich,
              it's your spending habits.
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Transaction;
