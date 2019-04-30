
import React, { Component } from 'react'
import {Navbar, Button} from 'react-bootstrap'


export default class componentName extends Component {

    constructor(props){
        super(props)
        this.state={
             paso:1
        }

    }


  render() {
    return (
      <div>
      <Navbar style={{ backgroundColor:"red" }}bg="dark">
    <Navbar.Brand href="#home">
      <h3 style={{ color:"white" }}>Perfil de Usuario</h3>
    </Navbar.Brand>
  </Navbar>
  <Button onClick={()=>this.setState({ paso:2 })} variant="primary">Primary</Button>

     <h1>Estoy en el perfil de usuario</h1>
      </div>
    )
  }
}
