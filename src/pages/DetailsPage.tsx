import { View, SafeAreaView, Text, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState }  from 'react'
import { useIsFocused, useRoute } from '@react-navigation/native';
import { wp } from '../utils/screenResize';
import axios from 'axios';
import Header from '../components/header';
import Modal from 'react-native-modal';



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
  
    useEffect(() => {
        initialScreen()
        setIsLoading(false)
      }, [isFocused])
    
    
      const initialScreen = async () => {
        getDetails(item);
        setIsLoading(false)
      }
  
    const getDetails = async (kalite: any) => {
        const apiUrl = 'https://germany.almaestro.org/api/details/'; 
        let query = `${kalite}`
        try {
          const response = await axios.post(apiUrl+ query);
          setKaliteDetail(response.data.data.detail);
          
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
                  height: '65%'}}>
                  <View style={{flex:1, padding: wp(1)}}>
                  <TouchableOpacity onPress={onClose} style={{alignItems: 'flex-end',marginBottom: wp(2)}}> 
                  <Image style={{resizeMode:'cover'}} source={require('../assets/cross.png')} /></TouchableOpacity>
                  
                  <View style={{ alignItems:'center'}}>
                  <View >
                  <View style={{flexDirection:'row', margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Kalite </Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{kaliteDetail.kalite}</Text>
                            </View>
                            <View style={{flexDirection:'row', margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Toptan</Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{kaliteDetail.toptan} + KDV</Text>
                            </View>
                            <View style={{flexDirection:'row',margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Perakende</Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{kaliteDetail.perakende} + KDV</Text>
                            </View>
                            <View style={{flexDirection:'row', margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Ağırlık</Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{kaliteDetail.agirlik}</Text>
                            </View>
                            <View style={{flexDirection:'row', margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Kompozisyon</Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{kaliteDetail.kompozisyon}</Text>
                            </View>
                            <View style={{flexDirection:'row', margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Kod</Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{kaliteDetail.code}</Text>
                            </View>
                            
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
        const response = await axios.post(apiUrl+ query);
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
        <ScrollView>
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