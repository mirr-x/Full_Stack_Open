import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App'

const rootElement = document.getElementById("root")

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)