import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView, FlatList, View, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import Header from '../components/header';

import Input from '../components/input';
import { useIsFocused } from '@react-navigation/native';
import { wp } from '../utils/screenResize';

function DesenPage() {


    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState('');

    const [inputModalVisible, setInputModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const isFocused = useIsFocused()
    const [isLoading, setIsLoading] = useState(true);
    
    const handleInputToggle = (selected: any) => {
        setSelectedItem(selected);
        setInputModalVisible(!inputModalVisible);
        
      };

      useEffect(() => {
        initialScreen()
        setIsLoading(false)
      }, [isFocused])
      
      
    const initialScreen = async () => {
      getDesan();
      setIsLoading(false)
    }
    const getDesan = async () => {
        const apiUrl = 'https://germany.almaestro.org/api/desans'; 
        try {
          const response = await axios.post(apiUrl);
          setData(response.data.data.desans);
        } catch (error) {
          console.log(error);
        }
      };

      const DetailsModal = ({visible, onClose, item}) => {

      
        const [desansDetail, setDesansDetail] = useState([]);
      
        useEffect(() => {
            initialScreen()
            setIsLoading(false)
          }, [isFocused])
        
        
          const initialScreen = async () => {
            getDetails(item);
            setIsLoading(false)
          }
      
        const getDetails = async (desans: any) => {
            const apiUrl = 'https://germany.almaestro.org/api/desan/'; 
            let query = `${desans}`
            try {
              const response = await axios.post(apiUrl+ query);
              setDesansDetail(response.data.data.desan);
              
            } catch (error) {
              console.log(error);
            }
          };
      
      
      
          return(
              <Modal
                  style={{justifyContent: 'center', margin: wp(0)}} 
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
                      <View style={{flex:1, padding: wp(2)}}>
                      <TouchableOpacity onPress={onClose} style={{alignItems: 'flex-end',marginBottom: wp(2)}}> 
                      <Image style={{resizeMode:'cover'}} source={require('../assets/cross.png')} /></TouchableOpacity>
                      
                      <View style={{ alignItems:'center'}}>
                      <View >
                            <View style={{flexDirection:'row', margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Kalite </Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{desansDetail.kalite}</Text>
                            </View>
                            <View style={{flexDirection:'row', margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Toptan</Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{desansDetail.toptan} + KDV</Text>
                            </View>
                            <View style={{flexDirection:'row',margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Perakende</Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{desansDetail.perakende} + KDV</Text>
                            </View>
                            <View style={{flexDirection:'row', margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Ağırlık</Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{desansDetail.agirlik}</Text>
                            </View>
                            <View style={{flexDirection:'row', margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Kompozisyon</Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{desansDetail.kompozisyon}</Text>
                            </View>
                            <View style={{flexDirection:'row', margin: wp(3), borderRadius: wp(1), borderColor: "#a0a0a0", borderWidth: wp(0.1), alignItems: 'center'}}>
                              <Text style={{color:'#333333', fontSize:wp(4), padding: wp(3), width: wp(27)}} >Kod</Text>
                              <Text style={{color:'#333333', fontSize:wp(5),fontWeight: 'bold', padding: wp(2), borderColor: "#a0a0a0", borderLeftWidth: wp(0.1)}}>{desansDetail.code}</Text>
                            </View>
                            
                              
                          </View>
                      </View>
                      </View>
      
                  </View>
              </Modal>
          );
      }
   
      const filteredData = (data || []).filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );


      const renderItem = ({ item, index }) => {
        return (
          <View style={{ alignItems: 'center', backgroundColor: '#fff' }}>
            <TouchableOpacity onPress={() => handleInputToggle(item.name)} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View  style={{ borderColor: "#a0a0a0", borderWidth: wp(0.1),width: '70%', height: wp(15),  borderRadius: wp(2), margin: wp(1),paddingHorizontal:wp(1), justifyContent: 'center'}}>
                <Text style={{ color: '#fc6d32', fontSize: wp(5), padding: wp(3), alignSelf: 'center' }}>{`${item.name}`}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      };
  
 
    return(
        <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
	    <Header />
            <View >
            <Input
                placeholder="Arama yapın..."
                value={searchText}
                onChangeText={text => setSearchText(text)}
            />
            </View>
            <View>
            <FlatList
            data={filteredData}
            keyExtractor={(item)=> item.id}
            renderItem={renderItem}

            />

            <DetailsModal 
                visible={inputModalVisible}
                onClose={handleInputToggle}
                item={selectedItem}
            />
                
            </View>
            
        </SafeAreaView>
    );
};

export default DesenPage;