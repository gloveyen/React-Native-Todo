import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SCREEN_INFO } from '../utils';

function DateTimeDrawer({ show, toggleShow, datePicked, setDatePicked }) {
  const AnimateValue = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    Animated.timing(AnimateValue, {
      toValue: show ? 1 : 0,
      duration: show ? 500 : 200,
      useNativeDriver: true
    }).start();
  }, [show]);

  function handleDateChange(event, value) {
    const y = value.getYear() + 1900;
    const M = value.getMonth();
    const d = value.getDate();
    const h = datePicked.getHours();
    const m = datePicked.getMinutes();
    setDatePicked(new Date(y, M, d, h, m));
  }

  function handleTimeChange(event, value) {
    const y = datePicked.getYear() + 1900;
    const M = datePicked.getMonth();
    const d = datePicked.getDate();
    const h = value.getHours();
    const m = value.getMinutes();
    setDatePicked(new Date(y, M, d, h, m));
  }

  return (
    <>
      <Animated.View style={[styles.dateTimePickerContainer, { height: 240,
        transform: [
          {
            translateY: AnimateValue.interpolate({inputRange: [0, 1], outputRange: [240, 0]}), 
          },
          {
            scaleY: AnimateValue.interpolate({inputRange: [0, 0.3, 1], outputRange: [0, 1, 1]})
          }
        ]
      }]}>
        <View style={styles.innerContainer}>
          <DateTimePicker
            style={[styles.datePicker, {height: 200 }]}
            value={datePicked}
            mode='date'
            display="spinner"
            onChange={handleDateChange}
          />
            
          <DateTimePicker
            style={[styles.timePicker, {height: 200}]}
            value={datePicked}
            mode='time'
            display="spinner"
            onChange={handleTimeChange}
          />
        </View>
        
        <Button style={{marginTop: 100}} title="確定" onPress={toggleShow}></Button>
      </Animated.View>
    </>
  );
}

export default DateTimeDrawer;

const styles = StyleSheet.create({
  dateTimePickerContainer: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginTop: 16
  },

  innerContainer: {
    width: SCREEN_INFO.width,
    flexDirection: 'row',
  },

  datePicker: {
    flex: 1,
  },

  timePicker: {
    flex: 0.6
  }
})
