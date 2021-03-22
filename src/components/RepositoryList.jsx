import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { renderItem } from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    padding: 10
  }
});

const SortList = ({ selectedOrder, setSelectedOrder }) => {

  return (
    <View>
      <Picker
        style={styles.picker}
        selectedValue={selectedOrder}
        onValueChange={(itemValue) =>
          setSelectedOrder(itemValue)
        }>
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest-rated" />
        <Picker.Item label="Lowest rated repositories" value="lowest-rated" />
      </Picker>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const getOrder = (selectedOrder) => {
  switch (selectedOrder) {
    case('latest'):
      return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    case('highest-rated'):
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
    case('lowest-rated'):
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
    default:
      return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
  }
};

const RepositoryListContainer = () => {
  const [selectedOrder, setSelectedOrder] = useState();
  const { repositories } = useRepositories(getOrder(selectedOrder));

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];  

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <SortList selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />}
    />
  );
};

const RepositoryList = () => {

  return (
    <RepositoryListContainer />
  );
};

export default RepositoryList;