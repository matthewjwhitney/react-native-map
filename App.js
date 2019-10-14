import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './src/homescreen';
import Screen2 from './src/screen2';
import Map from './src/map';
import Loading from './src/loading';

import {createStackNavigator, createAppContainer} from 'react-navigation';
import Context from './src/context'

const LOGIN = {
  type: "LOGIN"
}

const LOGOUT = {
  type: "LOGOUT"
}

initialState = {
  loggedIn: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        loggedIn: true
      }
    case "LOGOUT":
      return {
        loggedIn: false
      }
    default:
      return state
  }
}


const MainNavigator = createStackNavigator({
  Home: HomeScreen,
  Screen: Screen2,
  Loading: Loading,
  Map: Map
});

const Routes = createAppContainer(MainNavigator);

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = () => {
    dispatch(LOGIN)
  }

  const logout = () => {
    dispatch(LOGOUT)
  }

  return(
  <Context.Provider value={{auth: state.loggedIn,
                            login,
                            logout}} >
    <Routes />
   </Context.Provider>
)}

export default App
