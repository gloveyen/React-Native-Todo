import React from 'react';
import { StyleSheet, Animated, Text, View, TextInput, Keyboard } from 'react-native';
import { SCREEN_INFO } from '../utils';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

function MissionSlide({ slideX, handlePress, focusMission }) {

  const renderFocusMission =  Object.keys(focusMission).length ? (
    <>
      <View style={[styles.header]}>
        <Icon style={styles.close} name='close' size={24} onPress={()=>handlePress('slideOut')} />
        <Text style={styles.title} onPress={()=>Keyboard.dismiss()}>{focusMission.title}</Text>
      </View>
      <View style={[styles.description, styles.infoView]}>
        <TextInput
          placeholder='點擊以新增敘述'
          style={{ fontSize:16, lineHeight: 20, color: focusMission.desc? null : '#ddd' }}
        >{focusMission.desc}</TextInput>
      </View>

      <View style={[styles.setTime, styles.infoView]} >
        <Icon name='clockcircleo' size={20} style={{marginRight: 8, color: '#D9B300'}} />
        <Text style={{ fontSize:18, lineHeight: 20}}>時限為{moment(focusMission.time).format('M月DD日 的 A hh:mm')}</Text>
      </View>

      <View style={[styles.setTime, styles.infoView]} >
        <Icon name='tag' size={20} style={{marginRight: 8, color: '#D9B300'}} />
        <Text style={{ fontSize:18, lineHeight: 20}}>分類五</Text>
      </View>

      <View style={[styles.setTime, styles.infoView]} >
        <Icon name='tag' size={20} style={{marginRight: 8, color: '#D9B300'}} />
        <TextInput style={{ fontSize:18, lineHeight: 20}}>分類五</TextInput>
      </View>
    </>
  ) : null;

  return (
    <>
      <Animated.View style={[styles.slideIn,{
          transform: [{
            translateX: slideX
          }]
        }]}>
          {renderFocusMission}
      </Animated.View>
    </>
  );
}

export default MissionSlide;

const styles = StyleSheet.create({
  slideIn: {
    position: 'absolute',
    left: 0,
    top: 100,
    width: SCREEN_INFO.width,
    height: SCREEN_INFO.height-100,
    backgroundColor: '#eee',
  },

  infoView: {
    backgroundColor: '#fff',
    marginBottom: 8,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    },
  }, 

  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  }, 

  description: {
    backgroundColor: '#fff',
    padding: 16,
  },

  close: {
    marginBottom: 12
  },

  title: {
    fontSize: 24,
  },

  setTime: {
    padding: 8,
    paddingVertical: 12,
    flexDirection: 'row'
  }
  
});
