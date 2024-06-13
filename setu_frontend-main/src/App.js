import React from 'react';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reduxStore/reducers";
import {thunk} from 'redux-thunk';
import './App.css';

import { loadFromLocalStorage,saveToLocalStorage } from './reduxStore/storeUtil/storeUtil';

import Root from "./root/root";


const persistedState = loadFromLocalStorage();

export const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk)
)

saveToLocalStorage(store.getState())

store.subscribe(() =>{ saveToLocalStorage(store.getState())});

window.store = store;

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

export default App;
