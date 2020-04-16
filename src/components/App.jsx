import React from "react";
import Header from "./Header";
import AddList from "./AddList";
import List from "./List";
import ListTable from "./ListTable";
import "./App.css"
import ListsContextProvider from "../contexts/ListsContext";


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