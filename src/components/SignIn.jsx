import React from 'react';
import * as yup from 'yup';
import { Button, View, StyleSheet } from 'react-native';
import { useHistory } from "react-router-dom";
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white'
  }
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, ({ min }) => `Username must be at least ${min} characters`)
    .required('Username is required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});


const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" testID="username" />
      <FormikTextInput secureTextEntry name="password" placeholder="Password" testID="password" />
      <Button color='#0366d6' onPress={onSubmit} title="Sign in" testID="submit" />
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <SignInContainer onSubmit={onSubmit} />
  );
};

export default SignIn;