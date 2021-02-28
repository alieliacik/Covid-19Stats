import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableNativeFeedback,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import TimeAgo from 'react-native-timeago'

import * as statsActions from '../../store/actions/stats'
import Colors from '../../constants/Colors'
import CaseNumberChart from '../../components/CaseNumberChart'
import MonthlyStats from './LastMonthsStats'

const CountryScreen = (props) => {
  const dispatch = useDispatch()
  const scrollRef = useRef()
  const timerRef = useRef()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const [showMonth, setShowMonth] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const allCountryStats = useSelector((state) => state.stats.allCountryStats)
  const {
    countryName,
    lastUpdated,
    totalConfirmed,
    dailyConfirmed,
    countryCode,
    totalDeaths,
    totalRecovered,
  } = props.route.params.selectedCountry

  const loadSelectedCountryStats = useCallback(async () => {
    setError(null)
    try {
      setIsLoading(true)
      await dispatch(statsActions.fetchCountryDailyStats(countryCode))
    } catch (error) {
      setError(error.message)
      props.navigation.goBack()
    }
    setIsLoading(false)
  }, [countryCode])

  useEffect(() => {
    loadSelectedCountryStats()

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [dispatch])

  useFocusEffect(
    useCallback(() => {
      setShowMonth(false)
      scrollRef.current?.scrollTo({
        y: 0,
        animated: false,
      })
      loadSelectedCountryStats()
      return () => {
        clearTimeout(timerRef.current)
      }
    }, [])
  )

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred', error, [{ text: 'Okay' }])
    }
  }, [error])

  const handleScroll = () => {
    setShowMonth((prevState) => !prevState)
    timerRef.current = setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: 875,
        animated: true,
      })
    }, 1)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    loadSelectedCountryStats().then(() => {
      setIsRefreshing(false)
      setIsLoading(false)
    })
  }

  let TouchableButton

  if (Platform.OS === 'android') {
    TouchableButton = TouchableNativeFeedback
  } else {
    TouchableButton = TouchableOpacity
  }

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={{ paddingBottom: 10 }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.header}>
        <Image
          style={styles.virusImage1}
          source={require('../../assets/Virus.png')}
        />
        <Image
          style={styles.virusImage2}
          source={require('../../assets/Virus.png')}
        />
        <Image
          style={styles.virusImage3}
          source={require('../../assets/Virus.png')}
        />
        <Text style={styles.appName}>Covid-19 Global</Text>
        <Text style={styles.countryName}>{countryName}</Text>
        <Text style={styles.lastUpdated}>
          {`Last Updated `}
          <TimeAgo time={lastUpdated} />
        </Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.confirmedText}>CONFIRMED</Text>
            <AntDesign name='linechart' size={12} color={Colors.red} />
          </View>

          <View style={styles.caseCountContainer}>
            <Text style={[styles.totalNumber, { color: Colors.red }]}>
              {totalConfirmed}
            </Text>
            {dailyConfirmed !== '0' && (
              <Text style={[styles.dailyNumber, { color: Colors.red }]}>
                <AntDesign name='arrowup' size={15} color={Colors.red} />
                {dailyConfirmed}
              </Text>
            )}
          </View>
          {isLoading ? (
            <View style={{ paddingVertical: 126 }}>
              <ActivityIndicator size='large' color={Colors.red} />
            </View>
          ) : (
            <CaseNumberChart allCountryStats={allCountryStats} />
          )}
        </View>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.confirmedText, { color: Colors.green }]}>
              RECOVERED
            </Text>
            <AntDesign name='linechart' size={12} color={Colors.green} />
          </View>
          <View style={styles.caseCountContainer}>
            <Text style={[styles.totalNumber, { color: Colors.green }]}>
              {totalRecovered}
            </Text>

            {isLoading ? (
              <View style={{ marginLeft: 10, marginBottom: 10 }}>
                <ActivityIndicator size='small' color={Colors.green} />
              </View>
            ) : allCountryStats[allCountryStats.length - 1].new_recovered !==
              '0' ? (
              <Text style={[styles.dailyNumber, { color: Colors.green }]}>
                <AntDesign name='arrowup' size={15} color={Colors.green} />
                {allCountryStats[allCountryStats.length - 1].new_recovered}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.confirmedText, { color: Colors.gray }]}>
              DECEASED
            </Text>
            <AntDesign name='linechart' size={12} color={Colors.gray} />
          </View>
          <View style={styles.caseCountContainer}>
            <Text style={[styles.totalNumber, { color: Colors.gray }]}>
              {totalDeaths}
            </Text>

            {isLoading ? (
              <View style={{ marginLeft: 10, marginBottom: 10 }}>
                <ActivityIndicator size='small' color={Colors.gray} />
              </View>
            ) : allCountryStats[allCountryStats.length - 1].new_deaths !==
              '0' ? (
              <Text style={[styles.dailyNumber, { color: Colors.gray }]}>
                <AntDesign name='arrowup' size={15} color={Colors.gray} />
                {allCountryStats[allCountryStats.length - 1].new_deaths}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
      <View style={styles.showMonthlyStatasBtn}>
        <TouchableButton onPress={handleScroll}>
          <View style={styles.flexRowCenter}>
            <Text style={styles.monthlyStatsButtonText}>
              Show Last 30 day's stats
            </Text>
            <AntDesign
              name={showMonth ? 'caretup' : 'caretdown'}
              size={14}
              color='black'
            />
          </View>
        </TouchableButton>
      </View>

      {showMonth && <MonthlyStats />}
    </ScrollView>
  )
}

export default CountryScreen

const styles = StyleSheet.create({
  flexRowCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  header: {
    backgroundColor: Colors.backgroundBlue,
    paddingHorizontal: 26,
    paddingTop: 40,
    height: 280,
    position: 'relative',
    overflow: 'hidden',
  },

  appName: {
    marginBottom: 16,
    fontSize: 14,
    color: '#fff',
    fontFamily: 'open-sans',
  },

  countryName: {
    marginBottom: 4,
    fontSize: 32,
    color: '#fff',
    fontFamily: 'open-sans-bold',
  },
  lastUpdated: {
    fontSize: 14,
    color: Colors.darkGray,
    fontFamily: 'open-sans',
  },
  virusImage1: {
    position: 'absolute',
    transform: [{ scale: 1 }],
    top: 10,
    right: 0,
  },
  virusImage2: {
    position: 'absolute',
    transform: [{ scale: 1.7 }],
    bottom: -5,
    left: -3,
  },
  virusImage3: {
    position: 'absolute',
    transform: [{ scale: 0.6 }],
    right: -20,
    bottom: -15,
  },
  stats: {
    transform: [{ translateY: -50 }],
    overflow: 'hidden',
  },
  card: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    marginHorizontal: 26,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    borderRadius: 4,
  },
  confirmedText: {
    fontSize: 12,
    color: Colors.red,
    fontFamily: 'open-sans',
    marginBottom: 4,
    marginRight: 10,
    paddingTop: 5,
  },
  caseCountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  totalNumber: {
    fontSize: 34,
    fontFamily: 'open-sans-bold',
  },
  dailyNumber: {
    fontSize: 14,
    marginLeft: 8,
    marginBottom: 7,
    fontFamily: 'open-sans',
  },
  showMonthlyStatasBtn: {
    marginHorizontal: 26,
    marginBottom: 10,

    backgroundColor: '#fff',
    marginTop: -40,
    borderRadius: 6,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    borderRadius: 4,
  },
  monthlyStatsButtonText: {
    fontFamily: 'open-sans-semibold',
  },
})
