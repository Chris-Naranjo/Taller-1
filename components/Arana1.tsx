import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Arana1(prop:any) {
 // console.log(prop);

  //Construímos un json
  const [posicion, setPosicion] = useState({ x: 0, y: 0 });
  const [imageSource, setImageSource] = useState(require("../assets/arana1izq.png"));

  const changeImage = () => {
    setImageSource(require("../assets/aranaaplastada.png")); // Cambiar la imagen momentáneamente
    setTimeout(() => {
      setImageSource(require("../assets/arana1izq.png")); // Volver a la imagen original después de 1 segundo
    }, 2000);
  };

  //Esta función mueve al pato
  function moverPato() {
    let MAX_X = 1200;
    let MAX_Y = 1980;

    MAX_X = Dimensions.get('window').width;
     MAX_Y = Dimensions.get('window').height;

    /*En funciones randómicas se coloca el * para especificar el 
        número máximo aleatorio (350)*/
    const randomX = Math.floor(Math.random() * MAX_X);
    const randomY = Math.floor(Math.random() * MAX_Y);

    setPosicion({ x: randomX, y: randomY });
  }

  //Esta función mueve al pato por tiempo
  useEffect(() => {
    const interval = setInterval(() => {
      moverPato();
    }, 2000);
  }, []);

  ///////////////////////////////////////////////////////////////

  function compuesta() {
    moverPato();
    prop.presionar();
    changeImage();
  }

  return (
    <View
      style={{
        top: posicion.y,
        left: posicion.x,
        position: "absolute",
        padding: 16,
      }}
    >
      <TouchableOpacity onPress={() => compuesta()}>
        <Image source={imageSource} style={styles.img} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 90,
    height: 90,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },

});