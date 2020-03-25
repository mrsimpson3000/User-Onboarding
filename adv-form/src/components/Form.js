import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import {
  Container,
  Card,
  CardBody,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

export default function MyForm() {
  // state for whether button is disabled or not
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // state for our form inputs
  const [formState, setFormState] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: ""
  });

  // state for errors
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: ""
  });

  // state to set our post request to
  const [post, setPost] = useState([]);

  const formSubmit = event => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(response => {
        setPost(response.data);
        console.log("success", post);
        // reset for if success
        setFormState({
          fname: "",
          lname: "",
          email: "",
          password: "",
          role: ""
        });
      })
      .catch(error => console.log(error.response));
  };
  return null;
}
