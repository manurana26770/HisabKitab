import { useState } from 'react'
// import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header/header.jsx'
import Pages from './components/mainpages/pages.jsx'
import Fotter from "./components/fotter/fotter.jsx"
function App() {
  return (
    <Router>
      <Header/>
      <Pages/>
      <Fotter/>
    </Router>
  )
}

export default App
