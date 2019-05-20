import React, { Component } from 'react';
import { SignUpLink } from './SingUpForm';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import Navigation from './Navigation'
import {Form, Row, Col, Navbar, Button} from 'react-bootstrap'
import {ChevronLeft} from 'react-feather'
import SingleLogo from './assets/singleLogo.png'
import {
  Link,
  withRouter,
} from 'react-router-dom';

const SignInPage = ({ history }) =>
<div>
    
    <SignInForm history={history} />
    <SignUpLink />
</div>
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
        
       
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div>
      <Navbar className="navBar">
       <Navbar.Brand href="#home"> <Link to={routes.LANDING}><ChevronLeft className="regreso-ico" size="40"/></Link><img width="50px" src={SingleLogo}></img>Iniciar Sesión</Navbar.Brand>
        <Navbar.Toggle />
         <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            </Navbar.Text>
          </Navbar.Collapse>
      </Navbar>
     
<Form onSubmit={this.onSubmit}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control  value={email} onChange={event => this.setState(byPropKey('email', event.target.value))} type="text" placeholder="Email Address" type="email" placeholder="Enter email" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control value={password} onChange={event => this.setState(byPropKey('password', event.target.value))} type="password" placeholder="Password" type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicChecbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Entrar
  </Button>
  { error && <p>{error.message}</p> }
</Form>


      
      </div>
     
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};