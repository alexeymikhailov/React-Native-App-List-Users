import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import {
  fetchUsersData,
  setCurrentUser
} from '../actions';

class ListUsersScreen extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.usersData != prevState.listUsers) {
      return {
        listUsers: nextProps.usersData,
        fetchNextListUsers: true
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state={
      listUsers: [],
      fetchNextListUsers: true
    };

    this.onHandleRenderListRandomUsers=({item, index}) => {
      return (
        <TouchableOpacity onPress={() => { this.onHandleNavigateToProfileUser(item) }} activityOpacity={.5}>
          <View style={styles.currentUserItemWrap}>
            <Image style={styles.image} source={{ uri: item.picture.thumbnail }} />
            <View>
              <Text style={styles.userName}>{item.name.first[0].toUpperCase() + item.name.first.slice(1)} {item.name.last[0].toUpperCase() + item.name.last.slice(1)}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    this.onHandleRenderFooter=() => {
      if (!this.props.loadingData) return null;

      return (
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginVertical: 20
        }}>
          <ActivityIndicator color="#393939" animating={true} size="large"/>
        </View>
      );
    };

    this.onHandleLoadMoreData=() => {
      if (this.state.fetchNextListUsers) {
        this.props.dispatch(fetchUsersData());

        this.setState({
          fetchNextListUsers: false
        });
      }
    };

    this.onHandleNavigateToProfileUser=(item) => {
      Promise.all([
        this.props.dispatch(setCurrentUser(item)),
        this.props.navigator.switchToTab({
          tabIndex: 1
        })
      ]);
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchUsersData());
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{
          marginTop: 60,
          marginHorizontal: 24
        }}>
          <View style={{
            backgroundColor: '#fff',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
          }}>
            <Text style={{
              color: '#393939',
              fontSize: 34,
              fontWeight: 'bold'
            }}>Список</Text>
          </View>
          <FlatList
            ref={value => { this.listUsersItems=value }}
            contentContainerStyle={{
              paddingBottom: 40
            }}
            showsVerticalScrollIndicator={true}
            extraData={this.props}
            data={this.state.listUsers}
            renderItem={this.onHandleRenderListRandomUsers}
            ListFooterComponent={this.onHandleRenderFooter}
            onEndReached={this.onHandleLoadMoreData}
            onEndReachedThreshold={0.01}
            keyExtractor={(item, index) => index.toString()} />
        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  currentUserItemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    marginRight: 15
  },
  userName: {
    fontSize: 19,
    fontWeight: 'bold'
  },
  userEmail: {
    fontSize: 15
  }
});

const mapStateToProps=(state) => {
  const { usersData, loadingData }=state.UsersReducer;

  return {
    usersData,
    loadingData
  };
};

const ListUsers=connect(mapStateToProps)(ListUsersScreen);

export default ListUsers;
