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
  fname: yup.string().required("First name is required"),
  lname: yup.string().required("Last name is required")
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
    role: "",
    terms: ""
  });

  // state for errors
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
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
