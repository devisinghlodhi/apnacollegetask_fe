import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store} from './redux/store.js'
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist'; //with persist
import { PersistGate } from 'redux-persist/integration/react'; //with persis

let persistor = persistStore(store); //with persis

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
  <PersistGate persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
