import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './src/pages/Home';
import Details from './src/pages/DetailsPage';
import SearchBy from './src/pages/SearchBy';
import Desen from './src/pages/DesenPage';


const Stack = createNativeStackNavigator();

const App = () =>{
  
    return(
       <NavigationContainer>
            <Stack.Navigator
             initialRouteName="SearchByPage"
             screenOptions={{headerShown:false}} > 
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="DetailsPage" component={Details} />
            <Stack.Screen name="SearchByPage" component={SearchBy} />
            <Stack.Screen name="DesenPage" component={Desen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default App;
