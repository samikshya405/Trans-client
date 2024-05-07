import React from "react";
import { Button, Form } from "react-bootstrap";

export const CustomInput = ({label,...rest}) => {
  return (
    <Form.Group className="mb-3" >
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control {...rest} />
    </Form.Group>
  );
};

export const CustomSelect = ({label, options,...rest}) => {
    return (
      <Form.Group className="mb-3">
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Select className="mb-3" name="type" required {...rest}>
          <option>--Select--</option>
          {
            options.map((option,i)=>{
              return <option key={i} value={option.value}>{option.text}</option>
            })
          }
          
        </Form.Select>
      </Form.Group>
    );
  };