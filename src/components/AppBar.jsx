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
  const { authorizedUser } = useAuthorizedUser();
  const [signOut] = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab link='/' text='Repositories' />
        {authorizedUser ? (
          <AppBarTab link='/create-review' text='Create a review' />
        ):(
          null
        )}
        {authorizedUser ? (
          <AppBarTab link='/signout' text='Sign out' onPress={signOut} />
        ):(
          <AppBarTab link='/signin' text='Sign in' />
        )}
      </ScrollView>
    </View>
  );
};


export default AppBar;