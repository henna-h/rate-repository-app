import React from 'react';
import { View, StyleSheet, Image, Button, TouchableOpacity, FlatList } from 'react-native';
import * as Linking from 'expo-linking';
import { useHistory, useParams } from "react-router-dom";
import { format, parseISO } from 'date-fns';
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
      marginBottom: 15
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
    },
    flatListInfo: {
      marginBottom: 10
    },
    separator: {
      height: 10,
    },
    ratingView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      borderWidth: 2,
      borderColor: '#0366d6',
      borderRadius: 25,
      marginRight: 10,
    },
    ratingText: {
      color: '#0366d6',
      fontSize: 20,
      fontWeight: '600',
    },
    reviewDate: {
      color: 'grey'
    }
  });

const RepositoryInfo = ( props ) => {

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Image  style={styles.image} source={{
            uri: props.item.ownerAvatarUrl
            }}/>
        <View>
          <Text style={styles.name} testID='fullName'>{props.item.fullName}</Text>
          <Text style={styles.text} testID='description'>{props.item.description}</Text>
          <View style={styles.languageView}>
            <Text style={styles.languageText} testID='language'>{props.item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.number} testID='stargazersCount'>{props.item.stargazersCount}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.number} testID='forksCount'>{props.item.forksCount}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.number} testID='reviewCount'>{props.item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.number} testID='ratingAverage'>{props.item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      { props.id
          ? <Button onPress={() => Linking.openURL(props.item.url)}title='Open on Github' color='#0366d6' />
          : null
      }
    </View>
  );
};

const ReviewItem = ({ review }) => {

  const date = format(parseISO(review.createdAt), 'dd.MM.yyyy');
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.ratingView}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View> 
      <View>
      <Text style={styles.name}>{review.user.username}</Text>
      <Text style={styles.reviewDate}>{date}</Text>
      </View>
      </View>
      <Text style={styles.text} >{review.text}</Text>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = ({ item }) => {
  const { id } = useParams();
  const { repository } = useRepository({ id });

  if (repository === undefined ){
    return null;
  }

  if(!item){
    item = repository;
  }
  
  const reviews = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];  

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <View style={styles.flatListInfo}><RepositoryInfo item={item} id={id} /></View>}
    />
  );
};

export const TouchableRepository = ({ item }) => {
  const history = useHistory();

  const onPress = () => {
    history.push(`/repository/${item.id}`);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <RepositoryInfo item={item} />
    </TouchableOpacity>
  );
};

export const renderItem = ({ item }) => (
  <TouchableRepository item={item} />
);


export default SingleRepository;
  