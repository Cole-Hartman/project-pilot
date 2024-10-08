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
import Form from './routes/Form.jsx'
import Profile from './routes/Profile.jsx'
import Projects from './routes/Projects.jsx'
import NotFound from './routes/NotFound.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/form",
    element: <Form />,
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/projects",
    element: <Projects />
  },
  {
    path: "*",
    element: <NotFound />,
  },

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
