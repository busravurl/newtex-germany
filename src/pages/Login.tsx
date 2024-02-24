import React, { useEffect, useState } from "react";
import {Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { wp } from "../utils/screenResize";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userInformation/actions';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    initialScreen();
  }, []);

    const initialScreen = async () => {
    setIsLoading(true)
    checkLoginStatus();
    setIsLoading(false)
  }
  const checkLoginStatus = async () => {

      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

      // Eğer kullanıcı daha önce giriş yapmışsa ve logout yapmamışsa ana sayfaya yönlendir
      if (isLoggedIn === 'true') {
        // Ana sayfaya yönlendirme işlemi burada yapılabilir
        navigation.navigate('SearchByPage');
        console.log('User is logged in');
      } 
  };

  const saveUser = async (userData: any) => {
    try {
      const userString = JSON.stringify(userData);

      await AsyncStorage.setItem('user', userString);
      setUser(userData);
    } catch (error) {
      console.error('Error saving user', error);
    }
  };
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://germany.almaestro.org/api/login', {
        name,
        password,
      });
  
      const data = response.data;

      if (data.data.token) {
        await AsyncStorage.setItem('token', data.data.token);
  
        console.log('useruseruser', data.data.user);
        dispatch(loginSuccess(data.data));

        if (data.error === 0 ) {
          saveUser({name: data.data.user.name, permission: data.data.user.permission});
          await AsyncStorage.setItem('isLoggedIn', 'true');
          navigation.navigate('SearchByPage');
        } else {
          const errorMessage = data.message;
          Alert.alert('Error', errorMessage);
        }
      } else {
        // data.token tanımlı değilse veya null ise burada gerekli işlemleri yapabilirsiniz.
        console.log('Token is missing or null');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred');
    }
  };
  
  
  
 
  return (
    
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
        
        <View style={{alignItems: 'center',justifyContent: 'center',marginTop: wp(40),marginBottom: wp(20)}}>
        <Image 
            source={require('../assets/logo.png')} 
            style={{ width: wp(40),height: wp(40) ,resizeMode:'contain'}}/>
        </View>
                 
        <View style={{ alignItems: 'center'}}>
          <View style={styles.card}>
              <TextInput 
              style={{color:'#cecece', paddingLeft: wp(2), width: '100%'}}
              placeholder="Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor={'#cecece'}
              ></TextInput>
          </View>
          <View style={styles.card}>
              <TextInput 
              style={{color:'#cecece', paddingLeft: wp(2), width: '100%'}}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={'#cecece'}
              ></TextInput>
          </View>
          <View style={{
            backgroundColor: '#ec6924',
            margin: wp(3),width:'80%', 
            height: wp(12),
            borderRadius: 20 ,
            alignItems: 'center',
            justifyContent: 'center'}}>
            <TouchableOpacity 
              onPress={handleLogin}  disabled={isLoading}>
              <Text style={{color:"#fff", fontWeight:'700', fontSize: wp(5)}}>Login</Text></TouchableOpacity> 
          </View>
          </View>
           
            
    </SafeAreaView> 
  )
}

export default Login

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: wp(3),
    paddingLeft:wp(2),
    width:'80%',
    height: wp(12),
    backgroundColor: '#fff',
    borderColor:'#cecece',
    borderWidth: 1.5,
    borderRadius: 20
  },
});

