import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { MyContextControllerProvider } from './index';
import Router from './routers/Router';
import { MenuProvider } from 'react-native-popup-menu';
import Admin from './screens/Admin';
import { Text } from 'react-native-paper';
import Login from './screens/Login';

const App = () => {
  const USERS = firestore().collection("USERS")
  const admin = {
    fullName: "Admin",
    email: "admin@gmail.com",
    password: "123456",
    phone: "0912456789",
    address: "Bình Dương",
    role: "admin" 
  }
  useEffect(()=>{
    USERS.doc(admin.email)
    .onSnapshot(
      u => {
        if (!u.exists)
        {
          auth().createUserWithEmailAndPassword(admin.email, admin.password)
          .then(response =>
            {
              USERS.doc(admin.email).set(admin)
              console.log("Add new account admin")
            })
        }
      }
    )
  }, [])
  return (
    <MyContextControllerProvider>
      <MenuProvider>
        <NavigationContainer>
          <Router/>
        </NavigationContainer>
      </MenuProvider>
    </MyContextControllerProvider>
  );
}
export default App
