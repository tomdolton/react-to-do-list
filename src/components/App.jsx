import React, { useContext } from "react";
import Header from "./Header";
import AddList from "./AddList";
import List from "./List";
import ListTable from "./ListTable";
import ListsContextProvider, { ListsContext } from "../contexts/ListsContext";


function App() {

  return (
    <div>
      <ListsContextProvider>
        <Header />
        <div className="container">
          <div className="sidebar">
            <AddList />
            <ListTable />
          </div>
          <List />
        </div>
      </ListsContextProvider>
    </div>
  )
}

export default App;