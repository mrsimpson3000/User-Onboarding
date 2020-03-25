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

const formSchema = yup.object().shape({
  fname: yup.string("Please enter a name").required("First name is required"),
  lname: yup.string("Please enter a name").required("Last name is required"),
  email: yup
    .string("Please enter an email address")
    .email("You must enter a valid email address")
    .required("An email address is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      "Password needs 1 uppercase, 1 lowercase letter and 1 number"
    )
    .required("Please enter a password")
    .min(8, "Password needs to be 8 characters long"),
  confirm: yup
    .string()
    .required("Please re-type password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  role: yup.string(),
  terms: yup.boolean().oneOf([true], "Please accept the terms of use")
});

export default function MyForm() {
  // state for whether button is disabled or not
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // state for our form inputs
  const [formState, setFormState] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirm: "",
    role: "",
    terms: ""
  });

  // state for errors
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirm: "",
    role: "",
    terms: ""
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
          confirm: "",
          role: "",
          terms: ""
        });
      })
      .catch(error => console.log(error.response));
  };
  return (
    <Container>
      <Card className='mt-5 bg-success'>
        <CardBody>
          <h3 className='text-center'>
            Fill Out The Form To Add A New User To The System
          </h3>
          <hr />
          <Form className='pt-2'>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor='firstName'>
                    First Name
                    <Input
                      id='firstName'
                      type='text'
                      name='fname'
                      value={formState.fname}
                      onChange={inputChange}
                    />
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}
