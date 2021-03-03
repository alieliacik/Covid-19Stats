import React from 'react'
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
import UserProfile from '../screens/ProfileScreen/UserProfile'
import SelectMyCountry from '../screens/ProfileScreen/SelectMyCountry'
const ProfileStack = createStackNavigator()

const ProfileNavigaton = () => {
  const userEmail = useSelector((state) => state.auth.email)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  if (isLoggedIn) {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name='UserProfile'
          component={UserProfile}
          options={{
            headerTitle: userEmail,
          }}
        />
        <ProfileStack.Screen name='Profile' component={ProfileScreen} />
        <ProfileStack.Screen
          name='SelectMyCountry'
          component={SelectMyCountry}
          options={{
            headerTitle: 'Select a country',
          }}
        />
      </ProfileStack.Navigator>
    )
  }

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name='Profile' component={ProfileScreen} />
      <ProfileStack.Screen
        name='UserProfile'
        component={UserProfile}
        options={{
          headerTitle: userEmail,
        }}
      />
      <ProfileStack.Screen
        name='SelectMyCountry'
        options={{
          headerTitle: 'Select a country',
        }}
        component={SelectMyCountry}
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileNavigaton
