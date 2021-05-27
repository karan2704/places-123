import React, { useState, createContext, useCallback, useRef } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import AddPlace from "./components/placeComponents/addPlace";
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
        <Route path="/:uid/places" exact component={Places} />
         {/* <Route path="/:uid/place/:pid" exact component={} /> */}
        <Route path="/:uid/new" exact component={AddPlace} /> 
        <Redirect to="/home" exact component={Main} />
     </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/home" exact component={Main} />
      </Switch>
    )}
  return (
    <authContext.Provider 
    value = {{authenticated: authenticated, userId: userId, username: username, login: login, logout: logout}} >
      <div className="App">
      <Router>
        {routes}
      </Router>
    </div>
    </authContext.Provider>
  );
}

export default App;