import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import './index.css'
import App from './App.tsx'

const theme = createTheme({
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: { fontFamily: '"Playfair Display", Georgia, serif' },
  primaryColor: 'blue',
  colors: {
    gold: [
      '#fdf8ed',
      '#f5e9c6',
      '#ead49a',
      '#dcbc6a',
      '#c9a84c',
      '#b8943a',
      '#9a7a2e',
      '#7d6125',
      '#61491b',
      '#463311',
    ],
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>,
)
