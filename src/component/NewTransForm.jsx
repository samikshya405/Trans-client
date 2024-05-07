import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput, CustomSelect } from "./CustomInput";
import { postNewTrans } from "../axios/axiosHelper";

const inputs = [
  {
    name: "type",
    type: "text",
    placeholder: "type",
    required: true,
    elemtype: "select",
    options: [
      {
        value: "income",
        text: "Income",
      },
      {
        value: "expenses",
        text: "Expenses",
      },
    ],
  },
  {
    name: "title",
    type: "text",
    placeholder: "Title",
    required: true,
  },
  {
    name: "amount",
    type: "number",
    placeholder: "$0.0",
    required: true,
  },
  {
    name: "date",
    type: "date",
    required: true,
  },
];

const NewTransForm = ({getUserTransaction, handleClose}) => {
    const [formData, setFormData] = useState({})
  const handleOnChange = (e) => {
    const {name,value} = e.target

        setFormData({...formData, [name]:value})
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const {message, status} = await postNewTrans(formData)
    
    handleClose && handleClose()
       
     getUserTransaction && getUserTransaction()
  
        

  }
  return (
    <>
      <Form onSubmit={handleSubmit} className="p-4">
        {inputs.map(({ elemtype, ...item }, index) => {
          return (
            <div key={index}>
              {elemtype === "select" ? (
                <CustomSelect {...item} onChange={handleOnChange}  />
              ) : (
                <CustomInput {...item} onChange={handleOnChange}  />
              )}
            </div>
          );
        })}
        <div className="w-100">
          <Button style={{background:"var(--btn)", color:"white"}} type="submit" className="w-100">
            Add Transaction
          </Button>
        </div>
      </Form>
    </>
  );
};

export default NewTransForm;
