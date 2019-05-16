import React, { Component } from 'react'
import Search from './Search'
import Calculate from './Calculate'
import axios from 'axios'

class PortfolioContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      name: '',
      portfolio: [],
      search_results: [],
      active_currency: null,
      amount: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleChange(e){

    axios.post('http://localhost:3000/search', {
      search: e.target.value
    })
    .then((data) => {
      // debugger
      // console.log(data);
      this.setState({
        search_results: [...data.data.currencies]
      })
    })
    .catch((data) => {
      debugger
    })
    // console.log(this.state.name);
    console.log(this.state.search_results);
  }

  handleSelect(e){
    e.preventDefault()
    const id = e.target.getAttribute('data-id')
    // gotta make sure it's an integer and not a string with parseInt
    const activeCurrency = this.state.search_results.filter( item => item.id == parseInt(id))
    this.setState({
      active_currency: activeCurrency[0],
      // after using clicks on one rsult, set search_results back to an empty array to clear screen:
      search_results: []
    })
    // debugger
  }

  render(){

    // if something is there (it's not null) then show our <Calculate/> component, else the <Search/> component
    const searchOrCalculate = this.state.active_currency ?
      <Calculate/> :
      <Search
        searchResults={this.state.search_results}
        handleChange={this.handleChange}
        handleSelect={this.handleSelect} />

    return(
      <div>
        { searchOrCalculate }
      </div>
    )
  }
}

export default PortfolioContainer
