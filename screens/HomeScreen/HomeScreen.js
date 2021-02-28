import React, { useEffect, useState, useCallback, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  LogBox,
} from 'react-native'

import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { countryCodeEmoji } from 'country-code-emoji'
import { AntDesign } from '@expo/vector-icons'

import Colors from '../../constants/Colors'
import Card from '../../components/Card'
import StartUpScreen from '../StartupScreen'
import HeaderBackgroundComponent from '../../components/HeaderBackgroundComponent'
import * as statsActions from '../../store/actions/stats'
import * as userActions from '../../store/actions/user'
import * as permissionActions from '../../store/actions/permission'

const GlobalScreen = (props) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()
  const countryTotals = useSelector((state) => state.stats.countryTotals)
  const globalStats = useSelector((state) => state.stats.globalStats)
  const userCountry = useSelector((state) => state.user.userCountry)

  let userCountryStats
  if (userCountry.length > 0) {
    userCountryStats = countryTotals.filter(
      (c) => c.countryName === userCountry[0].country
    )[0]
  }

  const loadGlobalStats = useCallback(async () => {
    setError(null)
    try {
      await dispatch(statsActions.fetchCountryTotalStats())
      await dispatch(statsActions.fetchGlobalStats())
    } catch (error) {
      setError(error.message)
    }
  }, [])

  const fetchUserCountryHandler = async () => {
    setError(null)
    try {
      await dispatch(userActions.fetchUserCountry())
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    loadGlobalStats()
      .then(() => fetchUserCountryHandler())
      .then(() => setIsLoading(false))
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    loadGlobalStats().then(() => {
      setIsRefreshing(false)
    })
  }

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
  }, [])

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred', error, [{ text: 'Okay' }])
    }
  }, [])

  let TouchableButton

  if (Platform.OS === 'android') {
    TouchableButton = TouchableNativeFeedback
  } else {
    TouchableButton = TouchableOpacity
  }

  const { navigation } = props

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: isLoading ? '' : 'Global Stats',
      headerBackground: () =>
        isLoading ? (
          <View
            style={{ backgroundColor: Colors.backgroundBlue, flex: 1 }}
          ></View>
        ) : (
          <HeaderBackgroundComponent />
        ),
    })
  }, [navigation, isLoading])

  if (isLoading) {
    return <StartUpScreen />
  }

  const FlatListHeader = () => (
    <View>
      <View>
        <View style={styles.cardContainer}>
          <Card
            width='47'
            category='CONFIRMED'
            totalConfirmed={globalStats.totalConfirmed}
            dailyConfirmed={globalStats.totalNewCases}
            color={Colors.red}
          />
          <Card
            width='47'
            category='DECEASED'
            totalConfirmed={globalStats.totalDeaths}
            dailyConfirmed={globalStats.totalNewDeaths}
            color={Colors.gray}
          />
        </View>
        <View style={styles.cardContainer}>
          <Card
            width='47'
            category='ACTIVE'
            totalConfirmed={globalStats.totalActiveCases}
            color={Colors.blue}
          />
          <Card
            width='47'
            category='RECOVERD'
            totalConfirmed={globalStats.totalRecovered}
            color={Colors.green}
          />
        </View>
      </View>
      {!!userCountry.length && (
        <View style={{ paddingHorizontal: 8, marginVertical: 4 }}>
          <Text
            style={[styles.headerText, { paddingLeft: 8, marginVertical: 8 }]}
          >
            My country
          </Text>
          <TouchableButton
            onPress={() =>
              props.navigation.navigate('MyCountry', {
                selectedCountry: userCountryStats,
              })
            }
          >
            <View style={styles.country}>
              <View style={styles.countryContainer}>
                <Text style={styles.countryFlag}>
                  {countryCodeEmoji(userCountryStats.countryCode)}
                </Text>
                <Text style={styles.countryName}>
                  {userCountryStats.country}
                </Text>
              </View>
              <View style={styles.countryContainer}>
                {Number(userCountryStats.dailyDeaths) !== 0 && (
                  <View style={styles.dailyNewCasesContainer}>
                    <AntDesign name='arrowup' size={12} color='#fff' />
                    <Text style={styles.dailyNewCaseCount}>
                      {userCountryStats.dailyConfirmed}
                    </Text>
                  </View>
                )}
                <Text style={styles.totalCaseCount}>
                  {userCountryStats.totalConfirmed}
                </Text>
              </View>
            </View>
          </TouchableButton>
        </View>
      )}
      <View style={styles.headerTextConteiner}>
        <Text style={styles.headerText}>Country</Text>
        <Text style={{ fontFamily: 'open-sans-bold' }}>Case numbers</Text>
      </View>
    </View>
  )

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    >
      <FlatList
        style={{ width: '100%' }}
        data={countryTotals}
        keyExtractor={(itemData) => itemData.country}
        ListHeaderComponent={() => <FlatListHeader />}
        renderItem={(itemData) => {
          const flagImg = countryCodeEmoji(itemData.item.countryCode)
          return (
            <View style={{ marginHorizontal: 5, marginVertical: 3.5 }}>
              <TouchableButton
                onPress={() =>
                  props.navigation.navigate('MyCountry', {
                    selectedCountry: itemData.item,
                  })
                }
              >
                <View style={styles.country}>
                  <View style={styles.countryContainer}>
                    <Text style={styles.index}>{itemData.index + 1}</Text>
                    <Text style={styles.countryFlag}>{flagImg}</Text>
                    <Text style={styles.countryName}>
                      {itemData.item.country}
                    </Text>
                  </View>
                  <View style={styles.countryContainer}>
                    {Number(itemData.item.dailyDeaths) !== 0 && (
                      <View style={styles.dailyNewCasesContainer}>
                        <AntDesign name='arrowup' size={12} color='#fff' />
                        <Text style={styles.dailyNewCaseCount}>
                          {itemData.item.dailyConfirmed}
                        </Text>
                      </View>
                    )}
                    <Text style={styles.totalCaseCount}>
                      {itemData.item.totalConfirmed}
                    </Text>
                  </View>
                </View>
              </TouchableButton>
            </View>
          )
        }}
      />
    </ScrollView>
  )
}

export default GlobalScreen

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  country: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 3,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  index: { fontSize: 10, marginRight: 4 },
  countryFlag: { fontSize: 16, marginRight: 8 },
  countryName: { fontSize: 16, fontFamily: 'open-sans' },
  dailyNewCasesContainer: {
    backgroundColor: Colors.red,
    padding: 3,
    marginRight: 7,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 6,
  },
  dailyNewCaseCount: {
    fontSize: 12,
    fontFamily: 'open-sans-bold',
    color: '#fff',
  },
  totalCaseCount: {
    fontSize: 14,
    fontFamily: 'open-sans-bold',
    color: Colors.red,
  },
  headerTextConteiner: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  headerText: {
    fontFamily: 'open-sans-bold',
    fontSize: 12,
  },
})
