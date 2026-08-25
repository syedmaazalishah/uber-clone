import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.jsx';

import { BrowserRouter } from 'react-router-dom';
import AppProvider from './contexts/AppContext.jsx';
import UserProvider from './contexts/UserContext.jsx';
import SocketProvider from './contexts/SocketIOContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SocketProvider>
             <AppProvider>
                     <App />
            </AppProvider>
        </SocketProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)
