import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { hot } from 'react-hot-loader';
import AppLayout from '@yolo/containers/AppLayout/index';
import './App.less';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppLayout />
      </div>
    </BrowserRouter>
  );
}

export default hot(module)(App);
