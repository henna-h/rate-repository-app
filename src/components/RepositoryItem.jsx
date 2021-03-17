import { render } from '@testing-library/react-native';
import React from 'react';
import { View, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import { useHistory, useParams } from "react-router-dom";
import useRepository from '../hooks/useRepository';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: 'white'
    },
    upperContainer: {
      flexDirection: 'row',
    },
    image: {
      width: 50,
      height: 50,
      marginRight: 10,
      borderRadius: 5
    },
    name: {
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 7
    },
    text: {
      marginBottom: 15,
    },
    languageView: {
        padding: 6,
        borderRadius: 5,
        backgroundColor: '#0366d6',
        alignSelf: 'flex-start'
    },
    languageText: {
        color: 'white',
        fontWeight: '500',
    },
    stats: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        marginBottom: 15
    },
    stat: {
        flexDirection: 'column',
        marginRight: 40,
        alignItems: 'center'
    },
    number: {
      fontWeight: '700',
      marginBottom: 5
    }
  });

const RepositoryItem = ({ item }) => {
  const { id } = useParams();
  const { repository } = useRepository({ id });

  if (repository === undefined ){
    return null;
  }

  if(!item){
    item = repository;
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Image  style={styles.image} source={{
            uri: item.ownerAvatarUrl
            }}/>
        <View>
          <Text style={styles.name} testID='fullName'>{item.fullName}</Text>
          <Text style={styles.text} testID='description'>{item.description}</Text>
          <View style={styles.languageView}>
            <Text style={styles.languageText} testID='language'>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.number} testID='stargazersCount'>{item.stargazersCount}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.number} testID='forksCount'>{item.forksCount}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.number} testID='reviewCount'>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.number} testID='ratingAverage'>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      { id
          ? <Button onPress={() => Linking.openURL(item.url)}title='Open on Github' color='#0366d6' />
          : null
      }
    </View>
  );
};

export const TouchableRepository = ({ item }) => {
  const history = useHistory();

  const onPress = () => {
    history.push(`/repository/${item.id}`);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <RepositoryItem item={item} />
    </TouchableOpacity>
  );
};

export const renderItem = ({ item }) => (
  <TouchableRepository item={item} />
);


export default RepositoryItem;
  