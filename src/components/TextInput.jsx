import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
      errorInputArea: {
          marginTop: 5,
          marginBottom: 5,
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: 'red'
      }
  });

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle =  (error) ? styles.errorInputArea : [style];

  return (
  <NativeTextInput style={textInputStyle} {...props} />
  );
};

export default TextInput;