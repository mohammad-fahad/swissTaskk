import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import Home from '../Home/Home';
import Favorites from '../Favorites/Favorites';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
    let color = "white";
    return (
      <Tab.Navigator
        initialRouteName="Home"
        shifting={true}
        labeled={true}
        sceneAnimationEnabled={true}
        activeColor="black">
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: '#ff392e',
            tabBarIcon: ({color}) => (
              <Icon name="home" size={26} color="#000" />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarLabel: 'Favorites',
            tabBarColor: '#ACD1AF',
            tabBarIcon: ({color}) => (
              <Icon name="heart" size={26} color="#000" />
            ),
          }}
        />
      </Tab.Navigator>
    );
}

export default MainTabScreen

const styles = StyleSheet.create({})
