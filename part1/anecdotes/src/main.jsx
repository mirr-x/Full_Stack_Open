import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App'

const HTNLrootElement = document.getElementById('root')
const REACTrootElement = ReactDOM.createRoot(HTNLrootElement)


REACTrootElement.render(
  <StrictMode>
    <App />
  </StrictMode>
)