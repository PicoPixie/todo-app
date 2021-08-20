import React from 'react'

function Button(props) {
  return (
    <button onClick={props.deleteTodo}>delete</button>
  )
}

export default Button;
