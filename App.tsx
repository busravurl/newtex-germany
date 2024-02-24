import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Details from './src/pages/DetailsPage';
import SearchBy from './src/pages/SearchBy';
import Desen from './src/pages/DesenPage';
import { store, persistor } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


const Stack = createNativeStackNavigator();

const App = () =>{
  
    return(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
       <NavigationContainer>
            <Stack.Navigator
             initialRouteName="Login"
             screenOptions={{headerShown:false}} > 
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="DetailsPage" component={Details} />
            <Stack.Screen name="SearchByPage" component={SearchBy} />
            <Stack.Screen name="DesenPage" component={Desen} />
            </Stack.Navigator>
        </NavigationContainer></PersistGate></Provider>
    );
};


export default App;
