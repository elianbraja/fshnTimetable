import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button } from 'react-native';
import Timetable from './screens/Timetable'
import Search from './screens/Search'
import Header from './components/Header'
import{ NativeRouter, Switch, Route } from 'react-router-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App({navigation}) {

  const Stack = createStackNavigator();

    return (
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Search'}>
            <Stack.Screen
              name="Search"
              component={Search}
              options={{
                headerStyle: {
                  backgroundColor: '#24A0ED',
                  shadowColor: "transparent",
                  elevation: 0
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
              options={({ navigation, route }) => ({
                headerStyle: {
                  backgroundColor: '#24A0ED',
                  shadowColor: "transparent",
                  elevation: 0
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#24A0ED"
  },
});
