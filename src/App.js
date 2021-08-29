import React from 'react';
import Header from "./components/Header";
import Form from "./components/Form";
import Item from "./components/Item";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newItemValue: "",
      items: []
    }

    // don't need these bindings if using => fns.
    //this.handleChange = this.handleChange.bind(this)
    //this.handleSubmit = this.handleSubmit.bind(this)
    //this.toggleTodo   = this.toggleTodo.bind(this)
    //this.deleteTodo   = this.deleteTodo.bind(this)
  }

  componentDidMount() {
    this.getToDos();
  }

  getToDos = () => {
    this.setState( () => {
      fetch("http://localhost:3001/todos")
        .then(res => res.json())
        .then(todos => this.setState({
            items: todos
          })
        )
        .catch(console.log);
    });
  }

  handleChange = (event) => {
    this.setState({ newItemValue: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let items = this.state.items.slice()
    // what's the highest ID seen so far in our persistent store of items[].?
    // peek at the last array object's ID and go from there
    let lastObject = this.state.items.slice(-1)
    let lastObjectId = lastObject.id
    // inc. to the next available number, ready for new item POST, we don't re-use IDs
    let newObjectId = lastObjectId++

    // don't allow them to add blank ToDos
    if(this.state.newItemValue !== '')
      // update the Mockend API
      fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( {
          'id': newObjectId,
          'text': this.state.newItemValue,
          'done': false
        })
      }).then(
        items.push({
          text: this.state.newItemValue,
          done: false,
        })
      )
      .then(console.log(JSON.stringify( {'id': newObjectId, 'text': this.state.newItemValue, 'done': false})));
      //.then(console.log(count));

    else
      alert("Cannot add a blank ToDo")

    // let REACT update the view, don't make a fresh GET req't
    this.setState({
      newItemValue: '',
      items: items
    })
  }

  toggleTodo = (index) => {
    let items = this.state.items.slice()
    let item = items[index]
    item.done = !item.done

    this.setState({
      items: items
    })
  }

  deleteTodo = (index) => {
    let items = this.state.items.slice()
    let deadItem = items[index]
    console.log(deadItem) // is an {object} e.g {id: N, text:"first item", done: true}
    // validate - warn if delete attempt against not done/checked item.?
    if(deadItem.done !== true)
      alert("Cannot delete an un-done ToDo")
    else
      items = items.filter( item => item !== deadItem)
      // delete from the Mockend API (db.json)
      fetch("http://localhost:3001/todos/" + deadItem.id, {
        method: "DELETE",
      });

    // let REACT update the view, don't make a fresh GET req't
    this.setState({
      items: items
    })
  }

  render() {
    return (
      <div>
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
