import React, { Component } from 'react'
import withAutorization from './withAutorization'
import { db, auth, storage } from '../firebase/firebase'
import { Container, Row, Col, Navbar, Card, Form, Button, ProgressBar, FormControl, Tabs, Tab, ListGroup} from 'react-bootstrap';
import { Home, Bell, User, Droplet, Trash, Gitlab, Truck, ChevronLeft, Image, MoreVertical, ChevronRight} from 'react-feather';
import './navStyle.css'
import SideNav from './navegacion/sideBar/nav.js'
import Navigation from './Navigation.js'
import icoLampara from './assets/lampara.svg'
import icoanimal from './assets/animal.svg'
import visto from './assets/visto.svg'
import  enviado from './assets/enviado.svg'
import Autocomplete from 'react-google-autocomplete'
import Map from './map.js'
import moment from 'moment'
import DatePicker from 'react-date-picker'
import { relative } from 'path'
import Loader from './assets/loader.svg'
import SingOutButton from './SingOut'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgReporte from './assets/imgReporte.jpg'



const estadoInicial = {
  users: null,
  hola:"hi",
  homeActivo:true,
  notificacionesActivo:false,
  perfilActivo:false,
  reporteActivo:false,
  reporte1:false,
  reporte2:false,
  place:null,
  /*** Reporte de Fuga de Agua */
  descripciónFugaAgua:"",
  latFugaAgua:"",
  longFugaAgua:"",
  date: new Date(),
  loader: 0,
  imagen:null,
  porcentaje:"%",
  mostrandoListadoDeReportes:"1"
}

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...estadoInicial
    };
  }
  componentDidMount() { 
    db.ref('reportes/reportesBasura').on('value', snapshot => { 
      this.setState({
        ListadoReportesDeDeBasura:snapshot.val(),
        mesActual:moment().format('MMMM')  === "January"?"Enero":
        moment().format('MMMM') === "February"?"Febrero":
        moment().format('MMMM') === "March"?"Marzo":
        moment().format('MMMM') === "April"?"Abril":
        moment().format('MMMM') === "May"?"Mayo":
        moment().format('MMMM') === "June"?"Junio":
        moment().format('MMMM') === "July"?"Julio":
        moment().format('MMMM') === "August"?"Agosto":
        moment().format('MMMM') === "September"?"Septiembre":
        moment().format('MMMM') === "October"?"Octubre":
        moment().format('MMMM') === "November"?"Noviembre":
        moment().format('MMMM') === "December"?"Diciembre":null,
        añoActual:moment().format('YYYY'),
        horaExacta:moment().format('h:mm:ss')
                   })
      })
      db.ref(`reportes/fugasDeAgua/2019 /Abril/noAtendidos`).on('value', snapshot => { 
        this.setState({
          ListadoReportesFugasDeAguaNoAtendidos:snapshot.val()
                     })
                })
      db.ref(`reportes/fugasDeAgua/${this.state.anoActual}/Abril/enProceso`).on('value', snapshot => { 
        this.setState({
          ListadoReportesFugasDeAguaEnProceso:snapshot.val()
                      })
                })    
      db.ref(`reportes/fugasDeAgua/${this.state.anoActual}/Abril/atendidos`).on('value', snapshot => { 
          this.setState({
          ListadoReportesFugasDeAguaAtendidos:snapshot.val()
                                         })
                                    })                        
    
        
      db.ref(`users/${auth.currentUser.uid}`).on('value', snapshot => { 
        this.setState({
          datosUsuarioLogeado:snapshot.val()
                     })
        })
    this.setState({
      usuarioLogeado:auth.currentUser.uid
    })

    db.ref(`users/${auth.currentUser.uid}/notificaciones`).on('value', snapshot => { 
   
      this.setState({
       notificacionesUsuarios:snapshot.val()
                   })
      })
  }

 

  seleccionDeFecha = (date)=> {
    this.setState({
      startDate: date,
      diaSelecto:date
    });
  }
  traerReportesUsuario = () =>{
    db.ref(`reportes/reporteBasura`).on('value', snapshot => { 
      this.setState({
        reportes: snapshot.val()
      })
    })
  }

  /** ENVIAR REPORTE DE BASURA */
  crearReporteDeBasura = () =>{
    const claveUnica = db.ref().push();
    const claveDeReporte = claveUnica.key  
    db.ref(`reportes/reportesBasura/${this.state.añoActual}/${this.state.mesActual}/noAtendidos/${claveDeReporte}`).set({
      creador:this.state.usuarioLogeado,
      inicio:Date(this.state.date),
      descripción:this.state.descripciónFugaAgua,
      reporteCreado:moment().format('MMMM Do YYYY, h:mm:ss a'),
      mes:this.state.mesActual,
      año:this.state.añoActual,
      horaExacta:this.state.horaExacta,
      lat:this.state.latitudReporteEnProceso,
      lng:this.state.longitudReporteEnProceso,
      img:this.state.url,
      rutaAnterior:"noAtendidos",
      estado:"noAtendidos",
      direccion:this.state.direccionReporteEnProceso,
      claveDeReporte:claveDeReporte,
      visto:0
    })




    db.ref(`users/${this.state.usuarioLogeado}/reportes/reportesBasura/`).push({
      id:claveDeReporte
    }
    )
    this.setState({
      ...estadoInicial
    })
  }
  borrarReporteBasura = (claveDeReporte) =>{
    
    db.ref(`reportes/reportesBasura/${claveDeReporte}`).remove(()=>{

      this.notificacionDietaGuardada()
    })
    

  }

   /** ENVIAR REPORTE FUGA DE AGUA */
  crearReporteFugaDeAgua = () =>{
    const claveUnica = db.ref().push();
    const claveDeReporte = claveUnica.key  
    db.ref(`reportes/fugasDeAgua/${this.state.añoActual}/${this.state.mesActual}/noAtendidos/${claveDeReporte}`).set({
      creador:this.state.usuarioLogeado,
      inicio:Date(this.state.date),
      descripción:this.state.descripciónFugaAgua,
      reporteCreado:moment().format('MMMM Do YYYY, h:mm:ss a'),
      mes:this.state.mesActual,
      año:this.state.añoActual,
      horaExacta:this.state.horaExacta,
      lat:this.state.latitudReporteEnProceso,
      lng:this.state.longitudReporteEnProceso,
      img:this.state.url,
      rutaAnterior:"noAtendidos",
      estado:"noAtendidos",
      direccion:this.state.direccionReporteEnProceso,
      claveDeReporte:claveDeReporte,
      visto:0
    })
    db.ref(`users/${this.state.usuarioLogeado}/reportes/fugasDeAgua/`).push({
      id:claveDeReporte
    }
    )
    this.setState({
      ...estadoInicial
    })
  }


  descripciónFuga = (e) =>{
    this.setState({descripciónFugaAgua:e.target.value})
  }
  onChange = (date) => this.setState({ date })


  datosHijo = (lat, long, direccion)=>{

    this.setState({
      latitudReporteEnProceso:lat,
      longitudReporteEnProceso:long,
      direccionReporteEnProceso:direccion
    })

  }

   
  notificacionDietaGuardada = () => {toast.success("Se elimino tu reporte", {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true
    })}

  subidaDeimagen (event) {
    const file = event.target.files[0];
    const storageRef = storage.ref(`imagenesReportes/${file.name}`);
    const task = storageRef.put(file);
    const uid = this.state.usuarioLogeado
    task.on('state_changed', (snapshot) => {
      let porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        loader: porcentaje
      })
    }, (error) => {
      console.error(error.message)
    }, () => {
            storage.ref('imagenesReportes').child(file.name).getDownloadURL().then(url => {
            this.setState({url});  
        })
         {/** this.setState({
        imagen: task.snapshot.downloadURL
   }) **/}
    })
  }
  render() {
      const ListadoReportesDeDeBasura = this.state.ListadoReportesDeDeBasura ?this.state.ListadoReportesDeDeBasura:false
      const datosUsuarioLogeado = this.state.datosUsuarioLogeado ?this.state.datosUsuarioLogeado:false
      const AguaNoAtendidos = this.state.ListadoReportesFugasDeAguaNoAtendidos ?this.state.ListadoReportesFugasDeAguaNoAtendidos:0
      const AguaEnProceso = this.state.ListadoReportesFugasDeAguaEnProceso ?this.state.ListadoReportesFugasDeAguaEnProceso:0
      const AguaAtendidos = this.state.ListadoReportesFugasDeAguaAtendidos ?this.state.ListadoReportesFugasDeAguaAtendidos:0
      
      const ListadoReportesFugasDeAgua =  this.state.ListadoReportesFugasDeAguaNoAtendidos ?this.state.ListadoReportesFugasDeAguaNoAtendidos:false
      const notificacionesUsuarios = this.state.notificacionesUsuarios ?this.state.notificacionesUsuarios :false
      return(
        
          <div>
            {
              this.state.reporteActivo == true
            ? (
                /*** CREAR REPORTE FUGA DE AGUA */
                 this.state.reporte1 == true 
                 ?<div className="reporte1">
                 <Navbar className="navBar">
                    <Navbar.Brand href="#home" style={{  color:"white"  }} > <ChevronLeft onClick={()=>this.setState({reporteActivo:false, reporte1:false})}  className="regreso-ico" size="40"/>Reporte Fuga de Agua</Navbar.Brand>
                     <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text></Navbar.Text>
                      </Navbar.Collapse>
                     </Navbar> 

                  <Form style={{  padding:"10px"  }}>
                   <p>Selecciona la fecha en que inicio el problema</p>
                     <DatePicker onChange={(date)=>this.setState({date})} value={this.state.date}/>
                       <Form.Group controlId="exampleForm.ControlTextarea1">
                         <Form.Label>Descripción del Problema</Form.Label>
                         <Form.Control onChange={(e)=>this.setState({descripciónFugaAgua:e.target.value})} value={this.state.descripciónFugaAgua} as="textarea" rows="3" />
                       </Form.Group>
                  </Form>
                  {/** PROCESO DE CARGA DE IMAGEN */}
                  {this.state.loader === 0
                      ? <div></div>
                      : <img className="imagenMuestra" style={{height:"220px", textAlign:"center"}} src={this.state.url} circle />
                  }
                  {this.state.loader === 0
                     
                      ?<div style={{position:"relative", marginBottom:"50px"}}>
                         <h4 style={{position:"absolute"}}><Image size={20}/> Agregar Imagen</h4>
                         <div  style={{position:"absolute", opacity:"0"}} >
                         <FormControl className="buttonPic" type="file" placeholder="+Aregar Fotografia" onChange={this.subidaDeimagen.bind(this)}></FormControl>
                         </div>
                       </div>
                      :<div></div>
                   }
                   {this.state.loader === 0
                      
                      ? <div></div>
                      :this.state.loader === 100
                       ?null
                       :<div>
                         {/*** Mensaje mientras se carga la imagen */}
                        <p>Espera un momento, tu imagen se esta subiendo...
                        <ProgressBar animated bsStyle="success" label={`${Math.round(this.state.loader)}%`} now={this.state.loader} /></p>
                        </div>
                   }
                   { /****** SELECCION DE DIRECCION DEL REPORTE */} 
                     <Map
				             google={this.props.google}
					           center={{lat: 25.66660828990133, lng:-97.81584093689577}}
					           height='300px'
				             zoom={14}
                     datosHijo={(lat, lng, direccion)=>this.datosHijo(lat, lng, direccion)}
                     style={{marginTop:"30px"}}
			               />
                     <Button size="lg"  style={{  marginTop:"40px", marginBottom:"100px"  }} onClick={this.crearReporteFugaDeAgua} block>Enviar Reporte</Button>
               
                   
                 </div>

                /*** CREAR REPORTE DE BASURA */
                 :this.state.reporte2 == true 
                 ?<div className="reporte1">

                 <Navbar className="navBar">
                    <Navbar.Brand href="#home" style={{  color:"white"  }} > <ChevronLeft onClick={()=>this.setState({reporteActivo:false, reporte1:false})}  className="regreso-ico" size="40"/>Reporte Problema de Basura</Navbar.Brand>
                     <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text></Navbar.Text>
                      </Navbar.Collapse>
                     </Navbar> 

                  <Form style={{  padding:"10px"  }}>
                   <p>Selecciona la fecha en que inicio el problema</p>
                     <DatePicker onChange={(date)=>this.setState({date})} value={this.state.date}/>
                       <Form.Group controlId="exampleForm.ControlTextarea1">
                         <Form.Label>Descripción del Problema</Form.Label>
                         <Form.Control onChange={(e)=>this.setState({descripciónFugaAgua:e.target.value})} value={this.state.descripciónFugaAgua} as="textarea" rows="3" />
                       </Form.Group>
                  </Form>
                  {/** PROCESO DE CARGA DE IMAGEN */}
                  {this.state.loader === 0
                      ? <div></div>
                      : <img className="imagenMuestra" style={{height:"220px", textAlign:"center"}} src={this.state.url} circle />
                  }
                  {this.state.loader === 0
                     
                      ?<div style={{position:"relative", marginBottom:"50px"}}>
                         <h4 style={{position:"absolute"}}><Image size={20}/> Agregar Imagen</h4>
                         <div  style={{position:"absolute", opacity:"0"}} >
                         <FormControl className="buttonPic" type="file" placeholder="+Aregar Fotografia" onChange={this.subidaDeimagen.bind(this)}></FormControl>
                         </div>
                       </div>
                      :<div></div>
                   }
                   {this.state.loader === 0
                      
                      ? <div></div>
                      :this.state.loader === 100
                       ?null
                       :<div>
                         {/*** Mensaje mientras se carga la imagen */}
                        <p>Espera un momento, tu imagen se esta subiendo...
                        <ProgressBar animated bsStyle="success" label={`${Math.round(this.state.loader)}%`} now={this.state.loader} /></p>
                        </div>
                   }
                   {/****** SELECCION DE DIRECCION DEL REPORTE */}
                     <Map
				             google={this.props.google}
					           center={{lat: 25.66660828990133, lng:-97.81584093689577}}
					           height='300px'
				             zoom={14}
                     datosHijo={(lat, lng,direccion)=>this.datosHijo(lat, lng, direccion)}
                     style={{marginTop:"30px"}}
			               />
                     <Button size="lg"  style={{  marginTop:"40px", marginBottom:"100px"  }} onClick={this.crearReporteDeBasura} block>Enviar Reporte</Button>
                </div>
                 
                 :null
              )
                 /** TERMINA REPORTE DE BASURA */
                   
              :<div>
              { 
              this.state.homeActivo == true
              ?<div>
              <Navigation/> 
             <Row style={{ margin:"1%" }}>
              <Col md={12} xs={12}><h5>¿Quieres crear un reporte?</h5></Col>
              {/*** FUGA DE AGUA */}
              <Col className="content" style={{  marginBottom:"10px"  }} md={6} xs={6}>
              <Card onClick={()=>this.setState({reporteActivo:true, reporte1:true})} bg="primary" text="white" style={{ width: '100%', height: "100%" }}>
               <Card.Body>
                <Card.Title className="icon_reportes"><Droplet  size="50"/></Card.Title>
                 <Card.Text className="icon_reportes">
                  Fuga de Agua
                 </Card.Text>
                  </Card.Body>
               </Card>
              </Col>
              {/*** PROBLEMA DE BASURA */}
              <Col className="content" md={6} xs={6} style={{  marginBottom:"10px"  }}>
              <Card onClick={()=>this.setState({reporteActivo:true, reporte2:true})}  bg="info" text="white" style={{ width: '100%' }}>
               <Card.Body>
                <Card.Title className="icon_reportes"><Trash size="50"/></Card.Title>
                 <Card.Text className="icon_reportes">
                  Problema de Basura
                 </Card.Text>
                  </Card.Body>
               </Card>
              </Col>
                 {/*** PROBLEMA DE FAUNA SALVAJE */}
              <Col className="content" md={6} xs={6} style={{  marginBottom:"10px"  }}>
              <Card bg="success" text="white" style={{ width: '100%', height: "100%" }}>
               <Card.Body>
                <Card.Title className="icon_reportes"><Gitlab size="50"/></Card.Title>
                 <Card.Text className="icon_reportes">
                  Problema de Fauna Salvaje
                 </Card.Text>
                  </Card.Body>
               </Card>
              
              
              </Col>
               {/*** PROBLEMA DE ALUMBRADO */}
              <Col className="content" md={6} xs={6} style={{  marginBottom:"10px"  }}>
              <Card bg="warning" text="white" style={{ width: '100%' }}>
               <Card.Body>
                <Card.Title className="icon_reportes"><img src={icoLampara}></img></Card.Title>
                 <Card.Text className="icon_reportes">
                  Problema de Alumbrado
                 </Card.Text>
                  </Card.Body>
               </Card>
              </Col>
              {/** PROBLEMA DE VIALIDAD */}
              <Col className="content" md={6} xs={6}>
              <Card bg="dark" text="white" style={{ width: '100%' }}>
               <Card.Body>
                <Card.Title className="icon_reportes"><Truck size="50"/></Card.Title>
                 <Card.Text className="icon_reportes">
                 Problema de Vialidad
                 </Card.Text>
                  </Card.Body>
               </Card>
              </Col>
              <Col className="content" md={6} xs={6}>
              <Card bg="danger" text="white" style={{ width: '100%' }}>
               <Card.Body>
                <Card.Title className="icon_reportes"><img src={icoanimal}/></Card.Title>
                 <Card.Text className="icon_reportes">
                 Maltrato Animal
                 </Card.Text>
                  </Card.Body>
               </Card>
              </Col>
            </Row>
          
              </div>
              :null
            }
              </div>

            }

       
            { 
              this.state.notificacionesActivo == true
              ?<div>

             {
              notificacionesUsuarios
              ? <div>
                {Object.keys(notificacionesUsuarios).reverse().map( key =>

                  <ListGroup>
  <ListGroup.Item action variant={
    notificacionesUsuarios[key].estado === 0 
    ?"success"
     :notificacionesUsuarios[key].estado === 1
      ?"light":null
  }>
  <Container>
    <Row>
      <Col md={10} xs={10}>
      {notificacionesUsuarios[key].mensaje}
      </Col>
      <Col md={2} xs={2}>
     <ChevronRight size="30"></ChevronRight>
      </Col>
    </Row>
  </Container>
 
  </ListGroup.Item>
  
</ListGroup>
                  
                       )
                      }
              </div>
              :<p>No encontramos notificaciones</p>
             }

              
              </div>
              :null
            }
            { 
              this.state.perfilActivo == true
              ?<div>
            
          
              <Card style={{ width: '100%', textAlign:"center" }}>
              <Card.Body>
                  <Card.Title>{datosUsuarioLogeado.nombre} {datosUsuarioLogeado.apellido}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{datosUsuarioLogeado.domicilio}</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">{datosUsuarioLogeado.telefono}</Card.Subtitle>
                  <SingOutButton ></SingOutButton>
                  <Card.Text>
                  </Card.Text>
                  </Card.Body>
              </Card>
              <ToastContainer />
              
              <Form.Group style={{ margin:"10px" }} controlId="exampleForm.ControlSelect1">
    <Form.Label>Mis Reportes</Form.Label>
    <Form.Control onChange={(e)=>this.setState({ mostrandoListadoDeReportes:e.target.value })} as="select">
      <option value="1">Fugas de Agua</option>
      <option value="2">Problemas de Basura</option>
      <option>Probemas Fauna Salvaje</option>
      <option>Problemas de Alumbrado</option>
      <option>Problemas de Vialidad</option>
      <option>Maltrado Animal</option>
    </Form.Control>
  </Form.Group>
  {
                this.state.mostrandoListadoDeReportes === "1"
                ? ListadoReportesFugasDeAgua 
                     ?<div style={{ marginBottom:"30px" }}>
                      {Object.keys(ListadoReportesFugasDeAgua).map( key =>
                      /* Rectangle 3: */
                      <Col style={{ minWidth: '100%', display:`${this.state.usuarioLogeado ===  ListadoReportesFugasDeAgua[key].creador ?"":"none"}`}} xs={12} md={12}>
                        <Card style={{ paddingBottom:"-10px", backgroundSize:"cover", width: '100%', backgroundImage: `url(${this.state.usuarioLogeado === ListadoReportesFugasDeAgua[key].creador ?ListadoReportesFugasDeAgua[key].img :null})` }}>
                          <Card.Body style={{ backgroundImage:"linear-gradient(-180deg, rgba(7,4,36,0.65) 0%, rgba(1,0,5,0.97) 100%)" }}>     
                            <p>{this.state.usuarioLogeado ===  ListadoReportesFugasDeAgua[key].creador
                                 ?<Row>
                                   <Col style={{ color:"white" }} xs={10} md={10}><p>{ListadoReportesFugasDeAgua[key].descripción}</p>
                                      <p style={{ fontSize:"10px" }}>{ListadoReportesFugasDeAgua[key].direccion}</p>
                                      <p style={{ fontSize:"10px" }}>{ListadoReportesFugasDeAgua[key].visto <= 0 ?<img style={{ width:"20px"}} src={enviado}></img>:<img style={{ width:"20px"}} src={visto}></img>} {moment(ListadoReportesFugasDeAgua[key].reporteCreado).startOf('day').locale('es').fromNow() }</p>
                                   </Col>
                                   <Col md={2} xs={2}><Trash onClick={()=>this.borrarReporteBasura(ListadoReportesFugasDeAgua[key].claveDeReporte)} style={{ color:"white", marginTop:"40px" }} size="30"></Trash></Col>
                                  </Row>
                                 :null
                                 }
                            </p>
                           </Card.Body>
                         </Card>
                       </Col>
                       )
                      }
                       </div>
                 :<img src={Loader}></img>
                :null
              }
              <div style={{ marginBottom:"30px" }}>
                   
                    
                      <Col style={{ minWidth: '100%'}} xs={12} md={12}>
                        <Card style={{ paddingBottom:"-10px", backgroundSize:"cover", width: '100%', backgroundImage: `url(${imgReporte})` }}>
                          <Card.Body style={{ backgroundImage:"linear-gradient(-180deg, rgba(7,4,36,0.65) 0%, rgba(1,0,5,0.97) 100%)" }}>     
                          
                                
                                   <Col style={{ color:"white" }} xs={10} md={10}><p>Hay una fuga desde hace varios dias.</p>
                                      <p style={{ fontSize:"10px" }}>Diaz Miron #407 Col. Anahuac 2</p>
                                      <p style={{ fontSize:"10px" }}>{1 <= 0 ?<img style={{ width:"20px"}} src={enviado}></img>:<img style={{ width:"20px"}} src={visto}></img>} 12/19/19</p>
                                   </Col>
                                   <Col md={2} xs={2}><Trash  style={{ color:"white", marginTop:"40px" }} size="30"></Trash></Col>
                               
                     
                           </Card.Body>
                         </Card>
                       </Col>
                      
                      
                       </div>
              {
                this.state.mostrandoListadoDeReportes === "2"
                ? ListadoReportesDeDeBasura 
                     ?<div style={{ marginBottom:"30px" }}>
                      {Object.keys(ListadoReportesDeDeBasura).map( key =>
                      /* Rectangle 3: */
                      <Col style={{ minWidth: '100%', display:`${this.state.usuarioLogeado ===  ListadoReportesDeDeBasura[key].creador ?"":"none"}`}} xs={12} md={12}>
                        <Card style={{ paddingBottom:"-10px", backgroundSize:"cover", width: '100%', backgroundImage: `url(${this.state.usuarioLogeado === ListadoReportesDeDeBasura[key].creador ?ListadoReportesDeDeBasura[key].img :null})` }}>
                          <Card.Body style={{ backgroundImage:"linear-gradient(-180deg, rgba(7,4,36,0.65) 0%, rgba(1,0,5,0.97) 100%)" }}>     
                            <p>{this.state.usuarioLogeado ===  ListadoReportesDeDeBasura[key].creador
                                 ?<Row>
                                   <Col style={{ color:"white" }} xs={10} md={10}><p>{ListadoReportesDeDeBasura[key].descripción}</p>
                                      <p style={{ fontSize:"10px" }}>{ListadoReportesDeDeBasura[key].direccion}</p>
                                      <p style={{ fontSize:"10px" }}>{ListadoReportesDeDeBasura[key].estado <= 0 ?<img style={{ width:"20px"}} src={enviado}></img>:<img style={{ width:"20px"}} src={visto}></img>} {moment(ListadoReportesDeDeBasura[key].reporteCreado).startOf('day').locale('es').fromNow() }</p>
                                   </Col>
                                   <Col md={2} xs={2}><Trash onClick={()=>this.borrarReporteBasura(ListadoReportesDeDeBasura[key].claveDeReporte)} style={{ color:"white", marginTop:"40px" }} size="30"></Trash></Col>
                                  </Row>
                                 :null}
                            </p>
                           </Card.Body>
                         </Card>
                       </Col>
                       )
                      }
                       </div>
                 :<img src={Loader}></img>
                :null
              }
               </div>
              :null
            }
       
          <Navbar className="bottomNav" expand="lg" variant="light" bg="light" fixed="bottom" sticky="bottom">
          <Container>
      
          <Container>
            <Row>
              <Col className="icon_bottomNav" md={4} xs={4}><Home onClick={()=>this.setState({homeActivo:true, notificacionesActivo:false, perfilActivo:false})} size="25"/></Col>
              <Col className="icon_bottomNav" md={4} xs={4}><Bell onClick={()=>this.setState({homeActivo:false, notificacionesActivo:true, perfilActivo:false,reporteActivo:false, reporte1:false})} size="25"/></Col>
              <Col className="icon_bottomNav" md={4} xs={4}><User onClick={()=>this.setState({homeActivo:false, notificacionesActivo:false, perfilActivo:true,reporteActivo:false, reporte1:false})} size="25"/></Col>
            </Row>
          </Container>
  </Container>
</Navbar>
         
    </div>
            )
  }
}



const authCondition = (authUser) => !!authUser;

export default withAutorization(authCondition)(HomePage);

