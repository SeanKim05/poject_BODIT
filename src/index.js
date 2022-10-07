import React from 'react';
import { createRoot } from 'react-dom/client';
import GlobalStyle from './styles/GlobalStyle';
import Theme from './styles/Theme';
import { ThemeProvider } from 'styled-components';

import Routes from './Routes';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={Theme}>
      <Routes />
    </ThemeProvider>
  </>,
);
