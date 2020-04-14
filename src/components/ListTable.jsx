import React, { useContext } from "react";
import { ListsContext } from "../contexts/ListsContext";
import { v4 as uuid } from "uuid";

function ListTable(props) {
  const { lists, showList } = useContext(ListsContext);

  function handleClick(e) {
    const listId = e.target.id;
    showList(listId);
  }

  return (
    <div className="list-table">
      <h1 className="list-table__header">Lists:</h1>
      <ul>
        {lists.map((list) => {
          return <li onClick={handleClick} key={uuid()} id={list.id}>{list.title}</li>
        })}
      </ul>
    </div>
  )
}



export default ListTable;