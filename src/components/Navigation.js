import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import SingOutButton from './SingOut';
import * as routes from '../constants/routes';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Badge, } from 'react-bootstrap';
import { Mail, Bell, Power, MoreVertical } from 'react-feather';
import { db, auth } from '../firebase/firebase';
import AuthUserContext from './AuthUserContext';
import SingleLogo from './assets/singleLogo.png'

const Navigation = () =>

  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>

<div>
<Navbar className="navBar">
  <Navbar.Brand style={{ color: 'white' }} href="#home">Reporte Ciudadano</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar>
</div>

const NavigationNonAuth = () =>
<div>

<Navbar className="navBar">
  <Navbar.Brand href="#home"><img width="50px" src={SingleLogo}></img>Reporte Ciudadano</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
 </Navbar.Text>
  </Navbar.Collapse>
</Navbar>

</div>

export default Navigation;