import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import App from './App.jsx'
import TestPage from './routes/testpage.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/test",
    element: <TestPage />,
  }
])

function Root() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark'
        },
      }),
    [prefersDarkMode],
  );

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
}

// Check if the root already exists
const rootElement = document.getElementById("root");
if (!rootElement.hasOwnProperty('_reactRootContainer')) {
  ReactDOM.createRoot(rootElement).render(<Root />);
} else {
  // If the root exists, just re-render
  ReactDOM.hydrateRoot(rootElement, <Root />);
}
