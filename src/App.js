import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timetable from './screens/Timetable'
import Search from './screens/Search'
import Header from './components/Header'
import{ NativeRouter, Switch, Route } from 'react-router-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <View style={styles.container}>
      <Header/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Search"}>
          <Stack.Screen name="Search" component={Search}/>
          <Stack.Screen name="Timetable" component={Timetable}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
