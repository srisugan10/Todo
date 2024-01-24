import React from "react";
import { Col, NavLink, Navbar, Row } from "react-bootstrap";
import { IoIosHome } from "react-icons/io";
import { TbCategoryFilled } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { PiPowerFill } from "react-icons/pi";
import { BiSolidCategory } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import gif_1 from '../image/gif_1.gif';
import { Link } from "react-router-dom";
import Next from "./Next";
function Home() {
  let username = sessionStorage.getItem("username");
  return (
    <div>
      <div className="bar">
      <p className="store">Welcome {username} </p>
        <Navbar>
          <Navbar.Brand href="/home" style={{ color: `white` }}>
            <h3>
              <IoIosHome />Home
            </h3>
          </Navbar.Brand>
          &nbsp;&nbsp;&nbsp;
          <NavLink href="/next">
            <h3>
              <TbCategoryFilled />
              Category
            </h3>
          </NavLink>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink href="/client">
            <h3>
              <FaUsers />
              Cilent
            </h3>
          </NavLink>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink href="/login">
            <h3>
              <PiPowerFill />
              Logout
            </h3>
          </NavLink>
         
        </Navbar>
      </div>
      <div className="div"></div>
      <div className="back">
        <Row>
          <Col md={6}>
            <Row>
              <Col md={3}></Col>
              <Col md={5} >
                <h2 className="hello">
                  Welcome <br />
                 <span> to my site...</span>
                </h2><br/><br/>
                <Row style={{fontSize:`40px`,paddingLeft:`50px`}}>
                  <Col md={3}></Col>
                  <Col md={9}>
                    <BiSolidCategory /> 
                  &nbsp;<FaUserGroup /></Col>
                </Row>
              </Col>

              <Col md={4}></Col>
            </Row>
          </Col>
          <Col md={6}>
            <Col md={11}>
              <img  className='image' src={gif_1}/>
            </Col>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
