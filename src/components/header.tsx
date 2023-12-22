import React from "react";
import {View, Image, Text} from "react-native";
import { wp } from "../utils/screenResize";

const Header =() => {
    return (
       
           
            <View style={{ 
                height: wp(20),backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center',justifyContent: 'center',
                shadowColor: "#a0a0a0",
                shadowOffset: {
                width: 0,
                height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 8}}> 
                <Image 
                source={require('../assets/logo.png')} 
                style={{ marginLeft: wp(2), width: wp(13),height: wp(13) ,resizeMode:'contain'}}/>
                <Text style={{color: '#ec6924',fontSize: wp(7),marginLeft: wp(5), fontWeight: 'bold'}}>Newtex</Text>

            </View>
       
    )
}

export default Header