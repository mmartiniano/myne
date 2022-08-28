import React from 'react';
import { ThemeProvider } from 'styled-components';
import default_theme from './styles/themes/default';
import GlobalStyle from './styles/global';
import Field from './components/Field';
import Main from './components/Main';
import Header from './components/Header';


const App: React.FC = () => {
  const field_side = 9;
  const field_bombs = 9;

  return (
    <ThemeProvider theme={default_theme}>
      <GlobalStyle />

      <Header />
      <Main>
        <Field size={field_side} bombs={field_bombs} />
      </Main>

    </ThemeProvider>
  );
}

export default App;
