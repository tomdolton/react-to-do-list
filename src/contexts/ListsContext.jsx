import React, { createContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

export const ListsContext = createContext();

const ListsContextProvider = (props) => {

  const example = {
    title: "Example to do list",
    items: ["Create your own lists", "Cross off a list item by clicking it", "<--Delete a list item by clicking on the circle", "Add a new item to the list below..."],
    id: uuid()
  }

  const [lists, setLists] = useState(() => {
    const localData = localStorage.getItem("lists");
    return localData ? JSON.parse(localData) : [example]
  });
  const [listsNumber, setListsNumber] = useState(lists.length);
  const [shownList, setShownList] = useState(lists[0]);
  const [isIncrease, setIsIncreased] = useState(true);


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

    setLists(prevValue => {
      return ([...prevValue].map(list => (list.id === shownList.id) ? alteredList : list))
    });
  }

  function showList(listId) {
    const foundList = lists.find(list => list.id === listId);
    setShownList(foundList);
  }

  function addList(newList) {
    setIsIncreased(true);
    setLists((prevValue) => {
      return ([...prevValue, { title: newList, items: [], id: uuid() }]);
    });
    setListsNumber(prevValue => prevValue + 1);
  }

  function deleteList(listId) {
    let isConfirmed = window.confirm("Are you sure you want to delete this list?");
    if (isConfirmed) {
      setIsIncreased(false);
      const foundList = lists.find(list => list.id === listId);
      setLists(prevValue => prevValue.filter(list => list !== foundList));
      setListsNumber(prevValue => prevValue - 1);
    }
  }

  // Changes shown list when lists are added or removed
  useEffect(() => {
    if (isIncrease) {
      // Sets shown list to last added list
      setShownList(lists[lists.length - 1])
    } else {
      // Sets shown list when removed list 
      if (lists.includes(shownList)) {
        return;
      } else {
        setShownList(lists[lists.length - 1]);
      }
    }
  }, [listsNumber]);

  // Saves lists to local storage whenever lists is updated
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);


  return (
    <ListsContext.Provider value={{ lists, shownList, addList, addListItem, showList, removeListItem, deleteList }}>
      {props.children}
    </ListsContext.Provider>
  );
}

export default ListsContextProvider;