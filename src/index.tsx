import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SocketManagerProvider } from './Context/SocketManagerProvider';
import './index.css';
import reportWebVitals from './reportWebVitals';
import theme from './theme';
import { Fonts } from './theme/Fonts';
import './index.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AdminProvider } from './Context/AdminContext';
import { StartSessionProvider } from './Context/StartSesstionContext';
import { PopupsHandlerProvider } from './Context/PopupsHandlerContext';
import { CSVProvider } from './Context/CSVDataContext';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <StartSessionProvider>
          <AdminProvider>
            <CSVProvider>
              <Fonts />
              <PopupsHandlerProvider>
                <SocketManagerProvider>
                  <App />
                </SocketManagerProvider>
              </PopupsHandlerProvider>
            </CSVProvider>
          </AdminProvider>
        </StartSessionProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
