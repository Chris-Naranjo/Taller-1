import { View, Text, Button, StyleSheet, ImageBackground, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/fondoWelcome.jpg")}
        style={styles.backgroundImage}
      >
      <Image source={require("../assets/inicioLetras.png")} style={styles.imgT} />
        

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Tabs")}
      >
        <Text style={styles.txtBtn}>JUGAR</Text>
      </TouchableOpacity>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  imgT: {
    width: '90%',
    height: 50,
    margin: 5
  
  },
    backgroundImage: {
      flex: 1,
      width: "100%",
      height: "100%",
      resizeMode: "cover",
      justifyContent: "center",
      alignItems: "center",
  },
  btn: {
    color: "#fff",
    height: 80,
    width: "95%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    margin: 5,
    fontFamily: "pixel",
  },
  txtBtn: {
    color: "#fff",
    fontFamily: "pixel",
  },
});
