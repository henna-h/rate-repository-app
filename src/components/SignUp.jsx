import React from 'react';
import * as yup from 'yup';
import { Button, View, StyleSheet } from 'react-native';
import { useHistory } from "react-router-dom";
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import useSignIn from '../hooks/useSignIn';
import useCreateUser from '../hooks/useCreateUser';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white'
  }
});

const initialValues = {
  username: '',
  password: '',
  confirmPassword: ''
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
    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password fields must match')
    .required('Password confirmation is required'),
});


const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput secureTextEntry name="password" placeholder="Password" />
      <FormikTextInput secureTextEntry name="confirmPassword" placeholder="Confirm password" />
      <Button color='#0366d6' onPress={onSubmit} title="Sign in" testID="submit" />
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const history = useHistory();
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ username, password });
      const { data } = await signIn({ username, password });
      console.log(data);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <SignUpContainer onSubmit={onSubmit} />
  );
};

export default SignUp;