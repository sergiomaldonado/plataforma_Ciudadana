import React, { Component } from 'react';
import './App.css';
import {Container, Row, Col, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SignUpLink } from './SingUpForm';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import SingOutButton from './SingOut';
import logoInicio from './assets/logoHome.png'

const Langing = ({ history }) => {
   
   return(
      <div>
         <Container fluid={false}>
            <Row className="rowLanding">
               <Col md={4} xs={12}>
               </Col>
               <Col md={4} xs={12}>

               <img width="90%" src={logoInicio}></img>
               <h1>Reporte Ciudadano</h1>
                <Link to={routes.SIGN_UP}> <Button style={{ marginBottom:"10px" }} variant="primary" size="lg" block>Registrarme Para Hacer Reporte</Button></Link>
                <Link to={routes.SIGN_IN}> <Button variant="light" size="lg" block>Ya tengo una cuenta</Button></Link>  
               </Col>
               <Col md={4} xs={12}>
               </Col>
            </Row>
         </Container>
      </div>
   )

}

 
 export default withRouter(Langing);
 

