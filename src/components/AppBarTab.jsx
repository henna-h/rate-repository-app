import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';


const styles = StyleSheet.create({
    container: {
      marginLeft: 20
    },
    text: {
      color: 'white',
      fontSize: 18,
      fontWeight: '700',
    }
  });

const AppBarTab = ({ link, text, ...props }) => {

    return (
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <Link to={link} {...props}>
              <Text style={styles.text}>{text}</Text>
            </Link>
          </View>
        </TouchableWithoutFeedback>
    );

};

export default AppBarTab;