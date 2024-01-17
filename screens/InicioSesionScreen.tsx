import { Alert, Button, StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

//FIREBASE
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");



  function limpiar() {
    setCorreo("");
    setContrasenia("");

  }


  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Inicio de sesión exitoso:", user);
        Alert.alert('Mensaje', 'Inicio con exito')
        navigation.navigate("Juego");
        limpiar();

    
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        switch (errorCode) {
          case "Las credenciales son incorrectas":
            Alert.alert("Error", "Las credenciales son incorrectas");
            break;
          case "La contraseña no se ha enviado":
            Alert.alert("Error", "La contraseña no se ha enviado");
            break;
          default:
            Alert.alert(errorCode, errorMessage);
            break;
        }
      });
  }

  return (
    
    <View style={styles.container}>
      <ImageBackground
       source={require("../assets/loginArana.jpg")} 
      style={styles.backgroundImage} 
      />
      <Text style={{ fontSize: 30, color:'blue', fontWeight:'bold', textAlign:'center', marginBottom:10  }}>Inicio de Sesión</Text>

      <TextInput
        placeholder="Ingrese correo"
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}

      />
      <TextInput
        placeholder="Ingresar contraseña"
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry={!contrasenia}
        style={styles.input}
      />

      <Button  title="Ingresar" onPress={() => login()} />
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
    padding: 10,
  },
  passwordInput: {
    flex: 1,
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  btn: {
    width: "60%",
    height: 50,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  Image:{
    width:300,
    height:200,
    resizeMode:'contain'

  }
})