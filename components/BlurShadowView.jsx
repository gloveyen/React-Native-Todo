import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
function BlurShadowView(props) {
  return (
    <>
      <View style={styles.outContainer}>
      <BlurView style={styles.backdrop} intensity={75} tint={'light'}>
        {props.children}
      </BlurView>
      </View>
    </>
  );
}

const screenInfo = Dimensions.get('screen');

const styles = StyleSheet.create({
  outContainer: {
    marginHorizontal: 10,
    width: screenInfo.width-20,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 2
    },
  },

  backdrop: {
    width: '100%',
    borderRadius: 8,
    padding:8,
    overflow: 'hidden',
  }
});


export default BlurShadowView;
