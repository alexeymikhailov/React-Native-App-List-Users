import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';

const CurrentInfoUserScreen=({ currentUser }) => {
  return (
    <View style={styles.container}>
      <View style={{
        flex: 1,
        marginTop: 60,
        marginHorizontal: 24
      }}>
        <View style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginBottom: 20
        }}>
          <Text style={{
            color: '#393939',
            fontSize: 34,
            fontWeight: 'bold'
          }}>Элемент списка</Text>
        </View>
        {
          currentUser ? (
            <View style={{
              flex: 1
            }}>
              <View style={{
                alignItems: 'center',
                marginBottom: 20
              }}>
                <Image style={styles.profileImageUser} source={{ uri: currentUser.picture.medium }} resizeMode="contain" />
              </View>
              <View style={{
                flex: 1
              }}>
                <View style={styles.currentItemWrap}>
                  <Text style={styles.rowLeft}>Name:</Text>
                  <Text style={styles.rowRight}>{currentUser.name.first[0].toUpperCase() + currentUser.name.first.slice(1)} {currentUser.name.last[0].toUpperCase() + currentUser.name.last.slice(1)}</Text>
                </View>
                <View style={styles.currentItemWrap}>
                  <Text style={styles.rowLeft}>Email:</Text>
                  <Text style={styles.rowRight}>{currentUser.email}</Text>
                </View>
                <View style={styles.currentItemWrap}>
                  <Text style={styles.rowLeft}>Username:</Text>
                  <Text style={styles.rowRight}>{currentUser.login.username}</Text>
                </View>
                <View style={styles.currentItemWrap}>
                  <Text style={styles.rowLeft}>Age:</Text>
                  <Text style={styles.rowRight}>{currentUser.dob.age}</Text>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <Text style={styles.initialScreenText}>Здесь будет отображаться информация о пользователе.</Text>
            </View>
          )
        }
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  initialScreenText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  currentItemWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20
  },
  profileImageUser: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2
  },
  rowLeft: {
    fontSize: 15,
    fontWeight: '500'
  },
  rowRight: {
    fontSize: 15
  }
});

const mapStateToProps=(state) => {
  const { currentUser }=state.UsersReducer;

  return {
    currentUser
  };
};

export default connect(mapStateToProps)(CurrentInfoUserScreen);
