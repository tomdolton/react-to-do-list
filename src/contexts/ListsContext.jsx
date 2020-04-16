import React, { createContext, useState, useEffect } from "react";
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
  const [listsNumber, setListsNumber] = useState(lists.length);
  const [shownList, setShownList] = useState(homework);
  // const [listItems, setListItems] = useState([]);




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
    // if (lists.length === 1) { }
    setShownList(foundList);
  }


  const [isIncrease, setIsIncreased] = useState(true);

  function addList(newList) {
    setIsIncreased(true);
    setLists((prevValue) => {
      return ([...prevValue, { title: newList, items: [], id: uuid() }]);
    });
    setListsNumber(prevValue => prevValue + 1);
  }

  function deleteList(listId) {
    setIsIncreased(false);
    const foundList = lists.find(list => list.id === listId);
    // if (foundList === shownList) { showList(lists[0].id) };
    setLists(prevValue => prevValue.filter(list => list !== foundList));
    setListsNumber(prevValue => prevValue - 1);
  }

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





  return (
    <ListsContext.Provider value={{ lists, shownList, addList, addListItem, showList, removeListItem, deleteList }}>
      {props.children}
    </ListsContext.Provider>
  );
}

export default ListsContextProvider;