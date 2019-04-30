import { auth } from './firebase'

// Registrar
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)

  // Iniciar Sesion
export const doSignInWithEmailAndPassword = (email, password) =>
auth.signInWithEmailAndPassword(email, password);

// Cerrar Sesion
export const doSignOut = () =>
  auth.signOut() 

  // Recuperar Contraseña
export const doPasswordReset = (email) =>
auth.sendPasswordResetEmail(email);

// Cambiar Contraseña
export const doPasswordUpdate = (password) =>
auth.currentUser.updatePassword(password);

