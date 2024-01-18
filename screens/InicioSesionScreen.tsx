import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

//FIREBASE
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const showHiddenPassword = () => {
    setShowPassword(!showPassword);
  };

  function limpiar() {
    setCorreo("");
    setContrasenia("");
  }

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //console.log("Inicio de sesión exitoso:", user);
        Alert.alert("Mensaje", "Inicio con exito");
        navigation.navigate("Tabs");
        limpiar();
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        switch (errorCode) {
          case "auth/invalid-email":
            Alert.alert("Error", "Datos Invalidos, Ingrese credenciales");
            break;
          case "auth/missing-password":
            Alert.alert("Error", "Ingrese la contraseña");
            break;
            case "auth/invalid-credential":
              Alert.alert("Error", "Credenciales Invalidas");
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
      <Text
        style={{
          fontSize: 30,
          color: "blue",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Inicio de Sesión
      </Text>

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
        secureTextEntry={!showPassword}
        style={styles.input}
        />
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHiddenPassword}
            
          />
        
      

      <Button title="Ingresar" onPress={() => login()} />
      <Text
        onPress={() => navigation.navigate("Registro")}
        style={styles.registroLink}
      >
        👮 Regístrate aquí 👮
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "80%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centra los elementos horizontalmente
    height: '100%', // Ajusta según sea necesario
  },

  input: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    borderWidth: 1,
    height: 60,
    marginBottom: 30,
    borderRadius: 10,
    padding: 20,
  },
  icon: {
   
    marginLeft: 270,
    marginRight: 10,
    marginTop: 10, // Mueve el ícono hacia arriba
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
  Image: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
  registroLink: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    textDecorationLine: "underline",
    color: "blue",
  },
});
