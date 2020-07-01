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
    // Get 'lists' data from local storage
    const localData = localStorage.getItem("lists");
    // Set lists state as local data or example array if nothing in local data
    return localData ? JSON.parse(localData) : [example]
  });
  const [listsNumber, setListsNumber] = useState(lists.length);
  const [shownList, setShownList] = useState(lists[0]);
  const [isIncreased, setIsIncreased] = useState(true);


  function addListItem(newItem, listId) {
    // Set visible list array in variable and add new item to it
    let alteredList = shownList;
    alteredList.items.push(newItem);


    setLists(prevValue => {
      // For each list in lists state, check if the list id matches, if so replace with the alteredList
      return ([...prevValue].map(list => (list.id === listId) ? alteredList : list))
    });
  }


  function removeListItem(item) {
    // Set visible list array in variable and filter to remove the item from its items array
    let alteredList = shownList;
    alteredList.items = alteredList.items.filter(i => i !== item);

    setLists(prevValue => {
      // For each list in lists state, check if the list id matches, if so replace with the alteredList
      return ([...prevValue].map(list => (list.id === shownList.id) ? alteredList : list))
    });
  }


  function showList(listId) {
    const foundList = lists.find(list => list.id === listId);
    setShownList(foundList);
  }


  function addList(newList) {
    setIsIncreased(true);
    // Add new empty list to lists state
    setLists((prevValue) => {
      return ([...prevValue, { title: newList, items: [], id: uuid() }]);
    });
    setListsNumber(prevValue => prevValue + 1);
  }


  function deleteList(listId) {
    // Check with user to confirm deletion
    let isConfirmed = window.confirm("Are you sure you want to delete this list?");
    if (isConfirmed) {
      setIsIncreased(false);
      // Find list lists state
      const foundList = lists.find(list => list.id === listId);
      // Remove list from lists state
      setLists(prevValue => prevValue.filter(list => list !== foundList));
      setListsNumber(prevValue => prevValue - 1);
    }
  }


  // Changes shown list when lists are added or removed
  useEffect(() => {
    if (isIncreased) {
      // Sets shown list to last added list
      setShownList(lists[lists.length - 1])
    } else {
      // Sets shown list when removed list 
      // -to current list if not deleted
      if (lists.includes(shownList)) {
        return;
      } else {
        // -to first list if current is deleted
        setShownList(lists[0]);
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