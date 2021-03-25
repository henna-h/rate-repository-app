import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { renderItem } from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    padding: 10
  }
});

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

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

const Header = (props) => {
  return(
    <View>
      <SearchBar
        searchQuery={props.searchQuery}
        setSearchQuery={props.setSearchQuery}
      />
      <SortList 
      selectedOrder={props.selectedOrder} setSelectedOrder={props.setSelectedOrder}
      />
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

class RepositoryListContainer extends React.Component {
  
  renderHeader = () => {
    const props = this.props;
    
    return (
      <Header 
      selectedOrder={props.selectedOrder} setSelectedOrder={props.setSelectedOrder}
      searchQuery={props.searchQuery}
      setSearchQuery={props.setSearchQuery}
      />
    );
  };

  render(){
    const props = this.props;

    return (
      <FlatList
        data={props.repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryValue] = useDebounce(searchQuery, 500);
  const { repositories } = useRepositories({ ...getOrder(selectedOrder), searchKeyword: searchQueryValue });


  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  return (
    <RepositoryListContainer 
    selectedOrder={selectedOrder} 
    setSelectedOrder={setSelectedOrder}
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
    repositoryNodes={repositoryNodes} />
  );
};

export default RepositoryList;