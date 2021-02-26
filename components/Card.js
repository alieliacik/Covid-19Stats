import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { vw } from 'react-native-expo-viewport-units'

const Card = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <Text style={[styles.categoryName, { color: props.color }]}>
          {props.category}
        </Text>
        <AntDesign name='linechart' size={12} color={props.color} />
      </View>
      <View>
        <Text style={[styles.totalStats, { color: props.color }]}>
          {props.totalConfirmed}
        </Text>
      </View>
      {props.dailyConfirmed && (
        <View
          style={[styles.dailyStatsContainer, { backgroundColor: props.color }]}
        >
          <Text style={styles.dailyStats}>
            <AntDesign name='arrowup' size={15} color='#fff' />
            {props.dailyConfirmed}
          </Text>
        </View>
      )}
    </View>
  )
}



export default Card

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: vw(47),
    margin: vw(1.5),
    borderRadius: 5,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.1,
    padding: 12,
    shadowRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryName: {
    fontFamily: 'open-sans',
    marginRight: 10,
    fontSize: 12,
    letterSpacing: 1,
  },
  totalStats: {
    fontFamily: 'open-sans-semibold',
    fontSize: 20,
  },

  dailyStats: {
    fontFamily: 'open-sans',
    color: '#fff',
    fontSize: 14,
  },
  dailyStatsContainer: {
    alignSelf: 'flex-start',
    padding: 3,
    marginTop: 7,
    marginRight: 7,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 6,
  },
})
