import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button, Linking, Image } from 'react-native';
import Timetable from './screens/Timetable'
import Search from './screens/Search'
import{ NativeRouter, Switch, Route } from 'react-router-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function App({navigation}) {

  const Stack = createStackNavigator();

  let infoPoint = (
    <View style={{paddingRight: 20}}>
      <FontAwesome name="comments" size={25} color="#eff2ed" onPress={() => Linking.openURL('mailto:elianbraja@gmail.com?subject=FSHN Timetable feedback')}/>
    </View>
  )

    return (
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Search'}>
            <Stack.Screen
              name="Search"
              component={Search}
              options={{
                headerShown: false
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
                },
                headerRight: () => (
                  infoPoint
                )
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
