import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "styled-components";

import './styles/reset.css';
import theme from "./styles/theme";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);