import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import './index.css'
import { ThemeProvider } from './provider/theme-provider.tsx'
import { store } from './redux/store.ts'
import router from './routes/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router}/>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
