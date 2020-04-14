import React, { useState, useContext } from "react";
import Button from '@material-ui/core/Button';
import { ListsContext } from "../contexts/ListsContext";

function AddList(props) {

  const { addList } = useContext(ListsContext);

  const [inputText, setInputText] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setInputText(value);
  }

  function handleClick(e) {
    e.preventDefault();
    if (!inputText) return;
    addList(inputText);
    setInputText("");
  }

  return (
    <div class="add-list">
      <form>
        <label for="name">New list:</label>
        <input
          onChange={handleChange}
          value={inputText}
          id="name"
          placeholder="List name">
        </input>
        <Button onClick={handleClick} variant="contained">Save</Button>
      </form>
    </div>
  )
}

export default AddList;