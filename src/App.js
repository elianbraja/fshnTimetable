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
        <Stack.Navigator initialRouteName={"Search"} style={{backgroundColor:"red"}}>
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              title: 'Search',
              headerStyle: {
                backgroundColor: '#24A0ED',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Timetable"
            component={Timetable}
            options={{
              title: 'Timetable',
              headerStyle: {
                backgroundColor: '#24A0ED',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
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
