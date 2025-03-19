import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import ClassInput from '../Components/classInput.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClassInput />
  </StrictMode>,
)
