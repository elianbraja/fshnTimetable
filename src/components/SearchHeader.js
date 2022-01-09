import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DotIndicator } from 'react-native-indicators';

export default function Header() {
  const [loading, setLoading] = useState(true)
  return (
    <View style={styles.viewContainer}>
      {loading ?
        <DotIndicator color="#edeae8"/>
      :
        null
      }
      <Image
        style={[{
          width: "100%",
          resizeMode: 'contain'},
          loading ? {opacity:0, height:1} : {height: "100%"}]}
        onLoad={() => setLoading(false)}
        source={require('../assets/img.jpeg')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    height: "40%",
    marginTop: 25,
    alignItems: "center",
    justifyContent:"center",
  }
});
