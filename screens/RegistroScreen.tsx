import { StyleSheet, Text, View, Button, Alert, Image, ImageBackground } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

//FIREBASE
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";

export default function RegistroScreen({ navigation }: any) {
  const [correo, setcorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [nik, setNik] = useState("");
  const [edad, setEdad] = useState("");

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        navigation.navigate("Inicio Sesion");

        //console.log('Registro exitoso')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode);
        if (errorCode === "auth/email-already-in-use") {
          Alert.alert("Error", "El correo ingresado ya esta en uso");
        }
      });
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

      <Button title="registrarse" onPress={() => registro()} />
   
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