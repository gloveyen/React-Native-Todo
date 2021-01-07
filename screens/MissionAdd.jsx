import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Animated, Pressable, Keyboard } from 'react-native';
import DateTimeDrawer from '../components/DateTimeDrawer';
import { SCREEN_INFO } from '../utils';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { addMission } from '../modules/services';

const AnimatedMissionSubmit = ({ addButtonPress, handleSubmit }) => {
  return (
    <Pressable style={styles.plusButton} onPress={handleSubmit}>
      <Icon name="caretup" size={24} color="#fff" onPress={addButtonPress}  />
    </Pressable>
  )
}

function MissionAdd({ mode, addNewMission }) {
  const [showPicker, setShowPicker] = useState(false);
  const [formData, setFormData] = useState({ time: new Date() });
  const AnimateValue = useRef(new Animated.Value(0)).current;
  const SubmitAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
      Animated.timing(AnimateValue, {
        toValue: mode !== 'ADD' ? 1 : 0,
        duration: mode !== 'ADD' ? 100 : 600,
        useNativeDriver: true
      }).start();
  }, [mode])

  function handlePress() {
    Keyboard.dismiss();
  }

  function toggleShowDatePicker() {
    setShowPicker(status => !status);
    Keyboard.dismiss();
  }

  function handleInputChange(type, value) {
    setFormData(formData => ({...formData, [type]: value}));
  }

  function setDatePicked(time) {
    setFormData(formData => ({ ...formData, time: time}));
  }

  async function handleSubmit() {
    const data = await addMission(formData);
    setFormData({ title: '', desc: '', time: new Date() });
    addNewMission({ ...data });
  }

  return (
    <>
      <Animated.View pointerEvents={mode==='ADD'? 'box' : 'none'} style={[styles.container, { 
        opacity: AnimateValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0]
        }) 
      }]}>
        <Pressable style={styles.pressContainer} onPress={handlePress}>
          <View style={styles.header}>
            <Text style={{fontSize: 24, lineHeight: 36}}>新增任務</Text>
          </View>

          <TextInput
            placeholder='代辦事項名稱'
            style={styles.input}
            value={formData.title}
            onFocus={()=>{setShowPicker(false)}}
            onChangeText={text => {handleInputChange('title', text)}}
          />
          <TextInput
            placeholder='描述內容'
            style={styles.input}
            value={formData.desc}
            onFocus={()=>{setShowPicker(false)}}
            onChangeText={text => {handleInputChange('desc', text)}}
          />

          <View style={styles.input}>
            <Text
              style={{lineHeight: 40}}
              onPress={toggleShowDatePicker}
            >
              {moment(formData.time).format('yyyy/M/DD A hh:mm')}
            </Text>
          </View>

          <DateTimeDrawer
            show={showPicker}
            toggleShow={toggleShowDatePicker}
            datePicked={formData.time}
            setDatePicked={setDatePicked}
          />

          {formData.title ? (<AnimatedMissionSubmit show={Boolean(formData.name)} animatedValue={SubmitAnimatedValue} handleSubmit={handleSubmit} />) : null}
        </Pressable>
      </Animated.View>
    </>
  );
}

export default MissionAdd;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    width: SCREEN_INFO.width,
    height: SCREEN_INFO.height - 100,
  }, 

  pressContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  header: {
    borderBottomWidth: 1,
    width: SCREEN_INFO.width * 0.8,
    marginBottom: 8
  },

  input: {
    height: 40,
    width: SCREEN_INFO.width * 0.8,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16
  },

  dateTimePickerContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
  },

  innerContainer: {
    width: SCREEN_INFO.width,
    height: 200,
    flexDirection: 'row',
  },

  datePicker: {
    flex: 1,
  },

  timePicker: {
    flex: 0.6
  },
  plusButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 110,
    bottom: 60, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#578B71',
    borderRadius: 25,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 2
    },
  },
})
