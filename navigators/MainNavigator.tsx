import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import InicioSesionScreen from "../screens/InicioSesionScreen";
import RegistroScreen from "../screens/RegistroScreen";
import PuntajeScreen from "../screens/PuntajeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import JuegoScreen from "../screens/JuegoScreen";
import InformacionScreen from "../screens/InformacionScreen";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tabs.Navigator screenOptions={{headerShown:false}}>
      <Tabs.Screen name="Inicio Sesion" component={InicioSesionScreen} />
      <Tabs.Screen name="Informacion" component={InformacionScreen} />
      <Tabs.Screen name="Puntaje" component={PuntajeScreen} />
      <Tabs.Screen name="Registro" component={RegistroScreen} />
    </Tabs.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator 
    initialRouteName="Welcome"
      screenOptions={{headerShown:false}}
      >
      <Stack.Screen name="Tabs" component={MyTabs} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Juego" component={JuegoScreen} />
    </Stack.Navigator>
  );
}

export default function MainNavigators() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
