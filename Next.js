import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row,Col,Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import DataTable from 'react-data-table-component';
import InputGroup from 'react-bootstrap/InputGroup';
import * as yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import { useState,useEffect } from 'react';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdOutlineNotes } from "react-icons/md";
import Swal from 'sweetalert2';
import axios from 'axios';
import { NavLink, Navbar } from 'react-bootstrap'
import { IoIosHome } from "react-icons/io";
import { TbCategoryFilled } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { PiPowerFill } from "react-icons/pi";
const style1 = {
    headRow: {
      style: { color: "black", backgroundColor:"#0C1F2D" ,}
    },
    headCells: {
      style: { color: "#257783",backgroundColor: "#FFF5F5"}
    },
    cells: {
      style: { color: "#257783",backgroundColor: "#FFF5F5" }
    },
  };
function Next() {
    const columns = [
        {
          name: "category",
          selector: (row) => row.category,
          sortable: true,
        },
        {
          name: "description",
          selector: (row) => row.description,
        },
        {
          name:"categoryId",
          selector:(row)=>row.categoryId,
        },
        {
          name:"createdBy",
          selector:(row)=>row.createdBy,
        },
      
        {
          name: "Action",
          selector: (row) => (
            <div>
               <Button variant="warning" onClick={() => handleEdit(row.categoryId)}>
                    <FiEdit />
                  </Button>
                  &nbsp;&nbsp;

                  <Button variant="danger" onClick={() => handleCancelEdit(row.categoryId)}>
                    <RiDeleteBin6Line />
                  </Button>
              
            </div>
          ),
        }
        
      ];
      const schema = yup.object().shape({
        category : yup.string().required('Category is required'),
        description : yup.string().required('Description required'),
      });
      const [text,setText]=useState("Save")
      const [editing, setEditing] = useState(false);
  const [num, setNum] = useState({
    category  : '',
    description: '',
    categoryId:"",
    createdBy:"",
  });
  const handleInput = (e) => {
   setNum({...num,[e.target.name]:e.target.value})
  };
  
  const [roll, setRoll] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://catodotest.elevadosoftwares.com/Category/GetAllCategories')
        .then((res) => {
          setRoll(res.data.categoryList);
        })
    };

    fetchData();
  }, []);
  const handleSubmit = () => {
    
    console.log("save")


    if(editing){
      handleUpdate();
    }
    else{
    handleSave();
    }
  };
  const handleSave=async()=>{
    console.log("savefunction")
    const newItem = {
      categoryId:0,
        category:  num.category,
        description : num.description ,
        createdBy:1, 
      };
      console.log(newItem)
      const response=await axios.post("http://catodotest.elevadosoftwares.com/Category/InsertCategory", newItem)
     
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      
  }
    const handleBack=()=>{
        setNum({
          category: '',
          description: '',
          });
      }
      const handleEdit = (id) => {
        console.log(id)
      let result=roll.filter(val=>val.categoryId==id)
      console.log(id)
      console.log(result)
      result.map(res=>{
        setNum({...num,
        category:res.category,
        description:res.description,
        categoryId:res.categoryId,
        })
      })
      setEditing(true)
      setText("Update")
      };
      const handleUpdate= async () => {
        const data={
          categoryId:num.categoryId,
          category:  num.category,
          description : num.description ,
          createdBy:1, 
        };
        console.log(data);
        const response=await axios.post("http://catodotest.elevadosoftwares.com/Category/InsertCategory", data)
        Swal.fire({
          title: "Do you want to update the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "update",
          denyButtonText: `Don't update`
        });
      };
      const handleCancelEdit = async(id) => {
        const del={
          categoryId:id,
          removeRemarks:"test",
          createdBy:1, 
        };
        console.log(del);
        const response=await axios.post("http://catodotest.elevadosoftwares.com/Category/RemoveCategory", del)
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
    <div style={{backgroundColor:`#257783`,color:`#FFF3FA`}}>
              <Formik
       initialValues={num}
       validationSchema={schema}
       onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <div className='nex'>
              <Row>
              <Col md={3}></Col>
              <Col md={3}>
              <Form.Label>Category:</Form.Label>
              </Col>
              <Col md={6}></Col>
              </Row>
              <Row>
                <Col md={4}></Col>
                <Col md={5}>
                <InputGroup.Text id="basic-addon1"><BiSolidCategoryAlt />
                &nbsp;&nbsp;&nbsp;    <Form.Control
                type='text'
                id="category"
                name="category"
                placeholder='Category'
                value={num.category}
                onChange={(e)=>{
                  handleInput(e);
                  handleChange(e);
                }}
              />
              </InputGroup.Text>
              <ErrorMessage name="category" />
              </Col>
              <Col md={3}></Col>
              </Row>
            </div>
            <div>
            <Row>
              <Col md={3}></Col>
              <Col md={3}>
              <Form.Label>Description:</Form.Label>
              </Col>
              <Col md={6}></Col>
              </Row>
              <Row>
              <Col md={4}></Col>
                <Col md={5}>
                <InputGroup.Text id="basic-addon1"><MdOutlineNotes />
                &nbsp;&nbsp;&nbsp; <Form.Control
                type='text'
                id="description"
                name="description"
                placeholder='Description'
                value={num.description}
                onChange={(e)=>{
                  handleInput(e);
                  handleChange(e);
                }}
              />
              </InputGroup.Text>
              <ErrorMessage name="description" />
              </Col>
              </Row>
            </div>
            <Row>
              <Col md={5}></Col>
              <Col md={4}></Col>
              <Col md={3}>
            <Button variant="success" type="submit">
              {text}
            </Button>&nbsp;&nbsp;
            <Button type='cancel'  variant="danger" onClick={handleBack}>Cancel</Button>
            </Col>
            </Row>
          </Form>
        )}
      </Formik>
       <DataTable
        columns={columns}
        data={roll}
        customStyles={style1}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10,20,30]}
        selectableRowsHighlight
        highlightOnHover
      />
    </div>
    </div>
  )
}

export default Next
