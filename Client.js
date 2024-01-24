import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import DataTable from 'react-data-table-component';
import InputGroup from 'react-bootstrap/InputGroup';
import * as yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import { FiEdit } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaSquarePhone } from "react-icons/fa6";
import { MdSettingsPhone } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { RiNumbersFill } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiDeleteBinFill } from "react-icons/ri";
import { NavLink, Navbar } from 'react-bootstrap'
import { IoIosHome } from "react-icons/io";
import { TbCategoryFilled } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { PiPowerFill } from "react-icons/pi";
const style1 = {
  headRow: {
    style: { color: "black", backgroundColor: "#0C1F2D", }
  },
  headCells: {
    style: { color: "#257783", backgroundColor: "#FFF5F5" }
  },
  cells: {
    style: { color: "#257783", backgroundColor: "#FFF5F5" }
  },
};
function Client() {
  const columns = [
    {
      name: "ClientId",
      selector: (row) => row.clientId,
      sortable: true,
    },
    {
      name: "ClientName",
      selector: (row) => row.clientName,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Gst",
      selector: (row) => row.gst,
    },
    {
      name: "Website",
      selector: (row) => row.website,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "PhoneNumber",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "CreatedBy",
      selector: (row) => row.createdBy,
    },

    {
      name: "ContactPerson",
      selector: (row) => row.contactPerson,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <Button variant="warning" onClick={() => handleEdit(row.clientId)}>
            <FiEdit />
          </Button>
          &nbsp;
         <Button variant="danger" onClick={() => handleCancelEdit(row.clientId)}>  
         <RiDeleteBinFill /></Button>
        </div>
      ),
    }
  ];
  const schema = yup.object().shape({
    phone: yup.number().positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10).required('Phone is required'),
    clientName: yup.string().required("ClientName required"),
    phoneNumber: yup.number().positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10).required('phoneNumber is required'),
    address: yup.string().required('address is  required'),
    gst: yup.string().required('gst is  required'),
    email: yup.string().email().required("Email is required"),
    website: yup.string().required("Website is required"),
    contactPerson: yup.string().required("ContactPerson is required"),
  });
  const [texting, setTexting] = useState("Save");
  const [editbtn, setEditbtn] = useState(false);
  const [input, setInput] = useState({
    clientName: '',
    phone: '',
    address: "",
    gst: "",
    website: "",
    email: "",
    contactPerson: "",
    phoneNumber: "",
  });
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  };

  const [api, setApi] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://catodotest.elevadosoftwares.com/Client/GetAllClientDetails')
        .then((res) => {
          setApi(res.data.clientList);
        })
    };

    fetchData();
  }, []);
  const handleSubmit = () => {
    console.log("save")
    if (editbtn) {
      handleUpdate();
    }
    else {
      handleSave();
    }
  };
  const handleSave = async () => {
    console.log("savefunction")
    const newItem = {
      clientName: input.clientName,
      phone: input.phone,
      address:input.address,
      gst: input.gst,
      website: input.website,
      email: input.email,
      contactPerson: input.contactPerson,
      phoneNumber:input.phoneNumber,
      createdBy:1,
    };
    console.log(newItem)
    setApi((prevData) => [...prevData, newItem]);
    const response = await axios.post("http://catodotest.elevadosoftwares.com/Client/InsertClient", newItem)
    console.log("Data saved:", response.api);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });

  }
  const handleBack = () => {
    setInput({
      clientName: '',
      phone: '',
      address: '',
      gst: '',
      website: '',
      email: '',
      contactPerson: '',
      phoneNumber: '',
    });
  }
  const handleEdit = (id) => {
    console.log(id)
    let result = api.filter(val => val.clientId == id)
    console.log(id)
    console.log(result)
    result.map(res => {
      setInput({
        ...input,
        clientId:id,
        clientName: res.clientName,
        phone: res.phone,
        address: res.address,
        gst: res.gst,
        website: res.website,
        email: res.email,
        contactPerson: res.contactPerson,
        phoneNumber: res.phoneNumber,
        createdBy: 1,
      })
    })
    setEditbtn(true)
    setTexting("Update")
  };
  const handleUpdate = async () => {
    const data = {
      clientId: input.clientId,
      clientName: input.clientName,
      phone: input.phone,
      address: input.address,
      gst: input.gst,
      website: input.website,
      email:input.email,
      contactPerson:input.contactPerson,
      phoneNumber: input.phoneNumber,
      createdBy: 1,
    };
    console.log(data);
    const response = await axios.post("http://catodotest.elevadosoftwares.com/Client/InsertClient", data)
    .then((response) => {
      console.log("Data saved:", response.data);
    })
    .catch((error) => {
      console.error('Error saving data:', error);
    });
    Swal.fire({
      title: "Do you want to update the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "update",
      denyButtonText: `Don't update`
    });
  };
  const handleCancelEdit = async (id) => {
    const del = {
      clientId: id,
      removeRemarks: "test",
      createdBy: 1,
    };
    console.log(del);
    const response = await axios.post("http://catodotest.elevadosoftwares.com/Client/RemoveClient", del)
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Your work is deleted",
      showConfirmButton: false,
      timer: 1500
    });
  };
  let username = sessionStorage.getItem("username");
  return (
    <div >
      <div className='bar'>
      <p className="store">Welcome {username} </p>
        <Navbar >
        <Navbar.Brand href='/home' style={{color:`white`}}><h3><IoIosHome />Home</h3></Navbar.Brand>&nbsp;&nbsp;&nbsp;
        <NavLink href='/next'><h3><TbCategoryFilled />Category</h3></NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink href='/client'><h3><FaUsers />Cilent</h3></NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink href='/login'><h3><PiPowerFill />Logout</h3></NavLink>
      </Navbar>
      </div>
    <div style={{ backgroundColor: `#257783`, color: `#FFF3FA` }}>
      <Formik
        initialValues={input}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange }) => (
          <Form noValidate onSubmit={handleSubmit} >
            <div className='nex'>
              <Row>
                <Col md={3}><Form.Label>ClientName:</Form.Label>

                  <InputGroup.Text id="basic-addon1"><FaCircleUser />
                    &nbsp;&nbsp;&nbsp;    <Form.Control
                      type='text'
                      id="clientName"
                      name="clientName"
                      placeholder='ClientName'
                      value={input.clientName}
                      onChange={(e) => {
                        handleInput(e);
                        handleChange(e);
                      }}
                    />
                  </InputGroup.Text>
                  <ErrorMessage name="clientName" />
                </Col>



                <Col md={3}><Form.Label>Phone:</Form.Label>

                  <InputGroup.Text id="basic-addon1"><FaSquarePhone />

                    &nbsp;&nbsp;&nbsp;    <Form.Control
                      type='text'
                      id="phone"
                      name="phone"
                      placeholder='Phone'
                      value={input.phone}
                      onChange={(e) => {
                        handleInput(e);
                        handleChange(e);
                      }}
                    />
                  </InputGroup.Text>
                  <ErrorMessage name="phone" />
                </Col>


                <Col md={3}><Form.Label>Address:</Form.Label>

                  <InputGroup.Text id="basic-addon1"><FaAddressCard />

                    &nbsp;&nbsp;&nbsp;    <Form.Control
                      type='text'
                      id="address"
                      name="address"
                      placeholder='Address'
                      value={input.address}
                      onChange={(e) => {
                        handleInput(e);
                        handleChange(e);
                      }}
                    />
                  </InputGroup.Text>
                  <ErrorMessage name="address" />
                </Col>


                <Col md={3}><Form.Label>Gst:</Form.Label>

                  <InputGroup.Text id="basic-addon1"><RiNumbersFill />

                    &nbsp;&nbsp;&nbsp;    <Form.Control
                      type='text'
                      id="gst"
                      name="gst"
                      placeholder='Gst'
                      value={input.gst}
                      onChange={(e) => {
                        handleInput(e);
                        handleChange(e);
                      }}
                    />
                  </InputGroup.Text>
                  <ErrorMessage name="gst" />
                </Col>
              </Row>
            </div>


            <div className='nex'>
              <Row>
                <Col md={3}><Form.Label>Website:</Form.Label>

                  <InputGroup.Text id="basic-addon1"><CgWebsite />

                    &nbsp;&nbsp;&nbsp;    <Form.Control
                      type='text'
                      id="website"
                      name="website"
                      placeholder='Website'
                      value={input.website}
                      onChange={(e) => {
                        handleInput(e);
                        handleChange(e);
                      }}
                    />
                  </InputGroup.Text>
                  <ErrorMessage name="website" />
                </Col>



                <Col md={3}><Form.Label>Email:</Form.Label>

                  <InputGroup.Text id="basic-addon1"><MdMarkEmailUnread />

                    &nbsp;&nbsp;&nbsp;    <Form.Control
                      type='text'
                      id="email"
                      name="email"
                      placeholder='Email'
                      value={input.email}
                      onChange={(e) => {
                        handleInput(e);
                        handleChange(e);
                      }}
                    />
                  </InputGroup.Text>
                  <ErrorMessage name="email" />
                </Col>


                <Col md={3}><Form.Label>ContactPerson:</Form.Label>

                  <InputGroup.Text id="basic-addon1"><IoPersonAddSharp />

                    &nbsp;&nbsp;&nbsp;    <Form.Control
                      type='text'
                      id="contactPerson"
                      name="contactPerson"
                      placeholder='ContactPerson'
                      value={input.contactPerson}
                      onChange={(e) => {
                        handleInput(e);
                        handleChange(e);
                      }}
                    />
                  </InputGroup.Text>
                  <ErrorMessage name="contactPerson" />
                </Col>


                <Col md={3}><Form.Label>PhoneNumber:</Form.Label>

                  <InputGroup.Text id="basic-addon1"><MdSettingsPhone />

                    &nbsp;&nbsp;&nbsp;    <Form.Control
                      type='text'
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder='PhoneNumber'
                      value={input.phoneNumber}
                      onChange={(e) => {
                        handleInput(e);
                        handleChange(e);
                      }}
                    />
                  </InputGroup.Text>
                  <ErrorMessage name="phoneNumber" />
                </Col>
              </Row>
            </div>
            <Row>
              <Col md={5}></Col>
              <Col md={4}></Col>
              <Col md={3}>
                <Button variant="success" type="submit">
                  {texting}
                </Button>&nbsp;&nbsp;
                <Button type='cancel' variant="danger" onClick={handleBack}>Cancel</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      <DataTable
        columns={columns}
        data={api}
        customStyles={style1}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        selectableRowsHighlight
        highlightOnHover
      />
    </div>
    </div>
  )
}

export default Client