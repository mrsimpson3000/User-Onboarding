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
    .min(8, "Password needs to be at least 8 characters long"),
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
  const [users, setUsers] = useState([]);
  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const formSubmit = event => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(response => {
        setUsers(...users, response.data);
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

  const validateChange = event => {
    // Reach allows us to "reach" into the schema and test only one part
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [event.target.name]: ""
        });
      })
      .catch(error => {
        setErrors({ ...errors, [event.target.name]: error.errors[0] });
      });
  };

  const inputChange = event => {
    event.persist();
    const newFormData = {
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    };
    validateChange(event);
    setFormState(newFormData);
  };
  console.log(users);
  return (
    <Container>
      <Card className='mt-5 ml-5 mr-5 bg-success'>
        <CardBody>
          <h3 className='text-center'>
            Fill Out The Form To Add A New User To The System
          </h3>
          <hr />
          <Form onSubmit={formSubmit} className='p-2'>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor='firstName'>
                    First Name
                    <Input
                      className='pl-4 pr-4'
                      id='firstName'
                      type='text'
                      name='fname'
                      value={formState.fname}
                      onChange={inputChange}
                    />
                    {errors.fname.length > 0 ? (
                      <p className='text-danger'>{errors.fname}</p>
                    ) : (
                      <p>&nbsp;</p>
                    )}
                  </Label>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor='lastName'>
                    Last Name
                    <Input
                      className='pl-4 pr-4'
                      id='lastName'
                      type='text'
                      name='lname'
                      value={formState.lname}
                      onChange={inputChange}
                    />
                    {errors.lname.length > 0 ? (
                      <p className='text-danger'>{errors.lname}</p>
                    ) : (
                      <p>&nbsp;</p>
                    )}
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor='email'>
                    Email
                    <Input
                      className='pl-4 pr-4'
                      id='email'
                      type='email'
                      name='email'
                      value={formState.email}
                      onChange={inputChange}
                    />
                    {errors.email.length > 0 ? (
                      <p className='text-danger'>{errors.email}</p>
                    ) : (
                      <p>&nbsp;</p>
                    )}
                  </Label>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor='Role'>
                    Role
                    <Input
                      className='pl-5 pr-5'
                      id='role'
                      type='select'
                      name='role'
                      value={formState.role}
                      onChange={inputChange}
                    >
                      <option value='Team Lead'>Team Lead</option>
                      <option value='Designer'>Web Designer</option>
                      <option value='Front End'>Front End Dev</option>
                      <option value='Back End'>Back End Dev</option>
                    </Input>
                    <p>&nbsp;</p>
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor='password'>
                    Password
                    <Input
                      className='pl-4 pr-4'
                      id='password'
                      type='password'
                      name='password'
                      value={formState.password}
                      onChange={inputChange}
                    />
                  </Label>
                  {errors.password.length > 0 ? (
                    <p className='text-danger'>{errors.password}</p>
                  ) : (
                    <p>&nbsp;</p>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor='confirm'>
                    Confirm Password
                    <Input
                      className='pl-4 pr-4'
                      id='confirm'
                      type='password'
                      name='confirm'
                      value={formState.confirm}
                      onChange={inputChange}
                    />
                  </Label>
                  <p>&nbsp;</p>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col>
                <FormGroup>
                  <Label htmlFor='terms' className='flexMe'>
                    Terms & Conditions
                    <Input
                      id='terms'
                      type='checkbox'
                      name='terms'
                      checked={formState.terms}
                      onChange={inputChange}
                    />
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <pre>{JSON.stringify(users, null, 2)}</pre>
            <Button color='primary' disabled={buttonDisabled}>
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}
