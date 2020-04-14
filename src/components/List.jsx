import React, { useState, useContext } from "react";
import Button from '@material-ui/core/Button';
import { ListsContext } from "../contexts/ListsContext";
import { v4 as uuid } from "uuid";
import { Checkbox, TextField } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


function List(props) {

  const { lists, shownList, addListItem, removeListItem } = useContext(ListsContext);

  const [itemInputText, setItemInputText] = useState("");
  // function listInputChange(value) {
  //   setItemInputText(value);
  // }

  function handleChange(e) {
    const value = e.target.value;
    setItemInputText(value);
  }

  function handleClick(e) {
    e.preventDefault();
    if (!itemInputText) return;
    addListItem(itemInputText, shownList.id);
    setItemInputText("");
  }

  function handleCheckbox(e) {
    e.preventDefault();
    const value = e.target.id;
    removeListItem(value);
  }

  function handleListItemClick(e) {
    const element = document.getElementById(e.target.id);
    console.log(element);
    element.classList.toggle('list__item--done');
  }

  return (
    <div class="list">
      <form>
        <h2 className="list__title">{shownList.title}</h2>
        <ul class="list__items">
          {shownList.items.map((item) => {
            return (
              <div id={uuid()} className="list__item" onClick={handleListItemClick}>
                <Checkbox onChange={handleCheckbox} id={item} />
                {/* <DeleteForeverIcon className="delete-icon" onClick={handleCheckbox} id={item} /> */}
                <li key={uuid()}>{item}</li>
              </div>)
          })}
        </ul>
        <div className="list__controls">
          {/* <TextField onChange={handleChange} value={itemInputText} label="New list item"></TextField> */}
          <input className="list__input" onChange={handleChange} value={itemInputText} placeholder="New list item"></input>
          <Button onClick={handleClick} variant="contained">Add</Button>
        </div>
      </form>
    </div>
  )
}

export default List;