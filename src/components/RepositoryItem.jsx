import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
        marginTop: 15
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

const RepositoryItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Image  style={styles.image} source={{
            uri: item.ownerAvatarUrl
            }}/>
        <View>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.text}>{item.description}</Text>
          <View style={styles.languageView}>
            <Text style={styles.languageText}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.number}>{item.stargazersCount}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.number}>{item.forksCount}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.number}>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.number}>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
);

export const renderItem = ({ item }) => (
    <RepositoryItem item={item} />
);

export default RepositoryItem;
  