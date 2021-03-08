import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e'
  },
  text: {
      marginTop: 50,
      marginBottom: 20,
      color: 'white',
      fontSize: 24,
      fontWeight: '700',
      alignSelf: 'center'
  }
});

const AppBar = () => {
  return (
  <TouchableWithoutFeedback>
    <View style={styles.container}>
        <Text style={styles.text}>Repositories</Text>
    </View>
  </TouchableWithoutFeedback>
  );
};


export default AppBar;