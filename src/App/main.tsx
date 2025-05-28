import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HeroUIProvider } from '@heroui/react';
import { BrowserRouter } from 'react-router';
import { store } from '../store/store.ts';
import { Provider } from 'react-redux';
import App from './App.tsx';

import './index.css';
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <HeroUIProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </HeroUIProvider>
        </BrowserRouter>
    </StrictMode>
);
