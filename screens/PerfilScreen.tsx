import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import * as ImagePicker from "expo-image-picker";

//FIREBASE
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { auth, storage, db } from '../config/Config';
import { onValue, ref as ref1 } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";


export default function GeneralScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState({});
  const [id, setid] = useState("");
  const [imagen, setImagen] = useState(
    "data:image/png;base64,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"
  );

  // ABRIR LA CAMARA
  const seleccionarImagen = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  useEffect(() => {}, [imagen]);


  // Traer datos Jugador
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("Este es el UID: ", uid);
        setid(uid);

        const starCountRef = ref1(db, "jugadores/" + uid);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          console.log("Datos del usuario:", data);
          setUsuario(data);
          
        });
      } else {
        // User is signed out
        console.log("Usuario desconectado");
      }
    });

    return () => {
      // Desuscribe la función cuando el componente se desmonta
      unsubscribe();
    };
  }, []);

  ///SUBIR LA IMAGEN
  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, "usuarios/" + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: "image/jpg",
      });

      console.log("La imagen se subió con éxito");
      Alert.alert("Mensaje", "Imagen subida con exito");

      // Obtiene la URL de la imagen
      const imageURL = await getDownloadURL(storageRef);
      console.log("URL de desacarga de la imagen", imageURL);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textfoto}>Datos del Jugador
      </Text>

      <Button title="Tomar Foto" onPress={() => seleccionarImagen()} />

      <Image source={{ uri: imagen }} style={styles.img} />


      <TouchableOpacity
        style={styles.btn}
        onPress={() => subirImagen("avatar2")}
      >
        <Text style={{ fontSize: 20 }}>Guardar Imagen</Text>
      </TouchableOpacity>
      <Text
        onPress={() => navigation.navigate("Juego")}
        style={styles.registroLink}
      >
        🎮 Jugar 🕹️
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 400,
    height: 300,
    resizeMode: "contain",
  },
  btn: {
    width: "70%",
    height: 50,
    backgroundColor: "#C0E8D5",
    borderRadius: 50,
    alignItems: "center",
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img2: {
    width: 40,
    height: 40,
  },

  registroLink: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    textDecorationLine: "underline",
    color: "blue",
    textAlign: "center",
  },
  textfoto:{
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#DF00FF', // Puedes ajustar el color según tus preferencias
    marginTop: 100,
    flex:0.4

  },
});
