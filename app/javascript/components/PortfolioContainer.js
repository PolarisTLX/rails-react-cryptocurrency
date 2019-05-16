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

  render(){
    return(
      <div>
        <Search searchResults={this.state.search_results} handleChange={this.handleChange}/>
        <Calculate/>
      </div>
    )
  }
}

export default PortfolioContainer
