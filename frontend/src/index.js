import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutsContext';

//mantine style
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
const theme = createTheme({
  /** Put your mantine theme override here */
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider theme={theme}>
  <React.StrictMode>
    <WorkoutsContextProvider>
      <App />
    </WorkoutsContextProvider>
  </React.StrictMode>
  </MantineProvider>
);


