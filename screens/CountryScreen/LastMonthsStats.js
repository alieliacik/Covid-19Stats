import React from 'react'
import { useSelector } from 'react-redux'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import Colors from '../../constants/Colors'

const MonthlyStats = (props) => {
  const lastThirtyDaysStats = useSelector(
    (state) => state.stats.lastThirtyDaysStats
  )

  return (
    <ScrollView style={styles.table}>
      <View style={styles.tableHeaderWrapper}>
        <View
          style={{
            ...styles.tableHeaderContainer,
            width: '27%',
            marginLeft: 0.7,
          }}
        >
          <Text style={styles.tableHeaderText}>Date</Text>
        </View>
        <View style={{ ...styles.tableHeaderContainer, width: '22%' }}>
          <Text style={{ ...styles.tableHeaderText, color: Colors.red }}>
            C<Text style={{ fontSize: 8 }}>onfirmed</Text>
          </Text>
        </View>
        <View style={{ ...styles.tableHeaderContainer, width: '22%' }}>
          <Text style={{ ...styles.tableHeaderText, color: Colors.green }}>
            R<Text style={{ fontSize: 8 }}>ecovered</Text>
          </Text>
        </View>
        <View style={{ ...styles.tableHeaderContainer, width: '22%' }}>
          <Text style={{ ...styles.tableHeaderText, color: Colors.gray }}>
            D<Text style={{ fontSize: 8 }}>eceased</Text>
          </Text>
        </View>
      </View>
      {lastThirtyDaysStats &&
        lastThirtyDaysStats.map((country) => {
          return (
            <View key={country.last_updated} style={styles.tableHeaderWrapper}>
              <View
                style={{
                  ...styles.tableHeaderContainer,
                  width: '27%',
                  marginLeft: 0.7,
                }}
              >
                <Text
                  style={{
                    ...styles.tableContentText,
                    fontFamily: 'open-sans-bold',
                  }}
                >
                  {country.last_updated}
                </Text>
              </View>
              <View style={{ ...styles.tableHeaderContainer, width: '22%' }}>
                <Text style={styles.tableContentText}>
                  {country.new_infections !== '0' ? (
                    country.new_infections
                  ) : (
                    <AntDesign name='exclamationcircleo' size={15} />
                  )}
                </Text>
              </View>
              <View style={{ ...styles.tableHeaderContainer, width: '22%' }}>
                <Text style={styles.tableContentText}>
                  {country.new_recovered !== '0' ? (
                    country.new_recovered
                  ) : (
                    <AntDesign name='exclamationcircleo' size={15} />
                  )}
                </Text>
              </View>
              <View style={{ ...styles.tableHeaderContainer, width: '22%' }}>
                <Text style={styles.tableContentText}>
                  {country.new_deaths !== '0' ? (
                    country.new_deaths
                  ) : (
                    <AntDesign name='exclamationcircleo' size={15} />
                  )}
                </Text>
              </View>
            </View>
          )
        })}
    </ScrollView>
  )
}

export default MonthlyStats

const styles = StyleSheet.create({
  table: {
    paddingHorizontal: 26,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  tableHeaderWrapper: {
    flexDirection: 'row',
  },
  tableHeaderContainer: {
    backgroundColor: Colors.lightGray,
    padding: 8,
    fontSize: 32,
    margin: '1%',
    borderRadius: 5,
  },
  tableHeaderText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  tableContentText: {
    fontFamily: 'open-sans',
    fontSize: 12,
  },
  skeletonItemLong: {
    height: 20,
    borderRadius: 5,
    marginVertical: 8,
  },
  skeletonItem: {
    height: 20,
    width: '50%',
    borderRadius: 5,
    marginVertical: 5,
  },
  skeletonItemShort: {
    width: 70,
    height: 18,
    borderRadius: 5,
    marginVertical: 10,
    marginRight: 15,
  },
})
