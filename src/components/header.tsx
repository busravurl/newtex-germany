import React, { useEffect, useState } from "react";
import {View, Image, Text, TouchableOpacity} from "react-native";
import { wp } from "../utils/screenResize";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header =() => {

    const navigation = useNavigation();
    const [user, setUser] = useState('');

        
    const handleLogout = async () => {
        
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.setItem('isLoggedIn', 'false');
            setUser(null);
          } catch (error) {
            console.error('Error clearing user', error);
          }
        navigation.navigate('Login');
    };

    return (
       
           
            <View style={{ 
                height: wp(20),backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', paddingHorizontal: wp(5),
                shadowColor: "#a0a0a0",
                shadowOffset: {
                width: 0,
                height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 8}}> 
                <View style={{flexDirection: 'row', alignItems: 'center'}}><Image 
                source={require('../assets/logo.png')} 
                style={{ marginLeft: wp(2), width: wp(13),height: wp(13) ,resizeMode:'contain'}}/>
                <Text style={{color: '#ec6924',fontSize: wp(7),marginLeft: wp(5), fontWeight: 'bold'}}>Newtex</Text></View>

                <View ><TouchableOpacity  onPress={handleLogout} >
                <Image 
                source={require('../assets/logout.png')} 
                style={{ marginLeft: wp(2), width: wp(5),height: wp(5) ,resizeMode:'contain'}}/></TouchableOpacity></View>
            </View>
       
    )
}

export default Header