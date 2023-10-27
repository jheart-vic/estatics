import {BrowserRouter as Router} from 'react-router-dom';
import{persistor, store}  from './redux/store.js';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot (document.getElementById ('root')).render (
  <Provider store={store}>
    <Router>
<PersistGate loading={null} persistor={persistor}>
      <App />
</PersistGate>
    </Router>
  </Provider >
);
