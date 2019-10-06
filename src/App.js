import React from 'react'
// import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import Home from './pages/Home'
import Footer from './components/Footer'

function App() {
  return (
    <React.Fragment>
      <main>
        <Home />
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default App
