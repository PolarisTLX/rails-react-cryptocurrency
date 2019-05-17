import React, { Component } from 'react'
import Search from './Search'
import Calculate from './Calculate'
import Portfolio from './Portfolio'
import axios from 'axios'

class PortfolioContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      portfolio: [],
      search_results: [],
      active_currency: null,
      amount: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAmount = this.handleAmount.bind(this)
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
    // console.log(this.state.search_results);
  }

  handleSelect(e){
    e.preventDefault()
    const id = e.target.getAttribute('data-id')
    // gotta make sure it's an integer and not a string with parseInt
    const activeCurrency = this.state.search_results.filter( item => item.id == parseInt(id))
    this.setState({
      active_currency: activeCurrency[0],
      // after using clicks on one result, set search_results back to an empty array to clear screen:
      search_results: []
    })
    // debugger
  }

  handleSubmit(e) {
    e.preventDefault()

    let currency = this.state.active_currency
    let amount = this.state.amount

    axios.post('http://localhost:3000/calculate', {
      // post request then hits our controller, then we get data back from that,
      id: currency.id,
      amount: amount
    })
    .then( (data) => {
      // log to see if we are getting correct response from our controller:
      console.log(data);
      // now we update our portfolio, and reset/empty our amount back to empty string & active_currency back to null:
      this.setState({
        amount: '',
        active_currency: null,
        portfolio: [...this.state.portfolio, data.data]
      })
    })
    .catch( (data) => {
      debugger
    })
  }

  handleAmount(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){

    // if something is selected? there (it's not null) then show our <Calculate/> component, else the <Search/> component
    const searchOrCalculate = this.state.active_currency ?
      <Calculate
      // NOTE THE ONE BELOW IS DIFFERENT!:
        handleChange={this.handleAmount}
        handleSubmit={this.handleSubmit}
        active_currency={this.state.active_currency}
        amount={this.state.amount}
      /> :
      <Search
        searchResults={this.state.search_results}
        handleChange={this.handleChange}
        handleSelect={this.handleSelect} />

    return(
      <div className="grid">
        <div className="left">
          { searchOrCalculate }
        </div>
        <div className="right">
          <Portfolio portfolio={this.state.portfolio} />
        </div>
      </div>
    )
  }
}

export default PortfolioContainer
