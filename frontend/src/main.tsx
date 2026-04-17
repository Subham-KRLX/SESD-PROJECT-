import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './index.css'
import App from './App.js'

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Set default animation duration
gsap.defaults({ duration: 0.5, ease: 'power2.inOut' });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
