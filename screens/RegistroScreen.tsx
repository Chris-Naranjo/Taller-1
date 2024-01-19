import { StyleSheet, Text, View, Button, Alert, Image, ImageBackground } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

//FIREBASE
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";
import { getDatabase, ref, set } from "firebase/database";
import { db } from '../config/Config';

export default function RegistroScreen({ navigation }: any) {
  const [correo, setcorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [nick, setNik] = useState("");
  const [edad, setEdad] = useState("");

  const [userId, setuserId] = useState('')

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        Alert.alert("Registro Exitoso")
        navigation.navigate("Inicio Sesion");
        setuserId(user.uid)
        console.log(userId);
        guardar(user.uid, nick, correo, edad)
        
        //console.log('Registro exitoso')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        //console.log(errorCode);
        if (errorCode === "auth/email-already-in-use") {
          Alert.alert("Error", "El correo ingresado ya esta en uso");
        }else if ( errorCode=== 'auth/weak-password'){
            Alert.alert("Error", "La contraseña debe poseer 6 caracteres")
        }
      });
    }
      function guardar (userId:string, correo: string, nick: string, edad: string) {
        set(ref(db, 'jugadores/' + userId), {
          email: correo,
          nick: nick,
          edad: edad,
          url: "https://c0.klipartz.com/pngpicture/81/570/gratis-png-perfil-logo-iconos-de-computadora-usuario-usuario-thumbnail.png"
        });
      }
    
      function compuesta() {
        registro();
       // guardar(userID, nick, correo, edad)
      
  }

  return (
    <View style={styles.container}>
         <ImageBackground
    source={require("../assets/Registro1.jpg")} 
   style={styles.backgroundImage} 
   />
      <Text style={{ fontSize: 30, color:'blue', fontWeight:'bold', textAlign:'center', marginBottom:10  }}>Ingresa Información</Text>
      <TextInput
        placeholder="ingrese email"
        onChangeText={(texto) => setcorreo(texto)}
        style={styles.input}
      />

      <TextInput
        placeholder="Ingrese un Nik"
        onChangeText={(texto) => setNik(texto)}
        style={styles.input}
      />
      <TextInput
        placeholder="Ingrese su edad"
        onChangeText={(texto) => setEdad(texto)}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="ingrese contrasenia"
        onChangeText={(texto) => setContrasenia(texto)}
        style={styles.input}
      />

<Button title='registrarse' onPress={() => compuesta()} />

   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "90%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    //width:'80%',
    //borderWidth:1,
    //height:45,
    //marginBottom:10,
    //borderRadius:10
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    borderWidth: 1,
    height: 45,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10
  },
});