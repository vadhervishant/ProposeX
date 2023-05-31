import './App.css';
import SignIn from './components/user/SignIn';
import Dash from './components/dashboard/index';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { appTheme } from './themes/theme';
function App() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      {/* <Navbar /> */}
      {/* <CommonSnackbar /> */}
      {/* <AppRoutes /> */}
      <Dash></Dash>
    </ThemeProvider>
  );
}

export default App;
