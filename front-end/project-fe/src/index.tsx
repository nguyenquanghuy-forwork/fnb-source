import '@/assets/scss/style.scss';
import { i18n } from '@/features/language';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './app';
import { persistor, store } from './app/store';
import './index.scss';
import './stylesheets/main.scss';

const container = document.getElementById('root');
const root = createRoot(container!);
const app = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </PersistGate>
  </Provider>
);
root.render(app);
