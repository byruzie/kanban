import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import KanbanExample from './KanbanExample.jsx'
import "./index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KanbanExample />
  </StrictMode>,
)
