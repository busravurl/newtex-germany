import { View, SafeAreaView, Text, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState }  from 'react'
import { useIsFocused, useRoute } from '@react-navigation/native';
import { wp } from '../utils/screenResize';
import axios from 'axios';
import Header from '../components/header';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';



const DetailsPage = () => {
  const route = useRoute();
  const item = route.params.item; 
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

   const isFocused = useIsFocused()
    
   
    
    const handleInputToggle = (selected: any) => {
      setSelectedItem(selected);
      setInputModalVisible(!inputModalVisible);
      
    };


  useEffect(() => {
      initialScreen()
      setIsLoading(false)
    }, [isFocused])
    
    
  const initialScreen = async () => {
    
    getProductDetails(item);
    setIsLoading(false)
  }

  const DetailsModal = ({visible, onClose, item}) => {

    const [kaliteDetail, setKaliteDetail] = useState([]);
    const [permission, setPermission] = useState(null);
  
    useEffect(() => {
        initialScreen()
        setIsLoading(false)
      }, [isFocused])
    
    
      const initialScreen = async () => {
        getDetails(item);
        retrieveUser();
        setIsLoading(false)
      }
  
      const retrieveUser = async () => {
        try {
          const userString = await AsyncStorage.getItem('user');
          const parsedUser = JSON.parse(userString);
          
          // Sadece 'permission' bilgisini al
          const userPermission = parsedUser?.permission || null;
          setPermission(userPermission);
        } catch (error) {
          console.error('Error retrieving user', error);
        }
      };
    const getDetails = async (kalite: any) => {
        const apiUrl = 'https://germany.almaestro.org/api/details/'; 
        let query = `${kalite}`
        try {
          const token = await AsyncStorage.getItem('token');
          const response = await axios.post(apiUrl+ query, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setKaliteDetail(response.data.data.detail);
          console.log(response.data.data.detail);
          
        } catch (error) {
          console.log(error);
        }
      };
  
  
  
      return(
          <Modal
              style={{justifyContent: 'center', margin:0}} 
              isVisible={visible}
              swipeDirection="down" 
              backdropOpacity={0.3}
              backdropColor= "#c9c9c9"
              onSwipeComplete={onClose}
              onBackdropPress={onClose}
              onBackButtonPress={onClose}>
              <View style={{
                  backgroundColor: 'white',
                  padding: wp(5),
                  margin: wp(5),
                  borderRadius: wp(5),
                  shadowColor: "#b2b2b2",
                  shadowOffset: {
                  width: 0,
                  height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 5,
                  height: '78%'}}>
                  <View style={{flex:1, padding: wp(1)}}>
                  <TouchableOpacity onPress={onClose} style={{alignItems: 'flex-end',marginBottom: wp(2)}}> 
                  <Image style={{resizeMode:'cover'}} source={require('../assets/cross.png')} /></TouchableOpacity>
                  
                  <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                  <View >
                  <View style={{flexDirection:'row', margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Kalite </Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{kaliteDetail.kalite}</Text>
                            </View>
                            <View style={{flexDirection:'row', margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#fc6d32', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Toptan Nakit</Text>
                              <Text style={{color:'#fc6d32', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{kaliteDetail.ToptanNakit} + KDV</Text>
                            </View>
                            
                            <View style={{flexDirection:'row',margin: wp(3), marginTop: wp(0), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#fc6d32', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Perakende Nakit</Text>
                              <Text style={{color:'#fc6d32', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{kaliteDetail.PerakendeNakit} + KDV</Text>
                            </View>
                            <View style={{flexDirection:'row', margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Toptan Taksit</Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{kaliteDetail.ToptanTaksit} + KDV</Text>
                            </View>
                            <View style={{flexDirection:'row', margin: wp(3), marginTop: wp(0), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Perakende Taksit</Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{kaliteDetail.PerakendeTaksit} + KDV</Text>
                            </View>
                            <View style={{flexDirection:'row', margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Ağırlık</Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{kaliteDetail.agirlik}</Text>
                            </View>
                            <View style={{flexDirection:'row', margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Kompozisyon</Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", width: wp(55), borderLeftWidth: wp(0.1)}}>{kaliteDetail.kompozisyon}</Text>
                            </View>
                            {/* <View style={{flexDirection:'row', margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Kod</Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{kaliteDetail.code}</Text>
                            </View> */}
                            
                      </View>
                  </View>
                  </View>
  
              </View>
          </Modal>
      );
  }
  
  const getProductDetails = async (name: string) => {
      const apiUrl = 'https://germany.almaestro.org/api/kalite/'; 
      let query = `${name}`
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post(apiUrl+ query, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDetails(response.data.data.kalite);
      } catch (error) {
        console.log(error);
      }
    };


    const renderItem = ({ item, index }) => {
      return (
        <View style={{ alignItems: 'center', backgroundColor: '#fff' }}>
          <TouchableOpacity onPress={() => handleInputToggle(item.kalite)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View  style={{ borderColor: "#a0a0a0", borderWidth: wp(0.1),width:wp(40), height: wp(20),  borderRadius: wp(2), margin: wp(4),paddingHorizontal:wp(1), justifyContent: 'center'}}>
              <Text style={{ color: '#fc6d32', fontSize: wp(5), padding: wp(3), alignSelf: 'center' }}>{`${item.kalite}`}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    };

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
        <Header />
        <ScrollView style={{marginTop: wp(10)}}>
        <View style={{ alignItems:'center',marginBottom: wp(10),borderRadius: wp(2),}} >
               
               <FlatList
                      data={details}
                      numColumns={2}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={renderItem}
                  />
               <DetailsModal 
                      visible={inputModalVisible}
                      onClose={handleInputToggle}
                      item={selectedItem}
                    />
                
        </View>
        </ScrollView>
    </SafeAreaView>
);
}

export default DetailsPage