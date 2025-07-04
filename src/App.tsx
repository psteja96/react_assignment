
import './App.css'
import NestedSidebar from "./Components/Header.tsx";
import PrimaryDrawer from "./Components/PrimaryDrawer.tsx";
import {Provider} from "react-redux";
import {store} from "./Store/store.ts";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: [
            'Roboto',
            'Arial',
            'sans-serif',
        ].join(','),
    },
});
function App() {

  return (
      <div>
          <PrimaryDrawer/>
          <Provider store={store}>
              <ThemeProvider theme={theme}>
                  <CssBaseline />
        <NestedSidebar />
              </ThemeProvider>
          </Provider>
      </div>

  )
}

export default App
