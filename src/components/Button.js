import React from 'react'

const Button = (props) => {
  return (
    <button onClick={props.deleteTodo}>delete</button>
  );
}
 
export default Button;