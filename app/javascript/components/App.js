import React, { Component } from 'react'
import PortfolioContainer from './PortfolioContainer'
import axios from 'axios'

// this is needed to bypass issues due to Rails' built in csrf security: 
const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

class App extends Component {
  render(){
    return(
      <PortfolioContainer/>
    )
  }
}

export default App
