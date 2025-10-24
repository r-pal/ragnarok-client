import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CssBaseline } from '@mui/material';
import { ThemeProviderWrapper } from 'ThemeProviderWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <CssBaseline />
    <App />
    </ThemeProviderWrapper>
  </React.StrictMode>
);