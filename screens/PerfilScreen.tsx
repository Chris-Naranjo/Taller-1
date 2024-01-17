import { Button, StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, {useState} from 'react'

/// IMAGE
import * as ImagePicker from 'expo-image-picker';

/// FIREBASE
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from '../config/Config';

///// RETIRA LOS LOGS
import { LogBox } from "react-native"
LogBox.ignoreAllLogs(true)


export default function RecursosScreen({navigation}: any) {

  const [imagen, setImagen] = useState(' ')

  ////// CARGAR UNA IMAGEN DESDE LA GALERIA
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
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

  //// SUBIR UNA IMAGEN A FIREBASE STORAGE
  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, 'usuarios/' + nombre);

    try {
        const response = await fetch(imagen);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob, {
            contentType: 'image/jpg'
        });

        console.log('La imagen se subió con éxito');
        Alert.alert('Mensaje', 'La imagen se subio con exito')

        // Obtiene la URL de la imagen
      //  const imageURL = await getDownloadURL(storageRef);
        //console.log('URL de desacarga de la imagen', imageURL);
    } catch (error) {
        console.error(error);
    }
}


  return (
    <View>
      <Text>Subir imagen desde la galeria</Text>
      <Button title='Seleccionar imagen' onPress={ () => pickImage() } />
      <Image source={{ uri: imagen}} style={styles.img}/>

      <Button title='cargar imagen' onPress={ ()=> subirImagen('avatar1')}/>

      <Button title='JUGAR' onPress={ ()=> navigation.navigate("Juego")}/>
    </View>

  )
}

const styles = StyleSheet.create({
  img:{
    width:300,
    height:300,
    resizeMode: 'contain'
  }
})