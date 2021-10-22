
import './App.css';
import React from 'react';

import ReactDOM from 'react-dom';
const { Component } = React,
      { render } = ReactDOM,
      rootNode = document.getElementById('root')

class List extends Component {
  state = {
    listItems: [],
    userInput: '',
  }

    // prende il valore dell input
  inputChangeHandler = (element) => this.setState({
    userInput: element.target.value
  })


  // Aggiungo all'array il valore del l'input al submit del form.
  submitHandler = e =>{

      //previene il
      e.preventDefault()
      if(this.state.userInput.length >0){
      this.setState({
        listItems: ([...this.state.listItems, this.state.userInput]).sort(),
        userInput: ''
      })

    } else{
      this.setState({
        listItems: [...this.state.listItems],
        userInput: ''
      })
    }

    }
  


  render() {
    return (
      <div>
        
        <form onSubmit={this.submitHandler}>
          <input value={this.state.userInput} onChange={this.inputChangeHandler} />
          <input type="submit" value="Submit" />
        </form>
        <ul>
          {
            this.state.listItems.map((li,key) => <li {...{key}}>{li}<input type="checkbox" /></li>)
          }
        </ul>
      </div>
    )
  }
}

render (
  <List />,
  rootNode
)

export default List;
