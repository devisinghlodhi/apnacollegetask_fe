import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';

// Import your reducers
import { userReducer } from './reducers/userreducer';

// Define your new slice for 'skipped' state
import { createSlice } from '@reduxjs/toolkit';

const skippedSlice = createSlice({
  name: 'skipped',
  initialState: false,
  reducers: {
    skipTutorial: (state) => {
      return true;
    },
    resetSkipTutorial: (state) => {
      return false;
    },
  },
});

export const { skipTutorial, resetSkipTutorial } = skippedSlice.actions;
export const skippedReducer = skippedSlice.reducer;

// Combine all reducers including the new 'skipped' state
export const rootReducers = combineReducers({
  userReducer,
  skipped: skippedReducer,
});

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

// Configure Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Setup listeners
setupListeners(store.dispatch);

export { store };

