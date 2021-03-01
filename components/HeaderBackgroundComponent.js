import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

import Colors from '../constants/Colors'

const HeaderBackgroundComponent = () => (
  <View style={styles.container}>
    <Image style={styles.virus1} source={require('../assets/Virus.png')} />
    <View style={styles.virus2Container}>
      <Image style={styles.virus2} source={require('../assets/Virus.png')} />
    </View>
    <View style={styles.virus3Container}>
      <Image style={styles.virus3} source={require('../assets/Virus.png')} />
    </View>
  </View>
)

export default HeaderBackgroundComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundBlue,
    position: 'relative',
    overflow: 'hidden',
  },
  virus1: {
    resizeMode: 'contain',
    position: 'absolute',
    right: '5%',
    top: 30,
    opacity: 0.8,
  },
  virus2Container: {
    flex: 1,
    width: 40,
    height: 40,
    position: 'absolute',
    left: '52%',
    top: 25,
  },
  virus2: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  virus3Container: {
    flex: 1,
    width: 60,
    height: 60,
    position: 'absolute',
    left: '5%',
    top: 35,
  },
  virus3: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
})
