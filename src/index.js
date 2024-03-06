import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { UserContextProvider } from "./context/userContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <UserContextProvider>
      {/* Le contexte à mettre à l'intérieur du StrictMode*/}
        <App />
    </UserContextProvider>
  </React.StrictMode>
  </BrowserRouter>
);
