import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'

export default function WelcomeScreen({navigation}: any) {
    return (
      <View>
        <Text>Bienvenidos</Text>
        <Button title= 'Jugar' onPress={()=> navigation.navigate('Tabs')}/>
      </View>
    )
  }
  
  const styles = StyleSheet.create({})