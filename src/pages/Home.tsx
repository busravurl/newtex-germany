import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { wp } from "../utils/screenResize";
import axios from 'axios';
import Header from "../components/header";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const Home = () => {
  


  useEffect(() => {
      getProducts()
    }, [])

  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const apiUrl = 'https://germany.almaestro.org/api/main_desan'; 
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(apiUrl, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.data.main_desans);
    } catch (error) {
      console.log(error);
    }
  };
  
  const _renderProducts = (item: any) => {


      return (
        <View style={{marginBottom: wp(5), alignItems: 'center'}}>
          <View key={item.id} style={{backgroundColor: '#fff',width: wp(20),alignItems: 'center',margin: wp(2.5), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1)}}>
          <TouchableOpacity onPress={() => navigation.navigate('DetailsPage', { item: item.name })}>
            <View style={{alignItems: 'center', margin: wp(4), width: wp(20)}}>
              <Text style={{fontWeight: 'bold', color:'#fc6d32', marginBottom: wp(1)}}>{item.name}</Text>
            </View>
          </TouchableOpacity>
          </View>
        </View>
      )
    }




  return(
      <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
        <Header />
        <View style={{margin: wp(10), alignSelf: 'center',alignItems: 'center'}}><FlatList
          numColumns={3}
          data={products}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => _renderProducts(item)}
        /></View>
      </SafeAreaView>
  )
 
}

export default Home;