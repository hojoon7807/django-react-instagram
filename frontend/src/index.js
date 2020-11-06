import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'pages';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import { AppProvider } from 'Store';

ReactDOM.render(
  <BrowserRouter >
    <AppProvider>
      <Root />
    </AppProvider>
  </BrowserRouter>
  , document.getElementById('root')
);

