import React, { useState, useContext } from "react";
import "./List.css";
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import { ListsContext } from "../contexts/ListsContext";
import { v4 as uuid } from "uuid";


function List(props) {

  const { shownList, addListItem, removeListItem } = useContext(ListsContext);

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

  // Adds line through class to list items when clicked
  function handleListItemClick(e) {
    e.stopPropagation();

    let element;
    if (e.target.tagName === "LI") {
      element = e.target.parentNode;
    } else element = e.target;

    element.classList.toggle('list__item--done');
  }

  return (
    <div className="list">
      {shownList === undefined ? (
        null
      ) : (
          <form>
            <h2 className="list__title">{shownList.title}</h2>
            <ul className="list__items">
              {shownList.items.map((item) => {
                return (
                  <div className="list__item" key={uuid()} id={uuid()} onClick={handleListItemClick}>
                    <span className="list__checkbox" onClick={handleCheckbox} id={item} >
                      <CheckIcon className="icon checkbox__icon" style={{ fontSize: 24 }} onClick={handleCheckbox} id={item} />
                    </span>
                    <li key={uuid()} id={uuid()} onClick={handleListItemClick}>{item}</li>
                  </div>)
              })}
            </ul>
            <div className="list__controls">
              <input className="list__input" onChange={handleChange} value={itemInputText} placeholder="New list item"></input>
              <Button type="submit" onClick={handleClick} variant="outlined" >Add</Button>
            </div>
          </form>
        )
      }
    </div>
  )
}

export default List;