import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster, ToastBar, toast } from 'react-hot-toast';

import { store } from './app/store';
import './scss/main.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter="12"
        containerStyle={{ margin: 8 }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: 16,
            maxWidth: 500,
            padding: '16px 24px',
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button
                    className="btn-close"
                    onClick={() => toast.dismiss(t.id)}
                  ></button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </Provider>
  </React.StrictMode>
);
