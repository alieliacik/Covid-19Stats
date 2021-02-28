import React from 'react'
import { Platform, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import CountryScreen from '../screens/CountryScreen/CountryScreen'
import Colors from '../constants/Colors'

const HomeStack = createStackNavigator()

const HomeNavigation = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        title: 'Global Stats',
        headerTintColor: Platform.OS === 'android' ? '#fff' : 'black',
        headerStyle: {
          backgroundColor:
            Platform.OS === 'android' ? Colors.backgroundBlue : '#fff',
        },
      }}
    >
      <HomeStack.Screen
        name='Global'
        component={HomeScreen}
        options={{
          headerTitleStyle: {
            color: '#fff',
          },
        }}
      />
      <HomeStack.Screen
        name='MyCountry'
        component={CountryScreen}
        options={({ route }) => ({
          title: route.params.selectedCountry.countryName,
        })}
      />
    </HomeStack.Navigator>
  )
}

export default HomeNavigation
