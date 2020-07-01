import React, { useContext } from "react";
import "./ListTable.css";
import { ListsContext } from "../contexts/ListsContext";
import { v4 as uuid } from "uuid";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


function ListTable() {

  const { lists, shownList, showList, deleteList } = useContext(ListsContext);

  // When a list name is clicked, set shown list to this list
  function handleClick(e) {
    const listId = e.target.id;
    showList(listId);
  }

  // When the delete button is clicked, list is deleted
  function handleDelete(e) {
    e.stopPropagation();
    const id = e.target.id;
    deleteList(id);
  }


  return (
    <div className="list-table">
      <h1 className="list-table__header">Lists:</h1>
      <ul>
        {lists.map((list) => {
          return (
            <div className={list === shownList ? "list-table__item list-table__item--shown" : "list-table__item"} onClick={handleClick} key={uuid()} id={list.id}>
              <li >{list.title}</li>
              <span onClick={handleDelete} id={list.id}>
                <DeleteForeverIcon className="icon delete__icon" onClick={handleDelete} id={list.id} />
              </span>
            </div>)
        })}
      </ul>
    </div>
  )
}

export default ListTable;