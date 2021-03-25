import React from 'react';
import { View, StyleSheet, Span, Button, TouchableOpacity, FlatList } from 'react-native';
import { format, parseISO } from 'date-fns';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
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


const ItemSeparator = () => <View style={styles.separator} />;

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

const MyReviews = () => {
    const { authorizedUser } = useAuthorizedUser({ includeReviews: true });
  

    if (authorizedUser === undefined ){
      console.log("undef");
      return null;
    }
    console.log(authorizedUser);
    const reviewNodes = authorizedUser
      ? authorizedUser.reviews.edges.map(edge => edge.node)
      : [];  

    if(reviewNodes.length ==0){
        return(
        <View style={styles.container}>
            <Text style={styles.name} >No reviews yet</Text>
        </View>
        );
    }
  
    return (
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
      />
    );
};

export default MyReviews;