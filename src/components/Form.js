import React from 'react'

function Form(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <input type="text" value={props.newItemValue} placeholder="New ToDo..." onChange={props.handleChange} />
      <input type="submit" value="Add Item" />
    </form>
  )
}

export default Form;
