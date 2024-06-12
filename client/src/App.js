import './App.css';
// import SignIn from './components/user/SignIn';
// import Dash from './components/dashboard/index';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { appTheme } from './themes/theme';
import AppRoutes from './routes/Routes';
import Navbar from './components/common/Navbar';
import CommonSnackbar from './components/common/CommonSnackbar';
import { UserContext, ContextProvider } from './utils/UserContext';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      <Navbar />
      <ContextProvider>
      <CommonSnackbar />
        <AppRoutes />
      </ContextProvider>
      {/* <Dash></Dash> */}
    </ThemeProvider>
  );
}

export default App;
