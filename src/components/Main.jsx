import React from 'react';
//import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return (
    <>
    <AppBar />
    <View style={styles.container}>
      <RepositoryList />
    </View>
    </>
  );
};

export default Main;