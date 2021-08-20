import React from 'react';
import Header from "./components/Header";
import Item from "./components/Item";
import Form from "./components/Form";

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newItemValue: "",
      items: [
        // { text: "First Todo", done: false },
        // { text: "Second Todo", done: true },
      ]
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleTodo   = this.toggleTodo.bind(this)
    this.deleteTodo   = this.deleteTodo.bind(this)
  }

  handleChange(event) {
    this.setState({ newItemValue: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();

    let items = this.state.items.slice()

    // don't allow to add blank todos
    if(this.state.newItemValue !== '')
      items.push({
        text: this.state.newItemValue,
        done: false,
      })
    else
      alert("Cannot add a blank ToDo")

    this.setState({
      newItemValue: '',
      items: items
    })
  }

  toggleTodo(index) {
    let items = this.state.items.slice()
    let item = items[index]
    item.done = !item.done

    this.setState({
      items: items
    })
  }

  deleteTodo(index) {
    let items = this.state.items.slice()
    let deadItem = items[index]
    console.log(deadItem) // is an {object} e.g {text:"first item", done: true}
    // validate - warn if delete attempt against not done/checked item.?
    if(deadItem.done !== true)
      alert("Cannot delete an un-done ToDo")
    else
      items = items.filter( item => item !== deadItem)

    this.setState({
      items: items
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
          <Form handleSubmit={this.handleSubmit} newItemValue={this.state.newItemValue} handleChange={this.handleChange} />
          <ol>
            {this.state.items.map( (item, index) => (
              <Item key={index} clickHandler={ () => this.toggleTodo(index) } onDelete={ () => this.deleteTodo(index) } handleChange={ () => this.handleChange} done={item.done} text={item.text} />
            ))
            }
          </ol>
      </div>
    )
  }
}

export default App;
