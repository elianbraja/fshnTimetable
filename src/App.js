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

  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(async () => {
        try {
            const status = await AsyncStorage.getItem('status')
            if(status != null)
              setInitialRoute("Timetable")
            else {
              setInitialRoute("Search")
            }
        }
        catch(e) {
            alert(e)
        }
    },[])

    if(initialRoute){
    return (
      <View style={styles.container}>
        <Header/>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute} style={{backgroundColor:"red"}}>
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
              options={({ navigation, route }) => ({
                title: 'Timetable',
                headerStyle: {
                  backgroundColor: '#24A0ED',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerLeft: (props) => (
                  <Button
                    onPress={() => console.log(navigation.navigate("Search"))}
                    title="Search"
                    color="#fff"
                  />
                )
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    )}
    else{
      return null
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
