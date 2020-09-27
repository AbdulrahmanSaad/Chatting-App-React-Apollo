import React from 'react';
import './App.css';
import { Provider } from 'mobx-react';
import Store from './store/Store';
import {
  WindowStack
} from './stack/WindowStack';

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <WindowStack />
      </div>
    </Provider>
  );
}

export default App;
