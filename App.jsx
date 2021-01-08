import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { ImageBackground ,StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import MissionSlide from './screens/MissionSlide';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import firebase from './modules/firebase';
import { useDimensions } from '@react-native-community/hooks';
import { SCREEN_INFO } from './utils';
import Icon from 'react-native-vector-icons/AntDesign';
import MissionAdd from './screens/MissionAdd';
import MissionItem from './components/MissionItem';

const AnimatedMissionAdd = ({ addButtonPress, animatedValue }) => {

  return (
    <Animated.View style={[styles.plusButton, {
      transform: 
        [{
            rotateZ: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg','405deg']
            })
        }]
    }]}>
      <Icon name="pluscircle" size={50} color="tomato" onPress={addButtonPress} />
    </Animated.View>
  )
}

const Circle = ({ animatedValue }) => {
  return (
    <Animated.View style={[
      {
        position: 'absolute',
        right: 42,
        bottom: 60, 
        backgroundColor:'gold',
        borderRadius: 25,
        width: 50,
        height: 50,
        transform: [
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 8, 35]
            })
          }
        ]
      }
    ]} />
  )
}



export default function App() {
  const [missionList, setMissionList] = useState([]);
  const [showSlide, setshowSlide] = useState(false);
  const [focusMission, setFocusMission] = useState({});
  const [fontsLoaded] = useFonts({'Lobster': require('./assets/fonts/Lobster-Regular.ttf')});
  const [mode, setMode] = useState('DEFAULT');
  
  useEffect(() => {
    const queryMissions = async () => {
      const ref = firebase.firestore().collection("Missions");
      const snapshot = await ref.orderBy('time', 'asc').get();
      const data = snapshot.docs.map(doc => ({ id:doc.id, ...doc.data(), time: doc.time }));
      setMissionList(data.map(doc=>({...doc})));
    }
    queryMissions();
  },[])

  const slideX = useRef(new Animated.Value(SCREEN_INFO.width)).current;
  function handlePress(id) {
    console.log(id);
    const missionIndex = missionList.map(doc => doc.id).indexOf(id);
    setFocusMission({ ...missionList[missionIndex] });
    setshowSlide(status => {
      Animated.timing(slideX, {
        toValue: status ? SCREEN_INFO.width : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      return !status;
    })
  }

  const addMissionAnimatedValue = useRef(new Animated.Value(0)).current;
  function addButtonPress() {
    setMode(mode => {
      Animated.timing(addMissionAnimatedValue, {
        toValue: mode!=='ADD' ? 1 : 0,
        duration: 300,
        useNativeDriver: true
      }).start();
      return mode!=='ADD' ? 'ADD' : 'DEFAULT'
    });
  }

  function addNewMission(data) {
    setMissionList(list => [data,...list]);
    addButtonPress();
  }

  const renderMissions = missionList.length ? missionList.map((missionData)=>(
    <MissionItem key={missionData.id} missionData={missionData} handlePress={handlePress} />
  )): (null);

  if (!fontsLoaded) return <AppLoading />;
  return (
    <ImageBackground style={styles.container} source={require('./assets/bgImage.png')} >
      <StatusBar barStyle={'light-content'} />
      <View style={styles.header}>
          <Text style={styles.project}>Todo List</Text>        
      </View>
      
      <ScrollView style={styles.scrollView}>
        {renderMissions}
      </ScrollView>
        
      <Circle animatedValue={addMissionAnimatedValue} />
      <MissionAdd mode={mode} addNewMission={addNewMission} />

      <AnimatedMissionAdd addButtonPress={addButtonPress} animatedValue={addMissionAnimatedValue} />
      <MissionSlide slideX={slideX} handlePress={handlePress} focusMission={focusMission} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    resizeMode: "cover",
    flex: 1,
    alignItems: 'center',
  },

  header: {
    width: SCREEN_INFO.width,
    height: 100,
    zIndex: 1,
    backgroundColor: '#333',
  },

  scrollView: {
    flex:1,
    paddingTop: 16
  },

  plusButton: {
    position: 'absolute',
    right: 42,
    bottom: 60, 
    backgroundColor:'#fff',
    borderRadius: 25,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 2
    },
  },

  project: {
    textAlign: 'center',
    lineHeight: 140,
    color: '#fff',
    fontFamily: 'Lobster',
    fontSize: 30,
  },
});
