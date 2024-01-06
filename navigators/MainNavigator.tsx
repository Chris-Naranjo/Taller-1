import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import InicioSesionScreen from '../screens/InicioSesionScreen';
import RegistroScreen from '../screens/RegistroScreen';
import PuntajeScreen from '../screens/PuntajeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';

const Tabs= createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs(){
    return(
    <Tabs.Navigator>
   <Tabs.Screen name="Inicio Sesión" component={InicioSesionScreen}/>
   <Tabs.Screen name="Registarse" component={RegistroScreen}/>
   <Tabs.Screen name="Puntaje" component={PuntajeScreen}/>
    </Tabs.Navigator>
    );
}



function MyStack() {
    return (
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Tabs" component={MyTabs} />
        <Stack.Screen name='Welcome' component={WelcomeScreen}/>
      </Stack.Navigator>
    );
  }

export default function MainNavigators() {
  return (
    <MainNavigators>
      <MyStack/>
    </MainNavigators>
  )
}