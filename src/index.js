import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF8co3-j6lq7qGI9b8s0U1YYEIwqXb4_0",
  authDomain: "web-messenger-4eb99.firebaseapp.com",
  databaseURL: "https://web-messenger-4eb99.firebaseio.com",
  projectId: "web-messenger-4eb99",
  storageBucket: "web-messenger-4eb99.appspot.com",
  messagingSenderId: "252569616509",
  appId: "1:252569616509:web:2bbb4c394e9d608f147114",
  measurementId: "G-VXYE76S2G7"
};


firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
