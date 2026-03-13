import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'

import CommentSection from './components/CommentSection'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CommentSection />
  </StrictMode>,
)
