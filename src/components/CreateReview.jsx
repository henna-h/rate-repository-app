import React from 'react';
import * as yup from 'yup';
import { Button, View, StyleSheet } from 'react-native';
import { useHistory } from "react-router-dom";
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white'
  }
});

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  text: ''
};

const validationSchema = yup.object().shape({
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(1, 'Rating has to be between 1 and 100')
    .max(100, 'Rating has to be between 1 and 100'),
  text: yup
    .string()
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput multiline name="text" placeholder="Review" />
      <Button color='#0366d6' onPress={onSubmit} title="Create a review" />
    </View>
  );
};

export const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SubmitReview = () => {
    const history = useHistory();
    const [createReview] = useCreateReview();
  
    const onSubmit = async (values) => {

      const { repositoryName, ownerName, rating, text } = values;

      try {
        const { data } = await createReview({ repositoryName, ownerName, rating, text });
        history.push(`/repository/${data.createReview.repositoryId}`);
      } catch (e) {
        console.log(e);
      }
    };
    
    return (
      <ReviewFormContainer onSubmit={onSubmit} />
    );
  };
  

export default SubmitReview;