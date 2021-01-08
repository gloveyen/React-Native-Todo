import React from 'react';
import { Text, Animated, View, StyleSheet } from 'react-native';
import BlurShadowView from './BlurShadowView';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import moment from 'moment';
import { SCREEN_INFO } from '../utils';
import Icon from 'react-native-vector-icons/AntDesign';

export default class MissionItem extends React.Component {
  constructor() {
    super();
    this.translateX = new Animated.Value(0);
    this.onGestureEvent = Animated.event([
      {
        nativeEvent: {
          translationX: this.translateX
        }
      }
    ])
  }

  onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState == State.ACTIVE) {
      Animated.timing(this.translateX, {
        toValue: event.nativeEvent.translationX > -100 ? 0 : -SCREEN_INFO.width,
        duration: event.nativeEvent.translationX > -100 ? 300 : 150,
        useNativeDriver: true
      }).start();
    }
  } 

  render() {
    const { id, title, time } = this.props.missionData;
    return (
      <View>
        <PanGestureHandler onGestureEvent={this.onGestureEvent} onHandlerStateChange={this.onHandlerStateChange}>
          <Animated.View style={{transform: [{translateX: this.translateX}]}}>
          <BlurShadowView>
            <Text onPress={()=>{this.props.handlePress(id)}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', lineHeight: 36}}>{title + "\n"}</Text>
              <Text>
                <Text style={{color: 'tomato'}}>提醒事項</Text> - {moment(time).format('yyyy/M/DD')}
              </Text>
            </Text>
          </BlurShadowView>

          </Animated.View>
        </PanGestureHandler>

        <Animated.View
          style={[styles.check,{
            opacity:  this.translateX.interpolate({inputRange:[-200, -100, 0], outputRange:[0, 1, 0]})
          }]}
        >
            <Icon name='checkcircle' size={30} color='#578B71' />
          </Animated.View>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  check: {
    position: 'absolute',
    top: 25,
    right: 35
  }
})
