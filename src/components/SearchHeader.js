import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import normalize from 'react-native-normalize';

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
          resizeMode: 'stretch'},
          loading ? {opacity:0, height:1} : {height: "100%"}]}
        onLoad={() => setLoading(false)}
        source={require('../assets/bottom_image.jpeg')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent:"center"
  }
});
