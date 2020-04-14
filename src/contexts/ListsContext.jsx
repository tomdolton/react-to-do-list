import React, { createContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const ListsContext = createContext();

const ListsContextProvider = (props) => {

  const cleaning = {
    title: "Cleaning",
    items: ["Hoover", "Dusting", "Washing up"],
    id: uuid()
  }
  const homework = {
    title: "Homework",
    items: ["Write", "Read", "Maths"],
    id: uuid()
  }

  const [lists, setLists] = useState([cleaning, homework]);
  const [shownList, setShownList] = useState(homework);
  // const [listItems, setListItems] = useState([]);


  function addList(newList) {
    setLists((prevValue) => {
      return ([...prevValue, { title: newList, items: [], id: uuid() }]);
    });
    // if this is the first item in lists array, call show list function
  }  //done for now


  function addListItem(newItem, listId) {
    let alteredList = shownList;
    alteredList.items.push(newItem);

    setLists(prevValue => {
      return ([...prevValue].map(list => (list.id === listId) ? alteredList : list))
    });

  }

  function removeListItem(item) {
    let alteredList = shownList;
    alteredList.items = alteredList.items.filter(i => i !== item);

    console.log(alteredList);
    setLists(prevValue => {
      return ([...prevValue].map(list => (list.id === shownList.id) ? alteredList : list))
    });
  }


  function showList(listId) {
    const foundList = lists.find(list => list.id === listId);
    setShownList(foundList);
  }


  return (
    <ListsContext.Provider value={{ lists, shownList, addList, addListItem, showList, removeListItem }}>
      {props.children}
    </ListsContext.Provider>
  );
}

export default ListsContextProvider;