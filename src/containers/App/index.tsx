import React from 'react';
import { hot } from 'react-hot-loader'
import AppLayout from '@yolo/containers/AppLayout/index';
import './App.less';

function App() {
  return (
    <div className="App" >
      <AppLayout />
      </div>
  );
}

export default hot(module)(App);
