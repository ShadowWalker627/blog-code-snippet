import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { hot } from 'react-hot-loader';
import AppLayout from '@yolo/containers/AppLayout/index';
import './App.less';
import GlobalStyle, { theme } from './GlobalStyle';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <GlobalStyle />
          <AppLayout />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default hot(module)(App);
