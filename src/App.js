import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import startTabBasedApp from './navigation/AppNavigator';
import configureStore from './store';
import ListUsers from './components/ListUsers';
import CurrentInfoUser from './components/CurrentInfoUser';

const store=configureStore();

const registerScreens=(store, Provider) => {
	Navigation.registerComponent('ListUsers', () => ListUsers, store, Provider);
  Navigation.registerComponent('CurrentInfoUser', () => CurrentInfoUser, store, Provider);
}

registerScreens(store, Provider);
startTabBasedApp();
