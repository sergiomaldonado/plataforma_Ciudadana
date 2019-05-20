import React from 'react';
import {Button} from 'react-bootstrap'

import { auth } from '../firebase';

const SignOutButton = () =>

  <Button  onClick={auth.doSignOut} variant="danger">Cerrar Sesión</Button>
 

export default SignOutButton;