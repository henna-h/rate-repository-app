import React from 'react';
import * as yup from 'yup';
import { Button, View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';

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
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput secureTextEntry name="password" placeholder="Password" />
      <Button color='#0366d6' onPress={onSubmit} title="Sign in" />
    </View>
  );
};

const SignIn = () => {
    const onSubmit = values => {
        console.log(values);
    };
  
    return (
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    );
  };

export default SignIn;