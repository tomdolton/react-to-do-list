import React from "react";
import Header from "./components/Header";
import AddList from "./components/AddList";
import List from "./components/List";
import ListTable from "./components/ListTable";
// import "./App.css"
import ListsContextProvider from "./contexts/ListsContext";


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