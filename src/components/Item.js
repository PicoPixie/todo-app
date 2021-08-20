import React from 'react'
import Button from "./Button";

const Item = (props) => {
  return (
    <li>
      <label>
        <input onClick={props.clickHandler} type="checkbox" checked={props.done || false} onChange={props.handleChange}/>
        <span>{props.text}</span>
        <Button deleteTodo={props.onDelete} /> 
      </label>
    </li>
  );
}
 
export default Item;