import React, { useEffect,  useState } from 'react';
import { CiLock } from "react-icons/ci";
import * as yup from 'yup';
import { useFormik } from 'formik';
import {  useNavigate } from 'react-router-dom';
import { FormControl,Form,Button, InputGroup } from 'react-bootstrap';
import { FiUsers } from "react-icons/fi";
import { MdPassword } from "react-icons/md";
import Swal from 'sweetalert2';
function Login() {
     
  const navigate=useNavigate()
  const [formValues, setFormValues] = useState({
    name: '',
    password: ''
  });
  const match={
    name:"suganthi",
    password:"1234sugan"
  }
 
  useEffect(() => {
    if (formValues.name === match.name && formValues.password === match.password){
    } 
  },[formValues]);
  const formik = useFormik({
    initialValues: {
      name: '',
      password: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      password: yup.string().required('Password is required').min(8, 'Password should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    }),
    
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      const match = {
        name: 'suganthi',
        password: '1234sugan',
      };
  sessionStorage.setItem("username", formValues.name)
      if (values.name === match.name && values.password === match.password) {
        navigate('/submit');
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have sucsessfully logged in ",
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
  });
  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
    formik.handleChange(e);
  };
  return (
    <div className='container'>
    <div className='app-wrapper'>
    <div className='header'>
  <h1>Login page</h1> 
</div>
<h4 className='name'>UserName:suganthi</h4>
<h4  className='name'>Password:1234sugan</h4>
    <Form onSubmit={formik.handleSubmit}>
      <div className='form'><br />
      <InputGroup.Text id="basic-addon1"><FiUsers />
      &nbsp;&nbsp;&nbsp; <FormControl
          type='text'
          id='name'
          name='name'
          placeholder='Username'
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          value={formValues.name}
        /></InputGroup.Text>
        {formik.touched.name && formik.errors.name && (
          <p style={{ color: 'red' }}>{formik.errors.name}</p>
        )}
        <br /><br /><br />
        <InputGroup.Text id="basic-addon1"><MdPassword />
        &nbsp;&nbsp;&nbsp; <FormControl
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          value={formValues.password}
        /></InputGroup.Text>
        {formik.touched.password && formik.errors.password && (
          <p style={{ color: 'red' }}>{formik.errors.password}</p>
        )}
        <br /><br /><br />
        <Button type='submit'> <CiLock />Submit </Button>
      </div>
    </Form>
    </div>
    </div>
  );
}
export default Login
