import React, {Component} from 'react'

import { Container, Row, Col, ListGroup} from 'react-bootstrap';
import './style.css'

class SideNav extends Component{
         constructor(props){
            super(props)
         }
         render(){
            return(
                
                <Col className="sideNav" md={2} xs={12}>
               <ListGroup>
                 <ListGroup.Item action variant="light">
                   Reportes
                 </ListGroup.Item>
                 <ListGroup.Item action variant="light">
                   Historial
                 </ListGroup.Item>
                 <ListGroup.Item action variant="light">
                   Edital Indicador
                 </ListGroup.Item>
               </ListGroup>
                
               </Col>
             
            )
        }

}


export default SideNav;