import React from 'react';
import {TextInput, View, Platform, Image} from 'react-native';
import { wp } from '../utils/screenResize';

const Input = ({placeholder, value, onChangeText}) => {
  return(
    <View style={{padding: 10,
        margin: wp(10),
        backgroundColor: '#ffffff' ,
        borderRadius: 12, 
        elevation: 2,
        flexDirection: 'row',}}>
      
      <TextInput 
        //autoCapitalize="none"
        style={{flex: 1,
            padding: Platform.OS === 'android' ? 0 : 5,}}
        placeholder={placeholder} 
        onChangeText={onChangeText}
        value={value}
      /><View  style={{alignItems: 'center'}}> 
        <Image style={{resizeMode:'cover'}} source={require('../assets/search.png')} /></View>
    </View>
  );
};

export default Input;