import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import RepositoryItem from './RepositoryItem';
import SignIn from './SignIn';
import SubmitReview from './CreateReview';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <>
    <View style={styles.container}>
      <AppBar />
        <Switch>
            <Route path="/signin" exact>
              <SignIn />
            </Route>
            <Route path="/create-review" exact>
              <SubmitReview />
            </Route>
            <Route path="/repository/:id">
              <RepositoryItem />
            </Route>
            <Route path="/" exact>
              <RepositoryList />
            </Route>
            <Redirect to="/" />
        </Switch>
    </View>
    </>
  );
};

export default Main;