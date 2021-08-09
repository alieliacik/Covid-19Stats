import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Colors from '../constants/Colors'
// import FadeInView from '../constants/FadeInView'

const CaseNumberChart = (props) => {
  const [dotCaseNum, setDotCaseNum] = useState('')
  const [dotDate, setDotDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sliceValue, setSliceValue] = useState(0)
  const [chartFilterValues, setChartFilterValues] = useState([
    {
      name: '1W',
      isSelected: false,
      slice: 7,
    },
    {
      name: '1M',
      isSelected: false,
      slice: 30,
    },
    {
      name: '3M',
      isSelected: false,
      slice: 90,
    },
    {
      name: '6M',
      isSelected: false,
      slice: 180,
    },
    {
      name: '1Y',
      isSelected: false,
      slice: 365,
    },
    {
      name: 'All',
      isSelected: true,
      slice: 0,
    },
  ])

  const chartFilterHandler = (selectedVal, sliceVal) => {
    setIsLoading(true)
    const updatedChartFilterValues = chartFilterValues.map((val) => {
      if (val.name === selectedVal) {
        return {
          ...val,
          isSelected: true,
        }
      } else {
        return {
          ...val,
          isSelected: false,
        }
      }
    })
    setSliceValue(sliceVal)
    setChartFilterValues(updatedChartFilterValues)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [sliceValue])

  const modifiedCaseNumbers = props.allCountryStats
    .map((c) => c.new_infections.replace(/\,/g, ''))
    .slice(-sliceValue)
  const modifiedCaseDates = props.allCountryStats
    .map((c) => c.last_updated)
    .slice(-sliceValue)

  return (
    <View>
      {!!dotCaseNum.length ? (
        // <FadeInView key={dotCaseNum} duration={300}>
        <View style={styles.dotStatsContainer}>
          <View style={styles.dotCaseNumTextContainer}>
            <Text style={styles.dotCaseNumText}>
              {dotCaseNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
          <Text style={styles.dotDateText}>{dotDate}</Text>
        </View>
      ) : (
        // </FadeInView>
        <Text style={{ fontFamily: 'open-sans', marginTop: 12 }}>
          View the number of cases for a specific day by touching a dot on the
          chart.
        </Text>
      )}
      {isLoading ? (
        <View style={{ paddingBottom: 125, paddingTop: 95 }}>
          <ActivityIndicator size='large' color={Colors.red} />
        </View>
      ) : (
        <LineChart
          formatYLabel={(lab) =>
            lab.slice(0, lab.length - 3).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          onDataPointClick={(value) => {
            const selectedDateIndex = value.dataset.data.findIndex(
              (i) => i === value.value
            )
            setDotDate(modifiedCaseDates[selectedDateIndex])
            setDotCaseNum(value.value)
          }}
          data={{
            datasets: [
              {
                data: modifiedCaseNumbers,
                date: modifiedCaseDates,
              },
            ],
          }}
          width={(Dimensions.get('window').width / 100) * 80}
          height={220}
          yAxisInterval={2522}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 1,
            },
            propsForDots: {
              r: '1.2',
              strokeWidth: '1.5',
              stroke: 'rgba(0,0,0,0.2)',
            },
          }}
          bezier
          style={{
            marginVertical: 18,
            borderRadius: 16,
            marginLeft: -13,
          }}
        />
      )}

      <View style={styles.chartDateFilter}>
        {chartFilterValues.map((val) => (
          <TouchableOpacity
            key={val.name}
            onPress={() => chartFilterHandler(val.name, val.slice)}
          >
            <Text
              style={[
                styles.chartDateFilterText,
                val.isSelected ? styles.textSelected : styles.textUnSelected,
              ]}
            >
              {val.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default CaseNumberChart

const styles = StyleSheet.create({
  dotStatsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  dotCaseNumTextContainer: {
    backgroundColor: Colors.red,
    borderRadius: 3,
  },
  dotCaseNumText: {
    fontFamily: 'open-sans',
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 5,
  },

  dotDateText: {
    fontFamily: 'open-sans',
    fontSize: 13,
    color: Colors.red,
    opacity: 0.8,
    marginLeft: 5,
    backgroundColor: '#fff',
  },
  chartDateFilter: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 35,
    left: 50,
  },
  chartDateFilterText: {
    fontFamily: 'open-sans-bold',
    fontSize: 12,
    color: Colors.red,
    paddingHorizontal: 5,
  },
  textSelected: {
    color: '#fff',
    backgroundColor: Colors.red,
  },
})
