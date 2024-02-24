import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import userInformationReducer from './userInformation/reducer';

const rootReducer = combineReducers({
  userInformationReducer,
});


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userInformationReducer'],
};

const persistedReducer = persistReducer(persistConfig, userInformationReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

type RootState = ReturnType<typeof rootReducer>


let persistor = persistStore(store);

export { store, persistor, type RootState };
