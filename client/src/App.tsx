import React from "react";
import NavBar from "./Components/NavBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path='/' exact component={Homepage}></Route>
          <Route path='/admin' component={AdminPage}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/profile' component={Profile}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
