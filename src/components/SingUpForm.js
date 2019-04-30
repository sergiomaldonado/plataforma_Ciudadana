import React, { Component } from 'react';
import Navigation from './Navigation'
import './App.css';
import { auth, db } from './../firebase'
import {Form, Row, Col,Navbar,Button} from 'react-bootstrap'
import {
    Link,
    withRouter,
  } from 'react-router-dom';
  import * as routes from '../constants/routes';
import SingleLogo from './assets/singleLogo.png'
import { Mail, Bell, Power, ChevronLeft } from 'react-feather';


const SignUpPage = ({ history }) =>

     <div>
     <Navbar className="navBar">
  <Navbar.Brand href="#home"> <Link to={routes.LANDING}><ChevronLeft className="regreso-ico" size="40"/></Link><img width="50px" src={SingleLogo}></img>Reporte Ciudadano</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
 </Navbar.Text>
  </Navbar.Collapse>
</Navbar>
     <h1>Registrate</h1>
     <SignUpForm history={history} />
     </div>

const INITIAL_STATE = {
    nombre: '',
    apellido:'',
    email: '',
    telefono: '',
    matricula: '',
    pacientes:'',
    dietas:'',
    recetas:'',
    agenda:'',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    domicilio:""
  };

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });  
  
class SignUpForm extends Component {
 
        constructor(props) {
          super(props);
          this.state = { ...INITIAL_STATE };
        }
      
        onSubmit = (event) => {
            const {
                nombre,
                apellido,
                email,
                telefono,
                matricula,
                passwordOne,
                domicilio
              } = this.state;

              const {
                history,
              } = this.props;
          
              auth.doCreateUserWithEmailAndPassword(email, passwordOne)
                .then(authUser => {
              db.doCreateUser(authUser.user.uid, nombre, apellido, email, telefono, domicilio )
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          history.push(routes.HOME);
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
                })
                .catch(error => {
                  this.setState(byPropKey('error', error));
                });
          
              event.preventDefault();
      
        }
      
        render() {

            const {
                nombre,
                apellido,
                email,
                telefono,
                matricula,
                pacientes,
                dietas,
                recetas,
                agenda,
                passwordOne,
                passwordTwo,
                error,
                domicilio,
              } = this.state;
              const isInvalid =
              passwordOne !== passwordTwo ||
              passwordOne === '' ||
              email === '' ||
              telefono === '' ||
              matricula === '' ||
              apellido === ''
              nombre === '';
           
            
          return (
            <div className="form-registro">
            <Form onSubmit={this.onSubmit} >
            <Form.Group controlId="formGridAddress1">
  <Row>
    <Col>
    <Form.Label>Nombre</Form.Label>
      <Form.Control value={nombre} onChange={event => this.setState(byPropKey('nombre', event.target.value))} placeholder="Tu Nombre" />
    </Col>
    <Col>
    <Form.Label>Apellido</Form.Label>
      <Form.Control value={apellido} onChange={event => this.setState(byPropKey('apellido', event.target.value))} placeholder="Tu Apellido" />
    </Col>
  </Row>
  </Form.Group>
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Correo Electronico</Form.Label>
    <Form.Control  value={email} onChange={event => this.setState(byPropKey('email', event.target.value))}placeholder="micorreo@goo.com" />
  </Form.Group>
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Telefono</Form.Label>
    <Form.Control  value={telefono} onChange={event => this.setState(byPropKey('telefono', event.target.value))} placeholder="894 123 4567" />
  </Form.Group>
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Domicilio</Form.Label>
    <Form.Control value={domicilio} onChange={event => this.setState(byPropKey('domicilio', event.target.value))} placeholder="Calle 1 Colonia Benito Juarez" />
  </Form.Group>
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Contraseña</Form.Label>
    <Form.Control value={passwordOne} onChange={event => this.setState(byPropKey('passwordOne', event.target.value))} type="password"  placeholder="Elige una Contraseña" />
  </Form.Group>
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Confirmar Contraseña</Form.Label>
    <Form.Control value={passwordTwo} onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))} type="password"  placeholder="Confirma tu Contraseña" />
  </Form.Group>
  { error && <p>{error.message}</p> }
  <Button type="submit" variant="primary" size="lg" block>Registrarme</Button>
</Form>

            </div>
            
          );
        }
      }
      
      const SignUpLink = () =>
        <p>
          Don't have an account?
          {' '}
          <Link to={routes.SIGN_UP}>Sign Up</Link>
        </p>
      

export default withRouter(SignUpPage);
export {
    SignUpForm,
    SignUpLink,
  };