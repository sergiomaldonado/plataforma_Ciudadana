import { db, auth } from './firebase';

// User API

export const doCreateUser = (id, nombre, apellido, email, telefono, domicilio) =>
  db.ref(`users/${id}`).set({
    nombre,
    apellido,
    email, 
    telefono, 
    domicilio
    
  });


  const uid = () => auth.currentUser.uid

export const onceGetUsers = () =>

  db.ref('users/nutriologos/').once('value', snapshot => {

    return(
        snapshot.val()

    )
  })

