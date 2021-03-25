import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  scroll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 20,
  },
  text: {
      color: 'white',
      fontSize: 24,
      fontWeight: '700',
  }
});

const AppBar = () => {
  const { authorizedUser } = useAuthorizedUser({});
  const [signOut] = useSignOut();

  return (
    <View style={styles.container}>
      {authorizedUser ? (
        <ScrollView horizontal contentContainerStyle={styles.scroll}>
          <AppBarTab link='/' text='Repositories' />
          <AppBarTab link='/create-review' text='Create a review' />
          <AppBarTab link='/my-reviews' text='My reviews' />
          <AppBarTab link='/signout' text='Sign out' onPress={signOut} />
        </ScrollView>
      ):(
        <ScrollView horizontal contentContainerStyle={styles.scroll}>
          <AppBarTab link='/' text='Repositories' />
          <AppBarTab link='/signin' text='Sign in' />
          <AppBarTab link='/signup' text='Sign up' />
        </ScrollView>
      )}
    </View>
  );
};


export default AppBar;