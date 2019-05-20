import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Navigation from './Navigation'
import {Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import logoInicio from './assets/logoHome.png'
import Landing from './Landing'
import Home from './Home'
import Singin from './SingInPage'
import Singup from './SingUpPage'
import Acount from './acount'
import * as routes from '../constants/routes'
import { firebase } from '../firebase';
import withAuthentication from './withAutentication'

const App = () =>
  
      <Router>
        <div>
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
     <Singin/>
     <Route exact path={routes.HOME} component={ Home } />
     <Route exact path={routes.SIGN_IN} component={ Singin } />
     <Route exact path={routes.SIGN_UP} component={ Singup } />
     <Route exact path={routes.ACCOUNT} component={ Acount } />
     </div>
        </div>
      </Router>
  
export default withAuthentication(App);

