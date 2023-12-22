import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from 'react-native-modal';
import { wp } from "../utils/screenResize";
import { useIsFocused, useRoute } from '@react-navigation/native';
import axios from 'axios';



const DetailsModal = ({visible, onClose, item}) => {

  const route = useRoute();
  const isFocused = useIsFocused()
  

  const [kaliteDetail, setKaliteDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      console.log('detailsskalitee', item)
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
        console.log('detailsdetailsdetails',kaliteDetail)
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
                height: '50%'}}>
                <View style={{flex:1, padding: wp(1)}}>
                <TouchableOpacity onPress={onClose} style={{alignItems: 'flex-end',marginBottom: wp(2)}}> 
                <Image style={{resizeMode:'cover'}} source={require('../assets/cross.png')} /></TouchableOpacity>
                
                <View style={{ alignItems:'center'}}>
                <View >
                        
                        <View >
                        <View>
                          <Text style={{color:'pink', fontSize:wp(5), padding: wp(3)}} >Kalite </Text>
                          <Text>{kaliteDetail.kalite}</Text>
                        </View>
                        <View>
                          <Text style={{color:'#333333', fontSize:wp(5), padding: wp(3)}} >Toptan</Text>
                          <Text>{kaliteDetail.toptan}</Text>
                        </View>
                        <View>
                          <Text style={{color:'#333333', fontSize:wp(5), padding: wp(3)}} >Perakende</Text>
                          <Text>{kaliteDetail.perakende}</Text>
                        </View>
                        <View>
                          <Text style={{color:'#333333', fontSize:wp(5), padding: wp(3)}} >Kompozisyon</Text>
                          <Text>{kaliteDetail.kompozisyon}</Text>
                        </View>
                        
                        
                        </View>
                        
                    </View>
                </View>
                </View>

            </View>
        </Modal>
    );
}

export default DetailsModal;