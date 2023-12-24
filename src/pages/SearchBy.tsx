import React from "react";
import {View,SafeAreaView, Text, TouchableOpacity} from "react-native";
import { wp } from "../utils/screenResize";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";

const SearchBy =() => {

    const navigation = useNavigation();
    return (
       
           
        <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
        <Header />
                <View style={{marginBottom: wp(5), alignItems: 'center', marginTop: '50%'}} >
                    <TouchableOpacity 
                    style={{backgroundColor: '#fc6d32',width: wp(50), height: wp(20),alignItems: 'center',justifyContent: 'center',margin: wp(2.5), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1)}}
                    onPress={() => navigation.navigate('Home')}>
                        <Text style={{fontWeight: 'bold', color:'#fff', marginBottom: wp(1)}}>Kaliteye Göre Ara</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={{backgroundColor: '#fc6d32',width: wp(50), height: wp(20),alignItems: 'center',justifyContent: 'center',margin: wp(2.5), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1)}}
                    onPress={() => navigation.navigate('DesenPage')}
                    >
                        <Text style={{fontWeight: 'bold', color:'#fff', marginBottom: wp(1)}}>Desene Göre Ara</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
       
    )
}

export default SearchBy