import React, { useState, createContext, useCallback, useRef } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import './App.css';
import AddPlace from "./components/placeComponents/addPlace";
import Toolbar from "./components/UI/toolbar/toolbar";
import Auth from "./containers/auth";
import Main from "./containers/main";
import Places from "./containers/places";

export const authContext = createContext({
  authenticated: true,
  userId: null,
  username: null,
  login: () => {},
  logout: () => {}
});

const App = () => {
    
  const authenticated = useRef(false)
  const [userId, setUserId] = useState(null)
  const [username, setUsername] = useState('')
  

  const login = useCallback((uid, name) => {
    authenticated.current = true
    setUserId(uid)
    setUsername(name)
  }, [setUserId, setUsername])

  const logout = useCallback(() => {
    authenticated.current = false
    setUserId(null)
  }, [])

  let routes

  if(authenticated.current){
    routes = (
      <Switch>
        <Route path="/:uid/places" exact component={withRouter(Places)} />
        <Route path="/home" exact component={withRouter(Main)} />
         {/* <Route path="/:uid/:pid" exact component={edit} /> */}
        <Route path="/:uid/new" exact component={withRouter(AddPlace)} /> 
        <Redirect to="/home" component={withRouter(Main)} />
     </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/auth" exact component={withRouter(Auth)} />
        <Route path="/home" exact component={withRouter(Main)} />
        <Redirect to="/home"  component={withRouter(Main)} />
      </Switch>
    )}
  return (
    <authContext.Provider 
    value = {{authenticated: authenticated, userId: userId, username: username, login: login, logout: logout}} >
      <div className="App">
        <Toolbar />
      <Router>
        {routes}
      </Router>
    </div>
    </authContext.Provider>
  );
}

export default App;